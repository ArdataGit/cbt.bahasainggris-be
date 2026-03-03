import * as categoryService from './speaking-category.services.js';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Speaking Category not found' });
        }
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name, description, timer, speakingIds } = req.body;
        
        // Handle potential stringified arrays from FormData
        let parsedSpeakingIds = speakingIds;
         if (speakingIds && typeof speakingIds === 'string') {
            try {
                parsedSpeakingIds = JSON.parse(speakingIds);
            } catch (e) {
                console.error("Error parsing speakingIds array from string:", e);
            }
        }
        
        const category = await categoryService.createCategory({ 
            name, 
            description, 
            timer,
            speakingIds: parsedSpeakingIds 
        });
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { name, description, timer, speakingIds } = req.body;
        
         // Handle potential stringified arrays from FormData
        let parsedSpeakingIds = speakingIds;
         if (speakingIds && typeof speakingIds === 'string') {
            try {
                parsedSpeakingIds = JSON.parse(speakingIds);
            } catch (e) {
                console.error("Error parsing speakingIds array from string:", e);
            }
        }
        
        const category = await categoryService.updateCategory(req.params.id, { 
            name, 
            description, 
            timer,
            speakingIds: parsedSpeakingIds 
        });
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.status(200).json({ success: true, message: 'Speaking Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSpeakingByCategory = async (req, res) => {
     try {
        const speakings = await categoryService.getSpeakingByCategory(req.params.id);
        res.status(200).json({ success: true, data: speakings });
    } catch (error) {
         res.status(500).json({ success: false, message: error.message });
    }
};
