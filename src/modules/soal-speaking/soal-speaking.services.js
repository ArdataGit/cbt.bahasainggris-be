import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllSoalSpeaking = async (speakingId) => {
    return await prisma.soalSpeaking.findMany({
        where: { speakingId: parseInt(speakingId) },
        include: {
            AnswerSpeaking: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
};

export const getSoalSpeakingById = async (id) => {
    return await prisma.soalSpeaking.findUnique({
        where: { id: parseInt(id) },
        include: {
            AnswerSpeaking: true
        }
    });
};

export const createSoalSpeaking = async (data) => {
    const { speakingId, jenis, question, AnswerSpeaking } = data;
    
    return await prisma.soalSpeaking.create({
        data: {
            speakingId: parseInt(speakingId),
            jenis,
            question,
            AnswerSpeaking: AnswerSpeaking ? {
                create: AnswerSpeaking.map(ans => ({ answer: ans.answer }))
            } : undefined
        },
        include: {
            AnswerSpeaking: true
        }
    });
};

export const updateSoalSpeaking = async (id, data) => {
    const { jenis, question, AnswerSpeaking } = data;

    // Use a transaction to safely clear old answers and set new ones for SHORT_ANSWER
    return await prisma.$transaction(async (prisma) => {
        const updatedSoal = await prisma.soalSpeaking.update({
            where: { id: parseInt(id) },
            data: {
                jenis,
                question
            }
        });

        // Always delete existing answers when updating to reset the state
        await prisma.answerSpeaking.deleteMany({
            where: { soalSpeakingId: parseInt(id) }
        });

        // Re-create answers if provided (usually only for SHORT_ANSWER)
        if (AnswerSpeaking && AnswerSpeaking.length > 0) {
            await prisma.answerSpeaking.createMany({
                data: AnswerSpeaking.map(ans => ({
                    soalSpeakingId: parseInt(id),
                    answer: ans.answer
                }))
            });
        }

        return await prisma.soalSpeaking.findUnique({
            where: { id: parseInt(id) },
            include: {
                AnswerSpeaking: true
            }
        });
    });
};

export const deleteSoalSpeaking = async (id) => {
     // Prisma handles cascading deletes for AnswerSpeaking due to onDelete: Cascade in schema
    return await prisma.soalSpeaking.delete({
        where: { id: parseInt(id) }
    });
};
