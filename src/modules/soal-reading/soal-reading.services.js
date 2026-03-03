import prisma from '../../utils/prisma.js';

export const getAllSoalReadings = async (readingId) => {
  const where = readingId ? { readingId: parseInt(readingId) } : {};
  return await prisma.soalReading.findMany({
    where,
    include: { options: true },
    orderBy: { createdAt: 'asc' },
  });
};

export const getSoalReadingById = async (id) => {
  return await prisma.soalReading.findUnique({
    where: { id: parseInt(id) },
    include: { options: true },
  });
};

export const createSoalReading = async (data) => {
  const { readingId, question, options } = data;
  return await prisma.soalReading.create({
    data: {
      readingId: parseInt(readingId),
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

export const updateSoalReading = async (id, data) => {
  const { readingId, question, options } = data;
  
  // Update the question and readingId
  const updatedSoal = await prisma.soalReading.update({
    where: { id: parseInt(id) },
    data: {
      readingId: readingId ? parseInt(readingId) : undefined,
      question,
    }
  });

  // If options are provided, sync them
  if (options && Array.isArray(options)) {
    // Delete existing options
    await prisma.readingOption.deleteMany({
      where: { soalReadingId: parseInt(id) }
    });

    // Create new options
    await prisma.readingOption.createMany({
      data: options.map(opt => ({
        soalReadingId: parseInt(id),
        text: opt.text,
        isCorrect: opt.isCorrect
      }))
    });
  }

  return await getSoalReadingById(id);
};

export const deleteSoalReading = async (id) => {
  return await prisma.soalReading.delete({
    where: { id: parseInt(id) },
  });
};
