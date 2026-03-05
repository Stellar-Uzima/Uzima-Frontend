import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useNotificationContext } from '../../context/NotificationContext';
import { NotificationItem } from './NotificationItem';
import { useNotifications } from '../../hooks/useNotifications';
import Link from 'next/link';

export const NotificationPanel: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotificationContext();
  const [open, setOpen] = useState(false);

  useNotifications();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="relative">
        <button aria-label="Notifications">
          🔔
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80 max-h-[400px] overflow-auto bg-white shadow-lg rounded-md p-2">
        <div className="flex justify-between items-center px-2 py-1 font-semibold">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-blue-500 text-sm">Mark all as read</button>
          )}
        </div>
        <div>
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-400">No notifications yet</div>
          ) : (
            notifications.slice(0, 10).map(n => (
              <NotificationItem
                key={n.id}
                notification={n}
                onClick={() => markAsRead(n.id)}
                onDelete={() => deleteNotification(n.id)}
              />
            ))
          )}
        </div>
        {notifications.length > 0 && (
          <div className="p-2 text-center">
            <Link href="/notifications" className="text-blue-500 text-sm">View all</Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};