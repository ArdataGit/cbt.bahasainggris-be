import prisma from '../../utils/prisma.js';

export const getSettings = async () => {
  let settings = await prisma.setting.findFirst();
  
  if (!settings) {
    // Create default settings if none exist
    settings = await prisma.setting.create({
      data: {
        logoUrl: null,
        testInstructions: `<ul>
  <li>Pastikan Anda memiliki waktu yang cukup untuk menyelesaikan seluruh tes sebelum memulai. Setelah Anda memulai tes, Anda tidak dapat memberhentikan waktu atau memulai ulang tes. Anda dapat beristirahat sejenak di antara bagian tes jika diperlukan. Istirahat ini juga dibatasi waktunya.</li>
  <li>Anda hanya dapat mengikuti tes satu kali. Anda tidak dapat mengulang tes untuk berlatih.</li>
  <li>Anda tidak akan kehilangan poin untuk jawaban yang salah atau melewatkan pertanyaan yang tidak Anda pahami.</li>
</ul>`,
        readingInstructions: `<p>The questions in this test may get harder or easier to adapt to your level. Use the progress bar so that you have time to answer all the questions</p><p>You will not lose points for incorrect answers.</p><p>Once you submit a task, you cannot go back.</p>`,
        listeningInstructions: `<p>Listen carefully as some recordings may only play a limited number of times.</p><p>Make sure you can hear the audio clearly throughout the test.</p><p>Once you submit a task, you cannot go back.</p>`,
        writingInstructions: `<p>You will see 4 prompts in this section. The prompts are not all the same difficulty. Pace yourself so that you have time to answer all the prompts.</p><p>You can use any standard English spelling (UK, US, etc.).</p><p>You do not have to answer the prompts truthfully. If you find a question too personal or don't have any relevant experience, feel free to make up a fictitious answer.</p><p>Your score will include the complexity of vocabulary and linguistic structures used. Submitting shorter answers than the target length or using simple language may result in a lower score.</p>`,
        speakingInstructions: `<p>On the next screen, you will be asked to authorize your microphone. We need access to your microphone to record your answers.</p><p>Make sure you are in a quiet place so your recordings are clear. Use the practice question to check your recording levels.</p><p>Once you submit a recording, you cannot go back.</p>`
      }
    });
  }
  
  return settings;
};

export const updateSettings = async (data) => {
  const currentSettings = await getSettings();
  
  return await prisma.setting.update({
    where: { id: currentSettings.id },
    data: {
      logoUrl: data.logoUrl !== undefined ? data.logoUrl : currentSettings.logoUrl,
      testInstructions: data.testInstructions !== undefined ? data.testInstructions : currentSettings.testInstructions,
      readingInstructions: data.readingInstructions !== undefined ? data.readingInstructions : currentSettings.readingInstructions,
      listeningInstructions: data.listeningInstructions !== undefined ? data.listeningInstructions : currentSettings.listeningInstructions,
      writingInstructions: data.writingInstructions !== undefined ? data.writingInstructions : currentSettings.writingInstructions,
      speakingInstructions: data.speakingInstructions !== undefined ? data.speakingInstructions : currentSettings.speakingInstructions
    }
  });
};
