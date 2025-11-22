import React, { useState, useRef, useEffect, Children, ReactNode, isValidElement, cloneElement, useCallback, useMemo } from 'react';
import './style.css';

export type SplitterDirection = 'horizontal' | 'vertical';

export interface SplitterPanelProps {
  /** 面板的最小尺寸 (px) */
  minSize?: number;
  /** 面板的最大尺寸 (px) */
  maxSize?: number;
  /** 面板的默认尺寸 (px 或 百分比) */
  defaultSize?: number | string;
  /** 面板是否可折叠 */
  collapsible?: boolean;
  /** 面板是否默认折叠 */
  initialCollapsed?: boolean;
  /** 面板的唯一标识符 */
  panelId?: string;
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children: ReactNode;
  /** 内联样式 (由 Splitter 注入) */
  style?: React.CSSProperties;
}

export const SplitterPanel: React.FC<SplitterPanelProps> = ({
  children,
  ...props
}) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

export interface SplitterProps {
  /** 分割方向 */
  direction?: SplitterDirection;
  /** 分割器宽度/高度 (px) */
  splitterSize?: number;
  /** 面板变化时的回调 */
  onResize?: (sizes: number[]) => void;
  /** 是否在拖动时显示实时预览 */
  liveResize?: boolean;
  /** 子元素，通常是 SplitterPanel */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

interface PanelState {
  /** 当前面板的尺寸 (px) */
  size: number;
  /** 面板是否已折叠 */
  isCollapsed: boolean;
  /** 折叠前的大小，用于恢复 */
  sizeBeforeCollapse: number | null;
  /** 原始 defaultSize (flex, percentage, or number) */
  originalDefaultSize: number | string;
  /** 面板的props */
  props: SplitterPanelProps;
}

const Splitter: React.FC<SplitterProps> = ({
  direction = 'horizontal',
  splitterSize = 12,
  onResize,
  liveResize = true,
  children,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialPanelNodes = useMemo(() => Children.toArray(children).filter(isValidElement), [children]);

  // Track if the component has been initialized
  const [panelStates, setPanelStates] = useState<PanelState[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingDividerIndex, setDraggingDividerIndex] = useState<number | null>(null);
  const isDraggingRef = useRef(false);
  const draggingDividerIndexRef = useRef<number | null>(null);
  const startPos = useRef(0);
  const currentPixelSizesAtDragStart = useRef<number[]>([]); // Store current pixel sizes for dragging
  const currentDragSizes = useRef<number[]>([]); // Store latest calculated sizes during drag

  // Use ref to store onResize callback to avoid triggering useEffect on every render
  const onResizeRef = useRef(onResize);
  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  // Use ref to store current panel states to avoid recreating ResizeObserver
  const panelStatesRef = useRef<PanelState[]>([]);

  useEffect(() => {
    panelStatesRef.current = panelStates;
  }, [panelStates]);

  const isHorizontal = direction === 'horizontal';

  const getCalculatedPixelSizes = useCallback((
    currentPanelStates: PanelState[],
    containerSize: number,
    panelsProps: SplitterPanelProps[]
  ): number[] => {
    const numPanels = currentPanelStates.length;
    if (numPanels === 0) return [];

    const totalSplitterPixels = (numPanels - 1) * splitterSize;
    // Step 1: Calculate available space and initialize pixelSizes
    const availableSpace = containerSize - totalSplitterPixels;

    const pixelSizes: number[] = new Array(numPanels).fill(0);
    let fixedSizeTotal = 0;
    let flexPanelIndices: number[] = [];

    // First pass: handle collapsed, fixed (px), and percentage sizes
    currentPanelStates.forEach((state, index) => {
      if (state.isCollapsed) {
        pixelSizes[index] = 0;
      } else if (typeof state.originalDefaultSize === 'number') {
        pixelSizes[index] = state.originalDefaultSize;
        fixedSizeTotal += state.originalDefaultSize;
      } else if (typeof state.originalDefaultSize === 'string' && state.originalDefaultSize.endsWith('%')) {
        const percentage = parseFloat(state.originalDefaultSize) / 100;
        pixelSizes[index] = availableSpace * percentage; // Percentage based on available space (minus splitters)
        fixedSizeTotal += pixelSizes[index];
      } else { // 'flex' panels
        flexPanelIndices.push(index);
      }
    });

    // Distribute remaining space among flexible panels
    let remainingFlexibleSpace = availableSpace - fixedSizeTotal;

    // Apply minSize to flexible panels first
    // This is an iterative process to handle minSize constraints properly
    let changed = true;
    while (changed && flexPanelIndices.length > 0) {
      changed = false;
      const newFlexPanelIndices: number[] = [];
      let minSizeExceeded = 0;

      for (const index of flexPanelIndices) {
        const props = panelsProps[index];
        const minSize = props.minSize || 0;
        // Check if current allocation (remainingFlexibleSpace / flexPanelIndices.length) is less than minSize
        // This logic needs to be careful to avoid division by zero if flexPanelIndices becomes empty
        if (flexPanelIndices.length > 0 && remainingFlexibleSpace / flexPanelIndices.length < minSize) {
          // This panel is below its minSize, so fix it at minSize
          pixelSizes[index] = minSize;
          minSizeExceeded += minSize;
          changed = true;
        } else {
          newFlexPanelIndices.push(index);
        }
      }
      // Update remainingFlexibleSpace and flexPanelIndices for the next iteration
      remainingFlexibleSpace = availableSpace - fixedSizeTotal - minSizeExceeded;
      flexPanelIndices = newFlexPanelIndices;
    }

    // Distribute remaining space among flex panels
    const flexPanelAlloc = flexPanelIndices.length > 0 ? remainingFlexibleSpace / flexPanelIndices.length : 0;

    for (const index of flexPanelIndices) {
      const props = panelsProps[index];
      const minSize = props.minSize || 0;
      pixelSizes[index] = Math.max(minSize, flexPanelAlloc);
    }

    // Step 3: Adjust to ensure the sum equals the container size exactly
    // This step distributes minor floating point rounding errors evenly across all panels
    const currentTotalPixelSum = pixelSizes.reduce((sum, size) => sum + size, 0);
    if (currentTotalPixelSum !== availableSpace && numPanels > 0) {
      const difference = availableSpace - currentTotalPixelSum;

      const adjustmentIndices = flexPanelIndices.length > 0 ? flexPanelIndices : currentPanelStates.map((_, _index) => _index).filter(_index => !currentPanelStates[_index].isCollapsed);
      if (adjustmentIndices.length > 0) {
        const adjustmentPerPanel = difference / adjustmentIndices.length;
        adjustmentIndices.forEach(_index => {
          pixelSizes[_index] += adjustmentPerPanel;
        });
      }
    }

    // Finally apply maxSize constraints (clamping)
    currentPanelStates.forEach((_state, index) => {
      const props = panelsProps[index];
      const minSize = props.minSize || 0;
      const maxSize = props.maxSize !== undefined ? props.maxSize : Infinity;
      pixelSizes[index] = Math.max(minSize, Math.min(maxSize, pixelSizes[index]));
    });

    return pixelSizes.map(size => Math.max(0, size)); // Ensure all sizes are non-negative
  }, [splitterSize]);


  // Effect to initialize panel states when children change
  useEffect(() => {
    if (!containerRef.current || initialPanelNodes.length === 0) return;

    const containerSize = isHorizontal ? containerRef.current.offsetWidth : containerRef.current.offsetHeight;

    // Skip initialization if container has no size yet
    if (containerSize === 0) {
      return;
    }

    const initialProps = initialPanelNodes.map(node => node.props as SplitterPanelProps);

    // Initialize panelStates from props
    const initialStates: PanelState[] = initialPanelNodes.map((child) => {
      const { defaultSize = 'flex', initialCollapsed = false } = child.props as SplitterPanelProps;
      return {
        size: 0, // Placeholder, will be calculated
        isCollapsed: initialCollapsed,
        sizeBeforeCollapse: null,
        originalDefaultSize: defaultSize,
        props: child.props as SplitterPanelProps,
      };
    });

    const calculatedPixelSizes = getCalculatedPixelSizes(initialStates, containerSize, initialProps);

    let shouldNotifyResize = false;

    setPanelStates(prevStates => {
      // Only update if this is initialization (empty state) or if the number of panels changed
      if (prevStates.length === 0 || prevStates.length !== initialStates.length) {
        shouldNotifyResize = true;
        return initialStates.map((state, index) => ({
          ...state,
          size: calculatedPixelSizes[index]
        }));
      }

      // Check if panel props have actually changed
      const propsChanged = prevStates.some((prevState, index) => {
        const newState = initialStates[index];
        return (
          prevState.originalDefaultSize !== newState.originalDefaultSize ||
          prevState.props.minSize !== newState.props.minSize ||
          prevState.props.maxSize !== newState.props.maxSize ||
          prevState.props.collapsible !== newState.props.collapsible
        );
      });

      if (propsChanged) {
        shouldNotifyResize = true;
        return initialStates.map((state, index) => ({
          ...state,
          size: calculatedPixelSizes[index],
          // Preserve isCollapsed and sizeBeforeCollapse from previous state if possible
          isCollapsed: prevStates[index]?.isCollapsed ?? state.isCollapsed,
          sizeBeforeCollapse: prevStates[index]?.sizeBeforeCollapse ?? state.sizeBeforeCollapse,
        }));
      }

      // Otherwise, don't update to avoid unnecessary re-renders
      return prevStates;
    });

    if (shouldNotifyResize && onResizeRef.current) {
      onResizeRef.current(calculatedPixelSizes);
    }
  }, [initialPanelNodes, isHorizontal, splitterSize, getCalculatedPixelSizes]);

  // Effect to handle container resize
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      if (!containerRef.current) return;

      const containerSize = isHorizontal ? containerRef.current.offsetWidth : containerRef.current.offsetHeight;

      // Skip if container still has no size
      if (containerSize === 0) return;

      const currentPanelStates = panelStatesRef.current;

      // If panelStates is empty but we have nodes, initialize them
      if (currentPanelStates.length === 0 && initialPanelNodes.length > 0) {
        const initialProps = initialPanelNodes.map(node => node.props as SplitterPanelProps);
        const initialStates: PanelState[] = initialPanelNodes.map((child) => {
          const { defaultSize = 'flex', initialCollapsed = false } = child.props as SplitterPanelProps;
          return {
            size: 0,
            isCollapsed: initialCollapsed,
            sizeBeforeCollapse: null,
            originalDefaultSize: defaultSize,
            props: child.props as SplitterPanelProps,
          };
        });

        const calculatedPixelSizes = getCalculatedPixelSizes(initialStates, containerSize, initialProps);

        setPanelStates(initialStates.map((state, index) => ({
          ...state,
          size: calculatedPixelSizes[index]
        })));

        if (onResizeRef.current) {
          onResizeRef.current(calculatedPixelSizes);
        }
        return;
      }

      if (currentPanelStates.length === 0) return;

      const panelProps = currentPanelStates.map(s => s.props);
      const calculatedPixelSizes = getCalculatedPixelSizes(currentPanelStates, containerSize, panelProps);

      // Check if sizes actually changed before updating
      const sizesChanged = currentPanelStates.some((state, index) =>
        Math.abs(state.size - calculatedPixelSizes[index]) > 0.1
      );

      if (!sizesChanged) return;

      setPanelStates(prevStates =>
        prevStates.map((state, index) => ({
          ...state,
          size: calculatedPixelSizes[index],
        }))
      );

      if (onResizeRef.current) {
        onResizeRef.current(calculatedPixelSizes);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    // Trigger initial size calculation
    handleResize();

    return () => observer.disconnect();
  }, [isHorizontal, getCalculatedPixelSizes, initialPanelNodes]);


  const onDragging = useCallback((e: Event) => {
    console.log('[Splitter] onDragging, isDragging:', isDraggingRef.current, 'dividerIndex:', draggingDividerIndexRef.current);
    if (!isDraggingRef.current || draggingDividerIndexRef.current === null || !containerRef.current) {
      return;
    }

    const currentPanelStates = panelStatesRef.current;
    if (currentPanelStates.length === 0) {
      return;
    }

    const mouseEvent = e as MouseEvent;
    const touchEvent = e as TouchEvent;

    const clientPos = isHorizontal
      ? (mouseEvent.clientX !== undefined ? mouseEvent.clientX : touchEvent.touches[0].clientX)
      : (mouseEvent.clientY !== undefined ? mouseEvent.clientY : touchEvent.touches[0].clientY);
    const delta = clientPos - startPos.current;

    const panel1Index = draggingDividerIndexRef.current;
    const panel2Index = draggingDividerIndexRef.current + 1;

    const panel1Props = currentPanelStates[panel1Index].props;
    const panel2Props = currentPanelStates[panel2Index].props;

    let newSize1 = currentPixelSizesAtDragStart.current[panel1Index] + delta;

    let newSize2 = currentPixelSizesAtDragStart.current[panel2Index] - delta;

    const minSize1 = panel1Props.minSize || 0;
    const maxSize1 = panel1Props.maxSize !== undefined ? panel1Props.maxSize : Infinity;

    const minSize2 = panel2Props.minSize || 0;
    const maxSize2 = panel2Props.maxSize !== undefined ? panel2Props.maxSize : Infinity;

    // Sum of the two panels currently being resized (at drag start)
    const sumOfResizingPanels = currentPixelSizesAtDragStart.current[panel1Index] + currentPixelSizesAtDragStart.current[panel2Index];

    // Apply constraints
    newSize1 = Math.max(minSize1, newSize1);
    newSize1 = Math.min(maxSize1, newSize1);

    // Calculate newSize2 based on adjusted newSize1 and the fixed sum
    newSize2 = sumOfResizingPanels - newSize1;

    newSize2 = Math.max(minSize2, newSize2);
    newSize2 = Math.min(maxSize2, newSize2);

    // Re-adjust newSize1 based on newSize2 to ensure sumOfResizingPanels is maintained
    newSize1 = sumOfResizingPanels - newSize2;
    newSize1 = Math.max(minSize1, newSize1);
    newSize1 = Math.min(maxSize1, newSize1);


    const newCurrentSizes = [...currentPixelSizesAtDragStart.current]; // Start with sizes at drag start
    newCurrentSizes[panel1Index] = newSize1;
    newCurrentSizes[panel2Index] = newSize2;

    currentDragSizes.current = newCurrentSizes;

    if (liveResize) {
      setPanelStates(prevStates =>
        prevStates.map((state, idx) => ({
          ...state,
          size: newCurrentSizes[idx]
        }))
      );
    }

    if (onResizeRef.current && liveResize) {
      onResizeRef.current(newCurrentSizes);
    }
  }, [isHorizontal, liveResize]); // Use ref for panelStates

  const stopDragging = useCallback((_e: Event) => {
    // 同时清除 state 和 ref
    setIsDragging(false);
    setDraggingDividerIndex(null);
    isDraggingRef.current = false;
    draggingDividerIndexRef.current = null;

    document.removeEventListener('mousemove', onDragging as EventListener);
    document.removeEventListener('mouseup', stopDragging as EventListener);
    document.removeEventListener('touchmove', onDragging as EventListener);
    document.removeEventListener('touchend', stopDragging as EventListener);

    // Remove active class from divider
    const activeDivider = document.querySelector('.splitter-divider.active');
    if (activeDivider) {
      activeDivider.classList.remove('active');
    }

    const finalSizes = currentDragSizes.current;
    setPanelStates(prevStates =>
      prevStates.map((state, idx) => ({
        ...state,
        size: finalSizes[idx]
      }))
    );

    if (onResizeRef.current) {
      onResizeRef.current(finalSizes);
    }
  }, [onDragging]);

  const startDragging = useCallback((e: React.MouseEvent | React.TouchEvent, index: number) => {
    console.log('[Splitter] startDragging called, index:', index);
    e.preventDefault();
    e.stopPropagation();

    // 同时设置 state 和 ref
    setIsDragging(true);
    setDraggingDividerIndex(index);
    isDraggingRef.current = true;
    draggingDividerIndexRef.current = index;

    const mouseEvent = e as React.MouseEvent;
    const touchEvent = e as React.TouchEvent;

    startPos.current = isHorizontal
      ? (mouseEvent.clientX !== undefined ? mouseEvent.clientX : touchEvent.touches[0].clientX)
      : (mouseEvent.clientY !== undefined ? mouseEvent.clientY : touchEvent.touches[0].clientY);

    // Capture current pixel sizes at start of drag using ref
    currentPixelSizesAtDragStart.current = panelStatesRef.current.map(s => s.size);
    currentDragSizes.current = currentPixelSizesAtDragStart.current;

    document.addEventListener('mousemove', onDragging as EventListener);
    document.addEventListener('mouseup', stopDragging as EventListener);
    document.addEventListener('touchmove', onDragging as EventListener);
    document.addEventListener('touchend', stopDragging as EventListener);

    // Add active class to divider
    const divider = (e.currentTarget as HTMLElement);
    divider.classList.add('active');
  }, [isHorizontal, onDragging, stopDragging]);

  const togglePanelCollapse = useCallback((panelIndex: number) => {
    setPanelStates(prevStates => {
      const newStates = [...prevStates];
      const panelToToggle = newStates[panelIndex];
      const currentPanelProps = panelToToggle.props;
      const minSize = currentPanelProps.minSize || 0;

      const containerSize = isHorizontal ? containerRef.current!.offsetWidth : containerRef.current!.offsetHeight;

      if (panelToToggle.isCollapsed) {
        // Expand: restore previous size, or original default size, or minSize
        let restoredSize = panelToToggle.sizeBeforeCollapse !== null
          ? panelToToggle.sizeBeforeCollapse
          : (typeof panelToToggle.originalDefaultSize === 'number'
            ? panelToToggle.originalDefaultSize
            : minSize); // Fallback to minSize if no default or previous

        // Ensure restored size respects min/max
        const maxSize = currentPanelProps.maxSize !== undefined ? currentPanelProps.maxSize : Infinity;
        restoredSize = Math.max(minSize, Math.min(maxSize, restoredSize));

        newStates[panelIndex] = {
          ...panelToToggle,
          isCollapsed: false,
          size: restoredSize,
          sizeBeforeCollapse: null,
        };
      } else {
        // Collapse: store current size, set size to 0
        newStates[panelIndex] = {
          ...panelToToggle,
          isCollapsed: true,
          sizeBeforeCollapse: panelToToggle.size,
          size: 0, // Collapsed panels take up 0 space
        };
      }

      // After collapse/expand, recalculate all sizes to properly distribute space
      // This is crucial to prevent gaps or overlaps, especially with flex panels
      const recalculatedPixelSizes = getCalculatedPixelSizes(newStates, containerSize, newStates.map(s => s.props));

      return newStates.map((state, idx) => ({
        ...state,
        size: recalculatedPixelSizes[idx],
        isCollapsed: newStates[idx].isCollapsed, // Maintain collapsed state
        sizeBeforeCollapse: newStates[idx].sizeBeforeCollapse // Maintain sizeBeforeCollapse
      }));
    });
  }, [getCalculatedPixelSizes, isHorizontal]);


  const panelsToRender = panelStates.map((panelState, index) => {
    const panelStyle: React.CSSProperties = {
      flexGrow: 0,
      flexShrink: 0,
      overflow: panelState.isCollapsed ? 'hidden' : 'auto',
      display: panelState.isCollapsed ? 'none' : undefined, // Hide collapsed panels completely
    };

    if (isHorizontal) {
      panelStyle.width = `${panelState.size}px`;
    } else {
      panelStyle.height = `${panelState.size}px`;
    }

    // Reconstruct the original element with updated props and styles
    // The original child element provides the actual content (child.props.children)
    const originalChild = initialPanelNodes[index] as React.ReactElement<SplitterPanelProps>;

    return cloneElement(originalChild, {
      className: `splitter-panel ${(originalChild.props.className || '')} ${panelState.isCollapsed ? 'collapsed' : ''}`,
      style: { ...(originalChild.props.style || {}), ...panelStyle },
    } as Partial<SplitterPanelProps>);
  });

  return (
    <div
      ref={containerRef}
      className={`splitter-container ${isHorizontal ? 'horizontal' : 'vertical'} ${className} ${isDragging ? 'dragging' : ''}`}
      style={style}
    >
      {panelsToRender.map((panel, index) => (
        <React.Fragment key={index}>
          {panel}
          {index < panelsToRender.length - 1 && (
            <div
              className={`splitter-divider ${draggingDividerIndex === index ? 'active' : ''}`}
              style={{
                [isHorizontal ? 'width' : 'height']: splitterSize,
                [isHorizontal ? 'minWidth' : 'minHeight']: splitterSize,
                [isHorizontal ? 'maxWidth' : 'maxHeight']: splitterSize,
              }}
              onMouseDown={(e) => startDragging(e, index)}
              onTouchStart={(e) => startDragging(e, index)}
            >
              <div className="splitter-divider-handle" />
              {panelStates[index].props.collapsible && (
                <button
                  className="splitter-collapse-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent dragging when clicking button
                    togglePanelCollapse(index);
                  }}
                  title={panelStates[index].isCollapsed ? '展开' : '折叠'}
                >
                  {panelStates[index].isCollapsed ?
                    (isHorizontal ? '&#9654;' : '&#9660;') : // Right or Down arrow
                    (isHorizontal ? '&#9664;' : '&#9650;')  // Left or Up arrow
                  }
                </button>
              )}
              {panelStates[index + 1].props.collapsible && (
                <button
                  className="splitter-collapse-button right" // Add a class for right/bottom panel
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent dragging when clicking button
                    togglePanelCollapse(index + 1);
                  }}
                  title={panelStates[index + 1].isCollapsed ? '展开' : '折叠'}
                >
                  {panelStates[index + 1].isCollapsed ?
                    (isHorizontal ? '&#9664;' : '&#9650;') : // Left or Up arrow
                    (isHorizontal ? '&#9654;' : '&#9660;')  // Right or Down arrow
                  }
                </button>
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Splitter;
