import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";
import { Icon } from "../Icon";
import "./BackTop.css";

export interface BackTopProps {
  /** 设置需要监听其滚动事件的元素 */
  target?: () => HTMLElement | Window | null;
  /** 滚动高度达到此参数值才出现 BackTop */
  visibilityHeight?: number;
  /** 点击按钮的回调函数 */
  onClick?: (e: React.MouseEvent) => void;
  /** 自定义内容 */
  children?: React.ReactNode;
  /** 滚动动画的时长（毫秒） */
  duration?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const BackTop: React.FC<BackTopProps> = ({
  target,
  visibilityHeight = 400,
  onClick,
  children,
  duration = 450,
  className,
  style,
}) => {
  const [visible, setVisible] = useState(false);

  const getTargetElement = useCallback(() => {
    if (target) {
      return target();
    }
    // 尝试查找常见的滚动容器
    const mainContainer = document.querySelector('.myui-layout__main');
    if (mainContainer) {
      return mainContainer as HTMLElement;
    }
    return window;
  }, [target]);

  const getScrollTop = useCallback((element: HTMLElement | Window) => {
    if (element === window) {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
    return (element as HTMLElement).scrollTop;
  }, []);

  const scrollToTop = useCallback(() => {
    const targetElement = getTargetElement();
    if (!targetElement) return;

    const startTime = Date.now();
    const startScrollTop = getScrollTop(targetElement);

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const scroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);
      const currentScrollTop = startScrollTop * (1 - easeProgress);

      if (targetElement === window) {
        window.scrollTo(0, currentScrollTop);
      } else {
        (targetElement as HTMLElement).scrollTop = currentScrollTop;
      }

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  }, [duration, getScrollTop, getTargetElement]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      scrollToTop();
      onClick?.(e);
    },
    [onClick, scrollToTop]
  );

  useEffect(() => {
    const targetElement = getTargetElement();
    if (!targetElement) return;

    const handleScroll = () => {
      const scrollTop = getScrollTop(targetElement);
      setVisible(scrollTop >= visibilityHeight);
    };

    // 初始检查
    handleScroll();

    targetElement.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      targetElement.removeEventListener("scroll", handleScroll);
    };
  }, [getScrollTop, getTargetElement, visibilityHeight]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={cn("myui-back-top", className)}
          style={style}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          aria-label="回到顶部"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick(e as unknown as React.MouseEvent);
            }
          }}
        >
          {children || (
            <div className="myui-back-top__default">
              <Icon name="arrow-up" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

BackTop.displayName = "BackTop";

export default BackTop;
