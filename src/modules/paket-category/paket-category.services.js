import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllCategories = async () => {
    return await prisma.paketCategory.findMany({
        include: {
            _count: {
                select: {
                    pakets: true,
                    subCategories: true
                }
            }
        },
        orderBy: {
            categoryName: 'asc'
        }
    });
};

export const getCategoryById = async (id) => {
    return await prisma.paketCategory.findUnique({
        where: { id: parseInt(id) },
        include: {
            subCategories: true,
            pakets: true
        }
    });
};

export const createCategory = async (data) => {
    return await prisma.paketCategory.create({
        data: {
            categoryName: data.categoryName
        }
    });
};

export const updateCategory = async (id, data) => {
    return await prisma.paketCategory.update({
        where: { id: parseInt(id) },
        data: {
            categoryName: data.categoryName
        }
    });
};

export const deleteCategory = async (id) => {
    return await prisma.paketCategory.delete({
        where: { id: parseInt(id) }
    });
};
