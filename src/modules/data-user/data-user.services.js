import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createDataUser = async (data) => {
    const { name, email, phone, paketId } = data;
    return await prisma.dataUser.create({
        data: {
            name,
            email,
            phone,
            paketId: paketId ? parseInt(paketId) : null
        }
    });
};

export const getAllDataUsers = async () => {
    return await prisma.dataUser.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
};

export const getDataUserById = async (id) => {
    return await prisma.dataUser.findUnique({
        where: { id: parseInt(id) }
    });
};
