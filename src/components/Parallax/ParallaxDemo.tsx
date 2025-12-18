import React from 'react'
import Parallax from './Parallax'
import { Card } from '../Card'
import { CodeBlock } from '../CodeBlock'
import { PropsTable, type PropItem } from '../PropsTable'
import './Parallax.css'

const ParallaxDemo: React.FC = () => {
  return (
    <div className="parallax-demo">
      <CodeBlock
        title="基础视差 (背景图)"
        description="用于背景图片的视差滚动效果，背景移动速度慢于前景，创造深度感。"
        code={`import { Parallax } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Parallax 
        bgImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        strength={300}
        style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
        <h1 style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)', fontSize: 48 }}>
            Parallax Effect
        </h1>
    </Parallax>
  )
}`}
      >
        <Card style={{ overflow: 'hidden', padding: 0 }}>
             <Parallax 
                bgImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                strength={300}
                style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)', fontSize: 48, margin: 0 }}>
                        Parallax Effect
                    </h1>
                    <p style={{ color: 'white', fontSize: 18, opacity: 0.9 }}>
                        Scroll to see the magic
                    </p>
                </div>
            </Parallax>
        </Card>
      </CodeBlock>

      <CodeBlock
        title="元素视差"
        description="不同元素以不同速度移动"
        code={`import { Parallax } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <div style={{ height: 400, position: 'relative', overflow: 'hidden', background: '#f0f2f5' }}>
        <Parallax speed={-0.1} style={{ position: 'absolute', top: 50, left: 50 }}>
            <div style={{ width: 100, height: 100, background: '#ff7875', borderRadius: '50%' }} />
        </Parallax>
        
        <Parallax speed={0.05} style={{ position: 'absolute', top: 150, right: 100 }}>
            <div style={{ width: 80, height: 80, background: '#40a9ff', borderRadius: 12, transform: 'rotate(45deg)' }} />
        </Parallax>
        
        <Parallax speed={-0.08} style={{ position: 'absolute', bottom: 50, left: '40%' }}>
             <div style={{ width: 60, height: 60, background: '#73d13d', borderRadius: '50%' }} />
        </Parallax>
    </div>
  )
}`}
      >
        <Card>
            <div style={{ height: 400, position: 'relative', overflow: 'hidden', background: '#f0f2f5', borderRadius: 8 }}>
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#999' }}>
                    Scroll the page to see elements move
                 </div>
                 
                <Parallax speed={-0.2} style={{ position: 'absolute', top: 50, left: 50 }}>
                    <div style={{ width: 100, height: 100, background: '#ff7875', borderRadius: '50%', opacity: 0.8 }} />
                </Parallax>
                
                <Parallax speed={0.1} style={{ position: 'absolute', top: 150, right: 100 }}>
                    <div style={{ width: 120, height: 120, background: '#40a9ff', borderRadius: 20, transform: 'rotate(45deg)', opacity: 0.8 }} />
                </Parallax>
                
                <Parallax speed={-0.15} style={{ position: 'absolute', bottom: 80, left: '40%' }}>
                     <div style={{ width: 80, height: 80, background: '#73d13d', borderRadius: '50%', opacity: 0.8 }} />
                </Parallax>
                
                 <Parallax speed={0.3} style={{ position: 'absolute', top: 20, right: 20 }}>
                     <div style={{ fontSize: 64 }}>☁️</div>
                </Parallax>
            </div>
        </Card>
      </CodeBlock>

      <PropsTable
        title="Parallax Props"
        data={[
          {
            name: 'children',
            type: 'ReactNode',
            description: '内容元素',
            required: true,
          },
          {
            name: 'bgImage',
            type: 'string',
            description: '背景图片URL（开启背景视差模式）',
          },
          {
            name: 'strength',
            type: 'number',
            default: '200',
            description: '背景视差强度 (仅用于 bgImage 模式)',
          },
          {
            name: 'speed',
            type: 'number',
            default: '0.5',
            description: '移动速度系数。正数为同向移动，负数为反向移动 (仅用于普通元素模式)',
          },
          {
            name: 'direction',
            type: "'vertical' | 'horizontal'",
            default: "'vertical'",
            description: '移动方向',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: '是否禁用视差效果',
          },
           {
            name: 'className',
            type: 'string',
            description: '自定义类名',
          },
        ] as PropItem[]}
      />
    </div>
  )
}

export default ParallaxDemo
