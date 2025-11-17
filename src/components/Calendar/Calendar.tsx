import {
  forwardRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/utils";
import { CalendarProps, CalendarEvent, CalendarView } from "@/types";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventModal from "./EventModal";
import EventSidebar from "./EventSidebar";
import "./Calendar.css";

// 获取指定月份的所有日期
function getCalendarDays(year: number, month: number, startOfWeek: 0 | 1 = 1) {
  const firstDay = new Date(year, month, 1);

  // 计算开始星期几
  const startDate = new Date(firstDay);
  const dayOfWeek = firstDay.getDay();
  const offset = startOfWeek === 0 ? dayOfWeek : (dayOfWeek - 1 + 7) % 7;
  startDate.setDate(startDate.getDate() - offset);

  const days: Date[] = [];
  const current = new Date(startDate);

  while (days.length < 42) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
}

// 检查是否是同一天
function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

// 获取该日期的所有事件
function getEventsForDate(
  events: CalendarEvent[] | undefined,
  date: Date
): CalendarEvent[] {
  if (!events) return [];
  return events.filter((event) => isSameDay(event.date, date));
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      view = "month",
      onViewChange,
      events = [],
      onEventCreate,
      onEventUpdate,
      onEventDelete,
      onEventClick,
      selectedDate,
      onDateChange,
      size = "md",
      variant = "default",
      editable = true,
      showWeekends = true,
      startOfWeek = 1,
      locale = "zh",
      sidebar = true,
      simple = false,
      ...props
    },
    ref
  ) => {
    // 简单模式配置
    const effectiveEditable = simple ? false : editable;
    const effectiveSidebar = simple ? false : sidebar;

    // 状态管理
    const [currentDate, setCurrentDate] = useState(
      selectedDate ? new Date(selectedDate) : new Date()
    );
    const [currentView, setCurrentView] = useState<CalendarView>(view);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null);
    const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
    const [filteredCategory, setFilteredCategory] = useState<string | null>(null);

    // 处理视图变化
    const handleViewChange = useCallback(
      (newView: CalendarView) => {
        setCurrentView(newView);
        onViewChange?.(newView);
      },
      [onViewChange]
    );

    // 处理日期变化
    const handleDateChange = useCallback(
      (date: Date) => {
        setCurrentDate(date);
        onDateChange?.(date);
      },
      [onDateChange]
    );

    // 处理日期点击 - 打开事件创建模态框
    const handleDateClick = useCallback(
      (date: Date) => {
        if (!effectiveEditable) return;
        setSelectedEventDate(date);
        setEditingEvent(null);
        setIsModalOpen(true);
      },
      [effectiveEditable]
    );

    // 处理事件点击
    const handleEventClick = useCallback(
      (event: CalendarEvent) => {
        onEventClick?.(event);
        setEditingEvent(event);
        setIsModalOpen(true);
      },
      [onEventClick]
    );

    // 处理事件创建或更新
    const handleEventSave = useCallback(
      (eventData: Omit<CalendarEvent, "id">) => {
        if (editingEvent) {
          onEventUpdate?.(editingEvent.id, eventData);
        } else {
          const newEvent: Omit<CalendarEvent, "id"> = {
            ...eventData,
            date: selectedEventDate || new Date(),
          };
          onEventCreate?.(newEvent);
        }
        setIsModalOpen(false);
        setEditingEvent(null);
        setSelectedEventDate(null);
      },
      [editingEvent, selectedEventDate, onEventCreate, onEventUpdate]
    );

    // 处理事件删除
    const handleEventDelete = useCallback(
      (id: string) => {
        onEventDelete?.(id);
        setIsModalOpen(false);
        setEditingEvent(null);
      },
      [onEventDelete]
    );

    // 获取日历天数
    const calendarDays = useMemo(
      () => getCalendarDays(currentDate.getFullYear(), currentDate.getMonth(), startOfWeek),
      [currentDate, startOfWeek]
    );

    // 筛选事件
    const filteredEvents = useMemo(() => {
      if (!filteredCategory) return events;
      return events.filter((event) => event.category === filteredCategory);
    }, [events, filteredCategory]);


    // 获取所选日期的事件
    const selectedDateEvents = useMemo(
      () => {
        const dateToCheck = selectedEventDate || currentDate;
        return getEventsForDate(filteredEvents, dateToCheck);
      },
      [filteredEvents, selectedEventDate, currentDate]
    );

    return (
      <div
        ref={ref}
        className={cn("myui-calendar", `myui-calendar--${variant}`, `myui-calendar--${size}`, className)}
        {...props}
      >
        <div className="myui-calendar__container">
          {/* 头部 */}
          <CalendarHeader
            currentDate={currentDate}
            onDateChange={handleDateChange}
            currentView={currentView}
            onViewChange={simple ? undefined : handleViewChange}
            locale={locale}
          />

          <div className="myui-calendar__content">
            {/* 日历网格 */}
            <div className="myui-calendar__main">
              <CalendarGrid
                days={calendarDays}
                currentDate={currentDate}
                events={filteredEvents}
                onDateClick={handleDateClick}
                onEventClick={handleEventClick}
                showWeekends={showWeekends}
                startOfWeek={startOfWeek}
                locale={locale}
                size={size}
              />
            </div>

            {/* 侧边栏 */}
            {effectiveSidebar && (
              <div className="myui-calendar__sidebar">
                <EventSidebar
                  events={selectedDateEvents}
                  currentDate={selectedEventDate || currentDate}
                  onEventClick={handleEventClick}
                  onEventDelete={handleEventDelete}
                  onCategoryFilter={setFilteredCategory}
                  filteredCategory={filteredCategory}
                  editable={effectiveEditable}
                  locale={locale}
                />
              </div>
            )}
          </div>
        </div>

        {/* 事件模态框 */}
        <AnimatePresence>
          {isModalOpen && (
            <EventModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleEventSave}
              onDelete={editingEvent ? () => handleEventDelete(editingEvent.id) : undefined}
              event={editingEvent}
              selectedDate={selectedEventDate}
              editable={effectiveEditable}
              locale={locale}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Calendar.displayName = "Calendar";

export default Calendar;
