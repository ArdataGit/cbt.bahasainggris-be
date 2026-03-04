import * as historyServices from './history.services.js';

export const saveReadingHistory = async (req, res) => {
  try {
    const result = await historyServices.saveReadingHistory(req.body);
    res.status(201).json({
      success: true,
      message: 'Reading history saved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const saveListeningHistory = async (req, res) => {
    try {
      const result = await historyServices.saveListeningHistory(req.body);
      res.status(201).json({
        success: true,
        message: 'Listening history saved successfully',
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

export const getUserHistory = async (req, res) => {
    try {
      const { userDataId } = req.query;
      if (!userDataId) {
        return res.status(400).json({
          success: false,
          message: 'userDataId is required'
        });
      }
      const result = await historyServices.getUserHistory(userDataId);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};
