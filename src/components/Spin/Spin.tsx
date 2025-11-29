import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils';
import './Spin.css';

export interface SpinProps extends React.HTMLAttributes<HTMLDivElement> {
  spinning?: boolean;
  size?: 'small' | 'medium' | 'large';
  tip?: React.ReactNode;
  delay?: number;
  indicator?: React.ReactNode;
  fullscreen?: boolean;
  children?: React.ReactNode;
}

const DefaultSpinner: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'medium' }) => (
  <svg className={`myui-spin__icon myui-spin__icon--${size}`} viewBox="0 0 50 50">
    <circle
      className="myui-spin__circle"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </svg>
);

export const Spin: React.FC<SpinProps> = ({
  spinning = true,
  size = 'medium',
  tip,
  delay = 0,
  indicator,
  fullscreen = false,
  children,
  className,
  style,
  ...props
}) => {
  const [showSpin, setShowSpin] = useState(delay === 0 ? spinning : false);

  useEffect(() => {
    if (spinning && delay > 0) {
      const timer = setTimeout(() => {
        setShowSpin(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShowSpin(spinning);
    }
  }, [spinning, delay]);

  const spinElement = (
    <motion.div
      className={cn('myui-spin', `myui-spin--${size}`)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {indicator || <DefaultSpinner size={size} />}
      {tip && <div className="myui-spin__tip">{tip}</div>}
    </motion.div>
  );

  if (fullscreen) {
    return (
      <AnimatePresence>
        {showSpin && (
          <motion.div
            className="myui-spin-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {spinElement}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (!children) {
    return showSpin ? spinElement : null;
  }

  return (
    <div className={cn('myui-spin-container', className)} style={style} {...props}>
      <AnimatePresence>
        {showSpin && (
          <div className="myui-spin-wrapper">
            {spinElement}
          </div>
        )}
      </AnimatePresence>
      <div className={cn('myui-spin-content', { 'myui-spin-blur': showSpin })}>
        {children}
      </div>
    </div>
  );
};

Spin.displayName = 'Spin';
