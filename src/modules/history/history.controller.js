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

export const saveWritingHistory = async (req, res) => {
    try {
      const result = await historyServices.saveWritingHistory(req.body);
      res.status(201).json({
        success: true,
        message: 'Writing history saved successfully',
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

export const saveSpeakingHistory = async (req, res) => {
    try {
        const { userDataId, speakingIds } = req.body;
        const files = req.files || [];
        
        // Form Data appends speakingIds multiple times or once, ensure it's an array
        const ids = Array.isArray(speakingIds) ? speakingIds : [speakingIds].filter(Boolean);
        
        const results = ids.map((speakingId, index) => {
            const file = files[index];
            return {
                speakingId: parseInt(speakingId),
                score: 0,
                answer: file ? `/uploads/userspeaking/${file.filename}` : ''
            };
        });
        
        const result = await historyServices.saveSpeakingHistory({ 
            userDataId: parseInt(userDataId), 
            results 
        });
        
        res.status(201).json({
            success: true,
            message: 'Speaking history saved successfully',
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

export const getAllHistory = async (req, res) => {
    try {
      const result = await historyServices.getAllHistory();
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

export const updateWritingScore = async (req, res) => {
    try {
        const { id } = req.params;
        const { score } = req.body;
        const result = await historyServices.updateWritingScore(id, score);
        res.status(200).json({
            success: true,
            message: 'Writing score updated successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateSpeakingScore = async (req, res) => {
    try {
        const { id } = req.params;
        const { score } = req.body;
        const result = await historyServices.updateSpeakingScore(id, score);
        res.status(200).json({
            success: true,
            message: 'Speaking score updated successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const sendScoreEmail = async (req, res) => {
    try {
        const { userDataId, scoreUrl } = req.body;
        if (!userDataId || !scoreUrl) {
            return res.status(400).json({
                success: false,
                message: 'userDataId and scoreUrl are required'
            });
        }
        const result = await historyServices.sendScoreEmail(userDataId, scoreUrl);
        res.status(200).json({
            success: true,
            message: 'Score email sent successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
