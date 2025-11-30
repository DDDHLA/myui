import { useState } from 'react';
import { Transfer } from '@/components';
import type { TransferItem } from '@/components';
import { CodeBlock } from '@/components/CodeBlock';
import { PropsTable, type PropItem } from '@/components/PropsTable';
import { docHeadingStyles, docParagraphStyles } from '@/styles/docStyles';

const mockData: TransferItem[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `Content ${i + 1}`,
  description: `Description of content ${i + 1}`,
  disabled: i % 4 === 0,
}));

const TransferDocs = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1', '5', '10']);
  const [targetKeysSearch, setTargetKeysSearch] = useState<string[]>(['2', '6']);

  const transferProps: PropItem[] = [
    { name: 'dataSource', type: 'TransferItem[]', description: '数据源', required: true },
    { name: 'targetKeys', type: 'string[]', description: '显示在右侧框中的 key 集合', required: true },
    { name: 'onChange', type: '(targetKeys, direction, moveKeys) => void', description: '选项在两栏之间转移时的回调', required: true },
    { name: 'titles', type: '[string, string]', description: '两栏的标题', default: "['Source', 'Target']" },
    { name: 'render', type: '(item) => ReactNode', description: '每行数据渲染函数' },
    { name: 'showSearch', type: 'boolean', description: '是否显示搜索框', default: 'false' },
    { name: 'className', type: 'string', description: '自定义类名' },
  ];

  return (
    <div>
      <h1 style={docHeadingStyles.h1}>Transfer 穿梭框</h1>
      <p style={docParagraphStyles.lead}>双栏穿梭选择框，常用于将大量数据进行筛选、列表移动。</p>

      <CodeBlock
        title="基本用法"
        description="最基础的穿梭框用法。"
        code={`import { Transfer } from '@paidaxinghaha/my-ui-react';
import type { TransferItem } from '@paidaxinghaha/my-ui-react';

const mockData: TransferItem[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: \`Content \${i + 1}\`,
  description: \`Description of content \${i + 1}\`,
  disabled: i % 4 === 0,
}));

const App = () => {
  const [targetKeys, setTargetKeys] = useState(['1', '5', '10']);

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={(newTargetKeys) => setTargetKeys(newTargetKeys)}
      titles={['Source', 'Target']}
    />
  );
};
`}
      >
        <Transfer
          dataSource={mockData}
          targetKeys={targetKeys}
          onChange={(newTargetKeys) => setTargetKeys(newTargetKeys)}
          titles={['Source', 'Target']}
        />
      </CodeBlock>

      <CodeBlock
        title="带搜索框"
        description="带搜索框的穿梭框，可以快速筛选数据。"
        code={`import { Transfer } from '@paidaxinghaha/my-ui-react';
// ... mockData setup

const App = () => {
  const [targetKeys, setTargetKeys] = useState(['2', '6']);

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={(newTargetKeys) => setTargetKeys(newTargetKeys)}
      titles={['Source', 'Target']}
      showSearch
    />
  );
};
`}
      >
        <Transfer
          dataSource={mockData}
          targetKeys={targetKeysSearch}
          onChange={(newTargetKeys) => setTargetKeysSearch(newTargetKeys)}
          titles={['Source', 'Target']}
          showSearch
        />
      </CodeBlock>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ ...docHeadingStyles.h2, marginBottom: '24px' }}>API</h2>
        <PropsTable data={transferProps} />
      </div>
    </div>
  );
};

export default TransferDocs;
