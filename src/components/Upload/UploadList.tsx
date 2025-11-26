import React from 'react'
import { UploadListProps, UploadFile } from './Upload.types'
import styles from './Upload.module.css'

const UploadList: React.FC<UploadListProps> = ({
  listType,
  fileList,
  onPreview,
  onRemove,
  disabled,
}) => {
  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  // 渲染文件图标
  const renderFileIcon = (file: UploadFile) => {
    const statusClass = file.status as keyof typeof styles
    const iconClass = `${styles.fileIcon} ${styles[statusClass] || ''}`

    if (file.status === 'uploading') {
      return (
        <svg className={iconClass} width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="60" strokeDashoffset="30" />
        </svg>
      )
    }

    if (file.status === 'success') {
      return (
        <svg className={iconClass} width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }

    if (file.status === 'error') {
      return (
        <svg className={iconClass} width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    }

    return (
      <svg className={iconClass} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M13 2v7h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  // 照片墙样式
  if (listType === 'picture-card') {
    return (
      <>
        {fileList.map((file) => (
          <div key={file.uid} className={`${styles.cardItem} ${styles.fadeIn}`}>
            {file.thumbUrl || file.url ? (
              <img src={file.thumbUrl || file.url} alt={file.name} className={styles.cardImage} />
            ) : (
              <div className={styles.cardImage} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {renderFileIcon(file)}
              </div>
            )}
            
            {file.status === 'uploading' && (
              <div className={styles.cardProgress}>
                <div className={styles.progressCircle}>{file.percent}%</div>
              </div>
            )}

            <div className={styles.cardMask}>
              {onPreview && (
                <button onClick={() => onPreview(file)} title="预览">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              )}
              {onRemove && !disabled && (
                <button onClick={() => onRemove(file)} title="删除" className={styles.remove}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </>
    )
  }

  // 图片列表样式
  if (listType === 'picture') {
    return (
      <div className={styles.uploadListPicture}>
        {fileList.map((file) => (
          <div key={file.uid} className={`${styles.pictureItem} ${styles.fadeIn}`}>
            {file.thumbUrl || file.url ? (
              <img src={file.thumbUrl || file.url} alt={file.name} className={styles.thumbnail} />
            ) : (
              <div className={styles.thumbnail} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {renderFileIcon(file)}
              </div>
            )}
            
            <div className={styles.fileInfo}>
              <div className={styles.fileName} onClick={() => onPreview?.(file)}>
                {file.name}
              </div>
              <div className={styles.fileSize}>{formatFileSize(file.size)}</div>
              
              {file.status === 'uploading' && file.percent !== undefined && (
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${file.percent}%` }} />
                </div>
              )}
            </div>

            <div className={styles.fileActions}>
              {onRemove && !disabled && (
                <button className={`${styles.actionButton} ${styles.remove}`} onClick={() => onRemove(file)} title="删除">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // 文本列表样式
  return (
    <div className={styles.uploadListText}>
      {fileList.map((file) => {
        const statusClass = file.status as keyof typeof styles
        return (
        <div
          key={file.uid}
          className={`${styles.uploadListItem} ${styles[statusClass] || ''} ${styles.fadeIn}`}
        >
          {renderFileIcon(file)}
          
          <div className={styles.fileInfo}>
            <div className={styles.fileName} onClick={() => onPreview?.(file)}>
              {file.name}
            </div>
            <div className={styles.fileSize}>{formatFileSize(file.size)}</div>
            
            {file.status === 'uploading' && file.percent !== undefined && (
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${file.percent}%` }} />
              </div>
            )}
          </div>

          <div className={styles.fileActions}>
            {onRemove && !disabled && (
              <button className={`${styles.actionButton} ${styles.remove}`} onClick={() => onRemove(file)} title="删除">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
        )
      })}
    </div>
  )
}

export default UploadList
