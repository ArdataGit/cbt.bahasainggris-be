import * as settingService from './setting.services.js';

export const getSettings = async (req, res) => {
  try {
    const settings = await settingService.getSettings();
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('getSettings error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const settings = await settingService.updateSettings(req.body);
    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    console.error('updateSettings error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
