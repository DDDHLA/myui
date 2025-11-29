import React, { useState, useCallback, useMemo, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";
import { Icon } from "../Icon";
import "./Collapse.css";

// Context
interface CollapseContextValue {
  activeKeys: string[];
  togglePanel: (key: string) => void;
  accordion: boolean;
  expandIcon?: React.ReactNode;
  expandIconPosition: "start" | "end";
  bordered: boolean;
  ghost: boolean;
  size: "small" | "default" | "large";
  collapsible: "header" | "icon" | "disabled";
}

const CollapseContext = createContext<CollapseContextValue | null>(null);

export interface CollapseProps {
  /** 当前激活的面板 key */
  activeKey?: string | string[];
  /** 默认激活的面板 key */
  defaultActiveKey?: string | string[];
  /** 手风琴模式（每次只展开一个） */
  accordion?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 幽灵模式（无边框背景） */
  ghost?: boolean;
  /** 自定义展开图标 */
  expandIcon?: React.ReactNode | ((panelProps: { isActive: boolean }) => React.ReactNode);
  /** 展开图标位置 */
  expandIconPosition?: "start" | "end";
  /** 尺寸 */
  size?: "small" | "default" | "large";
  /** 可折叠触发区域 */
  collapsible?: "header" | "icon" | "disabled";
  /** 切换回调 */
  onChange?: (activeKey: string | string[]) => void;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface CollapsePanelProps {
  /** 面板唯一标识 */
  panelKey: string;
  /** 面板标题 */
  header: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示箭头 */
  showArrow?: boolean;
  /** 自定义展开图标 */
  expandIcon?: React.ReactNode | ((panelProps: { isActive: boolean }) => React.ReactNode);
  /** 额外内容（显示在标题右侧） */
  extra?: React.ReactNode;
  /** 强制渲染内容（即使未展开） */
  forceRender?: boolean;
  /** 可折叠触发区域 */
  collapsible?: "header" | "icon" | "disabled";
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const CollapsePanel: React.FC<CollapsePanelProps> = ({
  panelKey,
  header,
  disabled = false,
  showArrow = true,
  expandIcon,
  extra,
  forceRender = false,
  collapsible: panelCollapsible,
  children,
  className,
  style,
}) => {
  const context = useContext(CollapseContext);
  
  if (!context) {
    throw new Error("CollapsePanel must be used within a Collapse");
  }

  const {
    activeKeys,
    togglePanel,
    expandIcon: contextExpandIcon,
    expandIconPosition,
    bordered,
    ghost,
    size,
    collapsible: contextCollapsible,
  } = context;

  const isActive = activeKeys.includes(panelKey);
  const collapsible = panelCollapsible ?? contextCollapsible;
  const isDisabled = disabled || collapsible === "disabled";
  const finalExpandIcon = expandIcon ?? contextExpandIcon;

  const handleHeaderClick = () => {
    if (isDisabled || collapsible === "icon") return;
    togglePanel(panelKey);
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisabled) return;
    togglePanel(panelKey);
  };

  const renderExpandIcon = () => {
    if (!showArrow) return null;

    const iconContent = typeof finalExpandIcon === "function"
      ? finalExpandIcon({ isActive })
      : finalExpandIcon ?? <Icon name="chevron-right" />;

    return (
      <span
        className={cn("myui-collapse-panel__arrow", {
          "myui-collapse-panel__arrow--active": isActive,
          "myui-collapse-panel__arrow--clickable": collapsible === "icon",
        })}
        onClick={collapsible === "icon" ? handleIconClick : undefined}
      >
        {iconContent}
      </span>
    );
  };

  return (
    <div
      className={cn(
        "myui-collapse-panel",
        `myui-collapse-panel--${size}`,
        {
          "myui-collapse-panel--active": isActive,
          "myui-collapse-panel--disabled": isDisabled,
          "myui-collapse-panel--bordered": bordered,
          "myui-collapse-panel--ghost": ghost,
        },
        className
      )}
      style={style}
    >
      <div
        className={cn("myui-collapse-panel__header", {
          "myui-collapse-panel__header--clickable": !isDisabled && collapsible !== "icon",
        })}
        onClick={handleHeaderClick}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-expanded={isActive}
        aria-disabled={isDisabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!isDisabled && collapsible !== "icon") {
              togglePanel(panelKey);
            }
          }
        }}
      >
        {expandIconPosition === "start" && renderExpandIcon()}
        
        <div className="myui-collapse-panel__title">{header}</div>
        
        {extra && <div className="myui-collapse-panel__extra">{extra}</div>}
        
        {expandIconPosition === "end" && renderExpandIcon()}
      </div>

      <AnimatePresence initial={false}>
        {(isActive || forceRender) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="myui-collapse-panel__content-wrapper"
          >
            <div className="myui-collapse-panel__content">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Collapse: React.FC<CollapseProps> & {
  Panel: typeof CollapsePanel;
} = ({
  activeKey,
  defaultActiveKey,
  accordion = false,
  bordered = true,
  ghost = false,
  expandIcon,
  expandIconPosition = "start",
  size = "default",
  collapsible = "header",
  onChange,
  children,
  className,
  style,
}) => {
  // 初始化 activeKeys
  const getInitialKeys = (): string[] => {
    if (activeKey !== undefined) {
      return Array.isArray(activeKey) ? activeKey : [activeKey];
    }
    if (defaultActiveKey !== undefined) {
      return Array.isArray(defaultActiveKey) ? defaultActiveKey : [defaultActiveKey];
    }
    return [];
  };

  const [internalActiveKeys, setInternalActiveKeys] = useState<string[]>(getInitialKeys);

  // 受控模式
  const activeKeys = useMemo(() => {
    return activeKey !== undefined
      ? (Array.isArray(activeKey) ? activeKey : [activeKey])
      : internalActiveKeys;
  }, [activeKey, internalActiveKeys]);

  const togglePanel = useCallback((key: string) => {
    let newKeys: string[];

    if (accordion) {
      newKeys = activeKeys.includes(key) ? [] : [key];
    } else {
      newKeys = activeKeys.includes(key)
        ? activeKeys.filter((k) => k !== key)
        : [...activeKeys, key];
    }

    if (activeKey === undefined) {
      setInternalActiveKeys(newKeys);
    }

    onChange?.(accordion ? (newKeys[0] ?? "") : newKeys);
  }, [activeKeys, accordion, activeKey, onChange]);

  const contextValue: CollapseContextValue = {
    activeKeys,
    togglePanel,
    accordion,
    expandIcon: typeof expandIcon === "function" ? undefined : expandIcon,
    expandIconPosition,
    bordered,
    ghost,
    size,
    collapsible,
  };

  return (
    <CollapseContext.Provider value={contextValue}>
      <div
        className={cn(
          "myui-collapse",
          `myui-collapse--${size}`,
          {
            "myui-collapse--bordered": bordered,
            "myui-collapse--ghost": ghost,
          },
          className
        )}
        style={style}
      >
        {children}
      </div>
    </CollapseContext.Provider>
  );
};

Collapse.Panel = CollapsePanel;
Collapse.displayName = "Collapse";
CollapsePanel.displayName = "CollapsePanel";

export default Collapse;
