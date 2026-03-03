import * as soalSpeakingService from './soal-speaking.services.js';

export const getAllSoalSpeaking = async (req, res) => {
    try {
        const { speakingId } = req.query;
        if (!speakingId) {
            return res.status(400).json({ success: false, message: 'speakingId is required' });
        }
        const soal = await soalSpeakingService.getAllSoalSpeaking(speakingId);
        res.status(200).json({ success: true, data: soal });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSoalSpeakingById = async (req, res) => {
    try {
        const soal = await soalSpeakingService.getSoalSpeakingById(req.params.id);
        if (!soal) {
            return res.status(404).json({ success: false, message: 'Speaking Question not found' });
        }
        res.status(200).json({ success: true, data: soal });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createSoalSpeaking = async (req, res) => {
    try {
        const { speakingId, jenis, question, AnswerSpeaking } = req.body;
        
        let parsedAnswers = AnswerSpeaking;
        
        // Handle answers, similar to the writing module where AnswerWriting isn't stringified in json requests but could be if it came from FormData (though usually it's json)
        if (typeof AnswerSpeaking === 'string') {
            try {
                parsedAnswers = JSON.parse(AnswerSpeaking);
            } catch (error) {
                 console.error("Error parsing AnswerSpeaking array from string:", error);
                 return res.status(400).json({ success: false, message: 'Invalid format for AnswerSpeaking' });
            }
        }

        const newSoal = await soalSpeakingService.createSoalSpeaking({
            speakingId,
            jenis,
            question,
            AnswerSpeaking: parsedAnswers
        });
        
        res.status(201).json({ success: true, data: newSoal });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateSoalSpeaking = async (req, res) => {
    try {
        const { jenis, question, AnswerSpeaking } = req.body;

         let parsedAnswers = AnswerSpeaking;
        if (typeof AnswerSpeaking === 'string') {
            try {
                parsedAnswers = JSON.parse(AnswerSpeaking);
            } catch (error) {
                 console.error("Error parsing AnswerSpeaking array from string:", error);
                 return res.status(400).json({ success: false, message: 'Invalid format for AnswerSpeaking' });
            }
        }
        
        const updatedSoal = await soalSpeakingService.updateSoalSpeaking(req.params.id, {
            jenis,
            question,
            AnswerSpeaking: parsedAnswers
        });
        
        res.status(200).json({ success: true, data: updatedSoal });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteSoalSpeaking = async (req, res) => {
    try {
        await soalSpeakingService.deleteSoalSpeaking(req.params.id);
        res.status(200).json({ success: true, message: 'Speaking Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
