import React from "react";
import clsx from "clsx";
import { Icon } from "../Icon";

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  maxItems?: number;
  itemRender?: (item: BreadcrumbItem, index: number) => React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = "/",
  className,
  maxItems,
  itemRender,
}) => {
  const displayItems = React.useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));

    return [
      firstItem,
      { label: "...", path: undefined },
      ...lastItems,
    ];
  }, [items, maxItems]);

  const handleItemClick = (item: BreadcrumbItem, e: React.MouseEvent) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
  };

  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    if (itemRender) {
      return itemRender(item, index);
    }

    const content = (
      <>
        {item.icon && <Icon name={item.icon} className="breadcrumb-icon" />}
        <span>{item.label}</span>
      </>
    );

    if (isLast) {
      return (
        <span className="breadcrumb-item-text breadcrumb-item-current">
          {content}
        </span>
      );
    }

    if (item.path || item.onClick) {
      return (
        <a
          href={item.path || "#"}
          className="breadcrumb-item-link"
          onClick={(e) => handleItemClick(item, e)}
        >
          {content}
        </a>
      );
    }

    return <span className="breadcrumb-item-text">{content}</span>;
  };

  return (
    <nav className={clsx("breadcrumb", className)} aria-label="breadcrumb">
      <ol className="breadcrumb-list">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === "...";

          return (
            <li
              key={index}
              className={clsx("breadcrumb-item", {
                "breadcrumb-item-active": isLast,
                "breadcrumb-item-ellipsis": isEllipsis,
              })}
            >
              {renderItem(item, index, isLast)}
              {!isLast && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
