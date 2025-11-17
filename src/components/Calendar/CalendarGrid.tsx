import { useMemo } from "react";
import { motion } from "framer-motion";
import { CalendarEvent, Size } from "@/types";
import CalendarDay from "./CalendarDay";

interface CalendarGridProps {
  days: Date[];
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  showWeekends: boolean;
  startOfWeek: 0 | 1;
  locale: "en" | "zh" | "ja" | "ko";
  size: Size;
}

const dayNames: Record<string, string[]> = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  zh: ["日", "一", "二", "三", "四", "五", "六"],
  ja: ["日", "月", "火", "水", "木", "金", "土"],
  ko: ["일", "월", "화", "수", "목", "금", "토"],
};

// 调整日期显示顺序
function getAdjustedDayNames(
  names: string[],
  startOfWeek: 0 | 1
): string[] {
  if (startOfWeek === 1) {
    // Monday first
    return [names[1], names[2], names[3], names[4], names[5], names[6], names[0]];
  }
  return names; // Sunday first
}

const CalendarGrid = ({
  days,
  currentDate,
  events,
  onDateClick,
  onEventClick,
  showWeekends,
  startOfWeek,
  locale,
  size,
}: CalendarGridProps) => {
  const weekDays = getAdjustedDayNames(dayNames[locale], startOfWeek);

  // 调整日期顺序（如果需要）
  const adjustedDays = useMemo(() => {
    if (startOfWeek === 1) {
      const adjusted = [];
      for (let i = 0; i < days.length; i++) {
        adjusted.push(days[i]);
      }
      return adjusted;
    }
    return days;
  }, [days, startOfWeek]);

  // 获取该日期的事件
  function getEventsForDate(date: Date): CalendarEvent[] {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  }

  // 检查是否是当前月份
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  // 检查是否是今天
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  return (
    <motion.div
      className={`myui-calendar__grid myui-calendar__grid--${size}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* 周次标题 */}
      <div className="myui-calendar__week-header">
        {weekDays.map((day) => (
          <div key={day} className="myui-calendar__week-day">
            {day}
          </div>
        ))}
      </div>

      {/* 日期网格 */}
      <div className="myui-calendar__days-grid">
        {adjustedDays.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const isCurrent = isCurrentMonth(date);
          const isCurrentDay = isToday(date);

          if (!showWeekends) {
            const dayOfWeek = date.getDay();
            // 如果不显示周末且该日期是周末，则跳过
            if (dayOfWeek === 0 || dayOfWeek === 6) {
              return null;
            }
          }

          return (
            <CalendarDay
              key={index}
              date={date}
              events={dayEvents}
              isCurrent={isCurrent}
              isToday={isCurrentDay}
              onClick={onDateClick}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default CalendarGrid;
