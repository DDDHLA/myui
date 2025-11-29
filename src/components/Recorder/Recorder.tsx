import React, { useState, useCallback } from 'react'
import { RecorderProps, Recording } from './Recorder.types'
import { useAudioRecorder } from './hooks/useAudioRecorder'
import AudioVisualizer from './AudioVisualizer'
import RecordingList from './RecordingList'
import styles from './Recorder.module.css'

const Recorder: React.FC<RecorderProps> = ({
  mode = 'standard',
  maxDuration = 300,
  audioFormat = 'webm',
  quality = 'medium',
  visualizerType = 'waveform',
  showRecordingList = true,
  onRecordingComplete,
  onRecordingStart,
  onRecordingPause,
  onRecordingResume,
  onRecordingStop,
  onError,
  className,
  style,
}) => {
  const [recordings, setRecordings] = useState<Recording[]>([])

  // 录音完成回调
  const handleRecordingComplete = useCallback(
    (blob: Blob, duration: number) => {
      const recording: Recording = {
        id: `recording-${Date.now()}`,
        blob,
        duration,
        createdAt: new Date(),
        name: `录音 ${new Date().toLocaleString()}`,
        size: blob.size,
      }
      setRecordings((prev) => [recording, ...prev])
      onRecordingComplete?.(recording)
    },
    [onRecordingComplete]
  )

  // 使用录音 Hook
  const {
    status,
    duration,
    audioLevel,
    isSupported,
    error,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    getAnalyser,
  } = useAudioRecorder({
    audioFormat,
    quality,
    maxDuration,
    onRecordingComplete: handleRecordingComplete,
    onError,
  })

  // 格式化时间
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // 开始录音
  const handleStart = async () => {
    await startRecording()
    onRecordingStart?.()
  }

  // 暂停录音
  const handlePause = () => {
    pauseRecording()
    onRecordingPause?.()
  }

  // 继续录音
  const handleResume = () => {
    resumeRecording()
    onRecordingResume?.()
  }

  // 停止录音
  const handleStop = () => {
    stopRecording()
    onRecordingStop?.()
  }

  // 删除录音
  const handleDelete = (id: string) => {
    setRecordings((prev) => prev.filter((r) => r.id !== id))
  }

  // 重命名录音
  const handleRename = (id: string, newName: string) => {
    setRecordings((prev) =>
      prev.map((r) => (r.id === id ? { ...r, name: newName } : r))
    )
  }

  // 如果不支持录音
  if (!isSupported) {
    return (
      <div className={`${styles.recorder} ${className || ''}`} style={style}>
        <div className={styles.errorState}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p>您的浏览器不支持录音功能</p>
          <p className={styles.errorHint}>请使用 Chrome、Firefox 或 Edge 浏览器</p>
        </div>
      </div>
    )
  }

  // 如果有错误
  if (error) {
    return (
      <div className={`${styles.recorder} ${className || ''}`} style={style}>
        <div className={styles.errorState}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p>{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.recorder} ${styles[`recorder--${mode}`]} ${className || ''}`} style={style}>
      {/* 录音控制区 */}
      <div className={styles.recorderControl}>
        {/* 录音按钮 */}
        <div className={styles.recordButtonWrapper}>
          <button
            className={`${styles.recordButton} ${status === 'recording' ? styles.recording : ''} ${
              status === 'paused' ? styles.paused : ''
            }`}
            onClick={status === 'idle' ? handleStart : status === 'recording' ? handlePause : handleResume}
            disabled={status === 'stopped'}
          >
            {status === 'idle' && (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="8" />
              </svg>
            )}
            {status === 'recording' && (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            )}
            {status === 'paused' && (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* 脉冲动画 */}
          {status === 'recording' && (
            <>
              <div className={`${styles.pulse} ${styles.pulse1}`} />
              <div className={`${styles.pulse} ${styles.pulse2}`} />
              <div className={`${styles.pulse} ${styles.pulse3}`} />
            </>
          )}
        </div>

        {/* 状态指示 */}
        <div className={styles.statusIndicator}>
          <div className={`${styles.statusDot} ${styles[`status--${status}`]}`} />
          <span className={styles.statusText}>
            {status === 'idle' && '准备录音'}
            {status === 'recording' && '录音中...'}
            {status === 'paused' && '已暂停'}
            {status === 'stopped' && '已停止'}
          </span>
        </div>

        {/* 时间显示 */}
        <div className={styles.timeDisplay}>
          <span className={styles.currentTime}>{formatTime(duration)}</span>
          {maxDuration && (
            <>
              <span className={styles.timeSeparator}>/</span>
              <span className={styles.maxTime}>{formatTime(maxDuration)}</span>
            </>
          )}
        </div>

        {/* 控制按钮 */}
        {(status === 'recording' || status === 'paused') && (
          <div className={styles.controlButtons}>
            <button onClick={handleStop} className={styles.stopButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="5" y="5" width="14" height="14" rx="2" />
              </svg>
              停止
            </button>
          </div>
        )}
      </div>

      {/* 可视化区域 - 标准模式和专业模式显示 */}
      {(mode === 'standard' || mode === 'professional') && (
        <div className={styles.visualizerWrapper}>
          <AudioVisualizer
            analyser={getAnalyser()}
            type={visualizerType}
            isRecording={status === 'recording'}
            audioLevel={audioLevel}
            width={mode === 'professional' ? 600 : 400}
            height={mode === 'professional' ? 150 : 100}
          />
        </div>
      )}

      {/* 专业模式 - 显示高级设置 */}
      {mode === 'professional' && (
        <div className={styles.advancedSettings}>
          <div className={styles.settingGroup}>
            <label>音频格式</label>
            <span className={styles.settingValue}>{audioFormat.toUpperCase()}</span>
          </div>
          <div className={styles.settingGroup}>
            <label>录音质量</label>
            <span className={styles.settingValue}>
              {quality === 'low' && '低质量'}
              {quality === 'medium' && '中质量'}
              {quality === 'high' && '高质量'}
            </span>
          </div>
          <div className={styles.settingGroup}>
            <label>音量级别</label>
            <div className={styles.levelMeter}>
              <div className={styles.levelBar} style={{ width: `${audioLevel}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* 录音列表 */}
      {showRecordingList && recordings.length > 0 && (
        <div className={styles.recordingsSection}>
          <h3 className={styles.sectionTitle}>录音列表</h3>
          <RecordingList
            recordings={recordings}
            onDelete={handleDelete}
            onRename={handleRename}
          />
        </div>
      )}
    </div>
  )
}

export default Recorder

// 导出类型
export type {
  RecorderProps,
  Recording,
  RecorderMode,
  RecordingStatus,
  AudioFormat,
  AudioQuality,
  VisualizerType
} from './Recorder.types'

