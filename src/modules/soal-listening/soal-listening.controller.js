import * as soalListeningService from './soal-listening.services.js';

export const getSoalByListeningId = async (req, res) => {
  try {
    const { listeningId } = req.query;
    if (!listeningId) {
      return res.status(400).json({ success: false, message: 'listeningId is required' });
    }
    const list = await soalListeningService.getAllSoalByListeningId(listeningId);
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSoalById = async (req, res) => {
  try {
    const item = await soalListeningService.getSoalById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSoal = async (req, res) => {
  try {
    const { listeningId, question, options } = req.body;
    if (!listeningId || !question || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ 
        success: false, 
        message: 'listeningId, question, and at least two options are required' 
      });
    }

    const newItem = await soalListeningService.createSoal(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSoal = async (req, res) => {
  try {
    const updated = await soalListeningService.updateSoal(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSoal = async (req, res) => {
  try {
    await soalListeningService.deleteSoal(req.params.id);
    res.status(200).json({ success: true, message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
