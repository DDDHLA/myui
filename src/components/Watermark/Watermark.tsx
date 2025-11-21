import React, { useEffect, useState } from 'react';
import './style.css';

export interface WatermarkProps {
  children?: React.ReactNode;
  text?: string | string[];
  image?: string;
  fontSize?: number;
  fontColor?: string;
  gap?: [number, number];
  opacity?: number;
  rotate?: number;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Watermark: React.FC<WatermarkProps> = ({
  children,
  text,
  image,
  fontSize = 16,
  fontColor = 'rgba(0, 0, 0, 0.15)',
  gap = [100, 100],
  opacity = 1,
  rotate = -22,
  width,
  height,
  className,
  style,
}) => {
  const [backgroundUrl, setBackgroundUrl] = useState('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ratio = window.devicePixelRatio || 1;
    const [gapX, gapY] = gap;
    const canvasWidth = (width || 120) + gapX;
    const canvasHeight = (height || 64) + gapY;
    
    canvas.width = canvasWidth * ratio;
    canvas.height = canvasHeight * ratio;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    
    ctx.scale(ratio, ratio);
    ctx.globalAlpha = opacity;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.rotate((Math.PI / 180) * rotate);
      ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
      
      if (text) {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = fontColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const lines = Array.isArray(text) ? text : [text];
        lines.forEach((line, index) => {
          ctx.fillText(line, canvasWidth / 2, canvasHeight / 2 + index * (fontSize + 4));
        });
      }
      
      setBackgroundUrl(canvas.toDataURL());
    };

    if (image) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const imgWidth = width || 120;
        const imgHeight = height || 64;
        ctx.drawImage(img, (canvasWidth - imgWidth) / 2, (canvasHeight - imgHeight) / 2, imgWidth, imgHeight);
        draw();
      };
      img.src = image;
    } else {
      draw();
    }

  }, [text, image, fontSize, fontColor, gap, opacity, rotate, width, height]);

  return (
    <div className="myui-watermark-wrapper" style={style}>
      {children}
      <div
        className={`myui-watermark-overlay ${className || ''}`}
        style={{
          backgroundImage: `url(${backgroundUrl})`,
        }}
      />
    </div>
  );
};

