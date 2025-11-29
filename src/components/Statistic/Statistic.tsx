import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/utils";
import { Icon } from "../Icon";
import "./Statistic.css";

export interface StatisticProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 数值 */
  value: number | string;
  /** 精度（小数位数） */
  precision?: number;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 是否显示千分位分隔符 */
  groupSeparator?: boolean;
  /** 自定义分隔符 */
  separator?: string;
  /** 小数点符号 */
  decimalSeparator?: string;
  /** 数值样式 */
  valueStyle?: React.CSSProperties;
  /** 是否加载中 */
  loading?: boolean;
  /** 趋势 */
  trend?: "up" | "down";
  /** 趋势颜色 */
  trendColor?: boolean;
  /** 是否开启动画 */
  animation?: boolean;
  /** 动画时长（毫秒） */
  animationDuration?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// 数值动画 Hook
function useCountUp(
  end: number,
  duration: number,
  enabled: boolean
): number {
  const [count, setCount] = useState(enabled ? 0 : end);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setCount(end);
      return;
    }

    const animate = (timestamp: number) => {
      if (startTime.current === null) {
        startTime.current = timestamp;
      }

      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(end * easeOutQuart);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [end, duration, enabled]);

  return count;
}

export const Statistic: React.FC<StatisticProps> = ({
  title,
  value,
  precision,
  prefix,
  suffix,
  groupSeparator = true,
  separator = ",",
  decimalSeparator = ".",
  valueStyle,
  loading = false,
  trend,
  trendColor = true,
  animation = false,
  animationDuration = 1000,
  className,
  style,
}) => {
  const isNumber = typeof value === "number";
  const numericValue = isNumber ? value : parseFloat(value as string);
  const animatedValue = useCountUp(
    isNaN(numericValue) ? 0 : numericValue,
    animationDuration,
    animation && !isNaN(numericValue)
  );

  // 格式化数值
  const formatValue = (val: number | string): string => {
    if (typeof val === "string" && isNaN(parseFloat(val))) {
      return val;
    }

    const num = animation ? animatedValue : (typeof val === "number" ? val : parseFloat(val));
    
    // 处理精度
    let formatted = precision !== undefined 
      ? num.toFixed(precision) 
      : String(num);

    // 处理千分位
    if (groupSeparator) {
      const parts = formatted.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      formatted = parts.join(decimalSeparator);
    } else if (decimalSeparator !== ".") {
      formatted = formatted.replace(".", decimalSeparator);
    }

    return formatted;
  };

  const trendIcon = trend === "up" ? "trending-up" : trend === "down" ? "trending-down" : null;

  return (
    <div
      className={cn(
        "myui-statistic",
        {
          "myui-statistic--loading": loading,
          "myui-statistic--up": trend === "up" && trendColor,
          "myui-statistic--down": trend === "down" && trendColor,
        },
        className
      )}
      style={style}
    >
      {title && <div className="myui-statistic__title">{title}</div>}
      
      <div className="myui-statistic__content" style={valueStyle}>
        {loading ? (
          <div className="myui-statistic__skeleton" />
        ) : (
          <>
            {prefix && <span className="myui-statistic__prefix">{prefix}</span>}
            
            {trend && trendIcon && (
              <span className="myui-statistic__trend">
                <Icon name={trendIcon} />
              </span>
            )}
            
            <span className="myui-statistic__value">
              {formatValue(value)}
            </span>
            
            {suffix && <span className="myui-statistic__suffix">{suffix}</span>}
          </>
        )}
      </div>
    </div>
  );
};

// 倒计时组件
export interface CountdownProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 目标时间（时间戳或 Date 对象） */
  value: number | Date;
  /** 格式化字符串 */
  format?: string;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 数值样式 */
  valueStyle?: React.CSSProperties;
  /** 倒计时完成回调 */
  onFinish?: () => void;
  /** 倒计时变化回调 */
  onChange?: (value: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Countdown: React.FC<CountdownProps> = ({
  title,
  value,
  format = "HH:mm:ss",
  prefix,
  suffix,
  valueStyle,
  onFinish,
  onChange,
  className,
  style,
}) => {
  const targetTime = value instanceof Date ? value.getTime() : value;
  const [remaining, setRemaining] = useState(() => Math.max(0, targetTime - Date.now()));
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);
      setRemaining(diff);
      onChange?.(diff);

      if (diff === 0 && !finishedRef.current) {
        finishedRef.current = true;
        onFinish?.();
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
    };

    tick();
    timerRef.current = setInterval(tick, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [targetTime, onChange, onFinish]);

  // 格式化时间
  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let result = format;
    result = result.replace(/DD/g, String(days).padStart(2, "0"));
    result = result.replace(/D/g, String(days));
    result = result.replace(/HH/g, String(hours).padStart(2, "0"));
    result = result.replace(/H/g, String(hours));
    result = result.replace(/mm/g, String(minutes).padStart(2, "0"));
    result = result.replace(/m/g, String(minutes));
    result = result.replace(/ss/g, String(seconds).padStart(2, "0"));
    result = result.replace(/s/g, String(seconds));

    return result;
  };

  return (
    <div className={cn("myui-statistic", className)} style={style}>
      {title && <div className="myui-statistic__title">{title}</div>}
      
      <div className="myui-statistic__content" style={valueStyle}>
        {prefix && <span className="myui-statistic__prefix">{prefix}</span>}
        <span className="myui-statistic__value">{formatTime(remaining)}</span>
        {suffix && <span className="myui-statistic__suffix">{suffix}</span>}
      </div>
    </div>
  );
};

Statistic.displayName = "Statistic";
Countdown.displayName = "Countdown";

export default Statistic;
