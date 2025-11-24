import React, { useState, useCallback, useRef, useEffect } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "../Icon";

export interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
  path?: string;
  children?: MenuItem[];
  onClick?: () => void;
}

export type MenuMode = "horizontal" | "vertical" | "inline";

export interface MenuProps {
  items: MenuItem[];
  mode?: MenuMode;
  selectedKey?: string;
  defaultSelectedKey?: string;
  openKeys?: string[];
  defaultOpenKeys?: string[];
  onSelect?: (key: string) => void;
  onOpenChange?: (openKeys: string[]) => void;
  className?: string;
  inlineIndent?: number;
  inlineCollapsed?: boolean;
  theme?: "light" | "dark";
}

interface SubMenuProps {
  item: MenuItem;
  mode: MenuMode;
  level: number;
  selectedKey?: string;
  openKeys: string[];
  onSelect: (key: string) => void;
  onOpenChange: (key: string, open: boolean) => void;
  inlineIndent: number;
  inlineCollapsed: boolean;
}

const SubMenu: React.FC<SubMenuProps> = ({
  item,
  mode,
  level,
  selectedKey,
  openKeys,
  onSelect,
  onOpenChange,
  inlineIndent,
  inlineCollapsed,
}) => {
  const isOpen = openKeys.includes(item.key);
  const [popupVisible, setPopupVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (mode !== "inline") {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setPopupVisible(true);
      }, 200);
    }
  };

  const handleMouseLeave = () => {
    if (mode !== "inline") {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setPopupVisible(false);
      }, 200);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleSubmenu = () => {
    if (mode === "inline") {
      onOpenChange(item.key, !isOpen);
    }
  };

  const paddingLeft = mode === "inline" ? level * inlineIndent : undefined;

  const submenuTitle = (
    <div
      className={clsx("menu-submenu-title", {
        "menu-submenu-title-collapsed": inlineCollapsed && level === 0,
      })}
      style={{ paddingLeft }}
      onClick={toggleSubmenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.icon && <Icon name={item.icon} className="menu-item-icon" />}
      {(!inlineCollapsed || level > 0) && (
        <span className="menu-title-content">{item.label}</span>
      )}
      {mode === "inline" && (!inlineCollapsed || level > 0) && (
        <Icon
          name="chevron-down"
          className={clsx("menu-submenu-arrow", {
            "menu-submenu-arrow-open": isOpen,
          })}
        />
      )}
      {mode !== "inline" && (
        <Icon name="chevron-right" className="menu-submenu-arrow" />
      )}
    </div>
  );

  const renderChildren = () => (
    <>
      {item.children?.map((child) => {
        if (child.children) {
          return (
            <SubMenu
              key={child.key}
              item={child}
              mode={mode}
              level={level + 1}
              selectedKey={selectedKey}
              openKeys={openKeys}
              onSelect={onSelect}
              onOpenChange={onOpenChange}
              inlineIndent={inlineIndent}
              inlineCollapsed={inlineCollapsed}
            />
          );
        }
        return (
          <MenuItemComponent
            key={child.key}
            item={child}
            mode={mode}
            level={level + 1}
            selectedKey={selectedKey}
            onSelect={onSelect}
            inlineIndent={inlineIndent}
            inlineCollapsed={inlineCollapsed}
          />
        );
      })}
    </>
  );

  if (mode === "inline") {
    return (
      <li
        className={clsx("menu-submenu", "menu-submenu-inline", {
          "menu-submenu-open": isOpen,
        })}
      >
        {submenuTitle}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.ul
              className="menu-sub menu-inline"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderChildren()}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    );
  }

  return (
    <li
      className={clsx("menu-submenu", `menu-submenu-${mode}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {submenuTitle}
      <AnimatePresence>
        {popupVisible && (
          <motion.ul
            className={clsx("menu-sub", `menu-${mode}`)}
            initial={{ opacity: 0, y: mode === "horizontal" ? -10 : 0, x: mode === "vertical" ? -10 : 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: mode === "horizontal" ? -10 : 0, x: mode === "vertical" ? -10 : 0 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {renderChildren()}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

interface MenuItemComponentProps {
  item: MenuItem;
  mode: MenuMode;
  level: number;
  selectedKey?: string;
  onSelect: (key: string) => void;
  inlineIndent: number;
  inlineCollapsed: boolean;
}

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  item,
  mode,
  level,
  selectedKey,
  onSelect,
  inlineIndent,
  inlineCollapsed,
}) => {
  const isSelected = selectedKey === item.key;
  const paddingLeft = mode === "inline" ? level * inlineIndent : undefined;

  const handleClick = () => {
    if (!item.disabled) {
      onSelect(item.key);
      item.onClick?.();
    }
  };

  return (
    <li
      className={clsx("menu-item", {
        "menu-item-selected": isSelected,
        "menu-item-disabled": item.disabled,
        "menu-item-danger": item.danger,
        "menu-item-collapsed": inlineCollapsed && level === 0,
      })}
      style={{ paddingLeft }}
      onClick={handleClick}
    >
      {item.icon && <Icon name={item.icon} className="menu-item-icon" />}
      {(!inlineCollapsed || level > 0) && (
        <span className="menu-title-content">{item.label}</span>
      )}
    </li>
  );
};

export const Menu: React.FC<MenuProps> = ({
  items,
  mode = "vertical",
  selectedKey: controlledSelectedKey,
  defaultSelectedKey,
  openKeys: controlledOpenKeys,
  defaultOpenKeys = [],
  onSelect,
  onOpenChange,
  className,
  inlineIndent = 24,
  inlineCollapsed = false,
  theme = "light",
}) => {
  const [selectedKey, setSelectedKey] = useState(
    controlledSelectedKey || defaultSelectedKey
  );
  const [openKeys, setOpenKeys] = useState<string[]>(
    controlledOpenKeys || defaultOpenKeys
  );

  useEffect(() => {
    if (controlledSelectedKey !== undefined) {
      setSelectedKey(controlledSelectedKey);
    }
  }, [controlledSelectedKey]);

  useEffect(() => {
    if (controlledOpenKeys !== undefined) {
      setOpenKeys(controlledOpenKeys);
    }
  }, [controlledOpenKeys]);

  const handleSelect = useCallback(
    (key: string) => {
      if (controlledSelectedKey === undefined) {
        setSelectedKey(key);
      }
      onSelect?.(key);
    },
    [controlledSelectedKey, onSelect]
  );

  const handleOpenChange = useCallback(
    (key: string, open: boolean) => {
      const newOpenKeys = open
        ? [...openKeys, key]
        : openKeys.filter((k) => k !== key);

      if (controlledOpenKeys === undefined) {
        setOpenKeys(newOpenKeys);
      }
      onOpenChange?.(newOpenKeys);
    },
    [openKeys, controlledOpenKeys, onOpenChange]
  );

  return (
    <ul
      className={clsx(
        "menu",
        `menu-${mode}`,
        `menu-${theme}`,
        {
          "menu-inline-collapsed": inlineCollapsed && mode === "inline",
        },
        className
      )}
    >
      {items.map((item) => {
        if (item.children) {
          return (
            <SubMenu
              key={item.key}
              item={item}
              mode={mode}
              level={0}
              selectedKey={selectedKey}
              openKeys={openKeys}
              onSelect={handleSelect}
              onOpenChange={handleOpenChange}
              inlineIndent={inlineIndent}
              inlineCollapsed={inlineCollapsed}
            />
          );
        }
        return (
          <MenuItemComponent
            key={item.key}
            item={item}
            mode={mode}
            level={0}
            selectedKey={selectedKey}
            onSelect={handleSelect}
            inlineIndent={inlineIndent}
            inlineCollapsed={inlineCollapsed}
          />
        );
      })}
    </ul>
  );
};
