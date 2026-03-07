import * as listeningService from './listening.services.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const { title, content, categoryIds } = req.body;
    let { audioUrl } = req.body;

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

    // If file is uploaded, use its path
    if (req.file) {
      audioUrl = `/uploads/audiomaster/${req.file.filename}`;
    }

    const newItem = await listeningService.createListening({ title, content, audioUrl, categoryIds: parsedCategoryIds });
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateListening = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    let { audioUrl } = req.body;

    let parsedCategoryIds = categoryIds;
    if (categoryIds && typeof categoryIds === 'string') {
        try {
            parsedCategoryIds = JSON.parse(categoryIds);
        } catch (e) {
            console.error("Error parsing categoryIds:", e);
        }
    }

    // If file is uploaded, update its path
    if (req.file) {
      audioUrl = `/uploads/audiomaster/${req.file.filename}`;
    }

    const updated = await listeningService.updateListening(req.params.id, { title, content, audioUrl, categoryIds: parsedCategoryIds });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteListening = async (req, res) => {
  try {
    const id = req.params.id;
    // Get the record first to get the audioUrl
    const item = await listeningService.getListeningById(id);
    
    if (item && item.audioUrl) {
      // Resolve absolute path to the file
      // audioUrl is like "/uploads/audiomaster/filename.mp3"
      // we need to map it to "backend/src/public/uploads/audiomaster/filename.mp3"
      const filePath = path.join(__dirname, '../../public', item.audioUrl);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted audio file: ${filePath}`);
      }
    }

    await listeningService.deleteListening(id);
    res.status(200).json({ success: true, message: 'Listening record and associated audio file deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
