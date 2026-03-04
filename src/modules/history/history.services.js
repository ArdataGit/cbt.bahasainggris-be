import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const saveReadingHistory = async (data) => {
  const { userDataId, results } = data;

  const historyPromises = results.map(async (readingResult) => {
    const { readingId, score, answers } = readingResult;

    return prisma.userReadingHistory.create({
      data: {
        userDataId,
        readingId,
        score,
        soalHistories: {
          create: answers.map((ans) => ({
            answer: ans.answer,
          })),
        },
        optionHistories: {
          create: answers.map((ans) => ({
            readingOptionId: ans.readingOptionId,
            answer: ans.answer,
          })),
        },
      },
    });
  });

  return Promise.all(historyPromises);
};

export const saveListeningHistory = async (data) => {
    const { userDataId, results } = data;
  
    const historyPromises = results.map(async (listeningResult) => {
      const { listeningId, score, answers } = listeningResult;
  
      return prisma.userListeningHistory.create({
        data: {
          userDataId,
          listeningId,
          score,
          soalHistories: {
            create: answers.map((ans) => ({
              answer: ans.answer,
            })),
          },
          optionHistories: {
            create: answers.map((ans) => ({
              listeningOptionId: ans.listeningOptionId,
              answer: ans.answer,
            })),
          },
        },
      });
    });
  
    return Promise.all(historyPromises);
};

export const getUserHistory = async (userDataId) => {
    return await prisma.dataUser.findUnique({
      where: { id: parseInt(userDataId) },
      include: {
        readingHistories: {
          include: {
            reading: {
                include: {
                    SoalReading: true
                }
            },
            soalHistories: true,
          }
        },
        listeningHistories: {
          include: {
            listening: {
                include: {
                    SoalListeing: true
                }
            },
            soalHistories: true,
            optionHistories: true,
          }
        },
        writingHistories: {
          include: {
            writing: {
                include: {
                    SoalWriting: true
                }
            },
          }
        },
        speakingHistories: {
          include: {
            speaking: {
                include: {
                    SoalSpeaking: true
                }
            },
          }
        },
      }
    });
};
