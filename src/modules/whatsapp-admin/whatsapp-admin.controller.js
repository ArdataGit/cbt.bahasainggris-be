import * as whatsappAdminService from './whatsapp-admin.services.js';

export const getAllWhatsappAdmins = async (req, res) => {
  try {
    const admins = await whatsappAdminService.getAllWhatsappAdmins();
    res.json({
      success: true,
      data: admins
    });
  } catch (error) {
    console.error('getAllWhatsappAdmins error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createWhatsappAdmin = async (req, res) => {
  try {
    const admin = await whatsappAdminService.createWhatsappAdmin(req.body);
    res.json({
      success: true,
      message: 'Whatsapp admin created successfully',
      data: admin
    });
  } catch (error) {
    console.error('createWhatsappAdmin error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateWhatsappAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await whatsappAdminService.updateWhatsappAdmin(id, req.body);
    res.json({
      success: true,
      message: 'Whatsapp admin updated successfully',
      data: admin
    });
  } catch (error) {
    console.error('updateWhatsappAdmin error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteWhatsappAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await whatsappAdminService.deleteWhatsappAdmin(id);
    res.json({
      success: true,
      message: 'Whatsapp admin deleted successfully'
    });
  } catch (error) {
    console.error('deleteWhatsappAdmin error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
