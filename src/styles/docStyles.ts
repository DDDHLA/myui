import { CSSProperties } from 'react'

/**
 * 文档页面样式常量
 * 用于减少内联样式，提升可维护性
 */

// 标题样式
export const docHeadingStyles = {
  h1: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 0 16px 0',
    color: 'var(--text-primary)',
  } as CSSProperties,

  h2: {
    fontSize: '2rem',
    fontWeight: '600',
    margin: '0 0 12px 0',
    color: 'var(--text-primary)',
  } as CSSProperties,

  h3: {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0 0 8px 0',
    color: 'var(--text-primary)',
  } as CSSProperties,
}

// 段落样式
export const docParagraphStyles = {
  lead: {
    fontSize: '1.125rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.75',
  } as CSSProperties,

  normal: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  } as CSSProperties,
}

// 布局样式
export const docLayoutStyles = {
  section: {
    marginBottom: '32px',
  } as CSSProperties,

  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  } as CSSProperties,

  flexRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap' as const,
  } as CSSProperties,

  flexColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  } as CSSProperties,

  grid: {
    display: 'grid',
    gap: '1rem',
  } as CSSProperties,

  gridAutoFit: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem',
  } as CSSProperties,
}

// 英雄区域样式
export const heroStyles = {
  container: {
    background: 'var(--bg-glass, rgba(255, 255, 255, 0.1))',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid var(--border-glass, rgba(255, 255, 255, 0.2))',
    borderRadius: '24px',
    padding: '80px 48px',
    marginBottom: '64px',
    textAlign: 'center' as const,
    position: 'relative' as const,
    overflow: 'hidden' as const,
    boxShadow: 'var(--shadow-glass, 0 8px 32px rgba(0, 0, 0, 0.1))',
  } as CSSProperties,

  title: {
    fontSize: '4.5rem',
    fontWeight: '800',
    margin: '0 0 24px 0',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as CSSProperties,

  subtitle: {
    fontSize: '1.5rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    margin: '0 0 40px 0',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  } as CSSProperties,
}

// 卡片样式
export const cardStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as CSSProperties,

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
  } as CSSProperties,
}

// 工具样式
export const utilityStyles = {
  maxWidth300: {
    maxWidth: '300px',
  } as CSSProperties,

  maxWidth400: {
    maxWidth: '400px',
  } as CSSProperties,

  maxWidth600: {
    maxWidth: '600px',
  } as CSSProperties,

  textCenter: {
    textAlign: 'center' as const,
  } as CSSProperties,

  mt3: {
    marginTop: '3rem',
  } as CSSProperties,

  mb2: {
    marginBottom: '2rem',
  } as CSSProperties,
}
