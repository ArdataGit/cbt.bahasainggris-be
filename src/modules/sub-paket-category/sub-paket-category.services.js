import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllSubCategories = async () => {
    return await prisma.subPaketCategory.findMany({
        include: {
            paketCategory: true,
            _count: {
                select: {
                    pakets: true
                }
            }
        },
        orderBy: {
            subCategoryName: 'asc'
        }
    });
};

export const getSubCategoryById = async (id) => {
    return await prisma.subPaketCategory.findUnique({
        where: { id: parseInt(id) },
        include: {
            paketCategory: true,
            pakets: true
        }
    });
};

export const createSubCategory = async (data) => {
    return await prisma.subPaketCategory.create({
        data: {
            subCategoryName: data.subCategoryName,
            paketCategoryId: parseInt(data.paketCategoryId)
        }
    });
};

export const updateSubCategory = async (id, data) => {
    return await prisma.subPaketCategory.update({
        where: { id: parseInt(id) },
        data: {
            subCategoryName: data.subCategoryName,
            paketCategoryId: parseInt(data.paketCategoryId)
        }
    });
};

export const deleteSubCategory = async (id) => {
    return await prisma.subPaketCategory.delete({
        where: { id: parseInt(id) }
    });
};
