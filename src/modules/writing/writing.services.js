import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllWriting = async () => {
  return await prisma.writing.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { SoalWriting: true }
      },
      categories: true
    }
  });
};

export const getWritingById = async (id) => {
  return await prisma.writing.findUnique({
    where: { id: parseInt(id) },
    include: {
      SoalWriting: {
        include: {
          AnswerWriting: true
        }
      },
      categories: true
    }
  });
};

export const createWriting = async (data) => {
  const { categoryIds, ...writingData } = data;
  
  // Parse categoryIds if it's a string (from FormData)
  let parsedCategoryIds = [];
  if (categoryIds) {
    parsedCategoryIds = typeof categoryIds === 'string' ? JSON.parse(categoryIds) : categoryIds;
  }

  return await prisma.writing.create({
    data: {
      title: writingData.title,
      content: writingData.content,
      jenis: writingData.jenis,
      targetWords: writingData.targetWords ? parseInt(writingData.targetWords) : undefined,
      categories: parsedCategoryIds.length > 0 ? {
        connect: parsedCategoryIds.map(id => ({ id }))
      } : undefined
    }
  });
};

export const updateWriting = async (id, data) => {
  const { categoryIds, ...writingData } = data;
  
  // Parse categoryIds if it's a string (from FormData)
  let parsedCategoryIds = undefined;
  if (categoryIds !== undefined) {
    parsedCategoryIds = typeof categoryIds === 'string' ? JSON.parse(categoryIds) : categoryIds;
  }

  return await prisma.writing.update({
    where: { id: parseInt(id) },
    data: {
      title: writingData.title,
      content: writingData.content,
      jenis: writingData.jenis,
      targetWords: writingData.targetWords ? parseInt(writingData.targetWords) : undefined,
      categories: parsedCategoryIds !== undefined ? {
        set: parsedCategoryIds.map(id => ({ id }))
      } : undefined
    }
  });
};

export const deleteWriting = async (id) => {
  return await prisma.writing.delete({
    where: { id: parseInt(id) }
  });
};
