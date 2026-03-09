import * as subCategoryService from './sub-paket-category.services.js';

export const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await subCategoryService.getAllSubCategories();
        res.status(200).json({ success: true, data: subCategories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSubCategoryById = async (req, res) => {
    try {
        const subCategory = await subCategoryService.getSubCategoryById(req.params.id);
        if (!subCategory) return res.status(404).json({ success: false, message: 'Sub Category not found' });
        res.status(200).json({ success: true, data: subCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createSubCategory = async (req, res) => {
    try {
        const subCategory = await subCategoryService.createSubCategory(req.body);
        res.status(201).json({ success: true, data: subCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateSubCategory = async (req, res) => {
    try {
        const subCategory = await subCategoryService.updateSubCategory(req.params.id, req.body);
        res.status(200).json({ success: true, data: subCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteSubCategory = async (req, res) => {
    try {
        await subCategoryService.deleteSubCategory(req.params.id);
        res.status(200).json({ success: true, message: 'Sub Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
