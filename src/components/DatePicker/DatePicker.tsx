import React, {
  forwardRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";
import { DatePickerProps, DatePickerMode } from "@/types";
import { Icon } from "../Icon";
import "./DatePicker.css";

// 日期格式化
function formatDate(
  date: Date | null,
  format: string = "YYYY-MM-DD"
): string {
  if (!date) return "";

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const pad = (n: number) => n.toString().padStart(2, "0");

  const result = format
    .replace("YYYY", year.toString())
    .replace("MM", pad(month))
    .replace("DD", pad(day))
    .replace("HH", pad(hours))
    .replace("mm", pad(minutes))
    .replace("ss", pad(seconds));

  return result;
}

// 解析日期字符串
function parseDate(dateStr: string | Date | null): Date | null {
  if (!dateStr) return null;
  if (dateStr instanceof Date) return dateStr;
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? null : parsed;
}

// 获取月份天数
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// 获取月份第一天是星期几
function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

// 判断是否同一天
function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// 判断日期是否在范围内
function isInRange(
  date: Date,
  start: Date | null,
  end: Date | null
): boolean {
  if (!start || !end) return false;
  const time = date.getTime();
  return time > start.getTime() && time < end.getTime();
}

// 本地化文本
const localeText = {
  zh: {
    months: [
      "一月", "二月", "三月", "四月", "五月", "六月",
      "七月", "八月", "九月", "十月", "十一月", "十二月"
    ],
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    weekdaysShort: ["日", "一", "二", "三", "四", "五", "六"],
    today: "今天",
    now: "此刻",
    clear: "清空",
    confirm: "确定",
    startDate: "开始日期",
    endDate: "结束日期",
    year: "年",
    month: "月",
  },
  en: {
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    weekdaysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    today: "Today",
    now: "Now",
    clear: "Clear",
    confirm: "OK",
    startDate: "Start date",
    endDate: "End date",
    year: "",
    month: "",
  },
};

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      value,
      defaultValue,
      onChange,
      range = false,
      rangeValue,
      defaultRangeValue,
      onRangeChange,
      mode: _mode = "date",
      picker = "date",
      format = "YYYY-MM-DD",
      placeholder,
      rangePlaceholder = ["开始日期", "结束日期"],
      showTime: _showTime = false,
      showToday = true,
      showNow = false,
      allowClear = true,
      disabled = false,
      disabledDate,
      presets,
      size = "md",
      error = false,
      bordered = true,
      open: controlledOpen,
      onOpenChange,
      placement = "bottomLeft",
      onFocus,
      onBlur,
      locale = "zh",
      inputReadOnly = false,
      startOfWeek = 1,
      label,
      helperText,
      ...props
    },
    ref
  ) => {
    const text = localeText[locale];
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 内部状态
    const [internalValue, setInternalValue] = useState<Date | null>(() =>
      parseDate(defaultValue ?? null)
    );
    const [internalRangeValue, setInternalRangeValue] = useState<
      [Date | null, Date | null]
    >(() => {
      if (defaultRangeValue) {
        return [
          parseDate(defaultRangeValue[0]),
          parseDate(defaultRangeValue[1]),
        ];
      }
      return [null, null];
    });

    const [isOpen, setIsOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(() => {
      const initialDate = parseDate(value ?? defaultValue ?? null) || new Date();
      return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
    });
    const [currentMode, setCurrentMode] = useState<DatePickerMode>(picker);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [rangeSelecting, setRangeSelecting] = useState<"start" | "end">("start");

    // 受控/非受控值
    const selectedDate = value !== undefined ? parseDate(value) : internalValue;
    const selectedRange = useMemo<[Date | null, Date | null]>(() => {
      if (rangeValue !== undefined) {
        return [parseDate(rangeValue[0]), parseDate(rangeValue[1])];
      }
      return internalRangeValue;
    }, [rangeValue, internalRangeValue]);

    const panelOpen = controlledOpen !== undefined ? controlledOpen : isOpen;


    // 处理打开/关闭
    const handleOpenChange = useCallback(
      (open: boolean) => {
        if (disabled) return;
        
        if (open) {
          // 打开时定位到选中日期
          const targetDate = range ? selectedRange[0] : selectedDate;
          if (targetDate) {
            setCurrentMonth(new Date(targetDate.getFullYear(), targetDate.getMonth(), 1));
          }
        }
        
        setIsOpen(open);
        onOpenChange?.(open);
      },
[disabled, onOpenChange, range, selectedRange, selectedDate]
    );


    // 点击外部关闭
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        const isContainerClick = containerRef.current && containerRef.current.contains(target);
        const isDropdownClick = dropdownRef.current && dropdownRef.current.contains(target);
        
        if (!isContainerClick && !isDropdownClick) {
          handleOpenChange(false);
        }
      };

      if (panelOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [panelOpen, handleOpenChange]);

    // 处理日期选择
    const handleDateSelect = useCallback(
      (date: Date) => {
        if (disabledDate?.(date)) return;

        if (range) {
          if (rangeSelecting === "start") {
            const newRange: [Date | null, Date | null] = [date, null];
            setInternalRangeValue(newRange);
            setRangeSelecting("end");
          } else {
            let start = selectedRange[0];
            let end = date;
            if (start && end < start) {
              [start, end] = [end, start];
            }
            const newRange: [Date | null, Date | null] = [start, end];
            setInternalRangeValue(newRange);
            onRangeChange?.(newRange, [
              formatDate(start, format),
              formatDate(end, format),
            ]);
            setRangeSelecting("start");
            handleOpenChange(false);
          }
        } else {
          setInternalValue(date);
          onChange?.(date, formatDate(date, format));
          handleOpenChange(false);
        }
      },
      [
        range,
        rangeSelecting,
        selectedRange,
        format,
        onChange,
        onRangeChange,
        handleOpenChange,
        disabledDate,
      ]
    );

    // 处理月份选择
    const handleMonthSelect = useCallback(
      (month: number) => {
        const newDate = new Date(currentMonth.getFullYear(), month, 1);
        setCurrentMonth(newDate);
        if (picker === "month") {
          setInternalValue(newDate);
          onChange?.(newDate, formatDate(newDate, format));
          handleOpenChange(false);
        } else {
          setCurrentMode("date");
        }
      },
      [currentMonth, picker, format, onChange, handleOpenChange]
    );

    // 处理年份选择
    const handleYearSelect = useCallback(
      (year: number) => {
        const newDate = new Date(year, currentMonth.getMonth(), 1);
        setCurrentMonth(newDate);
        if (picker === "year") {
          setInternalValue(newDate);
          onChange?.(newDate, formatDate(newDate, format));
          handleOpenChange(false);
        } else {
          setCurrentMode("month");
        }
      },
      [currentMonth, picker, format, onChange, handleOpenChange]
    );

    // 导航月份
    const navigateMonth = useCallback((delta: number) => {
      setCurrentMonth((prev) => {
        const newDate = new Date(prev);
        newDate.setMonth(newDate.getMonth() + delta);
        return newDate;
      });
    }, []);

    // 导航年份
    const navigateYear = useCallback((delta: number) => {
      setCurrentMonth((prev) => {
        const newDate = new Date(prev);
        newDate.setFullYear(newDate.getFullYear() + delta);
        return newDate;
      });
    }, []);

    // 清空
    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (range) {
          setInternalRangeValue([null, null]);
          onRangeChange?.([null, null], ["", ""]);
        } else {
          setInternalValue(null);
          onChange?.(null, "");
        }
      },
      [range, onChange, onRangeChange]
    );

    // 今天
    const handleToday = useCallback(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      handleDateSelect(today);
    }, [handleDateSelect]);

    // 预设选择
    const handlePresetSelect = useCallback(
      (presetValue: Date | [Date, Date]) => {
        if (Array.isArray(presetValue)) {
          const newRange: [Date | null, Date | null] = presetValue;
          setInternalRangeValue(newRange);
          onRangeChange?.(newRange, [
            formatDate(presetValue[0], format),
            formatDate(presetValue[1], format),
          ]);
          handleOpenChange(false);
        } else {
          handleDateSelect(presetValue);
        }
      },
      [format, onRangeChange, handleOpenChange, handleDateSelect]
    );

    // 生成日历天数
    const calendarDays = useMemo(() => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const daysInMonth = getDaysInMonth(year, month);
      const firstDay = getFirstDayOfMonth(year, month);

      // 调整起始日
      const adjustedFirstDay = startOfWeek === 1 
        ? (firstDay === 0 ? 6 : firstDay - 1)
        : firstDay;

      const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

      // 上月天数
      const prevMonthDays = getDaysInMonth(year, month - 1);
      for (let i = adjustedFirstDay - 1; i >= 0; i--) {
        days.push({
          date: new Date(year, month - 1, prevMonthDays - i),
          isCurrentMonth: false,
        });
      }

      // 当月天数
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          date: new Date(year, month, i),
          isCurrentMonth: true,
        });
      }

      // 下月天数
      const remaining = 42 - days.length;
      for (let i = 1; i <= remaining; i++) {
        days.push({
          date: new Date(year, month + 1, i),
          isCurrentMonth: false,
        });
      }

      return days;
    }, [currentMonth, startOfWeek]);

    // 生成年份列表
    const yearRange = useMemo(() => {
      const currentYear = currentMonth.getFullYear();
      const startYear = Math.floor(currentYear / 10) * 10 - 1;
      const years: number[] = [];
      for (let i = 0; i < 12; i++) {
        years.push(startYear + i);
      }
      return years;
    }, [currentMonth]);

    // 周标题
    const weekDays = useMemo(() => {
      const days = [...text.weekdaysShort];
      if (startOfWeek === 1) {
        days.push(days.shift()!);
      }
      return days;
    }, [text.weekdaysShort, startOfWeek]);

    // 显示值
    const displayValue = useMemo(() => {
      if (range) {
        const [start, end] = selectedRange;
        if (start && end) {
          return `${formatDate(start, format)} ~ ${formatDate(end, format)}`;
        }
        if (start) {
          return `${formatDate(start, format)} ~ `;
        }
        return "";
      }
      return formatDate(selectedDate, format);
    }, [range, selectedRange, selectedDate, format]);

    const hasValue = range
      ? selectedRange[0] !== null || selectedRange[1] !== null
      : selectedDate !== null;

    return (
      <div
        ref={ref}
        className={cn("myui-datepicker-wrapper", className)}
        {...props}
      >
        {label && (
          <label
            className={cn("myui-datepicker-label", {
              "myui-datepicker-label--disabled": disabled,
              "myui-datepicker-label--error": error,
            })}
          >
            {label}
          </label>
        )}

        <div ref={containerRef} className="myui-datepicker-container">
          {/* 输入框 */}
          <div
            className={cn(
              "myui-datepicker-input",
              `myui-datepicker-input--${size}`,
              {
                "myui-datepicker-input--focused": focused || panelOpen,
                "myui-datepicker-input--error": error,
                "myui-datepicker-input--disabled": disabled,
                "myui-datepicker-input--borderless": !bordered,
                "myui-datepicker-input--range": range,
              }
            )}
            onClick={() => handleOpenChange(!panelOpen)}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            tabIndex={disabled ? -1 : 0}
          >
            <span className="myui-datepicker-icon">
              <Icon name="calendar" />
            </span>

            {range ? (
              <div className="myui-datepicker-range-inputs">
                <input
                  type="text"
                  className="myui-datepicker-range-input"
                  placeholder={rangePlaceholder[0]}
                  value={selectedRange[0] ? formatDate(selectedRange[0], format) : ""}
                  readOnly={inputReadOnly}
                  disabled={disabled}
                  onChange={() => {}}
                />
                <span className="myui-datepicker-range-separator">~</span>
                <input
                  type="text"
                  className="myui-datepicker-range-input"
                  placeholder={rangePlaceholder[1]}
                  value={selectedRange[1] ? formatDate(selectedRange[1], format) : ""}
                  readOnly={inputReadOnly}
                  disabled={disabled}
                  onChange={() => {}}
                />
              </div>
            ) : (
              <input
                type="text"
                className="myui-datepicker-text-input"
                placeholder={placeholder || (locale === "zh" ? "请选择日期" : "Select date")}
                value={displayValue}
                readOnly={inputReadOnly}
                disabled={disabled}
                onChange={() => {}}
              />
            )}

            {allowClear && hasValue && !disabled && (
              <span
                className="myui-datepicker-clear"
                onClick={handleClear}
              >
                <Icon name="x" />
              </span>
            )}
          </div>

          {/* 下拉面板 */}
          <AnimatePresence>
            {panelOpen && (
              <motion.div
                ref={dropdownRef}
                className={cn(
                  "myui-datepicker-dropdown",
                  `myui-datepicker-dropdown--${placement}`
                )}
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
              >
                <div className="myui-datepicker-panel">
                  {/* 预设 */}
                  {presets && presets.length > 0 && (
                    <div className="myui-datepicker-presets">
                      {presets.map((preset, index) => (
                        <button
                          key={index}
                          type="button"
                          className="myui-datepicker-preset"
                          onClick={() => handlePresetSelect(preset.value)}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="myui-datepicker-content">
                    {/* 头部导航 */}
                    <div className="myui-datepicker-header">
                      <button
                        type="button"
                        className="myui-datepicker-nav-btn"
                        onClick={() => navigateYear(-1)}
                      >
                        <Icon name="chevrons-left" />
                      </button>
                      {currentMode === "date" && (
                        <button
                          type="button"
                          className="myui-datepicker-nav-btn"
                          onClick={() => navigateMonth(-1)}
                        >
                          <Icon name="chevron-left" />
                        </button>
                      )}

                      <div className="myui-datepicker-header-title">
                        <button
                          type="button"
                          className="myui-datepicker-header-btn"
                          onClick={() => setCurrentMode("year")}
                        >
                          {currentMonth.getFullYear()}
                          {text.year}
                        </button>
                        {currentMode === "date" && (
                          <button
                            type="button"
                            className="myui-datepicker-header-btn"
                            onClick={() => setCurrentMode("month")}
                          >
                            {text.months[currentMonth.getMonth()]}
                          </button>
                        )}
                      </div>

                      {currentMode === "date" && (
                        <button
                          type="button"
                          className="myui-datepicker-nav-btn"
                          onClick={() => navigateMonth(1)}
                        >
                          <Icon name="chevron-right" />
                        </button>
                      )}
                      <button
                        type="button"
                        className="myui-datepicker-nav-btn"
                        onClick={() => navigateYear(1)}
                      >
                        <Icon name="chevrons-right" />
                      </button>
                    </div>

                    {/* 日期面板 */}
                    {currentMode === "date" && (
                      <div className="myui-datepicker-body">
                        <div className="myui-datepicker-weekdays">
                          {weekDays.map((day, index) => (
                            <div key={index} className="myui-datepicker-weekday">
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="myui-datepicker-days">
                          {calendarDays.map(({ date, isCurrentMonth }, index) => {
                            const isDisabled = disabledDate?.(date) ?? false;
                            const isToday = isSameDay(date, new Date());
                            const isSelected = range
                              ? isSameDay(date, selectedRange[0]) ||
                                isSameDay(date, selectedRange[1])
                              : isSameDay(date, selectedDate);
                            const isRangeStart = range && isSameDay(date, selectedRange[0]);
                            const isRangeEnd = range && isSameDay(date, selectedRange[1]);
                            const inRange =
                              range &&
                              isInRange(
                                date,
                                selectedRange[0],
                                selectedRange[1] || hoverDate
                              );

                            return (
                              <button
                                key={index}
                                type="button"
                                className={cn("myui-datepicker-day", {
                                  "myui-datepicker-day--other": !isCurrentMonth,
                                  "myui-datepicker-day--today": isToday,
                                  "myui-datepicker-day--selected": isSelected,
                                  "myui-datepicker-day--disabled": isDisabled,
                                  "myui-datepicker-day--range-start": isRangeStart,
                                  "myui-datepicker-day--range-end": isRangeEnd,
                                  "myui-datepicker-day--in-range": inRange,
                                })}
                                disabled={isDisabled}
                                onClick={() => handleDateSelect(date)}
                                onMouseEnter={() => range && setHoverDate(date)}
                                onMouseLeave={() => range && setHoverDate(null)}
                              >
                                {date.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 月份面板 */}
                    {currentMode === "month" && (
                      <div className="myui-datepicker-months">
                        {text.months.map((month, index) => {
                          
                          const isSelected =
                            selectedDate &&
                            selectedDate.getFullYear() === currentMonth.getFullYear() &&
                            selectedDate.getMonth() === index;
                          const isCurrent =
                            new Date().getFullYear() === currentMonth.getFullYear() &&
                            new Date().getMonth() === index;

                          return (
                            <button
                              key={index}
                              type="button"
                              className={cn("myui-datepicker-month", {
                                "myui-datepicker-month--selected": isSelected,
                                "myui-datepicker-month--current": isCurrent,
                              })}
                              onClick={() => handleMonthSelect(index)}
                            >
                              {month}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* 年份面板 */}
                    {currentMode === "year" && (
                      <div className="myui-datepicker-years">
                        {yearRange.map((year) => {
                          const isSelected =
                            selectedDate && selectedDate.getFullYear() === year;
                          const isCurrent = new Date().getFullYear() === year;
                          const isOutOfRange =
                            year === yearRange[0] || year === yearRange[11];

                          return (
                            <button
                              key={year}
                              type="button"
                              className={cn("myui-datepicker-year", {
                                "myui-datepicker-year--selected": isSelected,
                                "myui-datepicker-year--current": isCurrent,
                                "myui-datepicker-year--other": isOutOfRange,
                              })}
                              onClick={() => handleYearSelect(year)}
                            >
                              {year}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* 底部 */}
                    {(showToday || showNow) && currentMode === "date" && (
                      <div className="myui-datepicker-footer">
                        {showToday && (
                          <button
                            type="button"
                            className="myui-datepicker-today-btn"
                            onClick={handleToday}
                          >
                            {text.today}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {helperText && (
          <div
            className={cn("myui-datepicker-helper", {
              "myui-datepicker-helper--error": error,
            })}
          >
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
