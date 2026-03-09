import { PrismaClient } from '@prisma/client';
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
