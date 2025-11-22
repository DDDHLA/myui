import React from 'react';
import './style.css';

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface StepItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: StepStatus;
  disabled?: boolean;
}

export interface StepsProps {
  current?: number;
  status?: StepStatus;
  direction?: 'horizontal' | 'vertical';
  size?: 'default' | 'small';
  labelPlacement?: 'horizontal' | 'vertical';
  items?: StepItem[];
  onChange?: (current: number) => void;
  className?: string;
  style?: React.CSSProperties;
  progressDot?: boolean | ((iconDot: React.ReactNode, { index, status, title, description }: { index: number; status: StepStatus; title: string; description?: string }) => React.ReactNode);
  type?: 'default' | 'navigation';
}

const getStepStatus = (
  index: number,
  current: number,
  status?: StepStatus,
  itemStatus?: StepStatus
): StepStatus => {
  if (itemStatus) return itemStatus;
  if (index < current) return 'finish';
  if (index === current) return status || 'process';
  return 'wait';
};

const getStepIcon = (
  index: number,
  stepStatus: StepStatus,
  icon?: React.ReactNode,
  progressDot?: StepsProps['progressDot']
) => {
  if (progressDot) {
    const dotElement = <span className="myui-steps-icon-dot" />;
    if (typeof progressDot === 'function') {
      return progressDot(dotElement, { index, status: stepStatus, title: '', description: '' });
    }
    return dotElement;
  }

  if (icon) return icon;

  if (stepStatus === 'finish') {
    return <span className="myui-steps-icon-check">✓</span>;
  }

  if (stepStatus === 'error') {
    return <span className="myui-steps-icon-error">✕</span>;
  }

  return <span className="myui-steps-icon-number">{index + 1}</span>;
};

export const Steps: React.FC<StepsProps> = ({
  current = 0,
  status,
  direction = 'horizontal',
  size = 'default',
  labelPlacement = 'horizontal',
  items = [],
  onChange,
  className = '',
  style,
  progressDot = false,
  type = 'default',
}) => {
  const handleStepClick = (index: number, item: StepItem) => {
    if (item.disabled) return;
    onChange?.(index);
  };

  const stepsClassName = [
    'myui-steps',
    `myui-steps-${direction}`,
    `myui-steps-${size}`,
    `myui-steps-label-${labelPlacement}`,
    `myui-steps-${type}`,
    progressDot ? 'myui-steps-dot' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={stepsClassName} style={style}>
      {items.map((item, index) => {
        const stepStatus = getStepStatus(index, current, status, item.status);
        const isLast = index === items.length - 1;
        const isClickable = onChange && !item.disabled;

        const stepClassName = [
          'myui-steps-item',
          `myui-steps-item-${stepStatus}`,
          isClickable ? 'myui-steps-item-clickable' : '',
          item.disabled ? 'myui-steps-item-disabled' : '',
          isLast ? 'myui-steps-item-last' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div
            key={index}
            className={stepClassName}
            onClick={() => handleStepClick(index, item)}
          >
            <div className="myui-steps-item-container">
              <div className="myui-steps-item-tail" />
              <div className="myui-steps-item-icon">
                {getStepIcon(index, stepStatus, item.icon, progressDot)}
              </div>
              <div className="myui-steps-item-content">
                <div className="myui-steps-item-title">{item.title}</div>
                {item.description && (
                  <div className="myui-steps-item-description">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
