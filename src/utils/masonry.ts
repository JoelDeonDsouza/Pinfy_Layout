/**
 * @author: Joel Deon Dsouza
 * @description: Masonry layout utilities for calculating item positions, debouncing, throttling, and image preloading.
 * @version: 1.0.0
 * @date: 2025-05-29
 */

import type {
  MasonryBreakpoints,
  MasonryItemData,
  MasonryLayout,
} from "../types";
export const getColumns = (
  columns: number | MasonryBreakpoints,
  width: number
): number => {
  if (typeof columns === "number") {
    return columns;
  }
  if (width >= 1536) return columns["2xl"] || 5;
  if (width >= 1280) return columns.xl || 4;
  if (width >= 1024) return columns.lg || 3;
  if (width >= 768) return columns.md || 2;
  if (width >= 640) return columns.sm || 1;

  return 1;
};

export const calculateMasonryLayout = (
  items: MasonryItemData[],
  containerWidth: number,
  columns: number,
  gap: number
): MasonryLayout => {
  const columnWidth = (containerWidth - gap * (columns - 1)) / columns;
  const columnHeights = new Array(columns).fill(0);
  const positions: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
  }> = [];

  items.forEach((item) => {
    // Find the column with minimum height //
    const minHeight = Math.min(...columnHeights);
    const columnIndex = columnHeights.indexOf(minHeight);
    // Calculate position //
    const x = (columnWidth + gap) * columnIndex;
    const y = columnHeights[columnIndex];
    // default height //
    let itemHeight = 200;
    if (item.width && item.height) {
      itemHeight = (item.height / item.width) * columnWidth;
    }
    positions.push({
      x,
      y,
      width: columnWidth,
      height: itemHeight,
    });
    // Update column height //
    columnHeights[columnIndex] += itemHeight + gap;
  });

  return {
    positions,
    containerHeight: Math.max(...columnHeights) - gap,
    columnWidth,
    currentColumns: columns,
  };
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const getImageDimensions = (
  src: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};
