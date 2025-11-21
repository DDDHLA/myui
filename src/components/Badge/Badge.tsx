import React from 'react';
import './style.css';

export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning';

export interface BadgeProps {
  count?: number | React.ReactNode;
  overflowCount?: number;
  dot?: boolean;
  status?: BadgeStatus;
  text?: string;
  color?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  count,
  overflowCount = 99,
  dot = false,
  status,
  text,
  color,
  children,
  className = '',
  style,
}) => {
  const isDot = dot;
  const hasStatus = status !== undefined;

  const getDisplayCount = () => {
    if (isDot) return '';
    if (typeof count === 'number' && count > overflowCount) {
      return `${overflowCount}+`;
    }
    return count;
  };

  const isZero = count === 0 || count === '0';
  const showBadge = !isZero || isDot || hasStatus;

  // Status Badge
  if (hasStatus) {
    return (
      <span className={`myui-badge myui-badge-status ${className}`} style={style}>
        <span
          className={`myui-badge-status-dot myui-badge-status-${status}`}
          style={color ? { backgroundColor: color } : undefined}
        />
        {text && <span className="myui-badge-status-text">{text}</span>}
      </span>
    );
  }

  // Regular Badge
  const badgeClassName = [
    'myui-badge-count',
    isDot ? 'myui-badge-dot' : '',
    className
  ].filter(Boolean).join(' ');

  const badgeStyle = color ? { backgroundColor: color, ...style } : style;

  return (
    <span className={`myui-badge ${!children ? 'myui-badge-not-a-wrapper' : ''}`}>
      {children}
      {showBadge && (
        <sup className={badgeClassName} style={badgeStyle}>
          {getDisplayCount()}
        </sup>
      )}
    </span>
  );
};

export default Badge;
