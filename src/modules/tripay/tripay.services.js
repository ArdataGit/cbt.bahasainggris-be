import axios from 'axios';
import crypto from 'crypto';

const API_KEY = process.env.TRIPAY_API_KEY;
const PRIVATE_KEY = process.env.TRIPAY_PRIVATE_KEY;
const MERCHANT_CODE = process.env.TRIPAY_MERCHANT_CODE;
const BASE_URL = process.env.TRIPAY_LINK;

/**
 * Get available payment channels from Tripay
 */
export const getPaymentChannels = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/merchant/payment-channel`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Tripay channels:', error.response?.data || error.message);
        throw new Error('Gagal mengambil metode pembayaran.');
    }
};

/**
 * Generate signature for Tripay request
 */
export const createSignature = (merchantRef, amount) => {
    return crypto
        .createHmac('sha256', PRIVATE_KEY)
        .update(MERCHANT_CODE + merchantRef + amount)
        .digest('hex');
};

/**
 * Request a transaction to Tripay
 */
export const requestTransaction = async ({ 
    method, 
    merchantRef, 
    amount, 
    customerName, 
    customerEmail, 
    customerPhone,
    orderItems,
    callbackUrl,
    returnUrl
}) => {
    try {
        const signature = createSignature(merchantRef, amount);
        
        const payload = {
            method,
            merchant_ref: merchantRef,
            amount,
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone || '08123456789',
            order_items: orderItems,
            callback_url: callbackUrl,
            return_url: returnUrl,
            expired_time: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
            signature
        };

        const response = await axios.post(`${BASE_URL}/transaction/create`, payload, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating Tripay transaction:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Gagal membuat transaksi ke Tripay.');
    }
};

/**
 * Verify callback signature from Tripay
 */
export const verifyCallbackSignature = (jsonPayload, remoteSignature) => {
    const signature = crypto
        .createHmac('sha256', PRIVATE_KEY)
        .update(jsonPayload)
        .digest('hex');
    
    return signature === remoteSignature;
};
