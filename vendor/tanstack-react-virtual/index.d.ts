import * as React from "react";

export interface VirtualItem {
  index: number;
  key: React.Key;
  start: number;
  size: number;
  end: number;
}

export interface UseVirtualizerOptions {
  count: number;
  getScrollElement: () => Element | null;
  estimateSize: (index: number) => number;
  overscan?: number;
  getItemKey?: (index: number) => React.Key;
  measureElement?: (element: HTMLElement) => number;
}

export interface VirtualizerInstance {
  getTotalSize: () => number;
  getVirtualItems: () => VirtualItem[];
  measure: () => void;
  measureElement: (element: HTMLElement | null) => void;
}

export declare function useVirtualizer(options: UseVirtualizerOptions): VirtualizerInstance;
