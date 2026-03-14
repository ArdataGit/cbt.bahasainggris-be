import prisma from '../../utils/prisma.js';

export const getAllWhatsappAdmins = async () => {
  return await prisma.whatsappAdmin.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const createWhatsappAdmin = async (data) => {
  return await prisma.whatsappAdmin.create({
    data: {
      number: data.number,
      message: data.message
    }
  });
};

export const updateWhatsappAdmin = async (id, data) => {
  return await prisma.whatsappAdmin.update({
    where: { id: parseInt(id) },
    data: {
      number: data.number,
      message: data.message
    }
  });
};

export const deleteWhatsappAdmin = async (id) => {
  return await prisma.whatsappAdmin.delete({
    where: { id: parseInt(id) }
  });
};
