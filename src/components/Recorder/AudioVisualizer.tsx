import React, { useRef, useEffect } from 'react'
import { AudioVisualizerProps } from './Recorder.types'
import styles from './Recorder.module.css'

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  analyser,
  type = 'waveform',
  isRecording,
  audioLevel = 0,
  width = 300,
  height = 100,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置 canvas 尺寸
    canvas.width = width
    canvas.height = height

    const draw = () => {
      if (!ctx || !canvas) return

      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (!isRecording || !analyser) {
        // 不录音时显示静态线
        drawIdleState(ctx, canvas)
        return
      }

      if (type === 'waveform') {
        drawWaveform(ctx, canvas, analyser)
      } else if (type === 'frequency') {
        drawFrequency(ctx, canvas, analyser)
      } else if (type === 'volume') {
        drawVolume(ctx, canvas, audioLevel)
      }

      animationFrameRef.current = requestAnimationFrame(draw)
    }

    if (isRecording) {
      draw()
    } else {
      drawIdleState(ctx, canvas)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [analyser, type, isRecording, audioLevel, width, height])

  // 绘制空闲状态
  const drawIdleState = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, canvas.height / 2)
    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.stroke()
  }

  // 绘制波形
  const drawWaveform = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    analyser: AnalyserNode
  ) => {
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyser.getByteTimeDomainData(dataArray)

    // 创建渐变
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
    gradient.addColorStop(0, '#3b82f6')
    gradient.addColorStop(0.5, '#8b5cf6')
    gradient.addColorStop(1, '#ec4899')

    ctx.strokeStyle = gradient
    ctx.lineWidth = 2
    ctx.beginPath()

    const sliceWidth = canvas.width / bufferLength
    let x = 0

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0
      const y = (v * canvas.height) / 2

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      x += sliceWidth
    }

    ctx.stroke()
  }

  // 绘制频谱
  const drawFrequency = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    analyser: AnalyserNode
  ) => {
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyser.getByteFrequencyData(dataArray)

    const barWidth = (canvas.width / bufferLength) * 2.5
    let barHeight
    let x = 0

    for (let i = 0; i < bufferLength; i++) {
      barHeight = (dataArray[i] / 255) * canvas.height

      // 创建渐变色
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0)
      gradient.addColorStop(0, '#3b82f6')
      gradient.addColorStop(0.5, '#8b5cf6')
      gradient.addColorStop(1, '#ec4899')

      ctx.fillStyle = gradient
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

      x += barWidth + 1
    }
  }

  // 绘制音量指示器
  const drawVolume = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    level: number
  ) => {
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 10

    // 绘制多个同心圆
    const circles = 5
    for (let i = 0; i < circles; i++) {
      const radius = (maxRadius * (i + 1)) / circles
      const opacity = (level / 100) * (1 - i / circles)

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
      gradient.addColorStop(1, `rgba(59, 130, 246, 0)`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    // 中心圆
    ctx.fillStyle = '#3b82f6'
    ctx.beginPath()
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2)
    ctx.fill()
  }

  return (
    <div className={`${styles.visualizer} ${className || ''}`}>
      <canvas ref={canvasRef} className={styles.visualizerCanvas} />
    </div>
  )
}

export default AudioVisualizer
