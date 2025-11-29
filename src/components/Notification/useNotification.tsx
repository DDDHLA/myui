import ReactDOM from 'react-dom/client';
import { NotificationContainer } from './NotificationContainer';
import type { NotificationProps, NotificationPlacement } from './Notification';

interface NotificationConfig {
  placement?: NotificationPlacement;
  duration?: number;
  maxCount?: number;
  top?: number;
  bottom?: number;
}

interface NotificationItem extends NotificationProps {
  id: string;
}

let globalConfig: NotificationConfig = {
  placement: 'topRight',
  duration: 4500,
  maxCount: 5,
  top: 24,
  bottom: 24,
};

const containers = new Map<NotificationPlacement, {
  root: ReactDOM.Root;
  element: HTMLDivElement;
  notifications: NotificationItem[];
  update: (notifications: NotificationItem[]) => void;
}>();

const getContainer = (placement: NotificationPlacement) => {
  if (containers.has(placement)) {
    return containers.get(placement)!;
  }

  const element = document.createElement('div');
  element.className = 'myui-notification-wrapper';
  document.body.appendChild(element);

  const root = ReactDOM.createRoot(element);
  const notifications: NotificationItem[] = [];

  const update = (newNotifications: NotificationItem[]) => {
    root.render(
      <NotificationContainer
        notifications={newNotifications}
        placement={placement}
        onClose={(id) => {
          const container = containers.get(placement);
          if (container) {
            const filtered = container.notifications.filter(n => n.id !== id);
            container.notifications = filtered;
            container.update(filtered);
          }
        }}
      />
    );
  };

  const container = { root, element, notifications, update };
  containers.set(placement, container);

  return container;
};

const open = (config: NotificationProps) => {
  const placement = globalConfig.placement || 'topRight';
  const duration = config.duration ?? globalConfig.duration ?? 4500;
  const maxCount = globalConfig.maxCount || 5;

  const id = config.key || `notification-${Date.now()}-${Math.random()}`;
  const container = getContainer(placement);

  const notification: NotificationItem = {
    ...config,
    id,
    duration,
  };

  container.notifications.push(notification);

  // 限制最大数量
  if (container.notifications.length > maxCount) {
    container.notifications.shift();
  }

  container.update([...container.notifications]);

  return id;
};

const close = (id: string) => {
  containers.forEach((container) => {
    const filtered = container.notifications.filter(n => n.id !== id);
    if (filtered.length !== container.notifications.length) {
      container.notifications = filtered;
      container.update(filtered);
    }
  });
};

const destroy = (placement?: NotificationPlacement) => {
  if (placement) {
    const container = containers.get(placement);
    if (container) {
      container.root.unmount();
      document.body.removeChild(container.element);
      containers.delete(placement);
    }
  } else {
    containers.forEach((container) => {
      container.root.unmount();
      document.body.removeChild(container.element);
    });
    containers.clear();
  }
};

const config = (options: NotificationConfig) => {
  globalConfig = { ...globalConfig, ...options };
};

export const notification = {
  open,
  success: (config: Omit<NotificationProps, 'type'>) => open({ ...config, type: 'success' }),
  error: (config: Omit<NotificationProps, 'type'>) => open({ ...config, type: 'error' }),
  info: (config: Omit<NotificationProps, 'type'>) => open({ ...config, type: 'info' }),
  warning: (config: Omit<NotificationProps, 'type'>) => open({ ...config, type: 'warning' }),
  close,
  destroy,
  config,
};

export const useNotification = () => {
  return notification;
};
