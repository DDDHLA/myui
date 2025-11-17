import { motion } from "framer-motion";
import { CalendarEvent } from "@/types";
import { cn } from "@/utils";

interface CalendarDayProps {
  date: Date;
  events: CalendarEvent[];
  isCurrent: boolean;
  isToday: boolean;
  onClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const CalendarDay = ({
  date,
  events,
  isCurrent,
  isToday,
  onClick,
  onEventClick,
}: CalendarDayProps) => {
  const day = date.getDate();
  const maxVisibleEvents = 3;
  const visibleEvents = events.slice(0, maxVisibleEvents);
  const hiddenCount = Math.max(0, events.length - maxVisibleEvents);

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

  return (
    <motion.div
      className={cn(
        "myui-calendar__day",
        !isCurrent && "myui-calendar__day--other-month",
        isToday && "myui-calendar__day--today"
      )}
      onClick={() => onClick(date)}
      whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="myui-calendar__day-header">
        <span className={cn("myui-calendar__day-number", isToday && "myui-calendar__day-number--today")}>
          {day}
        </span>
      </div>

      <div className="myui-calendar__day-events">
        {visibleEvents.map((event, index) => (
          <motion.div
            key={event.id}
            className="myui-calendar__day-event"
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
            whileHover={{ scale: 1.02, x: 2 }}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            style={{
              borderLeftColor: getCategoryColor(event.category),
            }}
            title={event.title}
          >
            <span className="myui-calendar__day-event-title">{event.title}</span>
            {event.time && <span className="myui-calendar__day-event-time">{event.time}</span>}
          </motion.div>
        ))}

        {hiddenCount > 0 && (
          <motion.div
            className="myui-calendar__day-more"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: visibleEvents.length * 0.05 }}
          >
            +{hiddenCount} {hiddenCount === 1 ? "more" : "items"}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CalendarDay;
