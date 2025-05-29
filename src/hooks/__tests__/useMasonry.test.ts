import { renderHook, act } from "@testing-library/react";
import { useMasonry } from "../useMasonry";
import * as masonryUtils from "../../utils/masonry";
import type {
  MasonryLayout,
  MasonryBreakpoints,
  UseMasonryOptions,
} from "../../types";

// Mock the masonry utils //
jest.mock("../../utils/masonry", () => ({
  calculateMasonryLayout: jest.fn(),
  getColumns: jest.fn(),
  debounce: jest.fn((fn) => fn),
}));

const mockCalculateMasonryLayout = jest.mocked(
  masonryUtils.calculateMasonryLayout
);
const mockGetColumns = jest.mocked(masonryUtils.getColumns);
const mockDebounce = jest.mocked(masonryUtils.debounce);

type MasonryItem = {
  id: string;
  width: number;
  height: number;
};

describe("useMasonry", () => {
  const mockItems: MasonryItem[] = [
    { id: "1", width: 200, height: 300 },
    { id: "2", width: 200, height: 400 },
    { id: "3", width: 200, height: 250 },
  ];

  const mockLayout: MasonryLayout = {
    positions: [
      { x: 0, y: 0, width: 200, height: 300 },
      { x: 220, y: 0, width: 200, height: 400 },
      { x: 0, y: 320, width: 200, height: 250 },
    ],
    containerHeight: 570,
    columnWidth: 200,
    currentColumns: 2,
  };

  const defaultOptions: UseMasonryOptions = {
    columns: 2,
    gap: 20,
    containerWidth: 440,
    items: mockItems,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetColumns.mockReturnValue(2);
    mockCalculateMasonryLayout.mockReturnValue(mockLayout);
    mockDebounce.mockImplementation((fn: () => void) => fn);
  });

  it("should initialize with default layout state", () => {
    mockGetColumns.mockReturnValue(1);

    const { result } = renderHook(() =>
      useMasonry({
        ...defaultOptions,
        containerWidth: 0,
        items: [],
      })
    );

    expect(result.current.layout).toEqual({
      positions: [],
      containerHeight: 0,
      columnWidth: 0,
      currentColumns: 1,
    });
    expect(result.current.isLayoutReady).toBe(false);
  });

  it("should calculate layout when options are provided", () => {
    const { result } = renderHook(() => useMasonry(defaultOptions));

    expect(mockGetColumns).toHaveBeenCalledWith(2, 440);
    expect(mockCalculateMasonryLayout).toHaveBeenCalledWith(
      mockItems,
      440,
      2,
      20
    );
    expect(result.current.layout).toEqual(mockLayout);
    expect(result.current.isLayoutReady).toBe(true);
  });

  it("should recalculate layout when containerWidth changes", () => {
    const { rerender } = renderHook((props) => useMasonry(props), {
      initialProps: defaultOptions,
    });

    // Clear mock calls after initial render // 
    jest.clearAllMocks();
    mockGetColumns.mockReturnValue(3);
    mockCalculateMasonryLayout.mockReturnValue(mockLayout);

    // Change container width //
    rerender({
      ...defaultOptions,
      containerWidth: 660,
    });

    expect(mockGetColumns).toHaveBeenCalledWith(2, 660);
    expect(mockCalculateMasonryLayout).toHaveBeenCalledWith(
      mockItems,
      660,
      3,
      20
    );
  });

  it("should recalculate layout when items change", () => {
    const { rerender } = renderHook((props) => useMasonry(props), {
      initialProps: defaultOptions,
    });

    // Clear mock calls after initial render //
    jest.clearAllMocks();
    mockCalculateMasonryLayout.mockReturnValue(mockLayout);

    const newItems = [...mockItems, { id: "4", width: 200, height: 350 }];

    rerender({
      ...defaultOptions,
      items: newItems,
    });

    expect(mockCalculateMasonryLayout).toHaveBeenCalledWith(
      newItems,
      440,
      2,
      20
    );
  });

  it("should recalculate layout when gap changes", () => {
    const { rerender } = renderHook((props) => useMasonry(props), {
      initialProps: defaultOptions,
    });

    // Clear mock calls after initial render //
    jest.clearAllMocks();
    mockCalculateMasonryLayout.mockReturnValue(mockLayout);

    rerender({
      ...defaultOptions,
      gap: 30,
    });

    expect(mockCalculateMasonryLayout).toHaveBeenCalledWith(
      mockItems,
      440,
      2,
      30
    );
  });

  it("should handle responsive columns", () => {
    const responsiveColumns: MasonryBreakpoints = {
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
      "2xl": 5,
    };

    mockGetColumns
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(3);

    const { rerender } = renderHook((props) => useMasonry(props), {
      initialProps: {
        ...defaultOptions,
        columns: responsiveColumns,
        containerWidth: 500,
      },
    });

    expect(mockGetColumns).toHaveBeenCalledWith(responsiveColumns, 500);

    rerender({
      ...defaultOptions,
      columns: responsiveColumns,
      containerWidth: 800,
    });

    expect(mockGetColumns).toHaveBeenCalledWith(responsiveColumns, 800);

    rerender({
      ...defaultOptions,
      columns: responsiveColumns,
      containerWidth: 1200,
    });

    expect(mockGetColumns).toHaveBeenCalledWith(responsiveColumns, 1200);
  });

  it("should not calculate layout when containerWidth is 0", () => {
    const { result } = renderHook(() =>
      useMasonry({
        ...defaultOptions,
        containerWidth: 0,
      })
    );

    expect(mockCalculateMasonryLayout).not.toHaveBeenCalled();
    expect(result.current.isLayoutReady).toBe(false);
  });

  it("should not calculate layout when items array is empty", () => {
    const { result } = renderHook(() =>
      useMasonry({
        ...defaultOptions,
        items: [],
      })
    );

    expect(mockCalculateMasonryLayout).not.toHaveBeenCalled();
    expect(result.current.isLayoutReady).toBe(false);
  });

  it("should provide recalculate function", () => {
    const { result } = renderHook(() => useMasonry(defaultOptions));

    // Clear mock calls after initial render //
    jest.clearAllMocks();
    mockCalculateMasonryLayout.mockReturnValue(mockLayout);

    expect(typeof result.current.recalculate).toBe("function");

    act(() => {
      result.current.recalculate();
    });

    expect(mockCalculateMasonryLayout).toHaveBeenCalledTimes(1);
  });

  it("should use debounced calculation for items length changes", () => {
    const debouncedFn = jest.fn();
    mockDebounce.mockReturnValue(debouncedFn);

    const { rerender } = renderHook((props) => useMasonry(props), {
      initialProps: defaultOptions,
    });

    // Reset debounced function calls after initial render //
    debouncedFn.mockClear();

    // Change items length should trigger debounced calculation //
    const newItems = [...mockItems, { id: "4", width: 200, height: 350 }];
    rerender({
      ...defaultOptions,
      items: newItems,
    });

    expect(mockDebounce).toHaveBeenCalled();
    expect(debouncedFn).toHaveBeenCalledTimes(1);
  });

  it("should handle current columns calculation correctly", () => {
    const { result } = renderHook(() => useMasonry(defaultOptions));

    expect(mockGetColumns).toHaveBeenCalledWith(2, 440);

    // The layout should include the current columns from getColumns
    expect(result.current.layout.currentColumns).toBe(2);
  });

  it("should only call debounced layout when layout is ready", () => {
    const debouncedFn = jest.fn();
    mockDebounce.mockReturnValue(debouncedFn);

    const { result, rerender } = renderHook((props) => useMasonry(props), {
      initialProps: {
        ...defaultOptions,
        containerWidth: 0,
      },
    });

    expect(result.current.isLayoutReady).toBe(false);
    rerender({
      ...defaultOptions,
      containerWidth: 0,
      items: [...mockItems, { id: "4", width: 200, height: 350 }],
    });

    expect(debouncedFn).not.toHaveBeenCalled();
  });
});