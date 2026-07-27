// /frontend-v2/context/NotificationContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Notification } from '../components/notifications/types';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  /**
   * True once stored notifications have been read back from localStorage.
   * Producers that add notifications on mount (e.g. the task-reminder
   * fallback) must wait for this, otherwise hydration overwrites them.
   */
  hydrated: boolean;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Notification) => void;
  deleteNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('notifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setNotifications(parsed);
      }
    } catch {
      // Corrupt or unavailable storage — start from an empty list.
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage (never before hydration, which would clobber it)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('notifications', JSON.stringify(notifications.slice(0, 50)));
    } catch {
      // Storage unavailable or over quota — fail silently.
    }
  }, [hydrated, notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notification: Notification) => {
    setNotifications(prev => {
      // Ids are deterministic for scheduled reminders, so ignoring duplicates
      // keeps a re-mount or a second tab from adding the same reminder twice.
      if (prev.some(n => n.id === notification.id)) return prev;
      return [notification, ...prev.slice(0, 49)];
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, hydrated, markAsRead, markAllAsRead, addNotification, deleteNotification }}
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