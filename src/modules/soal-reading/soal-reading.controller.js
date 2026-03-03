import * as soalReadingService from './soal-reading.services.js';

export const getAllSoalReadings = async (req, res) => {
  try {
    const { readingId } = req.query;
    const soalReadings = await soalReadingService.getAllSoalReadings(readingId);
    res.json({ success: true, data: soalReadings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSoalReadingById = async (req, res) => {
  try {
    const soalReading = await soalReadingService.getSoalReadingById(req.params.id);
    if (!soalReading) {
      return res.status(404).json({ success: false, message: 'SoalReading not found' });
    }
    res.json({ success: true, data: soalReading });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSoalReading = async (req, res) => {
  try {
    const { readingId, question, options } = req.body;
    if (!readingId || !question || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ success: false, message: 'Reading ID, Question text, and at least two options are required' });
    }
    const newSoalReading = await soalReadingService.createSoalReading(req.body);
    res.status(201).json({ success: true, data: newSoalReading, message: 'SoalReading created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSoalReading = async (req, res) => {
  try {
    const updatedSoalReading = await soalReadingService.updateSoalReading(req.params.id, req.body);
    res.json({ success: true, data: updatedSoalReading, message: 'SoalReading updated successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
       return res.status(404).json({ success: false, message: 'SoalReading not found' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSoalReading = async (req, res) => {
  try {
    await soalReadingService.deleteSoalReading(req.params.id);
    res.json({ success: true, message: 'SoalReading deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
       return res.status(404).json({ success: false, message: 'SoalReading not found' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
