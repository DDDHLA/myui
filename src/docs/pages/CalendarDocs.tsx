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
      description: 'Calendar view type',
    },
    {
      name: 'events',
      type: 'CalendarEvent[]',
      default: '[]',
      description: 'Array of events to display',
    },
    {
      name: 'onEventCreate',
      type: '(event: Omit<CalendarEvent, "id">) => void',
      description: 'Callback when creating an event',
    },
    {
      name: 'onEventUpdate',
      type: '(id: string, event: Partial<CalendarEvent>) => void',
      description: 'Callback when updating an event',
    },
    {
      name: 'onEventDelete',
      type: '(id: string) => void',
      description: 'Callback when deleting an event',
    },
    {
      name: 'editable',
      type: 'boolean',
      default: 'true',
      description: 'Whether events can be edited',
    },
    {
      name: 'locale',
      type: '"en" | "zh" | "ja" | "ko"',
      default: '"en"',
      description: 'Language/locale for the calendar',
    },
    {
      name: 'size',
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: 'Calendar size',
    },
  ]

  return (
    <div>
      <h1>Calendar Component</h1>
      <p>
        A feature-rich calendar component with event management, multi-view support, and internationalization.
        Easily add, edit, and delete events with support for event categories, reminders, and more.
      </p>

      <h2>Basic Usage</h2>
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

      <h2>Demo</h2>
      <div style={{ height: '600px', marginBottom: '2rem' }}>
        <Calendar
          events={events}
          onEventCreate={handleEventCreate}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
          editable={true}
        />
      </div>

      <h2>Multi-Language Support</h2>
      <p>Calendar supports multiple languages including English, Chinese, Japanese, and Korean.</p>
      <CodeBlock
        code={`<Calendar
  locale="zh"
  events={events}
  onEventCreate={handleEventCreate}
  onEventUpdate={handleEventUpdate}
  onEventDelete={handleEventDelete}
/>`}
      />

      <h2>Key Features</h2>
      <ul>
        <li>📅 Multiple view options: Month, Week, Day, and Year</li>
        <li>✨ Smooth animations and interactions</li>
        <li>🌍 Multi-language support (English, Chinese, Japanese, Korean)</li>
        <li>📝 Complete event management (Create, Edit, Delete)</li>
        <li>🎨 Rich event categories and color options</li>
        <li>⏰ Event reminder functionality</li>
        <li>🔔 Support for recurring events</li>
        <li>🌓 Dark theme support</li>
        <li>📱 Fully responsive design</li>
        <li>♿ Complete accessibility support</li>
      </ul>

      <h2>API Props</h2>
      <PropsTable data={calendarProps} />

      <h2>Event Categories</h2>
      <p>Calendar supports the following event categories:</p>
      <ul>
        <li><strong>work</strong> - Work-related events</li>
        <li><strong>personal</strong> - Personal events</li>
        <li><strong>meeting</strong> - Meetings</li>
        <li><strong>birthday</strong> - Birthday events</li>
        <li><strong>holiday</strong> - Holiday events</li>
        <li><strong>custom</strong> - Custom events</li>
      </ul>

      <h2>Reminder Options</h2>
      <p>You can set reminders for events:</p>
      <ul>
        <li>none</li>
        <li>5 minutes before</li>
        <li>15 minutes before</li>
        <li>30 minutes before</li>
        <li>1 hour before</li>
        <li>1 day before</li>
      </ul>

      <h2>Tips & Tricks</h2>
      <div style={{ backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
        <p><strong>💡 Click a date to add an event</strong>: In editable mode, click any date to create a new event.</p>
        <p><strong>📋 Event sidebar</strong>: The sidebar shows all events for the selected date with filtering by category.</p>
        <p><strong>🎯 Event details</strong>: Click an event in the sidebar to expand details and edit/delete it.</p>
        <p><strong>🌐 Internationalization</strong>: Use the locale prop to switch languages (en, zh, ja, ko).</p>
      </div>
    </div>
  )
}

export default CalendarDocs
