import * as listeningService from './listening.services.js';

export const getAllListening = async (req, res) => {
  try {
    const list = await listeningService.getAllListening();
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getListeningById = async (req, res) => {
  try {
    const item = await listeningService.getListeningById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Listening record not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createListening = async (req, res) => {
  try {
    const { title, content } = req.body;
    let { audioUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    // If file is uploaded, use its path
    if (req.file) {
      audioUrl = `/uploads/${req.file.filename}`;
    }

    const newItem = await listeningService.createListening({ title, content, audioUrl });
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateListening = async (req, res) => {
  try {
    const { title, content } = req.body;
    let { audioUrl } = req.body;

    // If file is uploaded, update its path
    if (req.file) {
      audioUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await listeningService.updateListening(req.params.id, { title, content, audioUrl });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteListening = async (req, res) => {
  try {
    await listeningService.deleteListening(req.params.id);
    res.status(200).json({ success: true, message: 'Listening record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
