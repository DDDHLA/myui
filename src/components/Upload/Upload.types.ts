import { ReactNode } from "react";

export type UploadStatus = "ready" | "uploading" | "success" | "error";

export type UploadListType = "text" | "picture" | "picture-card";

export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  type: string;
  status: UploadStatus;
  percent?: number;
  url?: string;
  thumbUrl?: string;
  response?: unknown;
  error?: Error | null;
  originFileObj?: File;
}

export interface UploadProps {
  /** 接受上传的文件类型 */
  accept?: string;
  /** 是否支持多选文件 */
  multiple?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 上传列表的内建样式 */
  listType?: UploadListType;
  /** 最大允许上传数量 */
  maxCount?: number;
  /** 文件大小限制（MB） */
  maxSize?: number;
  /** 是否显示上传列表 */
  showUploadList?: boolean;
  /** 默认已经上传的文件列表 */
  defaultFileList?: UploadFile[];
  /** 受控的文件列表 */
  fileList?: UploadFile[];
  /** 自定义上传实现 */
  customRequest?: (options: CustomRequestOptions) => void;
  /** 上传文件之前的钩子，返回false则停止上传 */
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  /** 文件状态改变的回调 */
  onChange?: (file: UploadFile, fileList: UploadFile[]) => void;
  /** 点击文件链接或预览图标时的回调 */
  onPreview?: (file: UploadFile) => void;
  /** 文件移除时的回调 */
  onRemove?: (file: UploadFile) => boolean | Promise<boolean>;
  /** 上传成功的回调 */
  onSuccess?: (response: unknown, file: UploadFile) => void;
  /** 上传失败的回调 */
  onError?: (error: Error, file: UploadFile) => void;
  /** 上传进度的回调 */
  onProgress?: (percent: number, file: UploadFile) => void;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: ReactNode;
  /** 是否开启拖拽上传 */
  drag?: boolean;
  /** 拖拽区域提示文字 */
  dragText?: string;
  /** 拖拽区域提示图标 */
  dragIcon?: ReactNode;
}

export interface CustomRequestOptions {
  file: File;
  onProgress: (percent: number) => void;
  onSuccess: (response: unknown) => void;
  onError: (error: Error) => void;
}

export interface UploadListProps {
  listType: UploadListType;
  fileList: UploadFile[];
  onPreview?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
  disabled?: boolean;
}
