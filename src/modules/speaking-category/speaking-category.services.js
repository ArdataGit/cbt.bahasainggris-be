import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllCategories = async () => {
    return await prisma.speakingCategory.findMany({
        include: {
            speakings: {
                select: { id: true, title: true }
            },
            _count: {
                select: { speakings: true }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};

export const getCategoryById = async (id) => {
    return await prisma.speakingCategory.findUnique({
        where: { id: parseInt(id) },
        include: {
            speakings: true
        }
    });
};

export const createCategory = async (data) => {
    const { name, description, timer, speakingIds } = data;
    
    // Process related speakings if provided
    let connectSpeakings = [];
    if (speakingIds && Array.isArray(speakingIds)) {
        connectSpeakings = speakingIds.map(id => ({ id: parseInt(id) }));
    } else if (speakingIds) {
        connectSpeakings = [{ id: parseInt(speakingIds) }];
    }

    return await prisma.speakingCategory.create({
        data: {
            name,
            description,
            timer: parseInt(timer),
            speakings: connectSpeakings.length > 0 ? {
                connect: connectSpeakings
            } : undefined
        },
        include: {
            speakings: true
        }
    });
};

export const updateCategory = async (id, data) => {
    const { name, description, timer, speakingIds } = data;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (timer !== undefined) updateData.timer = parseInt(timer);

    if (speakingIds !== undefined) {
        let setSpeakings = [];
        if (Array.isArray(speakingIds)) {
            setSpeakings = speakingIds.map(sId => ({ id: parseInt(sId) }));
        } else if (speakingIds) {
            setSpeakings = [{ id: parseInt(speakingIds) }];
        }
        
        updateData.speakings = {
            set: setSpeakings
        };
    }

    return await prisma.speakingCategory.update({
        where: { id: parseInt(id) },
        data: updateData,
        include: {
            speakings: true
        }
    });
};

export const deleteCategory = async (id) => {
    return await prisma.speakingCategory.delete({
        where: { id: parseInt(id) }
    });
};

export const getSpeakingByCategory = async (id) => {
    const category = await prisma.speakingCategory.findUnique({
        where: { id: parseInt(id) },
        include: {
            speakings: {
                include: {
                    _count: {
                        select: { SoalSpeaking: true }
                    }
                }
            }
        }
    });

    return category ? category.speakings : [];
};
