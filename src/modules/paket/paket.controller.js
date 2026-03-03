import * as paketService from './paket.services.js';

export const getAllPakets = async (req, res) => {
    try {
        const pakets = await paketService.getAllPakets();
        res.status(200).json({ success: true, data: pakets });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPaketById = async (req, res) => {
    try {
        const paket = await paketService.getPaketById(req.params.id);
        if (!paket) {
            return res.status(404).json({ success: false, message: 'Paket not found' });
        }
        res.status(200).json({ success: true, data: paket });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createPaket = async (req, res) => {
    try {
        const { name, description, readingIds, listeningIds, writingIds, speakingIds } = req.body;
        
        // Helper to safely parse JSON arrays if they come as strings
        const parseArray = (field) => {
            if (field && typeof field === 'string') {
                try {
                    return JSON.parse(field);
                } catch (e) {
                    console.error(`Error parsing ${field} array from string:`, e);
                }
            }
            return field;
        };

        const parsedReadingIds = parseArray(readingIds);
        const parsedListeningIds = parseArray(listeningIds);
        const parsedWritingIds = parseArray(writingIds);
        const parsedSpeakingIds = parseArray(speakingIds);
        
        const paket = await paketService.createPaket({ 
            name, 
            description, 
            readingIds: parsedReadingIds,
            listeningIds: parsedListeningIds,
            writingIds: parsedWritingIds,
            speakingIds: parsedSpeakingIds
        });
        
        res.status(201).json({ success: true, data: paket });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updatePaket = async (req, res) => {
    try {
        const { name, description, readingIds, listeningIds, writingIds, speakingIds } = req.body;
        
         // Helper to safely parse JSON arrays if they come as strings
        const parseArray = (field) => {
            if (field !== undefined && typeof field === 'string') {
                try {
                    return JSON.parse(field);
                } catch (e) {
                    console.error(`Error parsing ${field} array from string:`, e);
                }
            }
            return field;
        };

        const parsedReadingIds = parseArray(readingIds);
        const parsedListeningIds = parseArray(listeningIds);
        const parsedWritingIds = parseArray(writingIds);
        const parsedSpeakingIds = parseArray(speakingIds);
        
        const paket = await paketService.updatePaket(req.params.id, { 
            name, 
            description, 
            readingIds: parsedReadingIds,
            listeningIds: parsedListeningIds,
            writingIds: parsedWritingIds,
            speakingIds: parsedSpeakingIds
        });
        
        res.status(200).json({ success: true, data: paket });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deletePaket = async (req, res) => {
    try {
        await paketService.deletePaket(req.params.id);
        res.status(200).json({ success: true, message: 'Paket deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
