import * as landingPaketService from './landing-paket.services.js';

export const getAllLandingPakets = async (req, res) => {
    try {
        const pakets = await landingPaketService.getAllLandingPakets();
        res.status(200).json({ success: true, data: pakets });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addLandingPaket = async (req, res) => {
    try {
        const { paketId } = req.body;
        const landingPaket = await landingPaketService.addLandingPaket(paketId);
        res.status(201).json({ success: true, data: landingPaket });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateLandingPaketOrder = async (req, res) => {
    try {
        const { order } = req.body;
        const landingPaket = await landingPaketService.updateLandingPaketOrder(req.params.id, order);
        res.status(200).json({ success: true, data: landingPaket });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteLandingPaket = async (req, res) => {
    try {
        await landingPaketService.deleteLandingPaket(req.params.id);
        res.status(200).json({ success: true, message: 'Landing paket removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
