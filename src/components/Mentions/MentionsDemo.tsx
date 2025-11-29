import React, { useState } from 'react';
import { Mentions, type MentionOption } from './Mentions';

// 示例数据
const mockUsers: MentionOption[] = [
  {
    value: 'zhangsan',
    label: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
  },
  {
    value: 'lisi',
    label: '李四',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi',
  },
  {
    value: 'wangwu',
    label: '王五',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu',
  },
  {
    value: 'zhaoliu',
    label: '赵六',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoliu',
  },
  {
    value: 'sunqi',
    label: '孙七',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sunqi',
  },
  {
    value: 'zhouba',
    label: '周八',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhouba',
    disabled: true,
  },
];

const MentionsDemo: React.FC = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (text: string, prefix: string) => {
    console.log('搜索:', text, '前缀:', prefix);
    // 这里可以进行异步搜索
  };

  const handleSelect = (option: MentionOption, prefix: string) => {
    console.log('选择:', option, '前缀:', prefix);
  };

  // 模拟异步加载
  const handleAsyncSearch = (_text: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Mentions 提及组件示例</h1>

      <div style={{ marginBottom: '32px' }}>
        <h2>基础用法</h2>
        <p>使用 @ 符号触发提及列表</p>
        <Mentions
          value={value1}
          onChange={setValue1}
          options={mockUsers}
          placeholder="输入 @ 来提及某人..."
          onSelect={handleSelect}
          onSearch={handleSearch}
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2>不同尺寸</h2>
        <div style={{ marginBottom: '16px' }}>
          <h3>小尺寸</h3>
          <Mentions
            size="small"
            options={mockUsers}
            placeholder="小尺寸输入框"
            rows={2}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <h3>中等尺寸（默认）</h3>
          <Mentions
            size="medium"
            options={mockUsers}
            placeholder="中等尺寸输入框"
            rows={3}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <h3>大尺寸</h3>
          <Mentions
            size="large"
            options={mockUsers}
            placeholder="大尺寸输入框"
            rows={4}
          />
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2>自定义前缀</h2>
        <p>支持使用 # 符号触发标签提及</p>
        <Mentions
          value={value2}
          onChange={setValue2}
          options={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
          ]}
          prefix="#"
          placeholder="输入 # 来添加标签..."
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2>多个前缀</h2>
        <p>同时支持 @ 和 # 两种前缀</p>
        <Mentions
          value={value3}
          onChange={setValue3}
          options={mockUsers}
          prefix={['@', '#']}
          placeholder="输入 @ 提及用户或 # 添加标签..."
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2>加载状态</h2>
        <Mentions
          options={mockUsers}
          loading={loading}
          onSearch={handleAsyncSearch}
          placeholder="输入 @ 触发异步搜索..."
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2>禁用状态</h2>
        <Mentions
          disabled
          options={mockUsers}
          defaultValue="这是一个禁用的输入框"
          placeholder="禁用状态"
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2>只读状态</h2>
        <Mentions
          readOnly
          options={mockUsers}
          defaultValue="这是一个只读的输入框 @张三 你好！"
          placeholder="只读状态"
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2>自定义渲染</h2>
        <Mentions
          options={mockUsers}
          placeholder="自定义选项渲染..."
          renderOption={(option) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {option.avatar && (
                <img 
                  src={option.avatar as string} 
                  alt={option.label}
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                />
              )}
              <div>
                <div style={{ fontWeight: 'bold' }}>{option.label}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>@{option.value}</div>
              </div>
            </div>
          )}
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2>向上弹出</h2>
        <Mentions
          options={mockUsers}
          placement="top"
          placeholder="下拉框向上弹出..."
        />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2>字符限制</h2>
        <Mentions
          options={mockUsers}
          maxLength={100}
          placeholder="最多输入 100 个字符..."
        />
      </div>

      <div style={{ marginTop: '48px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>当前值:</h3>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {JSON.stringify({ value1, value2, value3 }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default MentionsDemo;
