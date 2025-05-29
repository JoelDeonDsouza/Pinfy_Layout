/**
 * @author: Joel Deon Dsouza
 * @description: Masonry listing component for displaying a grid of items with responsive columns, gaps, and animations. Supports image loading and custom rendering.
 * @version: 1.0.0
 * @date: 2025-05-29
 */

import React, { useRef, useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import type { MasonryProps, MasonryItemData } from "../types";
import { useMasonry } from "../hooks/useMasonry";
import MasonryItem from "./MasonryItem";

const Masonry: React.FC<MasonryProps> = ({
  items,
  columns = { sm: 1, md: 2, lg: 3, xl: 4, "2xl": 5 },
  gap = 16,
  className,
  itemClassName,
  transitionDuration = 300,
  enableAnimation = true,
  loading = false,
  onItemClick,
  onItemLoad,
  renderItem,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [itemsWithDimensions, setItemsWithDimensions] = useState<
    MasonryItemData[]
  >([]);
  const [, setLoadedItems] = useState<Set<string | number>>(new Set());
  // Update container width on resize //
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  // Handle image dimension loading //
  const handleImageDimensionsLoad = useCallback(
    (
      item: MasonryItemData,
      index: number,
      dimensions: { width: number; height: number }
    ) => {
      setItemsWithDimensions((prev) => {
        const newItems = [...prev];
        const existingIndex = newItems.findIndex((i) => i.id === item.id);

        const updatedItem = {
          ...item,
          width: dimensions.width,
          height: dimensions.height,
        };

        if (existingIndex >= 0) {
          newItems[existingIndex] = updatedItem;
        } else {
          newItems[index] = updatedItem;
        }

        return newItems;
      });

      setLoadedItems((prev) => new Set(prev).add(item.id));
    },
    []
  );

  // Initialize items with default dimensions for non-image items //
  useEffect(() => {
    const initialItems = items.map((item) => {
      if (!item.src) {
        return {
          ...item,
          width: item.width,
          height: item.height,
        };
      }
      return {
        ...item,
        width: item.width,
        height: item.height,
      };
    });
    setItemsWithDimensions(initialItems);
  }, [items]);

  // Get the masonry layout //
  const { layout, isLayoutReady } = useMasonry({
    columns,
    gap,
    containerWidth,
    items: itemsWithDimensions,
  });

  // Loading skeleton //
  const renderLoadingSkeleton = () => {
    const skeletonCount = typeof columns === "number" ? columns * 3 : 6;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="bg-gray-200 animate-pulse rounded-lg"
            style={{ height: Math.random() * 200 + 150 }}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={clsx("masonry-container", className)}>
        {renderLoadingSkeleton()}
      </div>
    );
  }

  if (!isLayoutReady || containerWidth === 0) {
    return (
      <div
        ref={containerRef}
        className={clsx("masonry-container", className)}
        style={{ minHeight: "200px" }}
      >
        {renderLoadingSkeleton()}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={clsx("masonry-container", className)}
      style={{
        height: layout.containerHeight,
        position: "relative",
      }}
    >
      {items.map((item, index) => {
        const position = layout.positions[index];
        if (!position) return null;

        const itemStyle: React.CSSProperties = {
          position: "absolute",
          left: position.x,
          top: position.y,
          width: position.width,
          height: position.height,
        };

        if (renderItem) {
          return (
            <div
              key={item.id || index}
              className={clsx("masonry-item", itemClassName)}
              style={itemStyle}
            >
              {renderItem(item, index)}
            </div>
          );
        }

        return (
          <MasonryItem
            key={item.id || index}
            item={item}
            index={index}
            style={itemStyle}
            className={itemClassName}
            transitionDuration={enableAnimation ? transitionDuration : 0}
            onClick={onItemClick}
            onLoad={onItemLoad}
            onDimensionsLoad={handleImageDimensionsLoad}
          />
        );
      })}
    </div>
  );
};

export default Masonry;
