import * as notificationService from './notification.services.js';

export const getNotifications = async (req, res) => {
    try {
        console.log('getNotifications Request User:', JSON.stringify(req.user));
        const notifications = await notificationService.getUserNotifications(req.user.id);
        const unreadCount = await notificationService.getUnreadCount(req.user.id);
        res.status(200).json({
            success: true,
            data: {
                notifications,
                unreadCount
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const markRead = async (req, res) => {
    try {
        const { id } = req.params;
        await notificationService.markAsRead(id, req.user.id);
        res.status(200).json({ success: true, message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const markAllRead = async (req, res) => {
    try {
        await notificationService.markAllAsRead(req.user.id);
        res.status(200).json({ success: true, message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const sendBroadcast = async (req, res) => {
    try {
        const { title, message, type } = req.body;
        const result = await notificationService.broadcastNotification(title, message, type || 'ADMIN');
        res.status(201).json({ 
            success: true, 
            message: `Notifikasi dikirim ke ${result.count} user`,
            data: result 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
