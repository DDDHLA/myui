import React, {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";
import { Icon } from "../Icon";
import "./Carousel.css";

export interface CarouselProps {
  /** 轮播内容 */
  children: React.ReactNode;
  /** 是否自动播放 */
  autoplay?: boolean;
  /** 自动播放间隔（毫秒） */
  autoplaySpeed?: number;
  /** 是否显示指示点 */
  dots?: boolean;
  /** 指示点位置 */
  dotPosition?: "top" | "bottom" | "left" | "right";
  /** 是否显示箭头 */
  arrows?: boolean;
  /** 切换效果 */
  effect?: "slide" | "fade";
  /** 是否无限循环 */
  infinite?: boolean;
  /** 动画速度（毫秒） */
  speed?: number;
  /** 初始索引 */
  initialSlide?: number;
  /** 是否垂直显示 */
  vertical?: boolean;
  /** 切换前回调 */
  beforeChange?: (current: number, next: number) => void;
  /** 切换后回调 */
  afterChange?: (current: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface CarouselRef {
  /** 切换到指定索引 */
  goTo: (index: number) => void;
  /** 切换到下一张 */
  next: () => void;
  /** 切换到上一张 */
  prev: () => void;
  /** 暂停自动播放 */
  pause: () => void;
  /** 恢复自动播放 */
  resume: () => void;
}

export const Carousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      children,
      autoplay = false,
      autoplaySpeed = 3000,
      dots = true,
      dotPosition = "bottom",
      arrows = false,
      effect = "slide",
      infinite = true,
      speed = 300,
      initialSlide = 0,
      vertical = false,
      beforeChange,
      afterChange,
      className,
      style,
    },
    ref
  ) => {
    const slides = React.Children.toArray(children);
    const slideCount = slides.length;

    const [currentIndex, setCurrentIndex] = useState(initialSlide);
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [direction, setDirection] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // 清除定时器
    const clearTimer = useCallback(() => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, []);

    // 切换到指定索引
    const goTo = useCallback(
      (index: number) => {
        if (index === currentIndex) return;

        const nextIndex = infinite
          ? ((index % slideCount) + slideCount) % slideCount
          : Math.max(0, Math.min(index, slideCount - 1));

        if (nextIndex === currentIndex) return;

        setDirection(nextIndex > currentIndex ? 1 : -1);
        beforeChange?.(currentIndex, nextIndex);
        setCurrentIndex(nextIndex);
      },
      [currentIndex, slideCount, infinite, beforeChange]
    );

    // 下一张
    const next = useCallback(() => {
      const nextIndex = infinite
        ? (currentIndex + 1) % slideCount
        : Math.min(currentIndex + 1, slideCount - 1);
      goTo(nextIndex);
    }, [currentIndex, slideCount, infinite, goTo]);

    // 上一张
    const prev = useCallback(() => {
      const prevIndex = infinite
        ? (currentIndex - 1 + slideCount) % slideCount
        : Math.max(currentIndex - 1, 0);
      goTo(prevIndex);
    }, [currentIndex, slideCount, infinite, goTo]);

    // 暂停
    const pause = useCallback(() => {
      setIsPlaying(false);
      clearTimer();
    }, [clearTimer]);

    // 恢复
    const resume = useCallback(() => {
      if (autoplay) {
        setIsPlaying(true);
      }
    }, [autoplay]);

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      goTo,
      next,
      prev,
      pause,
      resume,
    }));

    // 自动播放
    useEffect(() => {
      if (isPlaying && slideCount > 1) {
        timerRef.current = setInterval(next, autoplaySpeed);
      }
      return clearTimer;
    }, [isPlaying, autoplaySpeed, next, slideCount, clearTimer]);

    // 切换后回调
    useEffect(() => {
      afterChange?.(currentIndex);
    }, [currentIndex, afterChange]);

    // 键盘导航
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!containerRef.current?.contains(document.activeElement)) return;

        if (vertical) {
          if (e.key === "ArrowUp") {
            e.preventDefault();
            prev();
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            next();
          }
        } else {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            prev();
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            next();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [vertical, next, prev]);

    // 动画变体
    const slideVariants = {
      enter: (dir: number) => ({
        x: vertical ? 0 : dir > 0 ? "100%" : "-100%",
        y: vertical ? (dir > 0 ? "100%" : "-100%") : 0,
        opacity: effect === "fade" ? 0 : 1,
      }),
      center: {
        x: 0,
        y: 0,
        opacity: 1,
      },
      exit: (dir: number) => ({
        x: vertical ? 0 : dir > 0 ? "-100%" : "100%",
        y: vertical ? (dir > 0 ? "-100%" : "100%") : 0,
        opacity: effect === "fade" ? 0 : 1,
      }),
    };

    const fadeVariants = {
      enter: { opacity: 0 },
      center: { opacity: 1 },
      exit: { opacity: 0 },
    };

    const isVerticalDots = dotPosition === "left" || dotPosition === "right";

    return (
      <div
        ref={containerRef}
        className={cn(
          "myui-carousel",
          `myui-carousel--${dotPosition}`,
          {
            "myui-carousel--vertical": vertical,
          },
          className
        )}
        style={style}
        tabIndex={0}
        onMouseEnter={autoplay ? pause : undefined}
        onMouseLeave={autoplay ? resume : undefined}
      >
        <div className="myui-carousel__container">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={effect === "fade" ? fadeVariants : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: speed / 1000, ease: "easeInOut" }}
              className="myui-carousel__slide"
            >
              {slides[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 箭头 */}
        {arrows && slideCount > 1 && (
          <>
            <button
              className={cn("myui-carousel__arrow myui-carousel__arrow--prev", {
                "myui-carousel__arrow--disabled":
                  !infinite && currentIndex === 0,
              })}
              onClick={prev}
              disabled={!infinite && currentIndex === 0}
              aria-label="上一张"
            >
              <Icon name={vertical ? "chevron-up" : "chevron-left"} />
            </button>
            <button
              className={cn("myui-carousel__arrow myui-carousel__arrow--next", {
                "myui-carousel__arrow--disabled":
                  !infinite && currentIndex === slideCount - 1,
              })}
              onClick={next}
              disabled={!infinite && currentIndex === slideCount - 1}
              aria-label="下一张"
            >
              <Icon name={vertical ? "chevron-down" : "chevron-right"} />
            </button>
          </>
        )}

        {/* 指示点 */}
        {dots && slideCount > 1 && (
          <div
            className={cn("myui-carousel__dots", {
              "myui-carousel__dots--vertical": isVerticalDots,
            })}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                className={cn("myui-carousel__dot", {
                  "myui-carousel__dot--active": index === currentIndex,
                })}
                onClick={() => goTo(index)}
                aria-label={`切换到第 ${index + 1} 张`}
                aria-current={index === currentIndex ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

export default Carousel;
