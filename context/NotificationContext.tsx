// /frontend-v2/context/NotificationContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Notification } from '../components/notifications/types';
import { useNotificationPreferences } from '../hooks/useNotificationPreferences';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Notification) => void;
  deleteNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { isCategoryEnabled } = useNotificationPreferences();

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('notifications');
    if (stored) setNotifications(JSON.parse(stored));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications.slice(0, 50)));
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notification: Notification) => {
    // Check if category is enabled in user preferences
    if (notification.category && !isCategoryEnabled(notification.category)) {
      return;
    }
    setNotifications(prev => [notification, ...prev.slice(0, 49)]);
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification, deleteNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotificationContext must be used within NotificationProvider');
  return context;
};