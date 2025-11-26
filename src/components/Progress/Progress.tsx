import React from 'react';
import './style.css';

export interface ProgressProps {
  /** 当前进度百分比 (0-100) */
  percent?: number;
  /** 进度条类型 */
  type?: 'line' | 'circle' | 'dashboard';
  /** 进度条状态 */
  status?: 'normal' | 'success' | 'error' | 'warning';
  /** 是否显示进度文字 */
  showInfo?: boolean;
  /** 进度条宽度 */
  strokeWidth?: number;
  /** 进度条颜色 */
  strokeColor?: string;
  /** 尾部进度条颜色 */
  trailColor?: string;
  /** 圆形进度条尺寸 */
  width?: number;
  /** 自定义进度文字格式 */
  format?: (percent?: number) => React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    success: '#52c41a',
    error: '#ff4d4f',
    warning: '#faad14',
    normal: '#1890ff',
  };
  return colors[status] || colors.normal;
};

const LineProgress: React.FC<ProgressProps> = ({
  percent = 0,
  status = 'normal',
  showInfo = true,
  strokeWidth = 8,
  strokeColor,
  trailColor: _trailColor = '#f0f0f0',
  format,
}) => {
  const actualPercent = Math.min(100, Math.max(0, percent));
  const color = strokeColor || getStatusColor(status);

  const defaultFormat = (p?: number) => {
    if (status === 'success') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    if (status === 'error') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    }
    return `${p}%`;
  };

  return (
    <div className="progress progress--line">
      <div className="progress__outer">
        <div className="progress__inner">
          <div
            className="progress__bg"
            style={{
              width: `${actualPercent}%`,
              height: strokeWidth,
              backgroundColor: color,
            }}
          />
        </div>
      </div>
      {showInfo && (
        <div className={`progress__text progress__text--${status}`}>
          {format ? format(actualPercent) : defaultFormat(actualPercent)}
        </div>
      )}
    </div>
  );
};

const CircleProgress: React.FC<ProgressProps> = ({
  percent = 0,
  status = 'normal',
  showInfo = true,
  strokeWidth = 6,
  strokeColor,
  trailColor = '#f0f0f0',
  width = 120,
  format,
  type = 'circle',
}) => {
  const actualPercent = Math.min(100, Math.max(0, percent));
  const color = strokeColor || getStatusColor(status);
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (actualPercent / 100) * circumference;

  const isDashboard = type === 'dashboard';
  const startAngle = isDashboard ? 135 : 0;
  const endAngle = isDashboard ? 270 : 360;
  const dashboardGap = isDashboard ? (360 - endAngle) : 0;

  const defaultFormat = (p?: number) => {
    if (status === 'success') {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    if (status === 'error') {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    }
    return (
      <div className="progress__circle-text-content">
        <div className="progress__circle-percent">{p}%</div>
      </div>
    );
  };

  return (
    <div className="progress progress--circle" style={{ width, height: width }}>
      <svg width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
        {/* 背景圆环 */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke={trailColor}
          strokeWidth={strokeWidth}
          transform={`rotate(${startAngle} ${width / 2} ${width / 2})`}
          strokeDasharray={isDashboard ? `${circumference * (endAngle / 360)} ${circumference}` : undefined}
        />
        {/* 进度圆环 */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={isDashboard ? offset * (endAngle / 360) + circumference * (dashboardGap / 360) : offset}
          transform={`rotate(${startAngle} ${width / 2} ${width / 2})`}
          className="progress__circle-path"
        />
      </svg>
      {showInfo && (
        <div className={`progress__circle-text progress__text--${status}`}>
          {format ? format(actualPercent) : defaultFormat(actualPercent)}
        </div>
      )}
    </div>
  );
};

export const Progress: React.FC<ProgressProps> = (props) => {
  const { type = 'line', className = '', style } = props;

  const progressClassName = [
    'progress-wrapper',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={progressClassName} style={style}>
      {type === 'line' ? (
        <LineProgress {...props} />
      ) : (
        <CircleProgress {...props} />
      )}
    </div>
  );
};

Progress.displayName = 'Progress';
