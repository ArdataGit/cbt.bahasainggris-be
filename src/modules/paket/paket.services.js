import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllPakets = async () => {
    return await prisma.paket.findMany({
        include: {
            _count: {
                select: {
                    readings: true,
                    listenings: true,
                    writings: true,
                    speakings: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};

export const getPaketById = async (id) => {
    return await prisma.paket.findUnique({
        where: { id: parseInt(id) },
        include: {
            readings: { select: { id: true, title: true } },
            listenings: { select: { id: true, title: true } },
            writings: { select: { id: true, title: true } },
            speakings: { select: { id: true, title: true } }
        }
    });
};

export const createPaket = async (data) => {
    const { name, description, readingIds, listeningIds, writingIds, speakingIds } = data;

    // Helper to safely format relational ids
    const formatRelationalIds = (ids) => {
         if (!ids) return [];
         let parsedIds = [];
         try {
             parsedIds = typeof ids === 'string' ? JSON.parse(ids) : ids;
             if (!Array.isArray(parsedIds)) parsedIds = [parsedIds];
         } catch (e) {
             console.error("Error parsing ids:", e);
         }
         return parsedIds.map(id => ({ id: parseInt(id) }));
    };

    const connectReadings = formatRelationalIds(readingIds);
    const connectListenings = formatRelationalIds(listeningIds);
    const connectWritings = formatRelationalIds(writingIds);
    const connectSpeakings = formatRelationalIds(speakingIds);

    return await prisma.paket.create({
        data: {
            name,
            description,
            readings: connectReadings.length > 0 ? { connect: connectReadings } : undefined,
            listenings: connectListenings.length > 0 ? { connect: connectListenings } : undefined,
            writings: connectWritings.length > 0 ? { connect: connectWritings } : undefined,
            speakings: connectSpeakings.length > 0 ? { connect: connectSpeakings } : undefined,
        },
        include: {
            readings: true,
            listenings: true,
            writings: true,
            speakings: true
        }
    });
};

export const updatePaket = async (id, data) => {
    const { name, description, readingIds, listeningIds, writingIds, speakingIds } = data;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

     // Helper to safely format relational ids for 'set'
    const formatRelationalIds = (ids) => {
         let parsedIds = [];
         try {
             parsedIds = typeof ids === 'string' ? JSON.parse(ids) : ids;
             if (!Array.isArray(parsedIds)) parsedIds = [parsedIds];
         } catch (e) {
             console.error("Error parsing ids:", e);
         }
         return parsedIds.map(parsedId => ({ id: parseInt(parsedId) }));
    };

    if (readingIds !== undefined) {
         updateData.readings = { set: formatRelationalIds(readingIds) };
    }
    if (listeningIds !== undefined) {
         updateData.listenings = { set: formatRelationalIds(listeningIds) };
    }
    if (writingIds !== undefined) {
         updateData.writings = { set: formatRelationalIds(writingIds) };
    }
    if (speakingIds !== undefined) {
         updateData.speakings = { set: formatRelationalIds(speakingIds) };
    }

    return await prisma.paket.update({
        where: { id: parseInt(id) },
        data: updateData,
        include: {
            readings: true,
            listenings: true,
            writings: true,
            speakings: true
        }
    });
};

export const deletePaket = async (id) => {
    return await prisma.paket.delete({
        where: { id: parseInt(id) }
    });
};
