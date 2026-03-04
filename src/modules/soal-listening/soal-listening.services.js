import prisma from '../../utils/prisma.js';

export const getAllSoalByListeningId = async (listeningId) => {
  return await prisma.soalListeing.findMany({
    where: { listeingId: parseInt(listeningId) },
    include: { options: true },
    orderBy: { createdAt: 'asc' },
  });
};

export const getSoalById = async (id) => {
  return await prisma.soalListeing.findUnique({
    where: { id: parseInt(id) },
    include: { options: true },
  });
};

export const createSoal = async (data) => {
  const { listeningId, question, options } = data;
  return await prisma.soalListeing.create({
    data: {
      listeingId: parseInt(listeningId),
      question,
      options: {
        create: options.map(opt => ({
          text: opt.text,
          isCorrect: opt.isCorrect
        }))
      }
    },
    include: { options: true }
  });
};

export const updateSoal = async (id, data) => {
  const { listeningId, question, options } = data;

  // Update the question and listeingId
  const updatedSoal = await prisma.soalListeing.update({
    where: { id: parseInt(id) },
    data: {
      listeingId: listeningId ? parseInt(listeningId) : undefined,
      question,
    }
  });

  // If options are provided, sync them
  if (options && Array.isArray(options)) {
    // Delete existing options
    await prisma.listeningOption.deleteMany({
      where: { soalListeingId: parseInt(id) }
    });

    // Create new options
    await prisma.listeningOption.createMany({
      data: options.map(opt => ({
        soalListeingId: parseInt(id),
        text: opt.text,
        isCorrect: opt.isCorrect
      }))
    });
  }

  return await getSoalById(id);
};

export const deleteSoal = async (id) => {
  return await prisma.soalListeing.delete({
    where: { id: parseInt(id) },
  });
};
