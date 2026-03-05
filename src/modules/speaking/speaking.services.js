import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllSpeaking = async () => {
    return await prisma.speaking.findMany({
        include: {
            categories: true,
            _count: {
                select: { SoalSpeaking: true }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};

export const getSpeakingById = async (id) => {
    return await prisma.speaking.findUnique({
        where: { id: parseInt(id) },
        include: {
            categories: true,
            SoalSpeaking: {
                include: {
                    AnswerSpeaking: true
                }
            }
        }
    });
};

export const createSpeaking = async (data) => {
    const { title, content, jenis, audioUrl, categoryIds } = data;
    
    // Process category relationships if provided
    let connectCategories = [];
    if (categoryIds) {
        let parsedIds = [];
        try {
            parsedIds = typeof categoryIds === 'string' ? JSON.parse(categoryIds) : categoryIds;
            if (!Array.isArray(parsedIds)) parsedIds = [parsedIds];
        } catch (e) {
            console.error("Error parsing categoryIds:", e);
        }
        
        connectCategories = parsedIds.map(catId => ({ id: parseInt(catId) }));
    }

    return await prisma.speaking.create({
        data: {
            title,
            content,
            jenis,
            audioUrl: audioUrl || null,
            categories: connectCategories.length > 0 ? {
                connect: connectCategories
            } : undefined
        },
        include: {
            categories: true
        }
    });
};

export const updateSpeaking = async (id, data) => {
    const { title, content, jenis, audioUrl, categoryIds } = data;
    
    // Prepare update data payload
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (jenis !== undefined) updateData.jenis = jenis;
    if (audioUrl !== undefined) updateData.audioUrl = audioUrl;

    // Process category relationships if provided
    if (categoryIds) {
        let parsedIds = [];
        try {
            parsedIds = typeof categoryIds === 'string' ? JSON.parse(categoryIds) : categoryIds;
            if (!Array.isArray(parsedIds)) parsedIds = [parsedIds];
        } catch (e) {
            console.error("Error parsing categoryIds:", e);
        }
        
        updateData.categories = {
            set: parsedIds.map(catId => ({ id: parseInt(catId) }))
        };
    }

    return await prisma.speaking.update({
        where: { id: parseInt(id) },
        data: updateData,
        include: {
            categories: true
        }
    });
};

export const deleteSpeaking = async (id) => {
    return await prisma.speaking.delete({
        where: { id: parseInt(id) }
    });
};
