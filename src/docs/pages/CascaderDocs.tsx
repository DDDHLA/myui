import React, { useState } from "react";
import { Cascader, type CascaderOption } from "@/components";
import { CodeBlock } from "@/components/CodeBlock";
import { PropsTable } from "@/components/PropsTable";
import type { PropItem } from "@/components/PropsTable";
import { docHeadingStyles, docParagraphStyles } from "@/styles/docStyles";

const CascaderDocs: React.FC = () => {
  const [value, setValue] = useState<(string | number)[]>([]);

  const options: CascaderOption[] = [
    {
      value: "zhejiang",
      label: "浙江",
      children: [
        {
          value: "hangzhou",
          label: "杭州",
          children: [
            { value: "xihu", label: "西湖区" },
            { value: "xiaoshan", label: "萧山区" },
          ],
        },
        {
          value: "ningbo",
          label: "宁波",
          children: [
            { value: "haishu", label: "海曙区" },
            { value: "jiangbei", label: "江北区" },
          ],
        },
      ],
    },
    {
      value: "jiangsu",
      label: "江苏",
      children: [
        {
          value: "nanjing",
          label: "南京",
          children: [
            { value: "xuanwu", label: "玄武区" },
            { value: "qinhuai", label: "秦淮区" },
          ],
        },
        {
          value: "suzhou",
          label: "苏州",
          children: [
            { value: "gusu", label: "姑苏区" },
            { value: "wuzhong", label: "吴中区" },
          ],
        },
      ],
    },
  ];

  const disabledOptions: CascaderOption[] = [
    {
      value: "zhejiang",
      label: "浙江",
      children: [
        { value: "hangzhou", label: "杭州" },
        { value: "ningbo", label: "宁波", disabled: true },
      ],
    },
    {
      value: "jiangsu",
      label: "江苏",
      disabled: true,
      children: [
        { value: "nanjing", label: "南京" },
      ],
    },
  ];

  const cascaderProps: PropItem[] = [
    { name: "options", type: "CascaderOption[]", description: "选项数据", required: true },
    { name: "value", type: "(string | number)[]", description: "当前值" },
    { name: "defaultValue", type: "(string | number)[]", description: "默认值" },
    { name: "placeholder", type: "string", default: "'请选择'", description: "占位符" },
    { name: "disabled", type: "boolean", default: "false", description: "是否禁用" },
    { name: "allowClear", type: "boolean", default: "true", description: "是否允许清空" },
    { name: "showSearch", type: "boolean", default: "false", description: "是否显示搜索框" },
    { name: "size", type: "'small' | 'default' | 'large'", default: "'default'", description: "尺寸" },
    { name: "expandTrigger", type: "'click' | 'hover'", default: "'click'", description: "次级菜单展开方式" },
    { name: "changeOnSelect", type: "boolean", default: "false", description: "选择即改变" },
    { name: "displayRender", type: "(labels, options) => string", description: "自定义显示" },
    { name: "separator", type: "string", default: "' / '", description: "分隔符" },
    { name: "onChange", type: "(value, options) => void", description: "值变化回调" },
    { name: "error", type: "boolean", default: "false", description: "错误状态" },
  ];

  const optionProps: PropItem[] = [
    { name: "value", type: "string | number", description: "选项值", required: true },
    { name: "label", type: "string", description: "选项标签", required: true },
    { name: "children", type: "CascaderOption[]", description: "子选项" },
    { name: "disabled", type: "boolean", description: "是否禁用" },
    { name: "isLeaf", type: "boolean", description: "是否为叶子节点" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={docHeadingStyles.h1}>Cascader 级联选择器</h1>
        <p style={docParagraphStyles.lead}>
          级联选择框，用于多层级数据的选择，如省市区选择。
        </p>
      </div>

      <CodeBlock
        title="基础用法"
        description="最简单的用法。"
        code={`const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
        ],
      },
    ],
  },
];

<Cascader options={options} placeholder="请选择地区" />`}
      >
        <Cascader
          options={options}
          placeholder="请选择地区"
          style={{ width: 300 }}
        />
      </CodeBlock>

      <CodeBlock
        title="默认值"
        description="设置默认选中的值。"
        code={`<Cascader
  options={options}
  defaultValue={['zhejiang', 'hangzhou', 'xihu']}
/>`}
      >
        <Cascader
          options={options}
          defaultValue={["zhejiang", "hangzhou", "xihu"]}
          style={{ width: 300 }}
        />
      </CodeBlock>

      <CodeBlock
        title="受控模式"
        description="通过 value 和 onChange 实现受控模式。"
        code={`const [value, setValue] = useState([]);

<Cascader
  options={options}
  value={value}
  onChange={(val) => setValue(val)}
/>
<p>当前值: {value.join(' / ') || '无'}</p>`}
      >
        <div>
          <Cascader
            options={options}
            value={value}
            onChange={(val) => setValue(val)}
            style={{ width: 300 }}
          />
          <p style={{ marginTop: 8 }}>当前值: {value.join(" / ") || "无"}</p>
        </div>
      </CodeBlock>

      <CodeBlock
        title="悬停展开"
        description="设置 expandTrigger='hover' 通过悬停展开子菜单。"
        code={`<Cascader options={options} expandTrigger="hover" />`}
      >
        <Cascader
          options={options}
          expandTrigger="hover"
          placeholder="悬停展开"
          style={{ width: 300 }}
        />
      </CodeBlock>

      <CodeBlock
        title="选择即改变"
        description="设置 changeOnSelect 后，选择任意级别都会触发 onChange。"
        code={`<Cascader options={options} changeOnSelect />`}
      >
        <Cascader
          options={options}
          changeOnSelect
          placeholder="选择即改变"
          style={{ width: 300 }}
        />
      </CodeBlock>

      <CodeBlock
        title="搜索"
        description="设置 showSearch 开启搜索功能。"
        code={`<Cascader options={options} showSearch />`}
      >
        <Cascader
          options={options}
          showSearch
          placeholder="可搜索"
          style={{ width: 300 }}
        />
      </CodeBlock>

      <CodeBlock
        title="禁用选项"
        description="通过 disabled 属性禁用特定选项。"
        code={`const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州' },
      { value: 'ningbo', label: '宁波', disabled: true },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    disabled: true,
  },
];

<Cascader options={options} />`}
      >
        <Cascader
          options={disabledOptions}
          placeholder="部分选项禁用"
          style={{ width: 300 }}
        />
      </CodeBlock>

      <CodeBlock
        title="不同尺寸"
        description="提供三种尺寸：small、default、large。"
        code={`<Cascader options={options} size="small" />
<Cascader options={options} size="default" />
<Cascader options={options} size="large" />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Cascader options={options} size="small" placeholder="小尺寸" style={{ width: 300 }} />
          <Cascader options={options} size="default" placeholder="默认尺寸" style={{ width: 300 }} />
          <Cascader options={options} size="large" placeholder="大尺寸" style={{ width: 300 }} />
        </div>
      </CodeBlock>

      <CodeBlock
        title="禁用状态"
        description="设置 disabled 禁用整个选择器。"
        code={`<Cascader options={options} disabled defaultValue={['zhejiang', 'hangzhou']} />`}
      >
        <Cascader
          options={options}
          disabled
          defaultValue={["zhejiang", "hangzhou", "xihu"]}
          style={{ width: 300 }}
        />
      </CodeBlock>

      <div style={{ marginTop: "48px" }}>
        <h2 style={docHeadingStyles.h2}>API</h2>

        <h3 style={docHeadingStyles.h3}>Cascader Props</h3>
        <PropsTable data={cascaderProps} />

        <h3 style={{ ...docHeadingStyles.h3, marginTop: "32px" }}>CascaderOption</h3>
        <PropsTable data={optionProps} />
      </div>
    </div>
  );
};

export default CascaderDocs;
