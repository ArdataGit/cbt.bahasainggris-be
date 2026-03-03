import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategory = async (data) => {
  const { writingIds, ...categoryData } = data;
  
  return prisma.writingCategory.create({
    data: {
      ...categoryData,
      writings: writingIds ? {
        connect: writingIds.map(id => ({ id }))
      } : undefined
    },
    include: {
      writings: true
    }
  });
};

export const getAllCategories = async () => {
  const categories = await prisma.writingCategory.findMany({
    include: {
      writings: {
        include: {
          _count: {
            select: { SoalWriting: true } // Assuming 'SoalWriting' is the relation name
          }
        }
      },
      _count: {
        select: { writings: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Calculate total questions dynamically
  return categories.map(category => {
    const totalQuestions = category.writings.reduce((sum, writing) => {
      return sum + (writing._count?.SoalWriting || 0);
    }, 0);

    return {
      ...category,
      _count: {
        ...category._count,
        questions: totalQuestions
      }
    };
  });
};

export const getCategoryById = async (id) => {
  const category = await prisma.writingCategory.findUnique({
    where: { id: parseInt(id) },
    include: {
      writings: {
        include: {
          _count: {
            select: { SoalWriting: true }
          }
        }
      },
      _count: {
        select: { writings: true }
      }
    }
  });

  if (category) {
    const totalQuestions = category.writings.reduce((sum, writing) => {
      return sum + (writing._count?.SoalWriting || 0);
    }, 0);
    
    category._count.questions = totalQuestions;
  }

  return category;
};

export const updateCategory = async (id, data) => {
  const { writingIds, ...categoryData } = data;

  return prisma.writingCategory.update({
    where: { id: parseInt(id) },
    data: {
      ...categoryData,
      writings: writingIds ? {
        set: writingIds.map(id => ({ id }))
      } : undefined
    },
    include: {
      writings: true
    }
  });
};

export const deleteCategory = async (id) => {
  return prisma.writingCategory.delete({
    where: { id: parseInt(id) }
  });
};
