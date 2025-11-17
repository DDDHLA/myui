import React from 'react'
import { Calendar, type CalendarEvent } from '@/components'
import { CodeBlock } from '@/components/CodeBlock'
import { PropsTable } from '@/components/PropsTable'
import type { PropItem } from '@/components/PropsTable'

const CalendarDocs = () => {
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Quarterly planning meeting',
      date: new Date(),
      time: '10:00',
      endTime: '11:00',
      category: 'meeting',
      color: 'primary',
      reminder: '15min',
      completed: false,
      location: 'Conference Room A',
    },
    {
      id: '2',
      title: 'Project Deadline',
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      time: '17:00',
      category: 'work',
      color: 'danger',
      reminder: '1day',
      completed: false,
    },
  ])

  const handleEventCreate = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
    }
    setEvents([...events, newEvent])
  }

  const handleEventUpdate = (id: string, event: Partial<CalendarEvent>) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, ...event } : e)))
  }

  const handleEventDelete = (id: string) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  const calendarProps: PropItem[] = [
    {
      name: 'view',
      type: '"month" | "week" | "day" | "year"',
      default: '"month"',
      description: '日历视图类型',
    },
    {
      name: 'events',
      type: 'CalendarEvent[]',
      default: '[]',
      description: '要显示的事件数组',
    },
    {
      name: 'onEventCreate',
      type: '(event: Omit<CalendarEvent, "id">) => void',
      description: '创建事件时的回调函数',
    },
    {
      name: 'onEventUpdate',
      type: '(id: string, event: Partial<CalendarEvent>) => void',
      description: '更新事件时的回调函数',
    },
    {
      name: 'onEventDelete',
      type: '(id: string) => void',
      description: '删除事件时的回调函数',
    },
    {
      name: 'editable',
      type: 'boolean',
      default: 'true',
      description: '事件是否可编辑',
    },
    {
      name: 'locale',
      type: '"en" | "zh" | "ja" | "ko"',
      default: '"zh"',
      description: '日历的语言/地区设置',
    },
    {
      name: 'size',
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: '日历尺寸',
    },
    {
      name: 'simple',
      type: 'boolean',
      default: 'false',
      description: '简单模式：隐藏侧边栏并禁用编辑，仅显示日历',
    },
    {
      name: 'sidebar',
      type: 'boolean',
      default: 'true',
      description: '是否显示事件侧边栏',
    },
  ]

  return (
    <div>
      <h1>Calendar 日历</h1>
      <p>
        功能丰富的日历组件，支持事件管理、多视图切换和国际化。
        轻松添加、编辑和删除事件，支持事件分类、提醒等功能。
      </p>

      <h2>基础用法</h2>
      <CodeBlock
        code={`import { Calendar } from '@/components'

export default function CalendarBasic() {
  const [events, setEvents] = React.useState([
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date(),
      time: '10:00',
      endTime: '11:00',
      category: 'meeting',
      color: 'primary',
    }
  ])

  return (
    <Calendar
      events={events}
      onEventCreate={(event) => {
        setEvents([...events, { ...event, id: Date.now().toString() }])
      }}
      onEventUpdate={(id, event) => {
        setEvents(events.map(e => e.id === id ? { ...e, ...event } : e))
      }}
      onEventDelete={(id) => {
        setEvents(events.filter(e => e.id !== id))
      }}
      editable={true}
    />
  )
}`}
      />

      <h2>示例演示</h2>
      <div style={{ height: '600px', marginBottom: '2rem' }}>
        <Calendar
          events={events}
          onEventCreate={handleEventCreate}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
          editable={true}
        />
      </div>

      <h2>简单模式</h2>
      <p>使用简单模式显示一个简洁的日历，不包含侧边栏或编辑功能。</p>
      <CodeBlock
        code={`<Calendar
  simple={true}
  events={events}
/>`}
      />
      <div style={{ height: '600px', marginBottom: '2rem' }}>
        <Calendar
          simple={true}
          events={events}
        />
      </div>

      <h2>多语言支持</h2>
      <p>日历支持多种语言，包括英语、中文、日语和韩语。默认语言为中文。</p>
      <CodeBlock
        code={`<Calendar
  locale="en"
  events={events}
  onEventCreate={handleEventCreate}
  onEventUpdate={handleEventUpdate}
  onEventDelete={handleEventDelete}
/>`}
      />

      <h2>核心特性</h2>
      <ul>
        <li>📅 多种视图选项：月视图、周视图、日视图和年视图</li>
        <li>✨ 流畅的动画和交互效果</li>
        <li>🌍 多语言支持（英语、中文、日语、韩语）</li>
        <li>📝 完整的事件管理功能（创建、编辑、删除）</li>
        <li>🎨 丰富的事件分类和颜色选项</li>
        <li>⏰ 事件提醒功能</li>
        <li>🔔 支持重复事件</li>
        <li>🌓 深色主题支持</li>
        <li>📱 完全响应式设计</li>
        <li>♿ 完整的无障碍支持</li>
      </ul>

      <h2>API 属性</h2>
      <PropsTable data={calendarProps} />

      <h2>事件分类</h2>
      <p>日历支持以下事件分类：</p>
      <ul>
        <li><strong>work</strong> - 工作相关事件</li>
        <li><strong>personal</strong> - 个人事件</li>
        <li><strong>meeting</strong> - 会议</li>
        <li><strong>birthday</strong> - 生日事件</li>
        <li><strong>holiday</strong> - 假期事件</li>
        <li><strong>custom</strong> - 自定义事件</li>
      </ul>

      <h2>提醒选项</h2>
      <p>您可以为事件设置提醒：</p>
      <ul>
        <li>无</li>
        <li>提前5分钟</li>
        <li>提前15分钟</li>
        <li>提前30分钟</li>
        <li>提前1小时</li>
        <li>提前1天</li>
      </ul>

      <h2>使用技巧</h2>
      <div style={{ backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
        <p><strong>💡 点击日期添加事件</strong>：在可编辑模式下，点击任意日期即可创建新事件。</p>
        <p><strong>📋 事件侧边栏</strong>：侧边栏显示所选日期的所有事件，支持按分类筛选。</p>
        <p><strong>🎯 事件详情</strong>：点击侧边栏中的事件可展开详情并进行编辑/删除。</p>
        <p><strong>🌐 国际化</strong>：使用 locale 属性切换语言（en, zh, ja, ko）。</p>
      </div>
    </div>
  )
}

export default CalendarDocs
