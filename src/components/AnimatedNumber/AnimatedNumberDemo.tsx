import React, { useState } from 'react'
import AnimatedNumber from '../AnimatedNumber'
import { Button } from '../Button'
import { Card } from '../Card'
import { Space } from '../Space'
import { CodeBlock } from '../CodeBlock'
import { PropsTable } from '../PropsTable'
import type { PropItem } from '../PropsTable'
import './AnimatedNumberDemo.css'

const AnimatedNumberDemo: React.FC = () => {
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(0)
  const [value3, setValue3] = useState(0)

  const randomValue = (max: number) => Math.floor(Math.random() * max)

  return (
    <div className="animated-number-demo">
      <CodeBlock
        title="基础用法"
        description="数字会平滑地从当前值滚动到目标值"
        code={`import { AnimatedNumber, Button } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState(0)
  
  return (
    <div>
      <AnimatedNumber value={value} />
      <Button onClick={() => setValue(Math.random() * 10000)}>
        随机数字
      </Button>
    </div>
  )
}`}
      >
        <Card>
          <div style={{ padding: '32px', textAlign: 'center' }}>
            <AnimatedNumber
              value={value1}
              duration={2}
              className="animated-number-demo__large"
            />
            <div style={{ marginTop: '24px' }}>
              <Space>
                <Button onClick={() => setValue1(randomValue(10000))}>
                  随机数字
                </Button>
                <Button variant="secondary" onClick={() => setValue1(0)}>
                  重置
                </Button>
              </Space>
            </div>
          </div>
        </Card>
      </CodeBlock>

      <CodeBlock
        title="带前缀和后缀"
        description="通过prefix和suffix属性添加货币符号、百分号等"
        code={`import { AnimatedNumber, Button, Card } from '@paidaxinghaha/my-ui-react'
import { useState } from 'react'

function App() {
  const [sales, setSales] = useState(0)
  const [growth, setGrowth] = useState(0)

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Card>
        <div style={{ padding: '32px', textAlign: 'center' }}>
          <div>总销售额</div>
          <AnimatedNumber
            value={sales}
            prefix="¥"
            separator=","
            decimals={2}
          />
          <Button onClick={() => setSales(Math.random() * 1000000)}>
            更新数据
          </Button>
        </div>
      </Card>

      <Card>
        <div style={{ padding: '32px', textAlign: 'center' }}>
          <div>增长率</div>
          <AnimatedNumber
            value={growth}
            suffix="%"
            decimals={1}
          />
          <Button onClick={() => setGrowth(Math.random() * 100)}>
            更新数据
          </Button>
        </div>
      </Card>
    </div>
  )
}`}
      >
        <Space direction="horizontal" size="large">
          <Card className="animated-number-demo__card">
            <div className="animated-number-demo__stat">
              <div className="animated-number-demo__stat-label">总销售额</div>
              <AnimatedNumber
                value={value2}
                prefix="¥"
                separator=","
                decimals={2}
                className="animated-number-demo__stat-value"
              />
              <Button
                size="sm"
                onClick={() => setValue2(randomValue(1000000))}
                style={{ marginTop: '16px' }}
              >
                更新数据
              </Button>
            </div>
          </Card>

          <Card className="animated-number-demo__card">
            <div className="animated-number-demo__stat">
              <div className="animated-number-demo__stat-label">增长率</div>
              <AnimatedNumber
                value={value3}
                suffix="%"
                decimals={1}
                className="animated-number-demo__stat-value"
              />
              <Button
                size="sm"
                onClick={() => setValue3(randomValue(100))}
                style={{ marginTop: '16px' }}
              >
                更新数据
              </Button>
            </div>
          </Card>
        </Space>
      </CodeBlock>

      <CodeBlock
        title="数据统计面板"
        description="适合在仪表盘中展示实时数据"
        code={`import { AnimatedNumber, Card } from '@paidaxinghaha/my-ui-react'

function Dashboard() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
      <Card>
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: 56, height: 56, background: '#667eea', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
            👥
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#999' }}>总用户数</div>
            <AnimatedNumber value={128590} separator="," />
          </div>
        </div>
      </Card>
      
      <Card>
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: 56, height: 56, background: '#4facfe', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
            💰
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#999' }}>收入</div>
            <AnimatedNumber value={356789.5} prefix="¥" separator="," decimals={2} />
          </div>
        </div>
      </Card>
    </div>
  )
}`}
      >
        <div className="animated-number-demo__dashboard">
          <Card className="animated-number-demo__dashboard-card">
            <div className="animated-number-demo__dashboard-item">
              <div className="animated-number-demo__dashboard-icon" style={{ background: '#667eea' }}>
                👥
              </div>
              <div>
                <div className="animated-number-demo__dashboard-label">总用户数</div>
                <AnimatedNumber
                  value={128590}
                  separator=","
                  className="animated-number-demo__dashboard-value"
                />
              </div>
            </div>
          </Card>

          <Card className="animated-number-demo__dashboard-card">
            <div className="animated-number-demo__dashboard-item">
              <div className="animated-number-demo__dashboard-icon" style={{ background: '#f093fb' }}>
                📊
              </div>
              <div>
                <div className="animated-number-demo__dashboard-label">今日访问</div>
                <AnimatedNumber
                  value={8432}
                  separator=","
                  className="animated-number-demo__dashboard-value"
                />
              </div>
            </div>
          </Card>

          <Card className="animated-number-demo__dashboard-card">
            <div className="animated-number-demo__dashboard-item">
              <div className="animated-number-demo__dashboard-icon" style={{ background: '#4facfe' }}>
                💰
              </div>
              <div>
                <div className="animated-number-demo__dashboard-label">收入</div>
                <AnimatedNumber
                  value={356789.5}
                  prefix="¥"
                  separator=","
                  decimals={2}
                  className="animated-number-demo__dashboard-value"
                />
              </div>
            </div>
          </Card>

          <Card className="animated-number-demo__dashboard-card">
            <div className="animated-number-demo__dashboard-item">
              <div className="animated-number-demo__dashboard-icon" style={{ background: '#43e97b' }}>
                ⭐
              </div>
              <div>
                <div className="animated-number-demo__dashboard-label">满意度</div>
                <AnimatedNumber
                  value={98.7}
                  suffix="%"
                  decimals={1}
                  className="animated-number-demo__dashboard-value"
                />
              </div>
            </div>
          </Card>
        </div>
      </CodeBlock>

      <PropsTable
        title="AnimatedNumber Props"
        data={[
          {
            name: 'value',
            type: 'number',
            description: '要显示的目标数字值',
            required: true,
          },
          {
            name: 'duration',
            type: 'number',
            default: '2',
            description: '动画持续时间（单位：秒）。控制数字滚动的速度，值越大滚动越慢',
          },
          {
            name: 'decimals',
            type: 'number',
            default: '0',
            description: '小数位数。设置显示的小数点后位数',
          },
          {
            name: 'prefix',
            type: 'string',
            default: "''",
            description: '前缀。显示在数字前面的文本，如货币符号 "¥"、"$" 等',
          },
          {
            name: 'suffix',
            type: 'string',
            default: "''",
            description: '后缀。显示在数字后面的文本，如百分号 "%"、单位 "元" 等',
          },
          {
            name: 'separator',
            type: 'string',
            default: "','",
            description: '千分位分隔符。用于格式化大数字，如 "1,000,000"',
          },
          {
            name: 'className',
            type: 'string',
            description: '自定义类名',
          },
          {
            name: 'onAnimationComplete',
            type: '() => void',
            description: '动画完成时的回调函数',
          },
          {
            name: 'springConfig',
            type: '{ stiffness?: number; damping?: number; mass?: number }',
            description: 'Spring动画配置。stiffness: 刚度(默认100)，值越大动画越快；damping: 阻尼(默认30)，控制弹性；mass: 质量(默认1)',
          },
        ] as PropItem[]}
      />
    </div>
  )
}

export default AnimatedNumberDemo
