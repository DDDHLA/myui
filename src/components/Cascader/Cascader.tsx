import React, {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";
import { Icon } from "../Icon";
import "./Cascader.css";

export interface CascaderOption {
  /** 选项值 */
  value: string | number;
  /** 选项标签 */
  label: string;
  /** 子选项 */
  children?: CascaderOption[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为叶子节点 */
  isLeaf?: boolean;
}

export interface CascaderProps {
  /** 选项数据 */
  options: CascaderOption[];
  /** 当前值 */
  value?: (string | number)[];
  /** 默认值 */
  defaultValue?: (string | number)[];
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否允许清空 */
  allowClear?: boolean;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 尺寸 */
  size?: "small" | "default" | "large";
  /** 次级菜单展开方式 */
  expandTrigger?: "click" | "hover";
  /** 选择即改变 */
  changeOnSelect?: boolean;
  /** 自定义显示 */
  displayRender?: (labels: string[], selectedOptions: CascaderOption[]) => string;
  /** 分隔符 */
  separator?: string;
  /** 值变化回调 */
  onChange?: (value: (string | number)[], selectedOptions: CascaderOption[]) => void;
  /** 下拉框显示隐藏回调 */
  onDropdownVisibleChange?: (visible: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 错误状态 */
  error?: boolean;
  /** 弹出层类名 */
  popupClassName?: string;
}

export const Cascader = forwardRef<HTMLDivElement, CascaderProps>(
  (
    {
      options,
      value,
      defaultValue,
      placeholder = "请选择",
      disabled = false,
      allowClear = true,
      showSearch = false,
      size = "default",
      expandTrigger = "click",
      changeOnSelect = false,
      displayRender,
      separator = " / ",
      onChange,
      onDropdownVisibleChange,
      className,
      style,
      error = false,
      popupClassName,
    },
    _ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<(string | number)[]>(defaultValue || []);
    const [activeValue, setActiveValue] = useState<(string | number)[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedValue = value !== undefined ? value : internalValue;

    // 获取选中的选项
    const getSelectedOptions = useCallback(
      (val: (string | number)[]): CascaderOption[] => {
        const result: CascaderOption[] = [];
        let currentOptions = options;

        for (const v of val) {
          const option = currentOptions.find((opt) => opt.value === v);
          if (option) {
            result.push(option);
            currentOptions = option.children || [];
          } else {
            break;
          }
        }

        return result;
      },
      [options]
    );

    const selectedOptions = useMemo(
      () => getSelectedOptions(selectedValue),
      [selectedValue, getSelectedOptions]
    );

    // 获取显示文本
    const displayText = useMemo(() => {
      if (selectedOptions.length === 0) return "";
      const labels = selectedOptions.map((opt) => opt.label);
      if (displayRender) {
        return displayRender(labels, selectedOptions);
      }
      return labels.join(separator);
    }, [selectedOptions, displayRender, separator]);

    // 获取各级菜单
    const getMenus = useCallback(() => {
      const menus: CascaderOption[][] = [options];
      let currentOptions = options;

      for (const v of activeValue) {
        const option = currentOptions.find((opt) => opt.value === v);
        if (option?.children && option.children.length > 0) {
          menus.push(option.children);
          currentOptions = option.children;
        } else {
          break;
        }
      }

      return menus;
    }, [options, activeValue]);

    const menus = useMemo(() => getMenus(), [getMenus]);

    // 处理打开/关闭
    const handleOpenChange = useCallback(
      (open: boolean) => {
        if (disabled) return;
        setIsOpen(open);
        onDropdownVisibleChange?.(open);

        if (open) {
          setActiveValue([...selectedValue]);
          if (showSearch) {
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        } else {
          setSearchValue("");
        }
      },
      [disabled, onDropdownVisibleChange, selectedValue, showSearch]
    );

    // 处理选项点击
    const handleOptionClick = useCallback(
      (option: CascaderOption, level: number) => {
        if (option.disabled) return;

        const newActiveValue = [...activeValue.slice(0, level), option.value];
        setActiveValue(newActiveValue);

        const isLeaf = option.isLeaf !== undefined ? option.isLeaf : !option.children?.length;

        if (isLeaf || changeOnSelect) {
          const newSelectedOptions = getSelectedOptions(newActiveValue);

          if (value === undefined) {
            setInternalValue(newActiveValue);
          }
          onChange?.(newActiveValue, newSelectedOptions);

          if (isLeaf) {
            handleOpenChange(false);
          }
        }
      },
      [activeValue, changeOnSelect, getSelectedOptions, handleOpenChange, onChange, value]
    );

    // 处理选项悬停
    const handleOptionHover = useCallback(
      (option: CascaderOption, level: number) => {
        if (expandTrigger !== "hover" || option.disabled) return;

        const newActiveValue = [...activeValue.slice(0, level), option.value];
        setActiveValue(newActiveValue);
      },
      [activeValue, expandTrigger]
    );

    // 处理清空
    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (value === undefined) {
          setInternalValue([]);
        }
        onChange?.([], []);
        setActiveValue([]);
      },
      [onChange, value]
    );

    // 点击外部关闭
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          handleOpenChange(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, handleOpenChange]);

    // 搜索过滤
    const flattenOptions = useMemo(() => {
      if (!showSearch || !searchValue) return null;

      const result: { path: CascaderOption[]; labels: string[] }[] = [];

      const traverse = (opts: CascaderOption[], path: CascaderOption[], labels: string[]) => {
        for (const opt of opts) {
          const newPath = [...path, opt];
          const newLabels = [...labels, opt.label];

          if (!opt.children?.length) {
            result.push({ path: newPath, labels: newLabels });
          } else {
            traverse(opt.children, newPath, newLabels);
          }
        }
      };

      traverse(options, [], []);

      return result.filter((item) =>
        item.labels.some((label) =>
          label.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }, [options, searchValue, showSearch]);

    const handleSearchOptionClick = useCallback(
      (path: CascaderOption[]) => {
        const newValue = path.map((opt) => opt.value);
        if (value === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue, path);
        handleOpenChange(false);
      },
      [handleOpenChange, onChange, value]
    );

    return (
      <div
        ref={containerRef}
        className={cn(
          "myui-cascader",
          `myui-cascader--${size}`,
          {
            "myui-cascader--disabled": disabled,
            "myui-cascader--open": isOpen,
            "myui-cascader--error": error,
          },
          className
        )}
        style={style}
      >
        <div
          className="myui-cascader__selector"
          onClick={() => handleOpenChange(!isOpen)}
        >
          {showSearch && isOpen ? (
            <input
              ref={inputRef}
              className="myui-cascader__search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={displayText || placeholder}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className={cn("myui-cascader__placeholder", {
                "myui-cascader__placeholder--hidden": !!displayText,
              })}
            >
              {displayText || placeholder}
            </span>
          )}

          <span className="myui-cascader__suffix">
            {allowClear && displayText && !disabled && (
              <span className="myui-cascader__clear" onClick={handleClear}>
                <Icon name="x" />
              </span>
            )}
            <span
              className={cn("myui-cascader__arrow", {
                "myui-cascader__arrow--open": isOpen,
              })}
            >
              <Icon name="chevron-down" />
            </span>
          </span>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={cn("myui-cascader__dropdown", popupClassName)}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {showSearch && searchValue ? (
                <div className="myui-cascader__search-panel">
                  {flattenOptions && flattenOptions.length > 0 ? (
                    flattenOptions.map((item, index) => (
                      <div
                        key={index}
                        className="myui-cascader__search-option"
                        onClick={() => handleSearchOptionClick(item.path)}
                      >
                        {item.labels.join(separator)}
                      </div>
                    ))
                  ) : (
                    <div className="myui-cascader__empty">无匹配结果</div>
                  )}
                </div>
              ) : (
                <div className="myui-cascader__menus">
                  {menus.map((menu, level) => (
                    <ul key={level} className="myui-cascader__menu">
                      {menu.map((option) => {
                        const isActive = activeValue[level] === option.value;
                        const isSelected = selectedValue[level] === option.value;
                        const hasChildren = option.children && option.children.length > 0;

                        return (
                          <li
                            key={option.value}
                            className={cn("myui-cascader__option", {
                              "myui-cascader__option--active": isActive,
                              "myui-cascader__option--selected": isSelected,
                              "myui-cascader__option--disabled": option.disabled,
                            })}
                            onClick={() => handleOptionClick(option, level)}
                            onMouseEnter={() => handleOptionHover(option, level)}
                          >
                            <span className="myui-cascader__option-label">
                              {option.label}
                            </span>
                            {hasChildren && (
                              <span className="myui-cascader__option-arrow">
                                <Icon name="chevron-right" />
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Cascader.displayName = "Cascader";

export default Cascader;
