import { PrismaClient } from '@prisma/client';
import { createNotification } from '../notification/notification.services.js';
const prisma = new PrismaClient();

export const getAllPaketPembelians = async () => {
    return await prisma.paketPembelian.findMany({
        include: {
            pakets: {
                select: {
                    id: true,
                    name: true,
                    isFree: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};

export const getPaketPembelianById = async (id) => {
    return await prisma.paketPembelian.findUnique({
        where: { id: parseInt(id) },
        include: {
            pakets: {
                select: {
                    id: true,
                    name: true,
                    isFree: true
                }
            }
        }
    });
};

export const createPaketPembelian = async (data) => {
    const { name, price, label, description, duration, paketIds } = data;
    
    return await prisma.paketPembelian.create({
        data: {
            name,
            price: parseInt(price),
            label,
            description,
            duration: parseInt(duration),
            pakets: {
                connect: paketIds ? paketIds.map(id => ({ id: parseInt(id) })) : []
            }
        },
        include: {
            pakets: true
        }
    });
};

export const updatePaketPembelian = async (id, data) => {
    const { name, price, label, description, duration, paketIds } = data;
    
    return await prisma.paketPembelian.update({
        where: { id: parseInt(id) },
        data: {
            name,
            price: price !== undefined ? parseInt(price) : undefined,
            label,
            description,
            duration: duration !== undefined ? parseInt(duration) : undefined,
            pakets: {
                set: paketIds ? paketIds.map(paketId => ({ id: parseInt(paketId) })) : []
            }
        },
        include: {
            pakets: true
        }
    });
};

export const deletePaketPembelian = async (id) => {
    return await prisma.paketPembelian.delete({
        where: { id: parseInt(id) }
    });
};

export const getAllUserPembelians = async (userId, role) => {
    if (role === 'admin') {
        return await prisma.pembelianUser.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                paketPembelian: {
                    include: {
                        pakets: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    return await prisma.pembelianUser.findMany({
        where: {
            userId: parseInt(userId),
            status: 'SUCCESS',
            expiredDuration: {
                gt: new Date()
            }
        },
        include: {
            paketPembelian: {
                include: {
                    pakets: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};

export const updateUserPembelianStatus = async (id, status) => {
    const pembelian = await prisma.pembelianUser.findUnique({
        where: { id: parseInt(id) },
        include: { paketPembelian: true }
    });

    if (!pembelian) throw new Error('Pembelian not found');

    const updateData = { status };

    // If status is changed to SUCCESS, calculate expiry
    if (status === 'SUCCESS' && pembelian.status !== 'SUCCESS') {
        const expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + pembelian.duration);
        updateData.expiredDuration = expiredDate;

        // Create a history entry as well
        await prisma.historyPembelian.create({
            data: {
                userId: pembelian.userId,
                paketPembelianId: pembelian.paketPembelianId,
                amount: pembelian.amount,
                status: 'SUCCESS',
                duration: pembelian.duration,
                expiredDuration: expiredDate,
                merchantRef: pembelian.merchantRef
            }
        });

        // Trigger notification for successful manual activation
        await createNotification(
            pembelian.userId,
            'Pembayaran Berhasil',
            `Pembayaran/aktivitas untuk paket ${pembelian.paketPembelian.name} telah berhasil dikonfirmasi. Selamat belajar!`,
            'PURCHASE'
        );
    }

    return await prisma.pembelianUser.update({
        where: { id: parseInt(id) },
        data: updateData
    });
};
