import React, { useState, useMemo } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import './style.css';

export interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface TransferProps {
  dataSource: TransferItem[];
  targetKeys: string[];
  onChange: (nextTargetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void;
  titles?: [string, string];
  render?: (item: TransferItem) => React.ReactNode;
  showSearch?: boolean;
  className?: string;
}

interface TransferListProps {
  title: string;
  items: TransferItem[];
  checkedKeys: Set<string>;
  onToggle: (key: string) => void;
  onToggleAll: (keys: string[]) => void;
  showSearch: boolean;
  render?: (item: TransferItem) => React.ReactNode;
}

const TransferList: React.FC<TransferListProps> = ({
  title,
  items,
  checkedKeys,
  onToggle,
  onToggleAll,
  showSearch,
  render,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() =>
    items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [items, searchTerm]
  );

  const allKeys = filteredItems.filter(item => !item.disabled).map(item => item.key);
  const allChecked = allKeys.length > 0 && allKeys.every(key => checkedKeys.has(key));

  const handleToggleAll = () => {
    onToggleAll(allKeys);
  };

  return (
    <div className="myui-transfer-list">
      <div className="myui-transfer-list-header">
        <input type="checkbox" checked={allChecked} onChange={handleToggleAll} />
        <span className="myui-transfer-list-header-count">
          {checkedKeys.size} / {items.length} items
        </span>
        <span className="myui-transfer-list-header-title">{title}</span>
      </div>
      {showSearch && (
        <div className="myui-transfer-list-search">
          <Input
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <ul className="myui-transfer-list-body">
        {filteredItems.map(item => (
          <li
            key={item.key}
            className={`myui-transfer-list-item ${item.disabled ? 'disabled' : ''} ${checkedKeys.has(item.key) ? 'checked' : ''}`}
            onClick={() => !item.disabled && onToggle(item.key)}
          >
            <input type="checkbox" checked={checkedKeys.has(item.key)} disabled={item.disabled} readOnly />
            <span>{render ? render(item) : item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Transfer: React.FC<TransferProps> = ({
  dataSource,
  targetKeys,
  onChange,
  titles = ['Source', 'Target'],
  render,
  showSearch = false,
  className = ''
}) => {
  const [checkedKeys, setCheckedKeys] = useState<Set<string>>(new Set());

  const { sourceItems, targetItems } = useMemo(() => {
    const source: TransferItem[] = [];
    const target: TransferItem[] = [];
    const targetKeySet = new Set(targetKeys);
    dataSource.forEach(item => {
      if (targetKeySet.has(item.key)) {
        target.push(item);
      } else {
        source.push(item);
      }
    });
    return { sourceItems: source, targetItems: target };
  }, [dataSource, targetKeys]);

  const handleToggle = (key: string) => {
    const newCheckedKeys = new Set(checkedKeys);
    if (newCheckedKeys.has(key)) {
      newCheckedKeys.delete(key);
    } else {
      newCheckedKeys.add(key);
    }
    setCheckedKeys(newCheckedKeys);
  };

  const handleToggleAll = (keys: string[]) => {
    const newCheckedKeys = new Set(checkedKeys);

    const allSelected = keys.every(key => checkedKeys.has(key));

    if (allSelected) {
      keys.forEach(key => newCheckedKeys.delete(key));
    } else {
      keys.forEach(key => newCheckedKeys.add(key));
    }

    setCheckedKeys(newCheckedKeys);
  };

  const moveTo = (direction: 'left' | 'right') => {
    const moveKeys: string[] = [];
    const currentItems = direction === 'right' ? sourceItems : targetItems;

    currentItems.forEach(item => {
      if (checkedKeys.has(item.key) && !item.disabled) {
        moveKeys.push(item.key);
      }
    });

    let nextTargetKeys: string[];
    if (direction === 'right') {
      nextTargetKeys = [...targetKeys, ...moveKeys];
    } else {
      const moveKeySet = new Set(moveKeys);
      nextTargetKeys = targetKeys.filter(key => !moveKeySet.has(key));
    }

    // Clear checked keys after move
    const newCheckedKeys = new Set(checkedKeys);
    moveKeys.forEach(key => newCheckedKeys.delete(key));
    setCheckedKeys(newCheckedKeys);

    onChange(nextTargetKeys, direction, moveKeys);
  };

  const leftCheckedKeys = new Set(Array.from(checkedKeys).filter(key => sourceItems.some(item => item.key === key)));
  const rightCheckedKeys = new Set(Array.from(checkedKeys).filter(key => targetItems.some(item => item.key === key)));

  return (
    <div className={`myui-transfer ${className}`}>
      <TransferList
        title={titles[0]}
        items={sourceItems}
        checkedKeys={checkedKeys}
        onToggle={handleToggle}
        onToggleAll={handleToggleAll}
        showSearch={showSearch}
        render={render}
      />
      <div className="myui-transfer-operations">
        <Button onClick={() => moveTo('right')} disabled={leftCheckedKeys.size === 0}>&gt;</Button>
        <Button onClick={() => moveTo('left')} disabled={rightCheckedKeys.size === 0}>&lt;</Button>
      </div>
      <TransferList
        title={titles[1]}
        items={targetItems}
        checkedKeys={checkedKeys}
        onToggle={handleToggle}
        onToggleAll={handleToggleAll}
        showSearch={showSearch}
        render={render}
      />
    </div>
  );
};

export default Transfer;
