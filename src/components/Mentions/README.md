# Mentions 提及组件

一个功能完整的提及（Mention）组件,支持在文本输入时通过特定前缀(如 @、#)触发选项列表。

## 功能特性

- ✅ 支持自定义触发前缀(单个或多个)
- ✅ 支持搜索过滤
- ✅ 支持键盘导航(上下箭头、Enter、Escape)
- ✅ 支持自定义选项渲染
- ✅ 支持多种尺寸(small、medium、large)
- ✅ 支持加载状态
- ✅ 支持禁用和只读状态
- ✅ 支持向上/向下弹出
- ✅ 支持字符数限制
- ✅ 支持暗色主题
- ✅ 完整的无障碍支持

## 基础用法

```tsx
import { Mentions } from '@myui/components';

const users = [
  { value: 'zhangsan', label: '张三' },
  { value: 'lisi', label: '李四' },
  { value: 'wangwu', label: '王五' },
];

function App() {
  const [value, setValue] = useState('');

  return (
    <Mentions
      value={value}
      onChange={setValue}
      options={users}
      placeholder="输入 @ 来提及某人..."
    />
  );
}
```

## 自定义前缀

```tsx
// 使用 # 作为前缀
<Mentions
  options={tags}
  prefix="#"
  placeholder="输入 # 来添加标签..."
/>

// 支持多个前缀
<Mentions
  options={options}
  prefix={['@', '#']}
  placeholder="输入 @ 或 # ..."
/>
```

## 带头像的选项

```tsx
const users = [
  {
    value: 'zhangsan',
    label: '张三',
    avatar: 'https://example.com/avatar1.jpg',
  },
  // ...
];

<Mentions options={users} />
```

## 自定义选项渲染

```tsx
<Mentions
  options={users}
  renderOption={(option) => (
    <div>
      <img src={option.avatar} alt={option.label} />
      <div>
        <div>{option.label}</div>
        <div>@{option.value}</div>
      </div>
    </div>
  )}
/>
```

## 异步搜索

```tsx
const [loading, setLoading] = useState(false);
const [options, setOptions] = useState([]);

const handleSearch = async (text: string) => {
  setLoading(true);
  const results = await fetchUsers(text);
  setOptions(results);
  setLoading(false);
};

<Mentions
  options={options}
  loading={loading}
  onSearch={handleSearch}
/>
```

## 事件处理

```tsx
<Mentions
  options={users}
  onSelect={(option, prefix) => {
    console.log('选择了:', option.label);
    console.log('使用前缀:', prefix);
  }}
  onSearch={(text, prefix) => {
    console.log('搜索:', text);
  }}
  onChange={(value) => {
    console.log('内容变化:', value);
  }}
/>
```

## API

### MentionsProps

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 受控值 | `string` | - |
| defaultValue | 默认值 | `string` | `''` |
| onChange | 内容变化回调 | `(value: string) => void` | - |
| onSelect | 选择选项回调 | `(option: MentionOption, prefix: string) => void` | - |
| onSearch | 搜索回调 | `(text: string, prefix: string) => void` | - |
| options | 选项列表 | `MentionOption[]` | `[]` |
| prefix | 触发前缀 | `string \| string[]` | `'@'` |
| split | 分隔符 | `string` | `' '` |
| placeholder | 占位文本 | `string` | `'请输入...'` |
| disabled | 是否禁用 | `boolean` | `false` |
| readOnly | 是否只读 | `boolean` | `false` |
| rows | 行数 | `number` | `3` |
| maxLength | 最大字符数 | `number` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| loading | 加载状态 | `boolean` | `false` |
| notFoundContent | 无匹配内容 | `React.ReactNode` | `'无匹配结果'` |
| placement | 弹出位置 | `'top' \| 'bottom'` | `'bottom'` |
| filterOption | 自定义过滤函数 | `(input: string, option: MentionOption) => boolean` | - |
| renderOption | 自定义选项渲染 | `(option: MentionOption) => React.ReactNode` | - |
| autoFocus | 自动聚焦 | `boolean` | `false` |

### MentionOption

| 属性 | 说明 | 类型 | 必填 |
|------|------|------|------|
| value | 选项值 | `string` | ✅ |
| label | 显示文本 | `string` | ✅ |
| avatar | 头像 URL | `string` | - |
| disabled | 是否禁用 | `boolean` | - |

### MentionsRef

| 方法 | 说明 | 类型 |
|------|------|------|
| focus | 聚焦输入框 | `() => void` |
| blur | 失焦输入框 | `() => void` |

## 键盘操作

- `↑` / `↓` - 在选项列表中上下移动
- `Enter` - 选择当前高亮的选项
- `Escape` - 关闭选项列表

## 样式定制

组件使用 CSS 变量,可以通过覆盖这些变量来自定义样式:

```css
.myui-mentions {
  /* 自定义边框颜色 */
  --mentions-border-color: #d9d9d9;
  
  /* 自定义聚焦颜色 */
  --mentions-focus-color: #1890ff;
  
  /* 自定义背景色 */
  --mentions-bg-color: #fff;
}
```

## 注意事项

1. 组件支持受控和非受控两种模式
2. 当使用受控模式时,必须提供 `value` 和 `onChange` 属性
3. 选项列表会自动根据输入内容进行过滤
4. 支持通过 `filterOption` 自定义过滤逻辑
5. 组件会自动处理点击外部关闭下拉框的逻辑

## 浏览器兼容性

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 无障碍支持

- 支持键盘导航
- 支持屏幕阅读器
- 符合 WCAG 2.1 AA 标准
