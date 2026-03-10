import * as tripayService from './tripay.services.js';
import prisma from '../../utils/prisma.js';

export const getChannels = async (req, res) => {
    try {
        const channels = await tripayService.getPaymentChannels();
        res.status(200).json(channels);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createPayment = async (req, res) => {
    try {
        const { paketPembelianId, method } = req.body;
        const userId = req.user.id; // Corrected to use req.user.id from auth middleware

        const user = await prisma.user.findUnique({ where: { id: userId } });
        const paket = await prisma.paketPembelian.findUnique({ where: { id: parseInt(paketPembelianId) } });

        if (!paket) {
            return res.status(404).json({ success: false, message: 'Paket tidak ditemukan.' });
        }

        // Create a record in PembelianUser first
        const merchantRef = `INV-${Date.now()}-${userId}`;
        
        // Calculate expired duration (default 24h for payment to be completed)
        const expiredPayment = new Date();
        expiredPayment.setHours(expiredPayment.getHours() + 24);

        const pembelian = await prisma.pembelianUser.create({
            data: {
                userId: userId,
                paketPembelianId: paket.id,
                status: 'PENDING',
                merchantRef: merchantRef,
                amount: paket.price,
                duration: paket.duration,
                bank: method,
                phone: user.phone || '08123456789',
                expiredDuration: expiredPayment
            }
        });

        const orderItems = [
            {
                sku: `PAKET-${paket.id}`,
                name: paket.name,
                price: paket.price,
                quantity: 1
            }
        ];

        const frontendUrl = process.env.FRONTEND_URL || req.headers.origin || 'http://localhost:3000';
        const callbackUrl = `${process.env.BACKEND_URL}/api/tripay/callback`;
        const returnUrl = `${frontendUrl}/dashboard`;

        const transaction = await tripayService.requestTransaction({
            method,
            merchantRef,
            amount: paket.price,
            customerName: user.name,
            customerEmail: user.email,
            customerPhone: user.phone || '08123456789',
            orderItems,
            callbackUrl,
            returnUrl
        });

        res.status(200).json(transaction);
    } catch (error) {
        console.error('Create Payment Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const handleCallback = async (req, res) => {
    try {
        const signature = req.headers['x-callback-signature'];
        const jsonPayload = JSON.stringify(req.body);

        if (!tripayService.verifyCallbackSignature(jsonPayload, signature)) {
            return res.status(400).json({ success: false, message: 'Invalid signature' });
        }

        const { merchant_ref, status } = req.body;

        if (status === 'PAID') {
            const pembelian = await prisma.pembelianUser.findFirst({
                where: { merchantRef: merchant_ref },
                include: { paketPembelian: true }
            });

            if (pembelian && pembelian.status !== 'SUCCESS') {
                // Calculate expiration date for the package access
                const expiredDate = new Date();
                expiredDate.setDate(expiredDate.getDate() + pembelian.duration);

                await prisma.$transaction([
                    // Update status pembelian to SUCCESS
                    prisma.pembelianUser.update({
                        where: { id: pembelian.id },
                        data: { 
                            status: 'SUCCESS',
                            expiredDuration: expiredDate // Update to the actual access expiry
                        }
                    }),
                    // Create history
                    prisma.historyPembelian.create({
                        data: {
                            userId: pembelian.userId,
                            paketPembelianId: pembelian.paketPembelianId,
                            amount: pembelian.amount,
                            status: 'SUCCESS',
                            duration: pembelian.duration,
                            bank: pembelian.bank,
                            phone: pembelian.phone,
                            expiredDuration: expiredDate
                        }
                    })
                ]);
                
                console.log(`Payment confirmed for ${merchant_ref}`);
            }
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Callback Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
