#!/bin/bash

# MyUI Docker 部署脚本
echo "🚀 开始部署 MyUI 组件库..."

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

# 停止并移除现有容器
echo "🛑 停止现有容器..."
docker stop MyUi 2>/dev/null || echo "容器未运行"
docker rm MyUi 2>/dev/null || echo "容器不存在"

# 构建镜像
echo "🔨 构建 Docker 镜像..."
docker build -t myui:latest .

if [ $? -ne 0 ]; then
    echo "❌ 镜像构建失败！"
    exit 1
fi

# 启动容器
echo "🚀 启动容器..."
docker run -d \
    --name MyUi \
    -p 5174:5174 \
    --restart unless-stopped \
    myui:latest

if [ $? -ne 0 ]; then
    echo "❌ 容器启动失败！"
    exit 1
fi

# 等待容器启动
echo "⏳ 等待容器启动..."
sleep 5

# 检查容器状态
echo "📋 检查容器状态..."
docker ps | grep MyUi

# 检查服务是否可用
echo "🌐 检查服务可用性..."
for i in {1..10}; do
    if curl -s http://localhost:5174 > /dev/null; then
        echo "✅ 服务已启动并可访问"
        break
    else
        echo "⏳ 等待服务启动... ($i/10)"
        sleep 2
    fi
    
    if [ $i -eq 10 ]; then
        echo "❌ 服务启动超时，查看日志:"
        docker logs MyUi
        exit 1
    fi
done

# 显示日志
echo "📝 显示容器日志..."
docker logs MyUi --tail=20

echo ""
echo "✅ 部署完成！"
echo "🌐 访问地址: http://localhost:5174"
echo "📊 查看状态: docker ps | grep MyUi"
echo "📝 查看日志: docker logs MyUi -f"
echo "🛑 停止服务: docker stop MyUi"
echo "🗑️  删除容器: docker rm MyUi"
