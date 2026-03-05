import React from 'react';
import { Notification } from './types';

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
  onDelete: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
  onDelete,
}) => {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'xlm_earned':
        return '💰';
      case 'new_comment':
        return '💬';
      case 'verification':
        return '✅';
      case 'donation':
        return '🎁';
      case 'rank_up':
        return '⭐';
      case 'system':
        return '🔔';
      default:
        return '📢';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
        !notification.read ? 'bg-blue-50' : ''
      }`}
      onClick={onClick}
    >
      <div className="text-2xl flex-shrink-0">{getIcon(notification.type)}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-sm text-gray-900 truncate">
            {notification.title}
          </h4>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-gray-400 hover:text-red-500 flex-shrink-0"
            aria-label="Delete notification"
          >
            ×
          </button>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{notification.description}</p>
        <span className="text-xs text-gray-400 mt-1 block">
          {formatTimestamp(notification.timestamp)}
        </span>
      </div>
      {!notification.read && (
        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
      )}
    </div>
  );
};
