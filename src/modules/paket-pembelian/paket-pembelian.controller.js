import * as paketPembelianService from './paket-pembelian.services.js';

export const getAllPaketPembelians = async (req, res) => {
    try {
        const pakets = await paketPembelianService.getAllPaketPembelians();
        res.status(200).json({ success: true, data: pakets });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPaketPembelianById = async (req, res) => {
    try {
        const paket = await paketPembelianService.getPaketPembelianById(req.params.id);
        if (!paket) {
            return res.status(404).json({ success: false, message: 'Paket Pembelian not found' });
        }
        res.status(200).json({ success: true, data: paket });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createPaketPembelian = async (req, res) => {
    try {
        const paket = await paketPembelianService.createPaketPembelian(req.body);
        res.status(201).json({ success: true, data: paket });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updatePaketPembelian = async (req, res) => {
    try {
        const paket = await paketPembelianService.updatePaketPembelian(req.params.id, req.body);
        res.status(200).json({ success: true, data: paket });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deletePaketPembelian = async (req, res) => {
    try {
        await paketPembelianService.deletePaketPembelian(req.params.id);
        res.status(200).json({ success: true, message: 'Paket Pembelian deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllUserPembelians = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const results = await paketPembelianService.getAllUserPembelians(userId, role);
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateUserPembelianStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const result = await paketPembelianService.updateUserPembelianStatus(req.params.id, status);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
