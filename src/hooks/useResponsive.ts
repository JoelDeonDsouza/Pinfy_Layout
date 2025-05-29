/**
 * @author: Joel Deon Dsouza
 * @description: Provides responsive utilities to determine screen width, breakpoints, and device types.
 * @version: 1.0.0
 * @date: 2025-05-29
 */

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { throttle } from "../utils/masonry";
import { getScreenWidth, getBreakpoint } from "../utils/responsive";
import type { MasonryBreakpoints } from "../types";

interface UseResponsiveReturn {
  width: number;
  breakpoint: keyof MasonryBreakpoints;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useResponsive = (): UseResponsiveReturn => {
  const [width, setWidth] = useState(getScreenWidth());
  // Throttle resize handler to improve performance //
  const handleResize = useCallback(
    throttle(() => {
      setWidth(getScreenWidth());
    }, 100),
    []
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Initial width calculation //
  const breakpoint = getBreakpoint(width);
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return {
    width,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useResponsive;
