import * as speakingService from './speaking.services.js';

export const getAllSpeaking = async (req, res) => {
    try {
        const speaking = await speakingService.getAllSpeaking();
        res.status(200).json({ success: true, data: speaking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSpeakingById = async (req, res) => {
    try {
        const speaking = await speakingService.getSpeakingById(req.params.id);
        if (!speaking) {
            return res.status(404).json({ success: false, message: 'Speaking material not found' });
        }
        res.status(200).json({ success: true, data: speaking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createSpeaking = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        const audioUrl = req.file ? `/uploads/${req.file.filename}` : null;
        
        let parsedCategoryIds = categoryIds;
        if (categoryIds && typeof categoryIds === 'string') {
            try {
                parsedCategoryIds = JSON.parse(categoryIds);
            } catch (e) {
                console.error("Error parsing categoryIds array from string:", e);
            }
        }
        
        const speaking = await speakingService.createSpeaking({ 
            title, 
            content, 
            audioUrl,
            categoryIds: parsedCategoryIds 
        });
        
        res.status(201).json({ success: true, data: speaking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateSpeaking = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        
        if (req.file) {
            updateData.audioUrl = `/uploads/${req.file.filename}`;
        }
        
        if (categoryIds !== undefined) {
             let parsedCategoryIds = categoryIds;
            if (typeof categoryIds === 'string') {
                try {
                    parsedCategoryIds = JSON.parse(categoryIds);
                } catch (e) {
                    console.error("Error parsing categoryIds array from string:", e);
                }
            }
            updateData.categoryIds = parsedCategoryIds;
        }

        const speaking = await speakingService.updateSpeaking(req.params.id, updateData);
        res.status(200).json({ success: true, data: speaking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteSpeaking = async (req, res) => {
    try {
        await speakingService.deleteSpeaking(req.params.id);
        res.status(200).json({ success: true, message: 'Speaking material deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
