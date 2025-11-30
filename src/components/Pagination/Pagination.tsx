import React, { useMemo } from 'react';
import { Select } from '../Select';
import './style.css';

export interface PaginationProps {
  /** 当前页码 */
  current?: number;
  /** 默认当前页码 */
  defaultCurrent?: number;
  /** 总条目数 */
  total: number;
  /** 每页条数 */
  pageSize?: number;
  /** 默认每页条数 */
  defaultPageSize?: number;
  /** 页码改变的回调 */
  onChange?: (page: number, pageSize: number) => void;
  /** 每页条数改变的回调 */
  onShowSizeChange?: (current: number, size: number) => void;
  /** 指定每页可以显示多少条 */
  pageSizeOptions?: number[];
  /** 是否显示总数 */
  showTotal?: boolean | ((total: number, range: [number, number]) => React.ReactNode);
  /** 是否显示快速跳转 */
  showQuickJumper?: boolean;
  /** 是否可以改变 pageSize */
  showSizeChanger?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否隐藏只有一页时的分页器 */
  hideOnSinglePage?: boolean;
  /** 简单分页模式 */
  simple?: boolean;
  /** 当为「small」时，是迷你版 */
  size?: 'default' | 'small';
  /** 自定义上一页按钮文本 */
  prevText?: React.ReactNode;
  /** 自定义下一页按钮文本 */
  nextText?: React.ReactNode;
  /** 自定义页码渲染 */
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    element: React.ReactNode
  ) => React.ReactNode;
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 只显示一个跳转输入框 */
  showLessItems?: boolean;
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
}

const defaultPageSizeOptions = [10, 20, 50, 100];

export const Pagination: React.FC<PaginationProps> = ({
  current: controlledCurrent,
  defaultCurrent = 1,
  total,
  pageSize: controlledPageSize,
  defaultPageSize = 10,
  onChange,
  onShowSizeChange,
  pageSizeOptions = defaultPageSizeOptions,
  showTotal = false,
  showQuickJumper = false,
  showSizeChanger = false,
  disabled = false,
  hideOnSinglePage = false,
  simple = false,
  size = 'default',
  prevText,
  nextText,
  itemRender,
  className = '',
  style,
  showLessItems = false,
  align = 'left',
}) => {
  const [internalCurrent, setInternalCurrent] = React.useState(defaultCurrent);
  const [internalPageSize, setInternalPageSize] = React.useState(defaultPageSize);
  const [jumpValue, setJumpValue] = React.useState('');

  const currentPage = controlledCurrent ?? internalCurrent;
  const currentPageSize = controlledPageSize ?? internalPageSize;

  // 计算总页数
  const totalPages = Math.ceil(total / currentPageSize);

  // 计算当前页范围
  const range: [number, number] = useMemo(() => {
    const start = (currentPage - 1) * currentPageSize + 1;
    const end = Math.min(currentPage * currentPageSize, total);
    return [start, end];
  }, [currentPage, currentPageSize, total]);

  // 如果只有一页且设置了隐藏，则不渲染
  if (hideOnSinglePage && totalPages <= 1) {
    return null;
  }

  // 处理页码变化
  const handlePageChange = (page: number) => {
    if (disabled || page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    if (controlledCurrent === undefined) {
      setInternalCurrent(page);
    }
    onChange?.(page, currentPageSize);
  };

  // 处理每页条数变化
  const handlePageSizeChange = (newPageSize: number) => {
    const newTotalPages = Math.ceil(total / newPageSize);
    const newCurrent = currentPage > newTotalPages ? newTotalPages : currentPage;

    if (controlledPageSize === undefined) {
      setInternalPageSize(newPageSize);
    }
    if (controlledCurrent === undefined && newCurrent !== currentPage) {
      setInternalCurrent(newCurrent);
    }

    onShowSizeChange?.(newCurrent, newPageSize);
    onChange?.(newCurrent, newPageSize);
  };

  // 处理快速跳转
  const handleQuickJump = () => {
    const page = parseInt(jumpValue, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      handlePageChange(page);
      setJumpValue('');
    }
  };

  // 生成页码列表
  const renderPageNumbers = () => {
    const pageNumbers: React.ReactNode[] = [];
    const maxPageItems = showLessItems ? 5 : 7;
    const halfPageItems = Math.floor(maxPageItems / 2);

    let startPage = Math.max(1, currentPage - halfPageItems);
    let endPage = Math.min(totalPages, currentPage + halfPageItems);

    // 调整范围以确保显示足够的页码
    if (endPage - startPage < maxPageItems - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPageItems - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPageItems + 1);
      }
    }

    // 渲染首页
    if (startPage > 1) {
      pageNumbers.push(renderPageItem(1, 'page'));
      if (startPage > 2) {
        pageNumbers.push(renderJumpPrev());
      }
    }

    // 渲染中间页码
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(renderPageItem(i, 'page'));
    }

    // 渲染末页
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(renderJumpNext());
      }
      pageNumbers.push(renderPageItem(totalPages, 'page'));
    }

    return pageNumbers;
  };

  // 渲染页码项
  const renderPageItem = (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next') => {
    const isActive = page === currentPage;
    const itemClassName = [
      'myui-pagination-item',
      isActive ? 'myui-pagination-item-active' : '',
      disabled ? 'myui-pagination-item-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const element = <button className={itemClassName}>{page}</button>;

    return (
      <li
        key={`${type}-${page}`}
        onClick={() => !disabled && handlePageChange(page)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handlePageChange(page);
          }
        }}
        tabIndex={disabled ? -1 : 0}
        className="myui-pagination-item-wrapper"
        role="presentation"
      >
        {itemRender ? itemRender(page, type, element) : element}
      </li>
    );
  };

  // 渲染快速向前跳转
  const renderJumpPrev = () => {
    const jumpTo = Math.max(1, currentPage - 5);
    const element = (
      <button className="myui-pagination-item myui-pagination-jump">
        <span className="myui-pagination-item-ellipsis">•••</span>
        <span className="myui-pagination-item-link-icon">«</span>
      </button>
    );

    return (
      <li
        key="jump-prev"
        onClick={() => !disabled && handlePageChange(jumpTo)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handlePageChange(jumpTo);
          }
        }}
        tabIndex={disabled ? -1 : 0}
        className="myui-pagination-item-wrapper"
        role="presentation"
      >
        {itemRender ? itemRender(jumpTo, 'jump-prev', element) : element}
      </li>
    );
  };

  // 渲染快速向后跳转
  const renderJumpNext = () => {
    const jumpTo = Math.min(totalPages, currentPage + 5);
    const element = (
      <button className="myui-pagination-item myui-pagination-jump">
        <span className="myui-pagination-item-ellipsis">•••</span>
        <span className="myui-pagination-item-link-icon">»</span>
      </button>
    );

    return (
      <li
        key="jump-next"
        onClick={() => !disabled && handlePageChange(jumpTo)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handlePageChange(jumpTo);
          }
        }}
        tabIndex={disabled ? -1 : 0}
        className="myui-pagination-item-wrapper"
        role="presentation"
      >
        {itemRender ? itemRender(jumpTo, 'jump-next', element) : element}
      </li>
    );
  };

  // 渲染简单分页
  const renderSimplePagination = () => {
    return (
      <>
        <button
          className="myui-pagination-prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
        >
          {prevText || '上一页'}
        </button>
        <div className="myui-pagination-simple-pager">
          <input
            type="text"
            value={currentPage}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                const page = parseInt(value, 10);
                if (!isNaN(page)) {
                  handlePageChange(page);
                }
              }
            }}
            disabled={disabled}
            className="myui-pagination-simple-input"
          />
          <span className="myui-pagination-slash">/</span>
          <span className="myui-pagination-total-page">{totalPages}</span>
        </div>
        <button
          className="myui-pagination-next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
        >
          {nextText || '下一页'}
        </button>
      </>
    );
  };

  // 渲染标准分页
  const renderStandardPagination = () => {
    return (
      <>
        {/* 上一页 */}
        <li className="myui-pagination-item-wrapper">
          {itemRender ? (
            itemRender(
              currentPage - 1,
              'prev',
              <button
                className="myui-pagination-prev"
                disabled={disabled || currentPage === 1}
                aria-label="Previous Page"
              >
                {prevText || '‹'}
              </button>
            )
          ) : (
            <button
              className="myui-pagination-prev"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={disabled || currentPage === 1}
              aria-label="Previous Page"
            >
              {prevText || '‹'}
            </button>
          )}
        </li>

        {/* 页码列表 */}
        {renderPageNumbers()}

        {/* 下一页 */}
        <li className="myui-pagination-item-wrapper">
          {itemRender ? (
            itemRender(
              currentPage + 1,
              'next',
              <button
                className="myui-pagination-next"
                disabled={disabled || currentPage === totalPages}
                aria-label="Next Page"
              >
                {nextText || '›'}
              </button>
            )
          ) : (
            <button
              className="myui-pagination-next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={disabled || currentPage === totalPages}
              aria-label="Next Page"
            >
              {nextText || '›'}
            </button>
          )}
        </li>
      </>
    );
  };

  const paginationClassName = [
    'myui-pagination',
    `myui-pagination-${size}`,
    `myui-pagination-align-${align}`,
    simple ? 'myui-pagination-simple' : '',
    disabled ? 'myui-pagination-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={paginationClassName} style={style}>
      {/* 总数显示 */}
      {showTotal && (
        <div className="myui-pagination-total">
          {typeof showTotal === 'function' ? showTotal(total, range) : `共 ${total} 条`}
        </div>
      )}

      {/* 分页主体 */}
      <ul className="myui-pagination-list">
        {simple ? renderSimplePagination() : renderStandardPagination()}
      </ul>

      {/* 每页条数选择器 */}
      {showSizeChanger && !simple && (
        <div className="myui-pagination-options">
          <Select
            value={currentPageSize}
            onChange={(value) => handlePageSizeChange(Number(value))}
            disabled={disabled}
            size={size === 'small' ? 'sm' : 'md'}
            options={pageSizeOptions.map((size) => ({
              label: `${size} 条/页`,
              value: size,
            }))}
            className="myui-pagination-size-changer-select"
          />
        </div>
      )}

      {/* 快速跳转 */}
      {showQuickJumper && !simple && (
        <div className="myui-pagination-quick-jumper">
          <span>跳至</span>
          <input
            type="text"
            value={jumpValue}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setJumpValue(value);
              }
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleQuickJump();
              }
            }}
            onBlur={handleQuickJump}
            disabled={disabled}
            className="myui-pagination-quick-jumper-input"
          />
          <span>页</span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
