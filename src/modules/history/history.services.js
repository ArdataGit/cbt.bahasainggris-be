import { PrismaClient } from '@prisma/client';
import { sendScoreEmail as sendEmailUtil } from '../../utils/email.js';
import { createNotification } from '../notification/notification.services.js';
const prisma = new PrismaClient();

export const saveReadingHistory = async (data) => {
  const { userDataId, results } = data;

  // Get userId from DataUser
  const dataUser = await prisma.dataUser.findUnique({
    where: { id: parseInt(userDataId) },
    select: { userId: true }
  });

  const historyPromises = results.map(async (readingResult) => {
    const { readingId, score, answers } = readingResult;

    return prisma.userReadingHistory.create({
      data: {
        userDataId,
        readingId,
        score,
        userId: dataUser?.userId,
        soalHistories: {
          create: answers.map((ans) => ({
            answer: ans.answer,
          })),
        },
        optionHistories: {
          create: answers.filter(ans => ans.readingOptionId).map((ans) => ({
            readingOptionId: ans.readingOptionId,
            answer: ans.answer,
          })),
        },
      },
    });
  });

  const results_1 = await Promise.all(historyPromises);
  
  if (dataUser?.userId) {
      const fullDataUser = await prisma.dataUser.findUnique({
          where: { id: parseInt(userDataId) },
          include: { paket: true }
      });
      await createNotification(
          dataUser.userId,
          'Sesi Reading Selesai',
          `Anda telah menyelesaikan sesi Reading pada paket ${fullDataUser?.paket?.name || 'Soal'}.`,
          'TEST_COMPLETION'
      );
  }

  return results_1;
};

export const saveListeningHistory = async (data) => {
    const { userDataId, results } = data;
  
    // Get userId from DataUser
    const dataUser = await prisma.dataUser.findUnique({
      where: { id: parseInt(userDataId) },
      select: { userId: true }
    });

    const historyPromises = results.map(async (listeningResult) => {
      const { listeningId, score, answers } = listeningResult;
  
      return prisma.userListeningHistory.create({
        data: {
          userDataId,
          listeningId,
          score,
          userId: dataUser?.userId,
          soalHistories: {
            create: answers.map((ans) => ({
              answer: ans.answer,
            })),
          },
          optionHistories: {
            create: answers.filter(ans => ans.listeningOptionId).map((ans) => ({
              listeningOptionId: ans.listeningOptionId,
              answer: ans.answer,
            })),
          },
        },
      });
    });
  
    const results_1 = await Promise.all(historyPromises);

    if (dataUser?.userId) {
        const fullDataUser = await prisma.dataUser.findUnique({
            where: { id: parseInt(userDataId) },
            include: { paket: true }
        });
        await createNotification(
            dataUser.userId,
            'Sesi Listening Selesai',
            `Anda telah menyelesaikan sesi Listening pada paket ${fullDataUser?.paket?.name || 'Soal'}.`,
            'TEST_COMPLETION'
        );
    }

    return results_1;
};

export const saveWritingHistory = async (data) => {
    const { userDataId, results } = data;
  
    // Get userId from DataUser
    const dataUser = await prisma.dataUser.findUnique({
      where: { id: parseInt(userDataId) },
      select: { userId: true }
    });

    const historyPromises = results.map(async (writingResult) => {
      const { writingId, score, answer, answers } = writingResult;
  
      return prisma.userWritingHistory.create({
        data: {
          userDataId,
          writingId,
          score,
          userId: dataUser?.userId,
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
  
    const results_1 = await Promise.all(historyPromises);

    if (dataUser?.userId) {
        const fullDataUser = await prisma.dataUser.findUnique({
            where: { id: parseInt(userDataId) },
            include: { paket: true }
        });
        await createNotification(
            dataUser.userId,
            'Sesi Writing Selesai',
            `Anda telah menyelesaikan sesi Writing pada paket ${fullDataUser?.paket?.name || 'Soal'}. Silakan tunggu penilaian dari admin.`,
            'TEST_COMPLETION'
        );
    }

    return results_1;
};

export const saveSpeakingHistory = async (data) => {
    const { userDataId, results } = data;
  
    // Get userId from DataUser
    const dataUser = await prisma.dataUser.findUnique({
      where: { id: parseInt(userDataId) },
      select: { userId: true }
    });

    const historyPromises = results.map(async (speakingResult) => {
      const { speakingId, score, answer } = speakingResult;
  
      return prisma.userSpeakingHistory.create({
        data: {
          userDataId,
          speakingId,
          score,
          userId: dataUser?.userId,
          answer: answer || "",
        },
      });
    });
  
    const results_1 = await Promise.all(historyPromises);

    if (dataUser?.userId) {
        const fullDataUser = await prisma.dataUser.findUnique({
            where: { id: parseInt(userDataId) },
            include: { paket: true }
        });
        await createNotification(
            dataUser.userId,
            'Sesi Speaking Selesai',
            `Anda telah menyelesaikan sesi Speaking pada paket ${fullDataUser?.paket?.name || 'Soal'}. Silakan tunggu penilaian dari admin.`,
            'TEST_COMPLETION'
        );
    }

    return results_1;
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

export const sendScoreEmail = async (userDataId, scoreUrl) => {
    const user = await prisma.dataUser.findUnique({
        where: { id: parseInt(userDataId) }
    });

    if (!user) throw new Error('User not found');
    if (user.isEmailSent) return { success: true, message: 'Email already sent' };

    await sendEmailUtil(user.email, user.name, scoreUrl);

    return await prisma.dataUser.update({
        where: { id: parseInt(userDataId) },
        data: { isEmailSent: true }
    });
};

export const getPembelianHistory = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required for fetching pembelian history');
    }
    
    try {
        const parsedUserId = parseInt(userId);
        if (isNaN(parsedUserId)) {
            throw new Error(`Invalid User ID: ${userId}`);
        }
        
        return await prisma.pembelianUser.findMany({
            where: { userId: parsedUserId },
            include: {
                paketPembelian: {
                    include: {
                        pakets: {
                            select: {
                                id: true,
                                name: true,
                                isFree: true
                            }
                        }
                    }
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    } catch (error) {
        console.error('Prisma getPembelianHistory Error:', error);
        throw error;
    }
};

export const getUserHistoryMe = async (userId) => {
    return await prisma.dataUser.findMany({
      where: { userId: parseInt(userId) },
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
export const getUserHistoryMeById = async (userId, userDataId) => {
    return await prisma.dataUser.findFirst({
      where: { 
        id: parseInt(userDataId),
        userId: parseInt(userId)
      },
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
