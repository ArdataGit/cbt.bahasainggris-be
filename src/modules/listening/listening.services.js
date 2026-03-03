import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllListening = async () => {
  return await prisma.listening.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      categories: true,
      _count: {
        select: { SoalListeing: true }
      }
    }
  });
};

export const getListeningById = async (id) => {
  return await prisma.listening.findUnique({
    where: { id: parseInt(id) },
    include: { 
      SoalListeing: true,
      categories: true
    },
  });
};

export const createListening = async (data) => {
  const { title, content, audioUrl, categoryIds } = data;
  return await prisma.listening.create({
    data: {
      title,
      content,
      audioUrl,
      categories: {
        connect: categoryIds ? categoryIds.map(id => ({ id: parseInt(id) })) : []
      }
    },
    include: { categories: true }
  });
};

export const updateListening = async (id, data) => {
  const { title, content, audioUrl, categoryIds } = data;
  return await prisma.listening.update({
    where: { id: parseInt(id) },
    data: {
      title,
      content,
      audioUrl,
      categories: {
        set: categoryIds ? categoryIds.map(id => ({ id: parseInt(id) })) : []
      }
    },
    include: { categories: true }
  });
};

export const deleteListening = async (id) => {
  return await prisma.listening.delete({
    where: { id: parseInt(id) },
  });
};
