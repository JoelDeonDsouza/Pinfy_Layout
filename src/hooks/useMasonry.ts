/**
 * @author: Joel Deon Dsouza
 * @description: Provides a custom hook to manage masonry layout calculations for a grid of items.
 * @version: 1.0.0
 * @date: 2025-05-29
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import type { UseMasonryOptions, MasonryLayout } from "../types";
import { calculateMasonryLayout, getColumns, debounce } from "../utils/masonry";

export const useMasonry = ({
  columns,
  gap,
  containerWidth,
  items,
}: UseMasonryOptions) => {
  const [layout, setLayout] = useState<MasonryLayout>({
    positions: [],
    containerHeight: 0,
    columnWidth: 0,
    currentColumns: 1,
  });
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  // Calculate current columns based on container width //
  const currentColumns = useMemo(() => {
    return getColumns(columns, containerWidth);
  }, [columns, containerWidth]);
  const calculateLayout = useCallback(() => {
    if (containerWidth <= 0 || items.length === 0) {
      setIsLayoutReady(false);
      return;
    }
    const newLayout = calculateMasonryLayout(
      items,
      containerWidth,
      currentColumns,
      gap
    );
    setLayout(newLayout);
    setIsLayoutReady(true);
  }, [items, containerWidth, currentColumns, gap]);
  // Debounced layout calculation for performance //
  const debouncedCalculateLayout = useMemo(
    () => debounce(calculateLayout, 150),
    [calculateLayout]
  );
  useEffect(() => {
    calculateLayout();
  }, [calculateLayout]);

  // Recalculate layout when items are added/removed //
  useEffect(() => {
    if (isLayoutReady) {
      debouncedCalculateLayout();
    }
  }, [items.length, debouncedCalculateLayout, isLayoutReady]);

  return {
    layout,
    isLayoutReady,
    recalculate: calculateLayout,
  };
};

export default useMasonry;
