import { useState, useRef, useCallback, useEffect } from "react";
import {
  RecorderOptions,
  AudioRecorderState,
  AudioRecorderActions,
  RecordingStatus,
  QUALITY_PRESETS,
} from "../Recorder.types";

export function useAudioRecorder(
  options: RecorderOptions = {}
): AudioRecorderState & AudioRecorderActions {
  const {
    audioFormat = "webm",
    quality = "medium",
    maxDuration,
    onRecordingComplete,
    onError,
  } = options;

  // 状态
  const [status, setStatus] = useState<RecordingStatus>("idle");
  const [duration, setDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedDurationRef = useRef<number>(0);
  const pauseStartTimeRef = useRef<number>(0);

  // 检查浏览器支持
  useEffect(() => {
    const supported =
      !!navigator.mediaDevices?.getUserMedia &&
      typeof MediaRecorder !== "undefined";
    setIsSupported(supported);
    if (!supported) {
      const err = new Error("您的浏览器不支持录音功能");
      setError(err);
      onError?.(err);
    }
  }, [onError]);

  // 清理资源
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    mediaRecorderRef.current = null;
  }, []);

  // 音量检测
  const detectAudioLevel = useCallback(() => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    // 计算平均音量
    const sum = dataArray.reduce((acc, val) => acc + val, 0);
    const average = sum / bufferLength;
    const level = Math.min(100, (average / 255) * 100);
    setAudioLevel(level);

    if (status === "recording") {
      animationFrameRef.current = requestAnimationFrame(detectAudioLevel);
    }
  }, [status]);

  // 停止录音
  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      (status === "recording" || status === "paused")
    ) {
      mediaRecorderRef.current.stop();
      setStatus("stopped");
      cleanup();
    }
  }, [status, cleanup]);

  // 开始录音
  const startRecording = useCallback(async () => {
    if (!isSupported) {
      const err = new Error("您的浏览器不支持录音功能");
      setError(err);
      onError?.(err);
      return;
    }

    try {
      // 获取麦克风权限
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      // 创建 AudioContext 和 Analyser
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // 获取质量预设
      const preset = QUALITY_PRESETS[quality];

      // 确定 MIME 类型
      let mimeType = "audio/webm";
      if (audioFormat === "webm") {
        mimeType = "audio/webm;codecs=opus";
      } else if (audioFormat === "mp3") {
        mimeType = "audio/mpeg";
      } else if (audioFormat === "wav") {
        mimeType = "audio/wav";
      }

      // 检查 MIME 类型支持
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        console.warn(`${mimeType} 不支持,使用默认格式`);
        mimeType = "audio/webm";
      }

      // 创建 MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: preset.audioBitsPerSecond,
      });
      mediaRecorderRef.current = mediaRecorder;

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const finalDuration = duration;
        onRecordingComplete?.(blob, finalDuration);
        chunksRef.current = [];
      };

      mediaRecorder.onerror = (event) => {
        const err = new Error(`录音错误: ${event}`);
        setError(err);
        onError?.(err);
        cleanup();
      };

      // 开始录音
      mediaRecorder.start(100); // 每100ms收集一次数据
      setStatus("recording");
      setDuration(0);
      startTimeRef.current = Date.now();
      pausedDurationRef.current = 0;

      // 开始计时
      timerRef.current = window.setInterval(() => {
        const elapsed =
          (Date.now() - startTimeRef.current - pausedDurationRef.current) /
          1000;
        setDuration(elapsed);

        // 检查最大时长
        if (maxDuration && elapsed >= maxDuration) {
          stopRecording();
        }
      }, 100);

      // 开始音量检测
      detectAudioLevel();
    } catch (err) {
      const error = err instanceof Error ? err : new Error("无法访问麦克风");
      setError(error);
      onError?.(error);
      cleanup();
    }
  }, [
    isSupported,
    quality,
    audioFormat,
    maxDuration,
    onRecordingComplete,
    onError,
    cleanup,
    detectAudioLevel,
    duration,
    stopRecording,
  ]);

  // 暂停录音
  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && status === "recording") {
      mediaRecorderRef.current.pause();
      setStatus("paused");
      pauseStartTimeRef.current = Date.now();

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  }, [status]);

  // 继续录音
  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && status === "paused") {
      mediaRecorderRef.current.resume();
      setStatus("recording");

      // 累加暂停时长
      pausedDurationRef.current += Date.now() - pauseStartTimeRef.current;

      // 重新开始计时
      timerRef.current = window.setInterval(() => {
        const elapsed =
          (Date.now() - startTimeRef.current - pausedDurationRef.current) /
          1000;
        setDuration(elapsed);

        if (maxDuration && elapsed >= maxDuration) {
          stopRecording();
        }
      }, 100);

      // 重新开始音量检测
      detectAudioLevel();
    }
  }, [status, maxDuration, detectAudioLevel, stopRecording]);

  // 获取分析器
  const getAnalyser = useCallback(() => {
    return analyserRef.current;
  }, []);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
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
  };
}
