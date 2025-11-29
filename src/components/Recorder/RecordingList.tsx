import React, { useState } from 'react'
import { RecordingListProps, Recording } from './Recorder.types'
import styles from './Recorder.module.css'

const RecordingList: React.FC<RecordingListProps> = ({
  recordings,
  onDelete,
  onDownload,
  onRename,
  className,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  // 格式化时长
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // 格式化文件大小
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  // 播放/暂停
  const handlePlayPause = (recording: Recording) => {
    if (playingId === recording.id) {
      setPlayingId(null)
    } else {
      setPlayingId(recording.id)
      const audio = new Audio(recording.url || URL.createObjectURL(recording.blob))
      audio.play()
      audio.onended = () => setPlayingId(null)
    }
  }

  // 下载
  const handleDownload = (recording: Recording) => {
    const url = recording.url || URL.createObjectURL(recording.blob)
    const a = document.createElement('a')
    a.href = url
    
    // 根据 MIME 类型确定扩展名
    let extension = 'webm'
    const mimeType = recording.blob.type
    if (mimeType.includes('audio/mpeg') || mimeType.includes('audio/mp3')) {
      extension = 'mp3'
    } else if (mimeType.includes('audio/wav')) {
      extension = 'wav'
    } else if (mimeType.includes('audio/ogg')) {
      extension = 'ogg'
    }
    
    a.download = `${recording.name}.${extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    onDownload?.(recording)
  }

  // 删除
  const handleDelete = (id: string) => {
    if (confirm('确定要删除这条录音吗?')) {
      onDelete?.(id)
    }
  }

  // 开始编辑
  const startEdit = (recording: Recording) => {
    setEditingId(recording.id)
    setEditName(recording.name)
  }

  // 保存编辑
  const saveEdit = (id: string) => {
    if (editName.trim()) {
      onRename?.(id, editName.trim())
    }
    setEditingId(null)
    setEditName('')
  }

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null)
    setEditName('')
  }

  if (recordings.length === 0) {
    return (
      <div className={`${styles.recordingList} ${className || ''}`}>
        <div className={styles.emptyState}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 15a3 3 0 100-6 3 3 0 000 6z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>暂无录音</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.recordingList} ${className || ''}`}>
      {recordings.map((recording) => (
        <div key={recording.id} className={styles.recordingItem}>
          <div className={styles.recordingInfo}>
            {editingId === recording.id ? (
              <div className={styles.editInput}>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(recording.id)
                    if (e.key === 'Escape') cancelEdit()
                  }}
                  autoFocus
                />
                <button onClick={() => saveEdit(recording.id)} className={styles.saveBtn}>
                  ✓
                </button>
                <button onClick={cancelEdit} className={styles.cancelBtn}>
                  ✕
                </button>
              </div>
            ) : (
              <>
                <div className={styles.recordingName} onDoubleClick={() => startEdit(recording)}>
                  {recording.name}
                </div>
                <div className={styles.recordingMeta}>
                  <span>{formatDuration(recording.duration)}</span>
                  <span>•</span>
                  <span>{formatSize(recording.size)}</span>
                  <span>•</span>
                  <span>{new Date(recording.createdAt).toLocaleString()}</span>
                </div>
              </>
            )}
          </div>

          <div className={styles.recordingActions}>
            <button
              onClick={() => handlePlayPause(recording)}
              className={styles.actionBtn}
              title={playingId === recording.id ? '暂停' : '播放'}
            >
              {playingId === recording.id ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => handleDownload(recording)}
              className={styles.actionBtn}
              title="下载"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => startEdit(recording)}
              className={styles.actionBtn}
              title="重命名"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => handleDelete(recording.id)}
              className={`${styles.actionBtn} ${styles.deleteBtn}`}
              title="删除"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecordingList
