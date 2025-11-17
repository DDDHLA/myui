import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import { CalendarEvent } from "@/types";
import { cn } from "@/utils";

interface EventSidebarProps {
  events: CalendarEvent[];
  currentDate: Date;
  onEventClick: (event: CalendarEvent) => void;
  onEventDelete: (id: string) => void;
  onCategoryFilter: (category: string | null) => void;
  filteredCategory: string | null;
  editable: boolean;
  locale: "en" | "zh" | "ja" | "ko";
}

const categoryIcons: Record<string, string> = {
  work: "💼",
  personal: "👤",
  meeting: "👥",
  birthday: "🎂",
  holiday: "🎉",
  custom: "📌",
};

const categoryLabels: Record<string, Record<string, string>> = {
  work: { en: "Work", zh: "工作", ja: "仕事", ko: "업무" },
  personal: { en: "Personal", zh: "个人", ja: "個人", ko: "개인" },
  meeting: { en: "Meeting", zh: "会议", ja: "会議", ko: "회의" },
  birthday: { en: "Birthday", zh: "生日", ja: "誕生日", ko: "생일" },
  holiday: { en: "Holiday", zh: "假期", ja: "休日", ko: "휴일" },
  custom: { en: "Custom", zh: "自定义", ja: "カスタム", ko: "사용자 정의" },
};

const EventSidebar = ({
  events,
  currentDate,
  onEventClick,
  onEventDelete,
  onCategoryFilter,
  filteredCategory,
  editable,
  locale,
}: EventSidebarProps) => {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  // 获取所有分类及计数
  const categoryCounts = events.reduce(
    (acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const getCategoryColor = (category: string): string => {
    const colorMap: Record<string, string> = {
      work: "#3b82f6",
      personal: "#10b981",
      meeting: "#f59e0b",
      birthday: "#ec4899",
      holiday: "#ef4444",
      custom: "#8b5cf6",
    };
    return colorMap[category] || "#6b7280";
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString(locale === "en" ? "en-US" : locale === "zh" ? "zh-CN" : "ja-JP", options);
  };

  const formatTime = (time?: string): string => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <motion.div
      className="myui-calendar__sidebar"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 日期信息 */}
      <div className="myui-calendar__sidebar-date">
        <h3 className="myui-calendar__sidebar-title">
          {locale === "zh" ? "所选日期" : "Selected Date"}
        </h3>
        <p className="myui-calendar__sidebar-date-value">{formatDate(currentDate)}</p>
      </div>

      {/* 分类过滤 */}
      <div className="myui-calendar__sidebar-section">
        <h4 className="myui-calendar__sidebar-section-title">
          {locale === "zh" ? "分类" : "Categories"}
        </h4>
        <div className="myui-calendar__sidebar-categories">
          <Button
            variant={filteredCategory === null ? "primary" : "ghost"}
            size="sm"
            onClick={() => onCategoryFilter(null)}
            fullWidth
            className="myui-calendar__sidebar-category-btn"
          >
            {locale === "zh" ? "全部" : "All"} ({events.length})
          </Button>
          {Object.entries(categoryCounts).map(([category, count]) => (
            <Button
              key={category}
              variant={filteredCategory === category ? "primary" : "ghost"}
              size="sm"
              onClick={() =>
                onCategoryFilter(
                  filteredCategory === category ? null : category
                )
              }
              fullWidth
              className="myui-calendar__sidebar-category-btn"
            >
              <span className="myui-calendar__sidebar-category-icon">
                {categoryIcons[category]}
              </span>
              {categoryLabels[category][locale]} ({count})
            </Button>
          ))}
        </div>
      </div>

      {/* 事件列表 */}
      <div className="myui-calendar__sidebar-section">
        <h4 className="myui-calendar__sidebar-section-title">
          {locale === "zh" ? "事项列表" : "Events"}
        </h4>

        <AnimatePresence mode="popLayout">
          {events.length === 0 ? (
            <motion.div
              className="myui-calendar__sidebar-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>{locale === "zh" ? "没有事项" : "No events"}</p>
            </motion.div>
          ) : (
            <div className="myui-calendar__sidebar-events">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className={cn(
                    "myui-calendar__sidebar-event",
                    event.completed && "myui-calendar__sidebar-event--completed",
                    expandedEventId === event.id && "myui-calendar__sidebar-event--expanded"
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    borderLeftColor: getCategoryColor(event.category),
                  }}
                >
                  <div
                    className="myui-calendar__sidebar-event-header"
                    onClick={() => setExpandedEventId(expandedEventId === event.id ? null : event.id)}
                  >
                    <div className="myui-calendar__sidebar-event-main">
                      <div className="myui-calendar__sidebar-event-title">
                        {event.completed && <span className="myui-calendar__sidebar-event-check">✓</span>}
                        <span>{event.title}</span>
                      </div>
                      {event.time && (
                        <div className="myui-calendar__sidebar-event-time">
                          🕐 {formatTime(event.time)}
                        </div>
                      )}
                    </div>
                    <span className="myui-calendar__sidebar-event-expand">
                      {expandedEventId === event.id ? "▼" : "▶"}
                    </span>
                  </div>

                  <AnimatePresence>
                    {expandedEventId === event.id && (
                      <motion.div
                        className="myui-calendar__sidebar-event-details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {event.description && (
                          <div className="myui-calendar__sidebar-event-detail">
                            <span className="myui-calendar__sidebar-event-label">
                              {locale === "zh" ? "描述:" : "Description:"}
                            </span>
                            <p>{event.description}</p>
                          </div>
                        )}

                        {event.location && (
                          <div className="myui-calendar__sidebar-event-detail">
                            <span className="myui-calendar__sidebar-event-label">
                              📍 {locale === "zh" ? "位置:" : "Location:"}
                            </span>
                            <p>{event.location}</p>
                          </div>
                        )}

                        {event.attendees && event.attendees.length > 0 && (
                          <div className="myui-calendar__sidebar-event-detail">
                            <span className="myui-calendar__sidebar-event-label">
                              👥 {locale === "zh" ? "参加者:" : "Attendees:"}
                            </span>
                            <p>{event.attendees.join(", ")}</p>
                          </div>
                        )}

                        {event.reminder && event.reminder !== "none" && (
                          <div className="myui-calendar__sidebar-event-detail">
                            <span className="myui-calendar__sidebar-event-label">
                              🔔 {locale === "zh" ? "提醒:" : "Reminder:"}
                            </span>
                            <p>{event.reminder}</p>
                          </div>
                        )}

                        <div className="myui-calendar__sidebar-event-actions">
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => onEventClick(event)}
                            disabled={!editable}
                          >
                            {locale === "zh" ? "编辑" : "Edit"}
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => onEventDelete(event.id)}
                            disabled={!editable}
                          >
                            {locale === "zh" ? "删除" : "Delete"}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default EventSidebar;
