export type NotificationType =
  | "xlm_earned"
  | "new_comment"
  | "verification"
  | "donation"
  | "rank_up"
  | "system";

export type NotificationCategory =
  | "task"
  | "streak"
  | "badge"
  | "appointment"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  category?: NotificationCategory; // Added category field
  title: string;
  description: string;
  timestamp: number; // Unix timestamp
  read: boolean;
}

export interface NotificationPreferences {
  categories: {
    task: boolean;
    streak: boolean;
    badge: boolean;
    appointment: boolean;
  };
  channels: {
    inApp: boolean;
    push: boolean;
  };
}
