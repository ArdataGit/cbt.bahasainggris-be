import * as soalWritingService from './soal-writing.services.js';

export const getSoalByWritingId = async (req, res) => {
  try {
    const { writingId } = req.query;
    if (!writingId) {
      return res.status(400).json({ success: false, message: 'Writing ID is required' });
    }
    const questions = await soalWritingService.getSoalByWritingId(writingId);
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSoalById = async (req, res) => {
  try {
    const question = await soalWritingService.getSoalById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.status(200).json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSoal = async (req, res) => {
  try {
    const { writingId, jenis, question, answers } = req.body;
    if (!writingId || !jenis || !question || !answers) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const newQuestion = await soalWritingService.createSoal({ writingId, jenis, question, answers });
    res.status(201).json({ success: true, data: newQuestion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSoal = async (req, res) => {
  try {
    const { jenis, question, answers } = req.body;
    const updated = await soalWritingService.updateSoal(req.params.id, { jenis, question, answers });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSoal = async (req, res) => {
  try {
    await soalWritingService.deleteSoal(req.params.id);
    res.status(200).json({ success: true, message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
