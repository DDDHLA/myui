import React, {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import { cn } from "@/utils";
import { Icon } from "../Icon";
import "./Carousel.css";

export interface CarouselProps {
  /** 轮播内容 */
  children: React.ReactNode;
  /** 是否自动播放 */
  autoplay?: boolean;
  /** 自动播放间隔(毫秒) */
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
  /** 动画速度(毫秒) */
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

    // 真实的幻灯片索引(0 到 slideCount-1)
    const [realIndex, setRealIndex] = useState(initialSlide);
    // 当前显示的索引(包括克隆元素,用于 transform 计算)
    const [currentIndex, setCurrentIndex] = useState(
      infinite ? initialSlide + 1 : initialSlide
    );
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // 构建渲染的幻灯片列表(包括克隆元素)
    const renderSlides = infinite
      ? [slides[slideCount - 1], ...slides, slides[0]]
      : slides;

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
        if (isTransitioning || index === realIndex) return;

        const nextIndex = infinite
          ? ((index % slideCount) + slideCount) % slideCount
          : Math.max(0, Math.min(index, slideCount - 1));

        if (nextIndex === realIndex) return;

        beforeChange?.(realIndex, nextIndex);
        setIsTransitioning(true);
        setRealIndex(nextIndex);
        setCurrentIndex(infinite ? nextIndex + 1 : nextIndex);
      },
      [realIndex, slideCount, infinite, beforeChange, isTransitioning]
    );

    // 下一张
    const next = useCallback(() => {
      if (isTransitioning) return;

      if (infinite) {
        const nextRealIndex = (realIndex + 1) % slideCount;
        beforeChange?.(realIndex, nextRealIndex);
        setIsTransitioning(true);
        setRealIndex(nextRealIndex);
        setCurrentIndex(currentIndex + 1);
      } else {
        if (realIndex < slideCount - 1) {
          const nextRealIndex = realIndex + 1;
          beforeChange?.(realIndex, nextRealIndex);
          setIsTransitioning(true);
          setRealIndex(nextRealIndex);
          setCurrentIndex(nextRealIndex);
        }
      }
    }, [realIndex, currentIndex, slideCount, infinite, beforeChange, isTransitioning]);

    // 上一张
    const prev = useCallback(() => {
      if (isTransitioning) return;

      if (infinite) {
        const prevRealIndex = (realIndex - 1 + slideCount) % slideCount;
        beforeChange?.(realIndex, prevRealIndex);
        setIsTransitioning(true);
        setRealIndex(prevRealIndex);
        setCurrentIndex(currentIndex - 1);
      } else {
        if (realIndex > 0) {
          const prevRealIndex = realIndex - 1;
          beforeChange?.(realIndex, prevRealIndex);
          setIsTransitioning(true);
          setRealIndex(prevRealIndex);
          setCurrentIndex(prevRealIndex);
        }
      }
    }, [realIndex, currentIndex, slideCount, infinite, beforeChange, isTransitioning]);

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

    // 处理过渡结束
    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;

      const handleTransitionEnd = () => {
        setIsTransitioning(false);

        if (infinite) {
          // 如果滚动到了克隆的最后一个元素(索引 slideCount + 1)
          if (currentIndex === slideCount + 1) {
            setCurrentIndex(1); // 瞬间跳到真实的第一个元素
          }
          // 如果滚动到了克隆的第一个元素(索引 0)
          else if (currentIndex === 0) {
            setCurrentIndex(slideCount); // 瞬间跳到真实的最后一个元素
          }
        }

        afterChange?.(realIndex);
      };

      track.addEventListener("transitionend", handleTransitionEnd);
      return () => track.removeEventListener("transitionend", handleTransitionEnd);
    }, [currentIndex, realIndex, slideCount, infinite, afterChange]);

    // 自动播放
    useEffect(() => {
      if (isPlaying && slideCount > 1) {
        timerRef.current = setInterval(next, autoplaySpeed);
      }
      return clearTimer;
    }, [isPlaying, autoplaySpeed, next, slideCount, clearTimer]);

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

    const isVerticalDots = dotPosition === "left" || dotPosition === "right";

    // 计算 transform 值
    const getTransform = () => {
      if (effect === "fade") return "translate(0, 0)";
      
      if (vertical) {
        return `translateY(-${currentIndex * 100}%)`;
      } else {
        return `translateX(-${currentIndex * 100}%)`;
      }
    };

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
          <div
            ref={trackRef}
            className="myui-carousel__track"
            style={{
              display: "flex",
              flexDirection: vertical ? "column" : "row",
              transform: getTransform(),
              transition: isTransitioning ? `transform ${speed}ms ease-in-out` : "none",
            }}
          >
            {effect === "fade" ? (
              // 淡入淡出效果:只渲染当前幻灯片
              slides.map((slide, index) => (
                <div
                  key={index}
                  className="myui-carousel__slide"
                  style={{
                    flex: "0 0 100%",
                    width: vertical ? "100%" : "100%",
                    height: vertical ? "100%" : "auto",
                    opacity: index === realIndex ? 1 : 0,
                    transition: isTransitioning ? `opacity ${speed}ms ease-in-out` : "none",
                    position: index === realIndex ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  {slide}
                </div>
              ))
            ) : (
              // 滑动效果:渲染所有幻灯片(包括克隆的)
              renderSlides.map((slide, index) => (
                <div
                  key={index}
                  className="myui-carousel__slide"
                  style={{
                    flex: "0 0 100%",
                    width: vertical ? "100%" : "100%",
                    height: vertical ? "100%" : "auto",
                  }}
                >
                  {slide}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 箭头 */}
        {arrows && slideCount > 1 && (
          <>
            <button
              className={cn("myui-carousel__arrow myui-carousel__arrow--prev", {
                "myui-carousel__arrow--disabled":
                  !infinite && realIndex === 0,
              })}
              onClick={prev}
              disabled={!infinite && realIndex === 0}
              aria-label="上一张"
            >
              <Icon name={vertical ? "chevron-up" : "chevron-left"} />
            </button>
            <button
              className={cn("myui-carousel__arrow myui-carousel__arrow--next", {
                "myui-carousel__arrow--disabled":
                  !infinite && realIndex === slideCount - 1,
              })}
              onClick={next}
              disabled={!infinite && realIndex === slideCount - 1}
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
                  "myui-carousel__dot--active": index === realIndex,
                })}
                onClick={() => goTo(index)}
                aria-label={`切换到第 ${index + 1} 张`}
                aria-current={index === realIndex ? "true" : undefined}
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
