import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { CalendarEvent, EventCategory, EventReminder, SelectOption, Color } from "@/types";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, "id">) => void;
  onDelete?: () => void;
  event?: CalendarEvent | null;
  selectedDate: Date | null;
  editable: boolean;
  locale: "en" | "zh" | "ja" | "ko";
}

const categoryOptions: Record<string, SelectOption[]> = {
  en: [
    { label: "Work", value: "work" },
    { label: "Personal", value: "personal" },
    { label: "Meeting", value: "meeting" },
    { label: "Birthday", value: "birthday" },
    { label: "Holiday", value: "holiday" },
    { label: "Custom", value: "custom" },
  ],
  zh: [
    { label: "工作", value: "work" },
    { label: "个人", value: "personal" },
    { label: "会议", value: "meeting" },
    { label: "生日", value: "birthday" },
    { label: "假期", value: "holiday" },
    { label: "自定义", value: "custom" },
  ],
  ja: [
    { label: "仕事", value: "work" },
    { label: "個人", value: "personal" },
    { label: "会議", value: "meeting" },
    { label: "誕生日", value: "birthday" },
    { label: "休日", value: "holiday" },
    { label: "カスタム", value: "custom" },
  ],
  ko: [
    { label: "업무", value: "work" },
    { label: "개인", value: "personal" },
    { label: "회의", value: "meeting" },
    { label: "생일", value: "birthday" },
    { label: "휴일", value: "holiday" },
    { label: "사용자 정의", value: "custom" },
  ],
};

const reminderOptions: Record<string, SelectOption[]> = {
  en: [
    { label: "None", value: "none" },
    { label: "5 minutes before", value: "5min" },
    { label: "15 minutes before", value: "15min" },
    { label: "30 minutes before", value: "30min" },
    { label: "1 hour before", value: "1hour" },
    { label: "1 day before", value: "1day" },
  ],
  zh: [
    { label: "无", value: "none" },
    { label: "提前5分钟", value: "5min" },
    { label: "提前15分钟", value: "15min" },
    { label: "提前30分钟", value: "30min" },
    { label: "提前1小时", value: "1hour" },
    { label: "提前1天", value: "1day" },
  ],
  ja: [
    { label: "なし", value: "none" },
    { label: "5分前", value: "5min" },
    { label: "15分前", value: "15min" },
    { label: "30分前", value: "30min" },
    { label: "1時間前", value: "1hour" },
    { label: "1日前", value: "1day" },
  ],
  ko: [
    { label: "없음", value: "none" },
    { label: "5분 전", value: "5min" },
    { label: "15분 전", value: "15min" },
    { label: "30분 전", value: "30min" },
    { label: "1시간 전", value: "1hour" },
    { label: "1일 전", value: "1day" },
  ],
};

const colorOptions: Record<string, SelectOption[]> = {
  en: [
    { label: "Blue (Primary)", value: "primary" },
    { label: "Green (Success)", value: "success" },
    { label: "Amber (Warning)", value: "warning" },
    { label: "Red (Danger)", value: "danger" },
    { label: "Cyan (Info)", value: "info" },
    { label: "Gray", value: "gray" },
  ],
  zh: [
    { label: "蓝色（主要）", value: "primary" },
    { label: "绿色（成功）", value: "success" },
    { label: "琥珀色（警告）", value: "warning" },
    { label: "红色（危险）", value: "danger" },
    { label: "青色（信息）", value: "info" },
    { label: "灰色", value: "gray" },
  ],
  ja: [
    { label: "青（プライマリ）", value: "primary" },
    { label: "緑（成功）", value: "success" },
    { label: "琥珀（警告）", value: "warning" },
    { label: "赤（危険）", value: "danger" },
    { label: "シアン（情報）", value: "info" },
    { label: "グレー", value: "gray" },
  ],
  ko: [
    { label: "파란색（기본）", value: "primary" },
    { label: "녹색（성공）", value: "success" },
    { label: "호박색（경고）", value: "warning" },
    { label: "빨간색（위험）", value: "danger" },
    { label: "청록색（정보）", value: "info" },
    { label: "회색", value: "gray" },
  ],
};

const EventModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  event,
  selectedDate,
  editable,
  locale,
}: EventModalProps) => {
  const [formData, setFormData] = useState<Omit<CalendarEvent, "id">>({
    title: "",
    description: "",
    date: selectedDate || new Date(),
    time: "",
    endTime: "",
    category: "personal",
    color: "primary",
    reminder: "none",
    completed: false,
    recurrence: "none",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // 初始化表单
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description || "",
        date: event.date,
        time: event.time || "",
        endTime: event.endTime || "",
        category: event.category,
        color: event.color,
        reminder: event.reminder || "none",
        completed: event.completed || false,
        recurrence: event.recurrence || "none",
        attendees: event.attendees || [],
        location: event.location || "",
      });
    } else if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        date: selectedDate,
      }));
    }
    setErrors({});
  }, [event, selectedDate, isOpen]);

  // 验证表单
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = locale === "zh" ? "请输入标题" : "Please enter a title";
    }

    if (formData.time && formData.endTime && formData.time >= formData.endTime) {
      newErrors.endTime =
        locale === "zh" ? "结束时间应晚于开始时间" : "End time must be after start time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, locale]);

  // 处理保存
  const handleSave = useCallback(() => {
    if (!validateForm()) return;
    onSave(formData);
  }, [formData, validateForm, onSave]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="myui-calendar__modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ isolation: 'isolate' }}
    >
      <motion.div
        className="myui-calendar__modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ isolation: 'isolate' }}
      >
        <div className="myui-calendar__modal-header">
          <h3 className="myui-calendar__modal-title">
            {event ? (locale === "zh" ? "编辑事项" : "Edit Event") : locale === "zh" ? "新建事项" : "New Event"}
          </h3>
          <button className="myui-calendar__modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="myui-calendar__modal-content">
          {/* 标题 */}
          <div className="myui-calendar__modal-group">
            <label className="myui-calendar__modal-label">
              {locale === "zh" ? "标题" : "Title"} *
            </label>
            <Input
              placeholder={locale === "zh" ? "输入事项标题" : "Enter event title"}
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
              error={!!errors.title}
              helperText={errors.title}
            />
          </div>

          {/* 描述 */}
          <div className="myui-calendar__modal-group">
            <label className="myui-calendar__modal-label">
              {locale === "zh" ? "描述" : "Description"}
            </label>
            <textarea
              className="myui-calendar__modal-textarea"
              placeholder={locale === "zh" ? "输入事项描述" : "Enter event description"}
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          {/* 日期时间 */}
          <div className="myui-calendar__modal-group">
            <label className="myui-calendar__modal-label">
              {locale === "zh" ? "日期" : "Date"}
            </label>
            <Input
              type="date"
              value={formData.date instanceof Date ? formData.date.toISOString().split("T")[0] : formData.date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: new Date(e.target.value) })}
            />
          </div>

          <div className="myui-calendar__modal-row">
            <div className="myui-calendar__modal-group myui-calendar__modal-group--half">
              <label className="myui-calendar__modal-label">
                {locale === "zh" ? "开始时间" : "Start Time"}
              </label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div className="myui-calendar__modal-group myui-calendar__modal-group--half">
              <label className="myui-calendar__modal-label">
                {locale === "zh" ? "结束时间" : "End Time"}
              </label>
              <Input
                type="time"
                value={formData.endTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, endTime: e.target.value })}
                error={!!errors.endTime}
                helperText={errors.endTime}
              />
            </div>
          </div>

          {/* 分类 */}
          <div className="myui-calendar__modal-group">
            <label className="myui-calendar__modal-label">
              {locale === "zh" ? "分类" : "Category"}
            </label>
            <Select
              options={categoryOptions[locale]}
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value as EventCategory })}
              placeholder={locale === "zh" ? "选择分类" : "Select category"}
            />
          </div>

          {/* 颜色 */}
          <div className="myui-calendar__modal-group">
            <label className="myui-calendar__modal-label">
              {locale === "zh" ? "颜色" : "Color"}
            </label>
            <Select
              options={colorOptions[locale]}
              value={formData.color}
              onChange={(value) => setFormData({ ...formData, color: value as Color })}
              placeholder={locale === "zh" ? "选择颜色" : "Select color"}
            />
          </div>

          {/* 提醒 */}
          <div className="myui-calendar__modal-group">
            <label className="myui-calendar__modal-label">
              {locale === "zh" ? "提醒" : "Reminder"}
            </label>
            <Select
              options={reminderOptions[locale]}
              value={formData.reminder}
              onChange={(value) => setFormData({ ...formData, reminder: value as EventReminder })}
              placeholder={locale === "zh" ? "选择提醒" : "Select reminder"}
            />
          </div>

          {/* 位置 */}
          <div className="myui-calendar__modal-group">
            <label className="myui-calendar__modal-label">
              {locale === "zh" ? "位置" : "Location"}
            </label>
            <Input
              placeholder={locale === "zh" ? "输入事项位置" : "Enter event location"}
              value={formData.location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* 完成状态 */}
          <div className="myui-calendar__modal-checkbox">
            <input
              type="checkbox"
              id="completed"
              checked={formData.completed}
              onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
            />
            <label htmlFor="completed">
              {locale === "zh" ? "标记为完成" : "Mark as completed"}
            </label>
          </div>
        </div>

        <div className="myui-calendar__modal-footer">
          <Button variant="ghost" onClick={onClose}>
            {locale === "zh" ? "取消" : "Cancel"}
          </Button>
          {event && onDelete && (
            <Button variant="danger" onClick={onDelete}>
              {locale === "zh" ? "删除" : "Delete"}
            </Button>
          )}
          <Button variant="primary" onClick={handleSave} disabled={!editable}>
            {locale === "zh" ? "保存" : "Save"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;
