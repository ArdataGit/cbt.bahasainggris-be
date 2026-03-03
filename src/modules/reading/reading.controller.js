import * as readingService from './reading.services.js';

export const getAllReadings = async (req, res) => {
  try {
    const readings = await readingService.getAllReadings();
    res.json({ success: true, data: readings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReadingById = async (req, res) => {
  try {
    const reading = await readingService.getReadingById(req.params.id);
    if (!reading) {
      return res.status(404).json({ success: false, message: 'Reading not found' });
    }
    res.json({ success: true, data: reading });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createReading = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }
    const newReading = await readingService.createReading({ title, content, categoryIds });
    res.status(201).json({ success: true, data: newReading, message: 'Reading created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReading = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const updatedReading = await readingService.updateReading(req.params.id, { title, content, categoryIds });
    res.json({ success: true, data: updatedReading, message: 'Reading updated successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
       return res.status(404).json({ success: false, message: 'Reading not found' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReading = async (req, res) => {
  try {
    await readingService.deleteReading(req.params.id);
    res.json({ success: true, message: 'Reading deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') { // Prisma error code for Record to delete not found
       return res.status(404).json({ success: false, message: 'Reading not found' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
