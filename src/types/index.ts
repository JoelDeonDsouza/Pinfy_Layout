/**
 * @author: Joel Deon Dsouza
 * @description: Types for the Masonry component, including item data, configuration, and layout properties.
 * @version: 1.0.0
 * @date: 2025-05-29
 */

import type { ReactNode } from "react";

export interface MasonryBreakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

export interface MasonryConfig {
  columns: number | MasonryBreakpoints;
  gap: number;
  transitionDuration: number;
  enableAnimation: boolean;
}

export interface MasonryItemData {
  id: string | number;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  content?: ReactNode;
  className?: string;
}

export interface MasonryProps {
  items: MasonryItemData[];
  columns?: number | MasonryBreakpoints;
  gap?: number;
  className?: string;
  itemClassName?: string;
  transitionDuration?: number;
  enableAnimation?: boolean;
  loading?: boolean;
  onItemClick?: (item: MasonryItemData, index: number) => void;
  onItemLoad?: (item: MasonryItemData, index: number) => void;
  renderItem?: (item: MasonryItemData, index: number) => ReactNode;
}

export interface MasonryItemProps {
  item: MasonryItemData;
  index: number;
  style: React.CSSProperties;
  className?: string;
  transitionDuration?: number;
  onClick?: (item: MasonryItemData, index: number) => void;
  onLoad?: (item: MasonryItemData, index: number) => void;
  onDimensionsLoad?: (
    item: MasonryItemData,
    index: number,
    dimensions: { width: number; height: number }
  ) => void;
  children?: ReactNode;
}

export interface UseMasonryOptions {
  columns: number | MasonryBreakpoints;
  gap: number;
  containerWidth: number;
  items: MasonryItemData[];
}

export interface MasonryLayout {
  positions: Array<{ x: number; y: number; width: number; height: number }>;
  containerHeight: number;
  columnWidth: number;
  currentColumns: number;
}

// New interface for image loading utilities
export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImageLoadResult {
  dimensions: ImageDimensions;
  aspectRatio: number;
}
