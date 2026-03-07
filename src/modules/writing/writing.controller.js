import * as writingService from './writing.services.js';

export const getAllWriting = async (req, res) => {
  try {
    const writing = await writingService.getAllWriting();
    res.status(200).json({ success: true, data: writing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWritingById = async (req, res) => {
  try {
    const item = await writingService.getWritingById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Writing material not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createWriting = async (req, res) => {
  try {
    const { title, content, jenis, targetWords, categoryIds } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    let parsedCategoryIds = categoryIds;
    if (categoryIds && typeof categoryIds === 'string') {
        try {
            parsedCategoryIds = JSON.parse(categoryIds);
        } catch (e) {
            console.error("Error parsing categoryIds:", e);
        }
    }

    const newItem = await writingService.createWriting({ title, content, jenis, targetWords, categoryIds: parsedCategoryIds });
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateWriting = async (req, res) => {
  try {
    const { title, content, jenis, targetWords, categoryIds } = req.body;

    let parsedCategoryIds = categoryIds;
    if (categoryIds && typeof categoryIds === 'string') {
        try {
            parsedCategoryIds = JSON.parse(categoryIds);
        } catch (e) {
            console.error("Error parsing categoryIds:", e);
        }
    }

    const updated = await writingService.updateWriting(req.params.id, { title, content, jenis, targetWords, categoryIds: parsedCategoryIds });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteWriting = async (req, res) => {
  try {
    await writingService.deleteWriting(req.params.id);
    res.status(200).json({ success: true, message: 'Writing material deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
