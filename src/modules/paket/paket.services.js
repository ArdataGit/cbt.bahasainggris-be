import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllPakets = async () => {
    return await prisma.paket.findMany({
        include: {
            _count: {
                select: {
                    readingCategories: true,
                    listeningCategories: true,
                    writingCategories: true,
                    speakingCategories: true
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
            readingCategories: { include: { readings: { select: { id: true, title: true } } } },
            listeningCategories: { include: { listenings: { select: { id: true, title: true } } } },
            writingCategories: { include: { writings: { select: { id: true, title: true } } } },
            speakingCategories: { include: { speakings: { select: { id: true, title: true } } } }
        }
    });
};

export const createPaket = async (data) => {
    const { 
        name, 
        description, 
        readingCategoryIds, 
        listeningCategoryIds, 
        writingCategoryIds, 
        speakingCategoryIds 
    } = data;

    const formatRelationalIds = (ids) => {
         if (!ids) return [];
         let parsedIds = ids;
         if (typeof ids === 'string') {
             try { parsedIds = JSON.parse(ids); } catch (e) { console.error("Error parsing ids:", e); }
         }
         if (!Array.isArray(parsedIds)) parsedIds = parsedIds ? [parsedIds] : [];
         return parsedIds.map(id => ({ id: parseInt(id) }));
    };

    return await prisma.paket.create({
        data: {
            name,
            description,
            readingCategories: { connect: formatRelationalIds(readingCategoryIds) },
            listeningCategories: { connect: formatRelationalIds(listeningCategoryIds) },
            writingCategories: { connect: formatRelationalIds(writingCategoryIds) },
            speakingCategories: { connect: formatRelationalIds(speakingCategoryIds) },
        },
        include: {
            readingCategories: true,
            listeningCategories: true,
            writingCategories: true,
            speakingCategories: true
        }
    });
};

export const updatePaket = async (id, data) => {
    const { 
        name, 
        description, 
        readingCategoryIds, 
        listeningCategoryIds, 
        writingCategoryIds, 
        speakingCategoryIds 
    } = data;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    const formatRelationalIds = (ids) => {
         if (!ids) return [];
         let parsedIds = ids;
         if (typeof ids === 'string') {
             try { parsedIds = JSON.parse(ids); } catch (e) { console.error("Error parsing ids:", e); }
         }
         if (!Array.isArray(parsedIds)) parsedIds = parsedIds ? [parsedIds] : [];
         return parsedIds.map(parsedId => ({ id: parseInt(parsedId) }));
    };

    if (readingCategoryIds !== undefined) {
         updateData.readingCategories = { set: formatRelationalIds(readingCategoryIds) };
    }
    if (listeningCategoryIds !== undefined) {
         updateData.listeningCategories = { set: formatRelationalIds(listeningCategoryIds) };
    }
    if (writingCategoryIds !== undefined) {
         updateData.writingCategories = { set: formatRelationalIds(writingCategoryIds) };
    }
    if (speakingCategoryIds !== undefined) {
         updateData.speakingCategories = { set: formatRelationalIds(speakingCategoryIds) };
    }

    return await prisma.paket.update({
        where: { id: parseInt(id) },
        data: updateData,
        include: {
            readingCategories: true,
            listeningCategories: true,
            writingCategories: true,
            speakingCategories: true
        }
    });
};

export const deletePaket = async (id) => {
    return await prisma.paket.delete({
        where: { id: parseInt(id) }
    });
};
