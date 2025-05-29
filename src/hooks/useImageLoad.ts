/**
 * @author: Joel Deon Dsouza
 * @description: Provides functions to load image dimensions, calculate aspect ratios,
 * @version: 1.0.0
 * @date: 2025-05-29
 */

import type { ImageDimensions } from "../types";

export const loadImageDimensions = (src: string): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };
    if (src.startsWith("http") && !src.includes(window.location.hostname)) {
      img.crossOrigin = "anonymous";
    }

    img.src = src;
  });
};

export const loadMultipleImageDimensions = async (
  sources: string[]
): Promise<(ImageDimensions | null)[]> => {
  const promises = sources.map(async (src) => {
    try {
      return await loadImageDimensions(src);
    } catch (error) {
      console.warn(`Failed to load dimensions for image: ${src}`, error);
      return null;
    }
  });
  return Promise.all(promises);
};

export const calculateAspectRatio = (dimensions: ImageDimensions): number => {
  return dimensions.width / dimensions.height;
};

export const calculateScaledDimensions = (
  originalDimensions: ImageDimensions,
  targetWidth: number
): ImageDimensions => {
  const aspectRatio = calculateAspectRatio(originalDimensions);
  return {
    width: targetWidth,
    height: Math.round(targetWidth / aspectRatio),
  };
};

const dimensionCache = new Map<string, ImageDimensions>();

export const getCachedImageDimensions = async (
  src: string
): Promise<ImageDimensions> => {
  if (dimensionCache.has(src)) {
    return dimensionCache.get(src)!;
  }

  const dimensions = await loadImageDimensions(src);
  dimensionCache.set(src, dimensions);
  return dimensions;
};

export const preloadImages = (sources: string[]): Promise<void[]> => {
  const promises = sources.map((src) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    });
  });

  return Promise.all(promises);
};

export const clearDimensionCache = (): void => {
  dimensionCache.clear();
};

export const getCacheSize = (): number => {
  return dimensionCache.size;
};
