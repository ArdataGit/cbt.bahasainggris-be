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

export const saveWritingHistory = async (data) => {
    const { userDataId, results } = data;
  
    const historyPromises = results.map(async (writingResult) => {
      const { writingId, score, answer, answers } = writingResult;
  
      return prisma.userWritingHistory.create({
        data: {
          userDataId,
          writingId,
          score,
          answer: answer || "",
          soalHistories: answers && answers.length > 0 ? {
            create: answers.map((ans) => ({
              soalWritingId: ans.soalWritingId,
              answer: ans.answer,
            })),
          } : undefined,
        },
      });
    });
  
    return Promise.all(historyPromises);
};

export const saveSpeakingHistory = async (data) => {
    const { userDataId, results } = data;
  
    const historyPromises = results.map(async (speakingResult) => {
      const { speakingId, score, answer } = speakingResult;
  
      return prisma.userSpeakingHistory.create({
        data: {
          userDataId,
          speakingId,
          score,
          answer: answer || "",
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
                    SoalReading: {
                        include: {
                            options: true
                        }
                    }
                }
            },
            soalHistories: true,
          }
        },
        listeningHistories: {
          include: {
            listening: {
                include: {
                    SoalListeing: {
                        include: {
                            options: true
                        }
                    }
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
                    SoalWriting: {
                        include: {
                            AnswerWriting: true
                        }
                    }
                }
            },
            soalHistories: true,
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

export const getAllHistory = async () => {
    return await prisma.dataUser.findMany({
      include: {
        paket: true,
        readingHistories: {
          include: {
            reading: true,
          }
        },
        listeningHistories: {
          include: {
            listening: true,
          }
        },
        writingHistories: {
          include: {
            writing: true,
          }
        },
        speakingHistories: {
          include: {
            speaking: true,
          }
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
};

export const updateWritingScore = async (id, score) => {
    return await prisma.userWritingHistory.update({
        where: { id: parseInt(id) },
        data: { score: parseInt(score) }
    });
};

export const updateSpeakingScore = async (id, score) => {
    return await prisma.userSpeakingHistory.update({
        where: { id: parseInt(id) },
        data: { score: parseInt(score) }
    });
};
