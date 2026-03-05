import * as dataUserService from './data-user.services.js';

export const createDataUser = async (req, res) => {
    try {
        const { fullName, email, phone, paketId } = req.body;
        
        if (!fullName || !email) {
            return res.status(400).json({ success: false, message: 'Name and email are required' });
        }

        const dataUser = await dataUserService.createDataUser({ 
            name: fullName, 
            email, 
            phone,
            paketId
        });
        
        res.status(201).json({ success: true, data: dataUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllDataUsers = async (req, res) => {
    try {
        const dataUsers = await dataUserService.getAllDataUsers();
        res.status(200).json({ success: true, data: dataUsers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getDataUserById = async (req, res) => {
    try {
        const dataUser = await dataUserService.getDataUserById(req.params.id);
        if (!dataUser) {
            return res.status(404).json({ success: false, message: 'DataUser not found' });
        }
        res.status(200).json({ success: true, data: dataUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
