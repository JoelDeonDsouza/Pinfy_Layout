/**
 * @author: Joel Deon Dsouza
 * @description: Masonry item component for displaying individual items in a masonry layout with support for images, content, and click events.
 * @version: 1.0.0
 * @date: 2025-05-29
 */

import React, { useState, useRef } from "react";
import clsx from "clsx";
import type { MasonryItemProps } from "../types";

const MasonryItem: React.FC<MasonryItemProps> = ({
  item,
  index,
  style,
  className,
  transitionDuration = 300,
  onClick,
  onLoad,
  onDimensionsLoad,
  children,
}) => {
  const [, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    onClick?.(item, index);
  };

  const handleImageLoad = () => {
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      const dimensions = { width: naturalWidth, height: naturalHeight };
      setImageDimensions(dimensions);
      setIsImageLoaded(true);
      onLoad?.(item, index);
      onDimensionsLoad?.(item, index, dimensions);
    }
  };

  const handleImageError = () => {
    console.warn(`Failed to load image: ${item.src}`);
    setIsImageLoaded(true);
  };

  const itemStyle: React.CSSProperties = {
    ...style,
    transition:
      transitionDuration > 0
        ? `transform ${transitionDuration}ms ease-out, opacity ${transitionDuration}ms ease-out`
        : "none",
    opacity: item.src && !isImageLoaded ? 0.3 : 1,
  };

  return (
    <div
      className={clsx("masonry-item", { "cursor-pointer": onClick }, className)}
      style={itemStyle}
      onClick={handleClick}
    >
      {children ? (
        children
      ) : item.src ? (
        <div className="relative overflow-hidden rounded-lg bg-gray-100">
          <img
            ref={imgRef}
            src={item.src}
            alt={item.alt || `Masonry item ${index}`}
            className="masonry-image"
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="bg-gray-50 p-4 rounded-lg"
          style={{ height: style.height || 200 }}
        >
          {item.content || (
            <div className="text-gray-400 text-sm">No content</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MasonryItem;
