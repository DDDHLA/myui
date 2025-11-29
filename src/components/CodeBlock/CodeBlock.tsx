import React, { useState } from 'react'
import { cn } from '@/utils'
import './CodeBlock.css'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  description?: string
  children?: React.ReactNode
  showCopy?: boolean
}

export function CodeBlock({ 
  code, 
  language = 'tsx', 
  title,
  description,
  children,
  showCopy = true 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [showCode, setShowCode] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const toggleCode = () => {
    setShowCode(!showCode)
  }

  return (
    <div className="myui-code-block">
      {title && (
        <div className="myui-code-block__header">
          <h3 className="myui-code-block__title">{title}</h3>
          {description && (
            <p className="myui-code-block__description">{description}</p>
          )}
        </div>
      )}
      
      {children && (
        <div className="myui-code-block__demo">
          {children}
        </div>
      )}
      
      <div className="myui-code-block__actions">
        <button 
          className="myui-code-block__action-btn"
          onClick={toggleCode}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path 
              d="M16 18l6-6-6-6M8 6l-6 6 6 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          {showCode ? '隐藏代码' : '显示代码'}
        </button>
        
        {showCopy && (
          <button 
            className="myui-code-block__action-btn"
            onClick={handleCopy}
          >
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M20 6L9 17l-5-5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect 
                  x="9" y="9" width="13" height="13" rx="2" ry="2" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none"
                />
                <path 
                  d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none"
                />
              </svg>
            )}
            {copied ? '已复制' : '复制代码'}
          </button>
        )}
      </div>
      
      {showCode && (
        <div className="myui-code-block__code">
          <pre className={cn('myui-code-block__pre', `language-${language}`)}>
            <code className="myui-code-block__code-content">
              {code}
            </code>
          </pre>
        </div>
      )}
    </div>
  )
}

export default CodeBlock
