import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/utils";
import "./Affix.css";

export interface AffixProps {
  /** 距离窗口顶部达到指定偏移量后触发 */
  offsetTop?: number;
  /** 距离窗口底部达到指定偏移量后触发 */
  offsetBottom?: number;
  /** 设置 Affix 需要监听其滚动事件的元素 */
  target?: () => HTMLElement | Window | null;
  /** 固定状态改变时触发的回调函数 */
  onChange?: (affixed: boolean) => void;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Affix: React.FC<AffixProps> = ({
  offsetTop,
  offsetBottom,
  target,
  onChange,
  children,
  className,
  style,
}) => {
  const [affixed, setAffixed] = useState(false);
  const [affixStyle, setAffixStyle] = useState<React.CSSProperties>({});
  const [placeholderStyle, setPlaceholderStyle] = useState<React.CSSProperties>({});
  
  const placeholderRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<HTMLDivElement>(null);
  const prevAffixedRef = useRef(false);

  const getTargetElement = useCallback(() => {
    if (target) {
      return target();
    }
    return window;
  }, [target]);

  const getTargetRect = useCallback((targetElement: HTMLElement | Window) => {
    if (targetElement === window) {
      return {
        top: 0,
        bottom: window.innerHeight,
      };
    }
    const rect = (targetElement as HTMLElement).getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
    };
  }, []);

  const measure = useCallback(() => {
    const targetElement = getTargetElement();
    if (!targetElement || !placeholderRef.current) return;

    const targetRect = getTargetRect(targetElement);
    const placeholderRect = placeholderRef.current.getBoundingClientRect();
    const { width, height } = placeholderRect;

    let newAffixed = false;
    let newAffixStyle: React.CSSProperties = {};

    if (offsetTop !== undefined) {
      const top = placeholderRect.top - targetRect.top;
      if (top <= offsetTop) {
        newAffixed = true;
        newAffixStyle = {
          position: "fixed",
          top: targetRect.top + offsetTop,
          width,
          height,
        };
      }
    } else if (offsetBottom !== undefined) {
      const bottom = targetRect.bottom - placeholderRect.bottom;
      if (bottom <= offsetBottom) {
        newAffixed = true;
        newAffixStyle = {
          position: "fixed",
          bottom: window.innerHeight - targetRect.bottom + offsetBottom,
          width,
          height,
        };
      }
    }

    if (newAffixed !== affixed) {
      setAffixed(newAffixed);
      if (prevAffixedRef.current !== newAffixed) {
        onChange?.(newAffixed);
        prevAffixedRef.current = newAffixed;
      }
    }

    setAffixStyle(newAffixed ? newAffixStyle : {});
    setPlaceholderStyle(newAffixed ? { width, height } : {});
  }, [affixed, getTargetElement, getTargetRect, offsetBottom, offsetTop, onChange]);

  useEffect(() => {
    const targetElement = getTargetElement();
    if (!targetElement) return;

    const handleScroll = () => {
      requestAnimationFrame(measure);
    };

    const handleResize = () => {
      requestAnimationFrame(measure);
    };

    // 初始测量
    measure();

    // 添加事件监听
    targetElement.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      targetElement.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [getTargetElement, measure]);

  return (
    <div ref={placeholderRef} className={cn("myui-affix", className)} style={style}>
      <div style={placeholderStyle} />
      <div
        ref={fixedRef}
        className={cn("myui-affix__content", {
          "myui-affix__content--fixed": affixed,
        })}
        style={affixStyle}
      >
        {children}
      </div>
    </div>
  );
};

Affix.displayName = "Affix";

export default Affix;
