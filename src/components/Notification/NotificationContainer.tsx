import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notification } from './Notification';
import type { NotificationProps, NotificationPlacement } from './Notification';

interface NotificationContainerProps {
  notifications: NotificationProps[];
  placement: NotificationPlacement;
  onClose: (id: string) => void;
}

const getAnimationVariants = (placement: NotificationPlacement) => {
  const isRight = placement.includes('Right');
  const isTop = placement.includes('top');

  return {
    initial: {
      opacity: 0,
      x: isRight ? 400 : -400,
      y: 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      x: isRight ? 400 : -400,
      scale: 0.9,
    },
  };
};

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  placement,
  onClose,
}) => {
  const variants = getAnimationVariants(placement);

  return (
    <div className={`myui-notification-container myui-notification-container--${placement}`}>
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            layout
          >
            <Notification
              {...notification}
              onClose={() => onClose(notification.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
