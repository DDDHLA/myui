#!/bin/bash

# MyUI 热更新脚本 (零停机时间)
echo "🔥 开始热更新部署..."

# 生成时间戳作为临时容器名
TIMESTAMP=$(date +%s)
TEMP_CONTAINER="MyUi-temp-$TIMESTAMP"
NEW_IMAGE="myui:$TIMESTAMP"

# 构建新镜像
echo "🔨 构建新镜像..."
docker build -t $NEW_IMAGE . --quiet

if [ $? -ne 0 ]; then
    echo "❌ 镜像构建失败！"
    exit 1
fi

# 启动临时容器
echo "🚀 启动临时容器..."
docker run -d \
    --name $TEMP_CONTAINER \
    -p 5175:5174 \
    --restart no \
    $NEW_IMAGE

# 等待新容器启动
echo "⏳ 等待新容器启动..."
sleep 5

# 检查新容器是否正常
if curl -s http://localhost:5175 > /dev/null; then
    echo "✅ 新容器启动成功"
    
    # 停止旧容器
    echo "🛑 停止旧容器..."
    docker stop MyUi 2>/dev/null
    docker rm MyUi 2>/dev/null
    
    # 停止临时容器并重新启动到正确端口
    echo "🔄 切换到正确端口..."
    docker stop $TEMP_CONTAINER
    docker rm $TEMP_CONTAINER
    
    # 启动新的正式容器
    docker run -d \
        --name MyUi \
        -p 5174:5174 \
        --restart unless-stopped \
        $NEW_IMAGE
    
    # 清理旧镜像
    docker rmi myui:latest 2>/dev/null
    docker tag $NEW_IMAGE myui:latest
    docker rmi $NEW_IMAGE
    
    echo "✅ 热更新完成！"
    echo "🌐 访问: http://localhost:5174"
else
    echo "❌ 新容器启动失败，回滚..."
    docker stop $TEMP_CONTAINER 2>/dev/null
    docker rm $TEMP_CONTAINER 2>/dev/null
    docker rmi $NEW_IMAGE 2>/dev/null
    exit 1
fi
