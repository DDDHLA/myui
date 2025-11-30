# 发布说明

## 包信息

- **包名**: `@paidaxinghaha/my-ui-react`
- **版本**: 1.0.0
- **NPM 地址**: https://www.npmjs.com/package/@paidaxinghaha/my-ui-react

## 安装方式

```bash
npm install @paidaxinghaha/my-ui-react
```

## 使用方式

```tsx
import { Button, Input, Card } from '@paidaxinghaha/my-ui-react'
import '@paidaxinghaha/my-ui-react/dist/style.css'

function App() {
  return (
    <div>
      <Button variant="primary">点击我</Button>
      <Input placeholder="输入内容" />
      <Card>卡片内容</Card>
    </div>
  )
}
```

> **注意**: 需要在项目入口文件中引入样式文件 `import '@paidaxinghaha/my-ui-react/dist/style.css'`

## 发布流程

1. 更新版本号
```bash
npm version patch  # 补丁版本 1.0.0 -> 1.0.1
npm version minor  # 次版本 1.0.0 -> 1.1.0
npm version major  # 主版本 1.0.0 -> 2.0.0
```

2. 构建库
```bash
npm run build:lib
```

3. 发布到 NPM
```bash
npm publish
```

## 注意事项

- 发布前确保已登录 NPM: `npm login`
- 确保 `package.json` 中的版本号已更新
- 确保所有测试通过
- 确保构建成功
