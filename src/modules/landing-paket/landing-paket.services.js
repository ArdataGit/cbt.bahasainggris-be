import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllLandingPakets = async () => {
    return await prisma.landingPaket.findMany({
        include: {
            paket: {
                include: {
                    paketCategory: true,
                    subPaketCategory: true,
                    _count: {
                      select: {
                        readingCategories: true,
                        listeningCategories: true,
                        writingCategories: true,
                        speakingCategories: true
                      }
                    }
                }
            }
        },
        orderBy: {
            order: 'asc'
        }
    });
};

export const addLandingPaket = async (paketId) => {
    return await prisma.landingPaket.create({
        data: {
          paketId: parseInt(paketId)
        },
        include: {
          paket: true
        }
    });
};

export const updateLandingPaketOrder = async (id, order) => {
    return await prisma.landingPaket.update({
        where: { id: parseInt(id) },
        data: { order: parseInt(order) }
    });
};

export const deleteLandingPaket = async (id) => {
    return await prisma.landingPaket.delete({
        where: { id: parseInt(id) }
    });
};
