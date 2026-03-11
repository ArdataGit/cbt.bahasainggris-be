import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllBanners = async () => {
  return await prisma.banner.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const createBanner = async (data) => {
  return await prisma.banner.create({
    data: {
      imageUrl: data.imageUrl
    }
  });
};

export const deleteBanner = async (id) => {
  return await prisma.banner.delete({
    where: { id: parseInt(id) }
  });
};
