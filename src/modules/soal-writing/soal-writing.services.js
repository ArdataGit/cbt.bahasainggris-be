import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSoalByWritingId = async (writingId) => {
  return await prisma.soalWriting.findMany({
    where: { writingId: parseInt(writingId) },
    include: {
      AnswerWriting: true
    }
  });
};

export const getSoalById = async (id) => {
  return await prisma.soalWriting.findUnique({
    where: { id: parseInt(id) },
    include: {
      AnswerWriting: true
    }
  });
};

export const createSoal = async (data) => {
  const { writingId, jenis, question, answers } = data;
  
  return await prisma.soalWriting.create({
    data: {
      writingId: parseInt(writingId),
      jenis,
      question,
      AnswerWriting: {
        create: answers.map(ans => ({
          answer: ans
        }))
      }
    },
    include: {
      AnswerWriting: true
    }
  });
};

export const updateSoal = async (id, data) => {
  const { jenis, question, answers } = data;

  // First, delete existing answers
  await prisma.answerWriting.deleteMany({
    where: { soalWritingId: parseInt(id) }
  });

  return await prisma.soalWriting.update({
    where: { id: parseInt(id) },
    data: {
      jenis,
      question,
      AnswerWriting: {
        create: answers.map(ans => ({
          answer: ans
        }))
      }
    },
    include: {
      AnswerWriting: true
    }
  });
};

export const deleteSoal = async (id) => {
  // Answers will be deleted automatically if CASCADE is set, 
  // but let's be safe or check migration. 
  // Prisma usually needs manual delete if not defined in schema.
  await prisma.answerWriting.deleteMany({
    where: { soalWritingId: parseInt(id) }
  });
  
  return await prisma.soalWriting.delete({
    where: { id: parseInt(id) }
  });
};
