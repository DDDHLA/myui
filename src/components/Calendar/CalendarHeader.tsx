import { useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { CalendarView } from "@/types";

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
  locale: "en" | "zh" | "ja" | "ko";
}

const monthNames: Record<string, string[]> = {
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  zh: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  ko: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
};

const viewLabels: Record<CalendarView, Record<string, string>> = {
  month: { en: "Month", zh: "月", ja: "月", ko: "월" },
  week: { en: "Week", zh: "周", ja: "週", ko: "주" },
  day: { en: "Day", zh: "天", ja: "日", ko: "일" },
  year: { en: "Year", zh: "年", ja: "年", ko: "년" },
};

const CalendarHeader = ({
  currentDate,
  onDateChange,
  currentView,
  onViewChange,
  locale,
}: CalendarHeaderProps) => {
  const monthName = monthNames[locale][currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const handlePrevious = useCallback(() => {
    const newDate = new Date(currentDate);
    if (currentView === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else if (currentView === "day") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (currentView === "year") {
      newDate.setFullYear(newDate.getFullYear() - 1);
    }
    onDateChange(newDate);
  }, [currentDate, currentView, onDateChange]);

  const handleNext = useCallback(() => {
    const newDate = new Date(currentDate);
    if (currentView === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else if (currentView === "day") {
      newDate.setDate(newDate.getDate() + 1);
    } else if (currentView === "year") {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    onDateChange(newDate);
  }, [currentDate, currentView, onDateChange]);

  const handleToday = useCallback(() => {
    onDateChange(new Date());
  }, [onDateChange]);

  return (
    <motion.div
      className="myui-calendar__header"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="myui-calendar__header-navigation">
        <div className="myui-calendar__header-left">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            className="myui-calendar__header-btn"
          >
            ← {locale === "zh" ? "上月" : "Prev"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToday}
            className="myui-calendar__header-btn"
          >
            {locale === "zh" ? "今天" : "Today"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            className="myui-calendar__header-btn"
          >
            {locale === "zh" ? "下月" : "Next"} →
          </Button>
        </div>

        <div className="myui-calendar__header-title">
          <motion.h2
            key={`${year}-${currentDate.getMonth()}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="myui-calendar__header-date"
          >
            {monthName} {year}
          </motion.h2>
        </div>

        <div className="myui-calendar__header-views">
          {(["month", "week", "day", "year"] as const).map((v) => (
            <Button
              key={v}
              variant={currentView === v ? "primary" : "ghost"}
              size="sm"
              onClick={() => onViewChange(v)}
              className="myui-calendar__header-view-btn"
            >
              {viewLabels[v][locale]}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarHeader;
