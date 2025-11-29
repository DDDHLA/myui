import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/utils';
import { ImagePreview } from './ImagePreview';
import './Image.css';

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  preview?: boolean;
  placeholder?: React.ReactNode;
  fallback?: string;
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt = '',
  width,
  height,
  preview = false,
  placeholder,
  fallback,
  fit = 'cover',
  loading = 'lazy',
  className,
  style,
  onLoad,
  onError,
  ...props
}) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setImageStatus('loading');
  }, [src]);

  const handleLoad = () => {
    setImageStatus('loaded');
    onLoad?.();
  };

  const handleError = () => {
    if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setImageStatus('loading');
    } else {
      setImageStatus('error');
    }
    onError?.();
  };

  const handlePreview = () => {
    if (preview && imageStatus === 'loaded') {
      setPreviewVisible(true);
    }
  };

  const imageStyle: React.CSSProperties = {
    ...style,
    width,
    height,
    objectFit: fit,
  };

  return (
    <>
      <div
        className={cn(
          'myui-image',
          {
            'myui-image--loading': imageStatus === 'loading',
            'myui-image--error': imageStatus === 'error',
            'myui-image--preview': preview,
          },
          className
        )}
        style={{ width, height }}
        onClick={handlePreview}
      >
        {imageStatus === 'loading' && (
          <div className="myui-image__placeholder">
            {placeholder || (
              <div className="myui-image__placeholder-default">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="4" fill="currentColor" opacity="0.1" />
                  <path
                    d="M20 18L28 26M28 18L20 26"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                </svg>
              </div>
            )}
          </div>
        )}

        {imageStatus === 'error' && (
          <div className="myui-image__error">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="4" fill="currentColor" opacity="0.1" />
              <path
                d="M24 16v12M24 32h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
            <span className="myui-image__error-text">加载失败</span>
          </div>
        )}

        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading={loading}
          className={cn('myui-image__img', {
            'myui-image__img--loaded': imageStatus === 'loaded',
          })}
          style={imageStyle}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />

        {preview && imageStatus === 'loaded' && (
          <div className="myui-image__mask">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      <AnimatePresence>
        {previewVisible && (
          <ImagePreview
            src={currentSrc}
            alt={alt}
            onClose={() => setPreviewVisible(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

Image.displayName = 'Image';
