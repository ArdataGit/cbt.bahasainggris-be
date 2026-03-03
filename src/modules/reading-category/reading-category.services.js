import prisma from '../../utils/prisma.js';

export const getAllCategories = async () => {
  const categories = await prisma.readingCategory.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      readings: {
        select: {
          id: true,
          _count: {
            select: { SoalReading: true }
          }
        }
      }
    }
  });

  return categories.map(cat => ({
    ...cat,
    _count: {
      readings: cat.readings.length,
      questions: cat.readings.reduce((sum, r) => sum + r._count.SoalReading, 0)
    }
  }));
};

export const getCategoryById = async (id) => {
  return await prisma.readingCategory.findUnique({
    where: { id: parseInt(id) },
    include: {
      readings: true
    }
  });
};

export const createCategory = async (data) => {
  const { name, description, timer, readingIds } = data;
  return await prisma.readingCategory.create({
    data: {
      name,
      description,
      timer: parseInt(timer),
      readings: readingIds ? {
        connect: readingIds.map(id => ({ id: parseInt(id) }))
      } : undefined
    }
  });
};

export const updateCategory = async (id, data) => {
  const { name, description, timer, readingIds } = data;
  return await prisma.readingCategory.update({
    where: { id: parseInt(id) },
    data: {
      name,
      description,
      timer: parseInt(timer),
      readings: readingIds ? {
        set: readingIds.map(id => ({ id: parseInt(id) }))
      } : undefined
    }
  });
};

export const deleteCategory = async (id) => {
  return await prisma.readingCategory.delete({
    where: { id: parseInt(id) }
  });
};
