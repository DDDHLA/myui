import {
  ReactNode,
  HTMLAttributes,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
} from "react";

// 基础类型
export type Size = "sm" | "md" | "lg";
export type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type Color = Variant | "gray";

// 主题类型
export type Theme = "light" | "dark";

// 基础组件 Props
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

// Button 组件类型
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size">,
    BaseProps {
  variant?: Variant | "outline" | "ghost" | "link";
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// Input 组件类型
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    BaseProps {
  size?: Size;
  error?: boolean;
  helperText?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// Card 组件类型
export interface CardProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  variant?: "default" | "outlined" | "elevated" | "filled" | "gradient";
  padding?: Size | "none";
  header?: ReactNode;
  footer?: ReactNode;

  // 媒体内容
  image?: string;
  imageAlt?: string;
  imagePosition?: "top" | "bottom" | "left" | "right";
  imageHeight?: string | number;
  cover?: boolean;

  // 交互
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  disabled?: boolean;

  // 状态
  loading?: boolean;
  selected?: boolean;

  // 额外内容
  cardTitle?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  badge?: ReactNode;
  tags?: string[];

  // 功能
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;

  // 样式
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl";
  bordered?: boolean;
}

// Modal 组件类型
export interface ModalProps extends BaseProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: Size | "xs" | "xl" | "full";
  closable?: boolean;
  maskClosable?: boolean;
  footer?: ReactNode;
}

// Tooltip 组件类型
export interface TooltipProps extends BaseProps {
  content: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  trigger?: "hover" | "click" | "focus";
  disabled?: boolean;
}

// Table 组件类型
export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: ReactNode;
  dataIndex?: string;
  width?: string | number;
  align?: "left" | "center" | "right";
  fixed?: "left" | "right";
  sortable?: boolean;
  render?: (value: unknown, record: T, index: number) => ReactNode;
  onHeaderClick?: () => void;
}

export type SortOrder = "ascend" | "descend" | null;

export interface TableProps<T = Record<string, unknown>> extends BaseProps {
  // 数据
  columns: TableColumn<T>[];
  dataSource: T[];
  rowKey?: string | ((record: T) => string);

  // 样式
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  size?: Size;

  // 加载和空状态
  loading?: boolean;
  empty?: ReactNode;

  // 分页
  pagination?:
    | boolean
    | {
        current?: number;
        pageSize?: number;
        total?: number;
        showSizeChanger?: boolean;
        showQuickJumper?: boolean;
        onChange?: (page: number, pageSize: number) => void;
        onShowSizeChange?: (current: number, size: number) => void;
      };

  // 排序
  sortOrder?: SortOrder;
  sortColumn?: string;
  onSort?: (column: string, order: SortOrder) => void;

  // 选择
  rowSelection?: {
    selectedRowKeys?: string[];
    onChange?: (selectedRowKeys: string[], selectedRows: T[]) => void;
    type?: "checkbox" | "radio";
    fixed?: boolean;
    columnWidth?: string | number;
  };

  // 交互
  onRow?: (
    record: T,
    index: number
  ) => {
    onClick?: (event: React.MouseEvent) => void;
    onDoubleClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
  };

  // 滚动
  scroll?: {
    x?: string | number | true;
    y?: string | number;
  };
}

// Select 组件类型
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  // 基础属性
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;

  // 选项
  options: SelectOption[];
  placeholder?: string;

  // 功能
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  loading?: boolean;

  // 样式
  size?: Size;
  error?: boolean;

  // 文本
  notFoundContent?: ReactNode;
  maxTagCount?: number;
  maxTagPlaceholder?: (omittedValues: (string | number)[]) => ReactNode;

  // 回调
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onDropdownVisibleChange?: (open: boolean) => void;
}

// Switch 组件类型
export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  // 基础属性
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  // 样式
  size?: Size;
  variant?: "primary" | "success" | "warning" | "danger";

  // 文本标签
  checkedLabel?: ReactNode;
  uncheckedLabel?: ReactNode;
  label?: string;

  // 图标
  checkedIcon?: ReactNode;
  uncheckedIcon?: ReactNode;

  // 状态
  disabled?: boolean;
  loading?: boolean;

  // 颜色自定义
  checkedColor?: string;
  uncheckedColor?: string;

  // 额外功能
  tooltip?: string;
  description?: string;
}

// Slider 组件类型
export type SliderMark = {
  value: number;
  label?: ReactNode;
};

export interface SliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  // 基础属性
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  onAfterChange?: (value: number | [number, number]) => void;

  // 范围
  min?: number;
  max?: number;
  step?: number | null;

  // 功能
  range?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  reverse?: boolean;
  included?: boolean;

  // 显示
  marks?: Record<number, ReactNode | SliderMark>;
  dots?: boolean;
  tooltip?: {
    open?: boolean;
    formatter?: (value: number) => ReactNode;
    placement?: "top" | "bottom" | "left" | "right";
  };

  // 样式
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  size?: Size;
  trackColor?: string;
  railColor?: string;
  handleColor?: string;

  // 输入框
  showInput?: boolean;
  inputWidth?: number | string;

  // 标签
  label?: string;
  description?: string;
}

// Calendar 组件类型
export type EventCategory =
  | "work"
  | "personal"
  | "meeting"
  | "birthday"
  | "holiday"
  | "custom";
export type EventReminder =
  | "none"
  | "5min"
  | "15min"
  | "30min"
  | "1hour"
  | "1day";
export type EventRecurrence =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "none";
export type CalendarView = "month" | "week" | "day" | "year";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date | string;
  time?: string;
  endTime?: string;
  category: EventCategory;
  color: Color;
  reminder?: EventReminder;
  completed?: boolean;
  recurrence?: EventRecurrence;
  attendees?: string[];
  location?: string;
}

export interface CalendarProps
  extends HTMLAttributes<HTMLDivElement>,
    BaseProps {
  // 视图
  view?: CalendarView;
  onViewChange?: (view: CalendarView) => void;

  // 事件
  events?: CalendarEvent[];
  onEventCreate?: (event: Omit<CalendarEvent, "id">) => void;
  onEventUpdate?: (id: string, event: Partial<CalendarEvent>) => void;
  onEventDelete?: (id: string) => void;
  onEventClick?: (event: CalendarEvent) => void;

  // 日期选择
  selectedDate?: Date | string;
  onDateChange?: (date: Date) => void;

  // 样式
  size?: Size;
  variant?: "default" | "compact" | "comfortable";

  // 功能
  editable?: boolean;
  showWeekends?: boolean;
  startOfWeek?: 0 | 1; // 0: Sunday, 1: Monday

  // 本地化
  locale?: "en" | "zh" | "ja" | "ko";

  // 额外
  miniCalendar?: boolean;
  sidebar?: boolean;
  simple?: boolean; // 简单模式：隐藏侧边栏、禁用编辑功能，仅显示日历
}

// TreeSelect 组件类型
export interface TreeNode {
  key: string | number;
  label: string;
  value: string | number;
  children?: TreeNode[];
  disabled?: boolean;
  isLeaf?: boolean;
  icon?: ReactNode;
  selectable?: boolean;
  checkable?: boolean;
  disableCheckbox?: boolean;
  // 异步加载
  loading?: boolean;
}

export interface TreeSelectProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange" | "defaultValue" | "onSelect"
  > {
  // 基础属性
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onChange?: (
    value: string | number | (string | number)[],
    selectedNodes?: TreeNode | TreeNode[]
  ) => void;

  // 数据
  treeData: TreeNode[];
  placeholder?: string;

  // 功能
  multiple?: boolean;
  checkable?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  showCheckedStrategy?: "all" | "parent" | "child"; // 回显策略

  // 展开控制
  defaultExpandAll?: boolean;
  defaultExpandedKeys?: (string | number)[];
  expandedKeys?: (string | number)[];
  onExpand?: (expandedKeys: (string | number)[]) => void;
  autoExpandParent?: boolean;

  // 选中控制
  checkStrictly?: boolean; // 父子节点是否关联
  showLine?: boolean;
  showIcon?: boolean;

  // 搜索
  filterTreeNode?: (inputValue: string, treeNode: TreeNode) => boolean;
  treeNodeFilterProp?: string;

  // 异步加载
  loadData?: (node: TreeNode) => Promise<void>;

  // 样式
  size?: Size;
  error?: boolean;
  maxTagCount?: number;
  maxTagPlaceholder?: (omittedValues: (string | number)[]) => ReactNode;
  treeHeight?: number;

  // 回调
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onDropdownVisibleChange?: (open: boolean) => void;
  onSelect?: (value: string | number, node: TreeNode) => void;

  // 文本
  notFoundContent?: ReactNode;

  // 虚拟滚动
  virtual?: boolean;
}

// 主题上下文类型
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// Popover 组件类型
export type PopoverTrigger = "hover" | "click" | "focus";
export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export interface PopoverProps extends BaseProps {
  title?: ReactNode;
  content: ReactNode;
  trigger?: PopoverTrigger;
  placement?: PopoverPlacement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

// Popconfirm 组件类型
export interface PopconfirmProps extends BaseProps {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  okText?: string;
  cancelText?: string;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  placement?: PopoverPlacement;
  disabled?: boolean;
}

// DatePicker 组件类型
export type DatePickerMode = "date" | "month" | "year" | "week";

export interface DatePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  // 基础属性
  value?: Date | string | null;
  defaultValue?: Date | string | null;
  onChange?: (date: Date | null, dateString: string) => void;

  // 范围选择
  range?: boolean;
  rangeValue?: [Date | string | null, Date | string | null];
  defaultRangeValue?: [Date | string | null, Date | string | null];
  onRangeChange?: (
    dates: [Date | null, Date | null],
    dateStrings: [string, string]
  ) => void;

  // 模式
  mode?: DatePickerMode;
  picker?: DatePickerMode;

  // 格式化
  format?: string;
  valueFormat?: string;

  // 显示
  placeholder?: string;
  rangePlaceholder?: [string, string];
  showTime?: boolean | { format?: string; defaultValue?: Date };
  showToday?: boolean;
  showNow?: boolean;

  // 功能
  allowClear?: boolean;
  disabled?: boolean;
  disabledDate?: (current: Date) => boolean;
  disabledTime?: (current: Date | null) => {
    disabledHours?: () => number[];
    disabledMinutes?: (hour: number) => number[];
    disabledSeconds?: (hour: number, minute: number) => number[];
  };

  // 预设
  presets?: Array<{
    label: string;
    value: Date | [Date, Date];
  }>;

  // 样式
  size?: Size;
  error?: boolean;
  bordered?: boolean;

  // 弹窗
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  getPopupContainer?: (trigger: HTMLElement) => HTMLElement;

  // 回调
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;

  // 本地化
  locale?: "zh" | "en";

  // 输入
  inputReadOnly?: boolean;

  // 周
  startOfWeek?: 0 | 1;

  // 标签
  label?: string;
  helperText?: string;
}
