import React, { useState, useRef, useCallback } from 'react'
import { UploadProps, UploadFile } from './Upload.types'
import UploadList from './UploadList'
import styles from './Upload.module.css'

const Upload: React.FC<UploadProps> = ({
  accept,
  multiple = false,
  disabled = false,
  listType = 'text',
  maxCount,
  maxSize,
  showUploadList = true,
  defaultFileList = [],
  fileList: controlledFileList,
  customRequest,
  beforeUpload,
  onChange,
  onPreview,
  onRemove,
  onSuccess,
  onError,
  onProgress,
  className,
  style,
  children,
  drag = false,
  dragText = '点击或拖拽文件到此区域上传',
  dragIcon,
}) => {
  const [internalFileList, setInternalFileList] = useState<UploadFile[]>(defaultFileList)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // 使用 ref 保存最新的 fileList，避免闭包陷阱
  const fileListRef = useRef<UploadFile[]>([])

  // 使用受控或非受控模式
  const fileList = controlledFileList !== undefined ? controlledFileList : internalFileList
  
  // 同步更新 ref
  fileListRef.current = fileList

  // 生成唯一ID
  const generateUid = () => {
    return `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // 格式化文件大小（预留给UploadList使用）
  // const formatFileSize = (bytes: number): string => {
  //   if (bytes === 0) return '0 B'
  //   const k = 1024
  //   const sizes = ['B', 'KB', 'MB', 'GB']
  //   const i = Math.floor(Math.log(bytes) / Math.log(k))
  //   return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  // }

  // 更新文件列表
  const updateFileList = useCallback((newFileList: UploadFile[]) => {
    if (controlledFileList === undefined) {
      setInternalFileList(newFileList)
    }
  }, [controlledFileList])

  // 模拟上传
  const simulateUpload = useCallback(async (file: UploadFile) => {
    return new Promise<void>((resolve) => {
      let percent = 0
      const timer = setInterval(() => {
        percent += 10
        
        const updatedFile: UploadFile = {
          ...file,
          percent,
          status: percent >= 100 ? 'success' : 'uploading',
        }

        // 使用 ref 获取最新的 fileList，避免闭包陷阱
        const currentList = fileListRef.current
        const newList = currentList.map(f => f.uid === file.uid ? updatedFile : f)
        updateFileList(newList)
        onChange?.(updatedFile, newList)
        onProgress?.(percent, updatedFile)

        if (percent >= 100) {
          clearInterval(timer)
          onSuccess?.({ url: URL.createObjectURL(file.originFileObj!) }, updatedFile)
          resolve()
        }
      }, 200)
    })
  }, [updateFileList, onChange, onProgress, onSuccess])

  // 自定义请求或模拟上传
  const handleUploadFile = useCallback(async (file: UploadFile) => {
    if (customRequest && file.originFileObj) {
      customRequest({
        file: file.originFileObj,
        onProgress: (percent) => {
          const updatedFile = { ...file, percent, status: 'uploading' as const }
          const currentList = fileListRef.current
          const newList = currentList.map(f => f.uid === file.uid ? updatedFile : f)
          updateFileList(newList)
          onChange?.(updatedFile, newList)
          onProgress?.(percent, updatedFile)
        },
        onSuccess: (response) => {
          const updatedFile = { ...file, status: 'success' as const, response }
          const currentList = fileListRef.current
          const newList = currentList.map(f => f.uid === file.uid ? updatedFile : f)
          updateFileList(newList)
          onChange?.(updatedFile, newList)
          onSuccess?.(response, updatedFile)
        },
        onError: (error) => {
          const updatedFile = { ...file, status: 'error' as const, error }
          const currentList = fileListRef.current
          const newList = currentList.map(f => f.uid === file.uid ? updatedFile : f)
          updateFileList(newList)
          onChange?.(updatedFile, newList)
          onError?.(error, updatedFile)
        },
      })
    } else {
      await simulateUpload(file)
    }
  }, [customRequest, updateFileList, onChange, onProgress, onSuccess, onError, simulateUpload])

  // 处理文件选择
  const handleFileChange = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)

    // 检查数量限制
    if (maxCount && fileList.length + fileArray.length > maxCount) {
      alert(`最多只能上传 ${maxCount} 个文件`)
      return
    }

    // 处理每个文件
    for (const file of fileArray) {
      // 检查文件大小
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        alert(`文件 ${file.name} 大小超过 ${maxSize}MB 限制`)
        continue
      }

      // beforeUpload 钩子
      if (beforeUpload) {
        const result = await beforeUpload(file, fileArray)
        if (result === false) continue
      }

      // 创建文件对象
      const uploadFile: UploadFile = {
        uid: generateUid(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'ready',
        percent: 0,
        originFileObj: file,
      }

      // 如果是图片，生成缩略图
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          uploadFile.thumbUrl = e.target?.result as string
          // 使用 ref 获取最新的 fileList
          const currentList = fileListRef.current
          const newList = [...currentList, uploadFile]
          updateFileList(newList)
          onChange?.(uploadFile, newList)
          handleUploadFile(uploadFile)
        }
        reader.readAsDataURL(file)
      } else {
        // 使用 ref 获取最新的 fileList
        const currentList = fileListRef.current
        const newList = [...currentList, uploadFile]
        updateFileList(newList)
        onChange?.(uploadFile, newList)
        handleUploadFile(uploadFile)
      }
    }

    // 重置input
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [maxCount, fileList, maxSize, beforeUpload, onChange, updateFileList, handleUploadFile])

  // 处理移除
  const handleRemove = async (file: UploadFile) => {
    if (onRemove) {
      const result = await onRemove(file)
      if (result === false) return
    }

    const newList = fileList.filter(f => f.uid !== file.uid)
    updateFileList(newList)
    onChange?.(file, newList)
  }

  // 点击上传
  const handleClick = () => {
    if (disabled) return
    inputRef.current?.click()
  }

  // 拖拽事件
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (disabled) return
    setDragOver(true)
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (disabled) return
    handleFileChange(e.dataTransfer.files)
  }, [disabled, handleFileChange])

  // 检查是否可以继续上传
  const canUpload = !disabled && (!maxCount || fileList.length < maxCount)

  // 渲染上传触发器
  const renderUploadTrigger = () => {
    if (listType === 'picture-card') {
      return (
        <div
          className={`${styles.uploadTrigger} ${disabled ? styles.disabled : ''}`}
          onClick={handleClick}
        >
          <div className={styles.uploadIcon}>+</div>
          <div className={styles.uploadText}>上传</div>
        </div>
      )
    }

    if (drag) {
      return (
        <div
          className={`${styles.dragArea} ${dragOver ? styles.dragOver : ''} ${disabled ? styles.disabled : ''}`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {dragIcon || (
            <div className={styles.dragIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
          <div className={styles.dragText}>{dragText}</div>
          <div className={styles.dragHint}>支持单个或批量上传</div>
        </div>
      )
    }

    if (children) {
      return <div onClick={handleClick}>{children}</div>
    }

    return (
      <button
        type="button"
        className={`${styles.uploadButton} ${disabled ? styles.disabled : ''}`}
        onClick={handleClick}
        disabled={disabled}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        点击上传
      </button>
    )
  }

  return (
    <div className={`${styles.upload} ${className || ''}`} style={style}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={(e) => handleFileChange(e.target.files)}
        disabled={disabled}
      />

      {listType === 'picture-card' ? (
        <div className={styles.uploadListCard}>
          {showUploadList && (
            <UploadList
              listType={listType}
              fileList={fileList}
              onPreview={onPreview}
              onRemove={handleRemove}
              disabled={disabled}
            />
          )}
          {canUpload && renderUploadTrigger()}
        </div>
      ) : (
        <>
          {renderUploadTrigger()}
          {showUploadList && fileList.length > 0 && (
            <UploadList
              listType={listType}
              fileList={fileList}
              onPreview={onPreview}
              onRemove={handleRemove}
              disabled={disabled}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Upload
