import prisma from '../../utils/prisma.js';

/**
 * Create a new notification for a user
 */
export const createNotification = async (userId, title, message, type) => {
    return await prisma.notification.create({
        data: {
            userId: parseInt(userId),
            title,
            message,
            type
        }
    });
};

/**
 * Get all notifications for a user
 */
export const getUserNotifications = async (userId) => {
    return await prisma.notification.findMany({
        where: { userId: parseInt(userId) },
        orderBy: { createdAt: 'desc' }
    });
};

/**
 * Get unread notification count
 */
export const getUnreadCount = async (userId) => {
    return await prisma.notification.count({
        where: { 
            userId: parseInt(userId),
            isRead: false
        }
    });
};

/**
 * Mark a notification as read
 */
export const markAsRead = async (id, userId) => {
    return await prisma.notification.updateMany({
        where: { 
            id: parseInt(id),
            userId: parseInt(userId)
        },
        data: { isRead: true }
    });
};

/**
 * Mark all notifications as read for a user
 */
export const markAllAsRead = async (userId) => {
    return await prisma.notification.updateMany({
        where: { userId: parseInt(userId) },
        data: { isRead: true }
    });
};

/**
 * Create a notification for all users
 */
export const broadcastNotification = async (title, message, type) => {
    const users = await prisma.user.findMany({ select: { id: true } });
    
    const notifications = users.map(user => ({
        userId: user.id,
        title,
        message,
        type: type || 'INFO'
    }));

    return await prisma.notification.createMany({
        data: notifications
    });
};
