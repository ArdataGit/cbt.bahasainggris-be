import prisma from '../../utils/prisma.js';

export const getAllReadings = async () => {
  return await prisma.reading.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      categories: true,
      _count: {
        select: { SoalReading: true }
      }
    }
  });
};

export const getReadingById = async (id) => {
  return await prisma.reading.findUnique({
    where: { id: parseInt(id) },
    include: { 
      SoalReading: true,
      categories: true
    },
  });
};

export const createReading = async (data) => {
  const { title, content, categoryIds } = data;
  return await prisma.reading.create({
    data: {
      title,
      content,
      categories: {
        connect: categoryIds ? categoryIds.map(id => ({ id: parseInt(id) })) : []
      }
    },
    include: { categories: true }
  });
};

export const updateReading = async (id, data) => {
  const { title, content, categoryIds } = data;
  return await prisma.reading.update({
    where: { id: parseInt(id) },
    data: {
      title,
      content,
      categories: {
        set: categoryIds ? categoryIds.map(id => ({ id: parseInt(id) })) : []
      }
    },
    include: { categories: true }
  });
};

export const deleteReading = async (id) => {
  return await prisma.reading.delete({
    where: { id: parseInt(id) },
  });
};
