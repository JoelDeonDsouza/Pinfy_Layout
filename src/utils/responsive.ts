/**
 * @author: Joel Deon Dsouza
 * @description: Layout utilities for responsive design, including breakpoints, screen width detection, and media queries.
 * @version: 1.0.0
 * @date: 2025-05-29
 */

import type { MasonryBreakpoints } from "../types";

// Default breakpoints for responsive design //
export const defaultBreakpoints: MasonryBreakpoints = {
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  "2xl": 5,
};

// Function to determine the current breakpoint based on screen width //
export const getBreakpoint = (width: number): keyof MasonryBreakpoints => {
  if (width >= 1536) return "2xl";
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  return "sm";
};

// Function to check if the environment is React Native //
export const isReactNative = (): boolean => {
  return (
    typeof navigator !== "undefined" && navigator.product === "ReactNative"
  );
};

// Function to get the screen width, defaulting to 375 for React Native //
export const getScreenWidth = (): number => {
  if (isReactNative()) {
    return 375;
  }
  return typeof window !== "undefined" ? window.innerWidth : 1024;
};

// Function to get the number of columns based on breakpoints or a fixed number //
export const getResponsiveColumns = (
  columns: number | MasonryBreakpoints,
  screenWidth?: number
): number => {
  if (typeof columns === "number") {
    return columns;
  }
  const width = screenWidth || getScreenWidth();
  const breakpoint = getBreakpoint(width);
  return columns[breakpoint] || defaultBreakpoints[breakpoint];
};

// Function to create media queries for responsive design //
export const createMediaQueries = () => {
  return {
    sm: `(min-width: 640px)`,
    md: `(min-width: 768px)`,
    lg: `(min-width: 1024px)`,
    xl: `(min-width: 1280px)`,
    "2xl": `(min-width: 1536px)`,
  };
};
