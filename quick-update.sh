#!/bin/bash

# MyUI 快速更新脚本 (无交互)
echo "⚡ 快速更新部署 MyUI..."

# 停止并删除现有容器
echo "🛑 停止现有容器..."
docker stop MyUi 2>/dev/null && docker rm MyUi 2>/dev/null

# 重新构建镜像
echo "🔨 重新构建镜像..."
docker build -t myui:latest . --quiet

# 启动容器
echo "🚀 启动容器..."
docker run -d --name MyUi -p 5174:5174 --restart unless-stopped myui:latest

# 检查状态
sleep 3
if docker ps | grep -q MyUi; then
    echo "✅ 快速更新完成！"
    echo "🌐 访问: http://localhost:5174"
else
    echo "❌ 更新失败，查看日志:"
    docker logs MyUi
fi
