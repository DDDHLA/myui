// 录音组件类型定义

export type RecorderMode = "simple" | "standard" | "professional";
export type RecordingStatus = "idle" | "recording" | "paused" | "stopped";
export type AudioFormat = "webm" | "mp3" | "wav";
export type AudioQuality = "low" | "medium" | "high";
export type VisualizerType = "waveform" | "frequency" | "volume";

export interface RecorderProps {
  /** 组件模式 */
  mode?: RecorderMode;
  /** 最大录音时长(秒) */
  maxDuration?: number;
  /** 音频格式 */
  audioFormat?: AudioFormat;
  /** 录音质量 */
  quality?: AudioQuality;
  /** 可视化类型 */
  visualizerType?: VisualizerType;
  /** 是否显示录音列表 */
  showRecordingList?: boolean;
  /** 录音完成回调 */
  onRecordingComplete?: (recording: Recording) => void;
  /** 录音开始回调 */
  onRecordingStart?: () => void;
  /** 录音暂停回调 */
  onRecordingPause?: () => void;
  /** 录音继续回调 */
  onRecordingResume?: () => void;
  /** 录音停止回调 */
  onRecordingStop?: () => void;
  /** 错误回调 */
  onError?: (error: Error) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface Recording {
  /** 唯一标识 */
  id: string;
  /** 音频数据 */
  blob: Blob;
  /** 录音时长(秒) */
  duration: number;
  /** 创建时间 */
  createdAt: Date;
  /** 录音名称 */
  name: string;
  /** 音频URL */
  url?: string;
  /** 文件大小(字节) */
  size: number;
}

export interface RecorderOptions {
  /** 音频格式 */
  audioFormat?: AudioFormat;
  /** 录音质量 */
  quality?: AudioQuality;
  /** 最大时长(秒) */
  maxDuration?: number;
  /** 录音完成回调 */
  onRecordingComplete?: (blob: Blob, duration: number) => void;
  /** 错误回调 */
  onError?: (error: Error) => void;
}

export interface AudioRecorderState {
  /** 录音状态 */
  status: RecordingStatus;
  /** 当前时长(秒) */
  duration: number;
  /** 音量级别 0-100 */
  audioLevel: number;
  /** 是否支持录音 */
  isSupported: boolean;
  /** 错误信息 */
  error: Error | null;
}

export interface AudioRecorderActions {
  /** 开始录音 */
  startRecording: () => Promise<void>;
  /** 暂停录音 */
  pauseRecording: () => void;
  /** 继续录音 */
  resumeRecording: () => void;
  /** 停止录音 */
  stopRecording: () => void;
  /** 获取分析器节点 */
  getAnalyser: () => AnalyserNode | null;
}

export interface AudioVisualizerProps {
  /** 分析器节点 */
  analyser: AnalyserNode | null;
  /** 可视化类型 */
  type?: VisualizerType;
  /** 是否正在录音 */
  isRecording: boolean;
  /** 音量级别 */
  audioLevel?: number;
  /** Canvas 宽度 */
  width?: number;
  /** Canvas 高度 */
  height?: number;
  /** 自定义类名 */
  className?: string;
}

export interface RecordingListProps {
  /** 录音列表 */
  recordings: Recording[];
  /** 删除录音回调 */
  onDelete?: (id: string) => void;
  /** 下载录音回调 */
  onDownload?: (recording: Recording) => void;
  /** 重命名回调 */
  onRename?: (id: string, newName: string) => void;
  /** 自定义类名 */
  className?: string;
}

export interface QualityPreset {
  /** 采样率 */
  sampleRate: number;
  /** 比特率 */
  audioBitsPerSecond: number;
  /** 声道数 */
  channelCount: number;
}

export const QUALITY_PRESETS: Record<AudioQuality, QualityPreset> = {
  low: {
    sampleRate: 22050,
    audioBitsPerSecond: 64000,
    channelCount: 1,
  },
  medium: {
    sampleRate: 44100,
    audioBitsPerSecond: 128000,
    channelCount: 2,
  },
  high: {
    sampleRate: 48000,
    audioBitsPerSecond: 256000,
    channelCount: 2,
  },
};
