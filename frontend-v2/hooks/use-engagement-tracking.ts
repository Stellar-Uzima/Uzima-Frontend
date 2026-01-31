'use client';

import { useEffect, useRef, useState } from 'react';

interface EngagementTrackerOptions {
  contentId: string;
  onTimeUpdate?: (timeSpent: number) => void;
  onScrollDepth?: (depth: number) => void;
  trackInterval?: number; // milliseconds
}

export function useEngagementTracking({
  contentId,
  onTimeUpdate,
  onScrollDepth,
  trackInterval = 5000, // Track every 5 seconds
}: EngagementTrackerOptions) {
  const [timeSpent, setTimeSpent] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [isActive, setIsActive] = useState(true);
  
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const maxScrollRef = useRef<number>(0);

  // Track time spent
  useEffect(() => {
    const updateTime = () => {
      if (isActive) {
        const currentTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setTimeSpent(currentTime);
        onTimeUpdate?.(currentTime);
      }
    };

    intervalRef.current = setInterval(updateTime, trackInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Send final time on unmount
      const finalTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      sendEngagementData(contentId, finalTime, maxScrollRef.current);
    };
  }, [contentId, isActive, trackInterval, onTimeUpdate]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const scrollPercentage = ((scrollTop + windowHeight) / documentHeight) * 100;
      const depth = Math.min(100, Math.round(scrollPercentage));
      
      if (depth > maxScrollRef.current) {
        maxScrollRef.current = depth;
        setScrollDepth(depth);
        onScrollDepth?.(depth);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onScrollDepth]);

  // Track page visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsActive(false);
      } else {
        setIsActive(true);
        startTimeRef.current = Date.now() - timeSpent * 1000;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [timeSpent]);

  // Track interactions
  const trackUpvote = () => {
    sendInteractionData(contentId, 'upvote');
  };

  const trackComment = () => {
    sendInteractionData(contentId, 'comment');
  };

  const trackShare = () => {
    sendInteractionData(contentId, 'share');
  };

  const trackBookmark = () => {
    sendInteractionData(contentId, 'bookmark');
  };

  const trackConsultationClick = () => {
    sendInteractionData(contentId, 'consultation_click');
  };

  return {
    timeSpent,
    scrollDepth,
    isActive,
    trackUpvote,
    trackComment,
    trackShare,
    trackBookmark,
    trackConsultationClick,
  };
}

// Helper function to send engagement data to backend
async function sendEngagementData(
  contentId: string,
  timeSpent: number,
  scrollDepth: number
) {
  try {
    await fetch('/api/engagement/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contentId,
        timeSpent,
        scrollDepth,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Failed to send engagement data:', error);
  }
}

// Helper function to send interaction data
async function sendInteractionData(
  contentId: string,
  interactionType: string
) {
  try {
    await fetch('/api/engagement/interaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contentId,
        type: interactionType,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Failed to send interaction data:', error);
  }
}