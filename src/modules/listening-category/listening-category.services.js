import prisma from '../../utils/prisma.js';

export const getAllCategories = async () => {
  const categories = await prisma.listeningCategory.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      listenings: {
        select: {
          id: true,
          _count: {
            select: { SoalListeing: true }
          }
        }
      }
    }
  });

  return categories.map(cat => ({
    ...cat,
    _count: {
      listenings: cat.listenings.length,
      questions: cat.listenings.reduce((sum, r) => sum + r._count.SoalListeing, 0)
    }
  }));
};

export const getCategoryById = async (id) => {
  return await prisma.listeningCategory.findUnique({
    where: { id: parseInt(id) },
    include: {
      listenings: true
    }
  });
};

export const createCategory = async (data) => {
  const { name, description, timer, listeningIds } = data;
  return await prisma.listeningCategory.create({
    data: {
      name,
      description,
      timer: parseInt(timer),
      listenings: listeningIds ? {
        connect: listeningIds.map(id => ({ id: parseInt(id) }))
      } : undefined
    }
  });
};

export const updateCategory = async (id, data) => {
  const { name, description, timer, listeningIds } = data;
  return await prisma.listeningCategory.update({
    where: { id: parseInt(id) },
    data: {
      name,
      description,
      timer: parseInt(timer),
      listenings: listeningIds ? {
        set: listeningIds.map(id => ({ id: parseInt(id) }))
      } : undefined
    }
  });
};

export const deleteCategory = async (id) => {
  return await prisma.listeningCategory.delete({
    where: { id: parseInt(id) }
  });
};
