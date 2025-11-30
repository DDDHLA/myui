import { useState } from 'react';
import { DatePicker } from '@/components';
import { CodeBlock } from '@/components/CodeBlock';
import { PropsTable, type PropItem } from '@/components/PropsTable';
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles';

const DatePickerDocs = () => {
  const [value, setValue] = useState<Date | null>(null);
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

  const datePickerProps: PropItem[] = [
    { name: 'value', type: 'Date | string | null', description: '选中的日期值' },
    { name: 'defaultValue', type: 'Date | string | null', description: '默认选中的日期值（非受控）' },
    { name: 'onChange', type: '(date, dateString) => void', description: '日期变化时的回调' },
    { name: 'range', type: 'boolean', description: '是否为范围选择模式', default: 'false' },
    { name: 'rangeValue', type: '[Date | null, Date | null]', description: '范围选择的值' },
    { name: 'onRangeChange', type: '(dates, dateStrings) => void', description: '范围变化时的回调' },
    { name: 'picker', type: "'date' | 'month' | 'year'", description: '选择器类型', default: "'date'" },
    { name: 'format', type: 'string', description: '日期格式化字符串', default: "'YYYY-MM-DD'" },
    { name: 'placeholder', type: 'string', description: '输入框占位文本' },
    { name: 'rangePlaceholder', type: '[string, string]', description: '范围选择的占位文本', default: "['开始日期', '结束日期']" },
    { name: 'showToday', type: 'boolean', description: '是否显示今天按钮', default: 'true' },
    { name: 'allowClear', type: 'boolean', description: '是否允许清空', default: 'true' },
    { name: 'disabled', type: 'boolean', description: '是否禁用', default: 'false' },
    { name: 'disabledDate', type: '(current: Date) => boolean', description: '禁用日期的判断函数' },
    { name: 'presets', type: 'Array<{ label, value }>', description: '预设快捷选项' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", description: '尺寸', default: "'md'" },
    { name: 'error', type: 'boolean', description: '是否显示错误状态', default: 'false' },
    { name: 'bordered', type: 'boolean', description: '是否显示边框', default: 'true' },
    { name: 'locale', type: "'zh' | 'en'", description: '语言', default: "'zh'" },
    { name: 'startOfWeek', type: '0 | 1', description: '每周起始日（0=周日，1=周一）', default: '1' },
    { name: 'label', type: 'string', description: '标签文本' },
    { name: 'helperText', type: 'string', description: '辅助文本' },
  ];

  // 禁用今天之前的日期
  const disabledDate = (current: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current < today;
  };

  // 预设选项
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const presets = [
    { label: '今天', value: today },
    {
      label: '本周',
      value: [
        new Date(today.getTime() - today.getDay() * 86400000),
        new Date(today.getTime() + (6 - today.getDay()) * 86400000),
      ] as [Date, Date],
    },
    {
      label: '最近7天',
      value: [new Date(today.getTime() - 6 * 86400000), today] as [Date, Date],
    },
    {
      label: '最近30天',
      value: [new Date(today.getTime() - 29 * 86400000), today] as [Date, Date],
    },
  ];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '16px',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={docHeadingStyles.h1}>DatePicker 日期选择器</h1>
        <p style={docParagraphStyles.lead}>
          日期选择器用于选择日期或日期范围，支持多种模式和自定义配置。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最基本的日期选择器用法，点击输入框弹出日历面板选择日期。"
        code={`import { DatePicker } from '@paidaxinghaha/my-ui-react';

const [value, setValue] = useState<Date | null>(null);

<DatePicker
  value={value}
  onChange={(date, dateString) => {
    setValue(date);
    console.log('选中日期:', dateString);
  }}
  placeholder="请选择日期"
/>`}
      >
        <div style={containerStyle}>
          <DatePicker
            value={value}
            onChange={(date, dateString) => {
              setValue(date);
              console.log('选中日期:', dateString);
            }}
            placeholder="请选择日期"
          />
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
            选中值: {value ? value.toLocaleDateString() : '未选择'}
          </p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="日期范围选择"
        description="通过 range 属性启用日期范围选择模式。"
        code={`import { DatePicker } from '@paidaxinghaha/my-ui-react';

const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

<DatePicker
  range
  rangeValue={range}
  onRangeChange={(dates, dateStrings) => {
    setRange(dates);
    console.log('选中范围:', dateStrings);
  }}
  rangePlaceholder={['开始日期', '结束日期']}
/>`}
      >
        <div style={containerStyle}>
          <DatePicker
            range
            rangeValue={range}
            onRangeChange={(dates, dateStrings) => {
              setRange(dates);
              console.log('选中范围:', dateStrings);
            }}
            rangePlaceholder={['开始日期', '结束日期']}
          />
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
            选中范围: {range[0] && range[1]
              ? `${range[0].toLocaleDateString()} ~ ${range[1].toLocaleDateString()}`
              : '未选择'}
          </p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="提供三种尺寸：sm、md（默认）、lg。"
        code={`<DatePicker size="sm" placeholder="小尺寸" />
<DatePicker size="md" placeholder="中尺寸（默认）" />
<DatePicker size="lg" placeholder="大尺寸" />`}
      >
        <div style={containerStyle}>
          <DatePicker size="sm" placeholder="小尺寸" />
          <DatePicker size="md" placeholder="中尺寸（默认）" />
          <DatePicker size="lg" placeholder="大尺寸" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="禁用日期"
        description="通过 disabledDate 函数自定义禁用的日期，例如禁用今天之前的日期。"
        code={`const disabledDate = (current: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return current < today;
};

<DatePicker
  placeholder="只能选择今天及以后"
  disabledDate={disabledDate}
/>`}
      >
        <div style={containerStyle}>
          <DatePicker
            placeholder="只能选择今天及以后"
            disabledDate={disabledDate}
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="预设选项"
        description="通过 presets 属性提供快捷选项，常用于日期范围选择。"
        code={`const presets = [
  { label: '今天', value: today },
  { label: '本周', value: [weekStart, weekEnd] },
  { label: '最近7天', value: [sevenDaysAgo, today] },
  { label: '最近30天', value: [thirtyDaysAgo, today] },
];

<DatePicker range presets={presets} />`}
      >
        <div style={containerStyle}>
          <DatePicker range presets={presets} rangePlaceholder={['开始日期', '结束日期']} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="自定义格式"
        description="通过 format 属性自定义日期显示格式。"
        code={`<DatePicker format="YYYY-MM-DD" placeholder="YYYY-MM-DD（默认）" />
<DatePicker format="YYYY/MM/DD" placeholder="YYYY/MM/DD" />
<DatePicker format="MM-DD-YYYY" placeholder="MM-DD-YYYY" />`}
      >
        <div style={containerStyle}>
          <DatePicker format="YYYY-MM-DD" placeholder="YYYY-MM-DD（默认）" />
          <DatePicker format="YYYY/MM/DD" placeholder="YYYY/MM/DD" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="月份/年份选择器"
        description="通过 picker 属性切换为月份或年份选择模式。"
        code={`<DatePicker picker="month" placeholder="选择月份" format="YYYY-MM" />
<DatePicker picker="year" placeholder="选择年份" format="YYYY" />`}
      >
        <div style={rowStyle}>
          <DatePicker picker="month" placeholder="选择月份" format="YYYY-MM" />
          <DatePicker picker="year" placeholder="选择年份" format="YYYY" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="不同状态"
        description="支持禁用、错误、无边框等状态。"
        code={`<DatePicker disabled placeholder="禁用状态" />
<DatePicker error placeholder="错误状态" helperText="请选择有效日期" />
<DatePicker bordered={false} placeholder="无边框" />`}
      >
        <div style={containerStyle}>
          <DatePicker disabled placeholder="禁用状态" />
          <DatePicker error placeholder="错误状态" helperText="请选择有效日期" />
          <DatePicker bordered={false} placeholder="无边框" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="标签和辅助文本"
        description="通过 label 和 helperText 提供标签和辅助说明。"
        code={`<DatePicker
  label="生日"
  placeholder="请选择生日"
  helperText="请选择您的出生日期"
/>

<DatePicker
  label="预约日期"
  placeholder="请选择日期"
  error
  helperText="该日期已被预约"
/>`}
      >
        <div style={containerStyle}>
          <DatePicker
            label="生日"
            placeholder="请选择生日"
            helperText="请选择您的出生日期"
          />
          <DatePicker
            label="预约日期"
            placeholder="请选择日期"
            error
            helperText="该日期已被预约"
          />
        </div>
      </CodeBlock>

      <CodeBlock
        title="国际化"
        description="通过 locale 属性切换语言。"
        code={`<DatePicker locale="zh" placeholder="中文（默认）" />
<DatePicker locale="en" placeholder="Select date" />`}
      >
        <div style={rowStyle}>
          <DatePicker locale="zh" placeholder="中文（默认）" />
          <DatePicker locale="en" placeholder="Select date" />
        </div>
      </CodeBlock>

      <CodeBlock
        title="周起始日"
        description="通过 startOfWeek 设置每周起始日（0 为周日，1 为周一）。"
        code={`<DatePicker startOfWeek={1} placeholder="周一开始（默认）" />
<DatePicker startOfWeek={0} placeholder="周日开始" />`}
      >
        <div style={rowStyle}>
          <DatePicker startOfWeek={1} placeholder="周一开始（默认）" />
          <DatePicker startOfWeek={0} placeholder="周日开始" />
        </div>
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <PropsTable data={datePickerProps} />

        <div
          style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: 'var(--bg-secondary, #f3f4f6)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--color-primary, #3b82f6)',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: '600' }}>
            💡 使用提示
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: '24px',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
            }}
          >
            <li>支持受控和非受控两种模式</li>
            <li>range 模式下需要使用 rangeValue 和 onRangeChange</li>
            <li>disabledDate 函数返回 true 表示该日期被禁用</li>
            <li>presets 可以快速选择常用日期范围</li>
            <li>支持自定义日期格式，如 YYYY-MM-DD、YYYY/MM/DD 等</li>
            <li>支持暗色主题，会自动适配当前主题</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DatePickerDocs;
