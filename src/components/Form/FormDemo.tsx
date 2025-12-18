import React from 'react'
import Form, { FormItem, useForm } from '../Form'
import { Input } from '../Input'
import { Button } from '../Button'
import { Card } from '../Card'
import { Space } from '../Space'
import { Select } from '../Select'
import { Checkbox } from '../Checkbox'
import { CodeBlock } from '../CodeBlock'
import { PropsTable } from '../PropsTable'
import type { PropItem } from '../PropsTable'
import './FormDemo.css'

const FormDemo: React.FC = () => {
  // 基础表单
  const basicForm = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log('基础表单提交:', values)
      alert('表单提交成功！查看控制台获取数据')
    },
  })

  // 验证表单
  const validationForm = useForm({
    initialValues: {
      name: '',
      email: '',
      age: '',
      website: '',
    },
    onSubmit: async (values) => {
      console.log('验证表单提交:', values)
      alert('表单验证通过并提交成功！')
    },
  })

  const fieldConfigs = {
    name: {
      rules: [
        { required: '请输入姓名' },
        { minLength: { value: 2, message: '姓名至少2个字符' } },
      ],
    },
    email: {
      rules: [
        { required: '请输入邮箱' },
        {
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '请输入有效的邮箱地址',
          },
        },
      ],
    },
    age: {
      rules: [
        { required: '请输入年龄' },
        {
          validator: (value: string) => {
            const num = parseInt(value)
            if (isNaN(num)) return '请输入有效的数字'
            if (num < 18) return '年龄必须大于18岁'
            if (num > 100) return '请输入有效的年龄'
            return undefined
          },
        },
      ],
    },
    website: {
      rules: [
        {
          pattern: {
            value: /^https?:\/\/.+/,
            message: '请输入有效的URL（需包含http://或https://）',
          },
        },
      ],
    },
  }

  return (
    <div className="form-demo">
      <CodeBlock
        title="基础表单（垂直布局）"
        description="最常用的垂直布局表单，适合大多数场景"
        code={`import { Form, FormItem, useForm, Input, Button, Space } from '@paidaxinghaha/my-ui-react'

function App() {
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log('提交数据:', values)
      alert('提交成功！')
    },
  })

  return (
    <Form
      layout="vertical"
      onSubmit={form.handleSubmit({})}
      onReset={form.resetForm}
    >
      <FormItem label="用户名" required htmlFor="username">
        <Input
          id="username"
          placeholder="请输入用户名"
          {...form.getFieldProps('username')}
        />
      </FormItem>

      <FormItem label="邮箱" required htmlFor="email">
        <Input
          id="email"
          type="email"
          placeholder="请输入邮箱"
          {...form.getFieldProps('email')}
        />
      </FormItem>

      <FormItem label="密码" required htmlFor="password">
        <Input
          id="password"
          type="password"
          placeholder="请输入密码"
          {...form.getFieldProps('password')}
        />
      </FormItem>

      <FormItem>
        <Space>
          <Button type="submit" loading={form.submitting}>
            提交
          </Button>
          <Button type="reset" variant="secondary">
            重置
          </Button>
        </Space>
      </FormItem>
    </Form>
  )
}`}
      >
        <Card>
          <div style={{ padding: '24px' }}>
            <Form
              layout="vertical"
              onSubmit={basicForm.handleSubmit({})}
              onReset={basicForm.resetForm}
            >
              <FormItem label="用户名" required htmlFor="username">
                <Input
                  id="username"
                  placeholder="请输入用户名"
                  {...basicForm.getFieldProps('username')}
                />
              </FormItem>

              <FormItem label="邮箱" required htmlFor="email">
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入邮箱"
                  {...basicForm.getFieldProps('email')}
                />
              </FormItem>

              <FormItem label="密码" required htmlFor="password">
                <Input
                  id="password"
                  type="password"
                  placeholder="请输入密码"
                  {...basicForm.getFieldProps('password')}
                />
              </FormItem>

              <FormItem>
                <Space>
                  <Button type="submit" loading={basicForm.submitting}>
                    提交
                  </Button>
                  <Button type="reset" variant="secondary">
                    重置
                  </Button>
                </Space>
              </FormItem>
            </Form>
          </div>
        </Card>
      </CodeBlock>

      <CodeBlock
        title="表单验证"
        description="支持多种验证规则：必填、长度、正则、自定义函数等"
        code={`import { Form, FormItem, useForm, Input, Button } from '@paidaxinghaha/my-ui-react'

function App() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      age: '',
    },
    onSubmit: async (values) => {
      console.log('验证通过，提交数据:', values)
    },
  })

  const fieldConfigs = {
    name: {
      rules: [
        { required: '请输入姓名' },
        { minLength: { value: 2, message: '姓名至少2个字符' } },
      ],
    },
    email: {
      rules: [
        { required: '请输入邮箱' },
        {
          pattern: {
            value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
            message: '请输入有效的邮箱地址',
          },
        },
      ],
    },
    age: {
      rules: [
        { required: '请输入年龄' },
        {
          validator: (value) => {
            const num = parseInt(value)
            if (isNaN(num)) return '请输入有效的数字'
            if (num < 18) return '年龄必须大于18岁'
            return undefined
          },
        },
      ],
    },
  }

  return (
    <Form layout="vertical" onSubmit={form.handleSubmit(fieldConfigs)}>
      <FormItem
        label="姓名"
        required
        error={form.touched.name && form.errors.name}
        help="至少2个字符"
      >
        <Input
          placeholder="请输入姓名"
          {...form.getFieldProps('name', fieldConfigs.name.rules)}
        />
      </FormItem>

      <FormItem
        label="邮箱"
        required
        error={form.touched.email && form.errors.email}
      >
        <Input
          type="email"
          placeholder="example@email.com"
          {...form.getFieldProps('email', fieldConfigs.email.rules)}
        />
      </FormItem>

      <FormItem
        label="年龄"
        required
        error={form.touched.age && form.errors.age}
      >
        <Input
          type="number"
          placeholder="请输入年龄"
          {...form.getFieldProps('age', fieldConfigs.age.rules)}
        />
      </FormItem>

      <FormItem>
        <Button type="submit" loading={form.submitting}>
          提交验证
        </Button>
      </FormItem>
    </Form>
  )
}`}
      >
        <Card>
          <div style={{ padding: '24px' }}>
            <Form
              layout="vertical"
              onSubmit={validationForm.handleSubmit(fieldConfigs)}
            >
              <FormItem
                label="姓名"
                required
                htmlFor="name"
                error={validationForm.touched.name && validationForm.errors.name}
                help="至少2个字符"
              >
                <Input
                  id="name"
                  placeholder="请输入姓名"
                  {...validationForm.getFieldProps('name', fieldConfigs.name.rules)}
                />
              </FormItem>

              <FormItem
                label="邮箱"
                required
                htmlFor="val-email"
                error={validationForm.touched.email && validationForm.errors.email}
              >
                <Input
                  id="val-email"
                  type="email"
                  placeholder="example@email.com"
                  {...validationForm.getFieldProps('email', fieldConfigs.email.rules)}
                />
              </FormItem>

              <FormItem
                label="年龄"
                required
                htmlFor="age"
                error={validationForm.touched.age && validationForm.errors.age}
              >
                <Input
                  id="age"
                  type="number"
                  placeholder="请输入年龄"
                  {...validationForm.getFieldProps('age', fieldConfigs.age.rules)}
                />
              </FormItem>

              <FormItem
                label="个人主页"
                htmlFor="website"
                error={validationForm.touched.website && validationForm.errors.website}
                help="选填，需以http://或https://开头"
              >
                <Input
                  id="website"
                  placeholder="https://example.com"
                  {...validationForm.getFieldProps('website', fieldConfigs.website.rules)}
                />
              </FormItem>

              <FormItem>
                <Space>
                  <Button type="submit" loading={validationForm.submitting}>
                    提交验证
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={validationForm.resetForm}
                  >
                    重置
                  </Button>
                </Space>
              </FormItem>
            </Form>
          </div>
        </Card>
      </CodeBlock>

      <CodeBlock
        title="水平布局"
        description="标签和表单控件在同一行，适合较短的表单"
        code={`import { Form, FormItem, Input, Checkbox, Button } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Form layout="horizontal">
      <FormItem label="用户名" labelCol={6} wrapperCol={18}>
        <Input placeholder="请输入用户名" />
      </FormItem>

      <FormItem label="密码" labelCol={6} wrapperCol={18}>
        <Input type="password" placeholder="请输入密码" />
      </FormItem>

      <FormItem label="记住我" labelCol={6} wrapperCol={18}>
        <Checkbox>自动登录</Checkbox>
      </FormItem>

      <FormItem labelCol={6} wrapperCol={18}>
        <Button type="submit">登录</Button>
      </FormItem>
    </Form>
  )
}`}
      >
        <Card>
          <div style={{ padding: '24px' }}>
            <Form layout="horizontal">
              <FormItem label="用户名" labelCol={6} wrapperCol={18}>
                <Input placeholder="请输入用户名" />
              </FormItem>

              <FormItem label="密码" labelCol={6} wrapperCol={18}>
                <Input type="password" placeholder="请输入密码" />
              </FormItem>

              <FormItem label="记住我" labelCol={6} wrapperCol={18}>
                <Checkbox>自动登录</Checkbox>
              </FormItem>

              <FormItem labelCol={6} wrapperCol={18}>
                <Button type="submit">登录</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </CodeBlock>

      <CodeBlock
        title="内联表单"
        description="所有表单项在同一行，适合搜索栏等紧凑场景"
        code={`import { Form, FormItem, Input, Select, Button } from '@paidaxinghaha/my-ui-react'

function App() {
  return (
    <Form layout="inline">
      <FormItem label="搜索">
        <Input placeholder="关键词" />
      </FormItem>

      <FormItem label="状态">
        <Select
          options={[
            { label: '全部', value: 'all' },
            { label: '进行中', value: 'active' },
            { label: '已完成', value: 'done' },
          ]}
          placeholder="选择状态"
        />
      </FormItem>

      <FormItem>
        <Button type="submit">搜索</Button>
      </FormItem>
    </Form>
  )
}`}
      >
        <Card>
          <div style={{ padding: '24px' }}>
            <Form layout="inline">
              <FormItem label="搜索">
                <Input placeholder="关键词" />
              </FormItem>

              <FormItem label="状态">
                <Select
                  options={[
                    { label: '全部', value: 'all' },
                    { label: '进行中', value: 'active' },
                    { label: '已完成', value: 'done' },
                  ]}
                  placeholder="选择状态"
                />
              </FormItem>

              <FormItem>
                <Button type="submit">搜索</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </CodeBlock>

      <PropsTable
        title="Form Props"
        data={[
          {
            name: 'children',
            type: 'ReactNode',
            description: '表单内容',
            required: true,
          },
          {
            name: 'layout',
            type: "'vertical' | 'horizontal' | 'inline'",
            default: "'vertical'",
            description: '表单布局方式。vertical: 垂直布局；horizontal: 水平布局；inline: 内联布局',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: '表单尺寸',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: '是否禁用整个表单',
          },
          {
            name: 'className',
            type: 'string',
            description: '自定义类名',
          },
          {
            name: 'onSubmit',
            type: '(e: FormEvent) => void',
            description: '表单提交事件',
          },
          {
            name: 'onReset',
            type: '(e: FormEvent) => void',
            description: '表单重置事件',
          },
        ] as PropItem[]}
      />

      <PropsTable
        title="FormItem Props"
        data={[
          {
            name: 'children',
            type: 'ReactNode',
            description: '表单控件（如 Input、Select 等）',
            required: true,
          },
          {
            name: 'label',
            type: 'string',
            description: '标签文本',
          },
          {
            name: 'required',
            type: 'boolean',
            default: 'false',
            description: '是否必填，会显示红色星号',
          },
          {
            name: 'error',
            type: 'string | boolean',
            description: '错误信息。传入字符串时显示错误文本，传入 true 时仅显示错误样式',
          },
          {
            name: 'help',
            type: 'string',
            description: '帮助文本，显示在表单控件下方',
          },
          {
            name: 'htmlFor',
            type: 'string',
            description: 'label 的 for 属性，关联表单控件的 id',
          },
          {
            name: 'className',
            type: 'string',
            description: '自定义类名',
          },
          {
            name: 'labelCol',
            type: 'number',
            description: '标签栅格占位（24栅格系统），仅在 horizontal 布局下生效',
          },
          {
            name: 'wrapperCol',
            type: 'number',
            description: '控件栅格占位（24栅格系统），仅在 horizontal 布局下生效',
          },
        ] as PropItem[]}
      />

      <PropsTable
        title="useForm 返回值"
        data={[
          {
            name: 'values',
            type: 'object',
            description: '表单字段的当前值',
          },
          {
            name: 'errors',
            type: 'object',
            description: '表单字段的错误信息',
          },
          {
            name: 'touched',
            type: 'object',
            description: '表单字段是否被触摸过（失焦过）',
          },
          {
            name: 'submitting',
            type: 'boolean',
            description: '表单是否正在提交',
          },
          {
            name: 'setFieldValue',
            type: '(name: string, value: any) => void',
            description: '设置指定字段的值',
          },
          {
            name: 'setFieldError',
            type: '(name: string, error?: string) => void',
            description: '设置指定字段的错误信息',
          },
          {
            name: 'setFieldTouched',
            type: '(name: string, touched?: boolean) => void',
            description: '设置指定字段的触摸状态',
          },
          {
            name: 'getFieldProps',
            type: '(name: string, rules?: ValidationRule[]) => object',
            description: '获取字段的属性（value、onChange、onBlur、error等），可直接展开到表单控件上',
          },
          {
            name: 'validateForm',
            type: '(fieldConfigs: object) => Promise<boolean>',
            description: '验证整个表单，返回是否通过验证',
          },
          {
            name: 'handleSubmit',
            type: '(fieldConfigs: object) => (e?: FormEvent) => Promise<void>',
            description: '返回表单提交处理函数，会先验证表单再调用 onSubmit',
          },
          {
            name: 'resetForm',
            type: '() => void',
            description: '重置表单到初始状态',
          },
        ] as PropItem[]}
      />
    </div>
  )
}

export default FormDemo
