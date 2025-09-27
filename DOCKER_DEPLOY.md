# MyUI Docker 部署指南

## 🚀 快速部署

### 方法一：使用部署脚本（推荐）

```bash
# 运行自动部署脚本
./deploy.sh
```

### 方法二：手动部署

```bash
# 1. 构建并启动容器
docker-compose up -d --build

# 2. 查看容器状态
docker-compose ps

# 3. 查看日志
docker-compose logs -f
```

### 方法三：使用 Docker 命令

```bash
# 1. 构建镜像
docker build -t myui:latest .

# 2. 运行容器
docker run -d \
  --name MyUi \
  -p 5174:5174 \
  --restart unless-stopped \
  myui:latest
```

## 📋 部署信息

- **容器名称**: MyUi
- **端口**: 5174
- **访问地址**: http://localhost:5174
- **技术栈**: React + Vite + Nginx

## 🛠️ 管理命令

```bash
# 查看容器状态
docker-compose ps

# 查看实时日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 重新构建并启动
docker-compose up -d --build

# 进入容器
docker-compose exec myui sh
```

## 🔧 配置说明

### Nginx 配置
- 启用 Gzip 压缩
- SPA 路由支持
- 静态资源缓存
- 安全头设置

### Docker 优化
- 多阶段构建减小镜像体积
- Alpine Linux 基础镜像
- 生产环境优化

## 📊 监控和调试

```bash
# 查看容器资源使用情况
docker stats MyUi

# 查看容器详细信息
docker inspect MyUi

# 查看镜像信息
docker images | grep myui
```

## 🚨 故障排除

### 端口被占用
```bash
# 查看端口占用
lsof -i :5174

# 停止占用端口的进程
sudo kill -9 <PID>
```

### 容器启动失败
```bash
# 查看详细错误日志
docker-compose logs myui

# 重新构建镜像
docker-compose build --no-cache
```

### 清理 Docker 资源
```bash
# 清理未使用的镜像
docker image prune

# 清理未使用的容器
docker container prune

# 清理未使用的网络
docker network prune
```

## 🌐 生产环境部署

### 使用反向代理
```nginx
# Nginx 反向代理配置示例
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:5174;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 使用 HTTPS
```bash
# 使用 Let's Encrypt 获取 SSL 证书
certbot --nginx -d your-domain.com
```

## 📝 环境变量

可以通过环境变量自定义配置：

```yaml
# docker-compose.yml
environment:
  - NODE_ENV=production
  - PORT=5174
```

## 🎯 性能优化

- ✅ Gzip 压缩
- ✅ 静态资源缓存
- ✅ 多阶段构建
- ✅ Alpine Linux 镜像
- ✅ Nginx 优化配置

## 🔄 更新部署

### 方法一：使用 Makefile（推荐）

```bash
# 查看所有可用命令
make help

# 完整更新（交互式，支持版本管理）
make update

# 快速更新（无交互）
make quick

# 热更新（零停机时间）
make hot

# 回滚到之前版本
make rollback

# 查看状态
make status

# 查看日志
make logs
```

### 方法二：使用更新脚本

```bash
# 完整更新部署（推荐）
./update-deploy.sh

# 快速更新（适合小改动）
./quick-update.sh

# 热更新（生产环境推荐）
./hot-update.sh

# 回滚部署
./rollback.sh
```

### 方法三：手动更新

```bash
# 1. 停止现有容器
docker stop MyUi && docker rm MyUi

# 2. 重新构建镜像
docker build -t myui:latest .

# 3. 启动新容器
docker run -d --name MyUi -p 5174:5174 --restart unless-stopped myui:latest
```

## 📦 版本管理

### 自动版本管理
更新脚本支持自动版本管理：

```bash
# 运行更新脚本时会询问是否更新版本
./update-deploy.sh

# 选择版本类型：
# 1) patch: 1.0.0 -> 1.0.1 (bug 修复)
# 2) minor: 1.0.0 -> 1.1.0 (新功能)
# 3) major: 1.0.0 -> 2.0.0 (破坏性更改)
# 4) 手动输入版本号
```

### 手动版本管理
```bash
# 更新版本号
npm version patch  # 或 minor, major

# 提交版本更新
git add package.json
git commit -m "chore: bump version to $(npm pkg get version | tr -d '"')"
git tag "v$(npm pkg get version | tr -d '"')"

# 推送到远程
git push origin main --tags
```

## 🔙 回滚策略

### 1. 镜像回滚
```bash
# 查看可用镜像
docker images | grep myui

# 回滚到指定镜像
docker stop MyUi && docker rm MyUi
docker run -d --name MyUi -p 5174:5174 --restart unless-stopped myui:backup-20231201
```

### 2. Git 回滚
```bash
# 回滚到特定提交
git checkout <commit-hash>
docker build -t myui:rollback .
docker stop MyUi && docker rm MyUi
docker run -d --name MyUi -p 5174:5174 --restart unless-stopped myui:rollback
```

### 3. 使用回滚脚本
```bash
./rollback.sh
# 选择回滚方式：
# 1) 镜像回滚
# 2) Git 提交回滚  
# 3) Git 标签回滚
```

## 🛡️ 备份策略

### 自动备份
```bash
# 备份当前镜像
make backup

# 或手动备份
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
docker tag myui:latest myui:backup-$TIMESTAMP
```

### 定期备份
创建 cron 任务进行定期备份：

```bash
# 编辑 crontab
crontab -e

# 添加每日备份任务
0 2 * * * cd /path/to/MyUi && make backup
```

## 🚀 CI/CD 集成

### GitHub Actions 示例
```yaml
name: Deploy MyUI
on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to server
        run: |
          ssh user@server 'cd /path/to/MyUi && git pull && ./quick-update.sh'
```

## 📊 监控和健康检查

### 健康检查
```bash
# 检查服务状态
curl -f http://localhost:5174 || echo "Service down"

# 检查容器健康
docker inspect MyUi --format='{{.State.Health.Status}}'
```

### 监控脚本
```bash
#!/bin/bash
# monitor.sh
while true; do
    if ! curl -s http://localhost:5174 > /dev/null; then
        echo "Service down, restarting..."
        make restart
    fi
    sleep 60
done
```

## 🔧 高级配置

### 环境变量配置
```bash
# 使用环境变量
docker run -d \
  --name MyUi \
  -p 5174:5174 \
  -e NODE_ENV=production \
  -e API_URL=https://api.example.com \
  --restart unless-stopped \
  myui:latest
```

### 数据持久化
```bash
# 挂载配置文件
docker run -d \
  --name MyUi \
  -p 5174:5174 \
  -v $(pwd)/custom-nginx.conf:/etc/nginx/nginx.conf:ro \
  --restart unless-stopped \
  myui:latest
```
