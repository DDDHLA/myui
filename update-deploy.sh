#!/bin/bash

# MyUI 更新部署脚本
echo "🔄 开始更新部署 MyUI 组件库..."

# 检查 Git 状态
echo "📋 检查 Git 状态..."
if [ -d ".git" ]; then
    echo "当前分支: $(git branch --show-current)"
    echo "最新提交: $(git log -1 --oneline)"
    
    # 检查是否有未提交的更改
    if ! git diff-index --quiet HEAD --; then
        echo "⚠️  检测到未提交的更改，是否继续? (y/n)"
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            echo "❌ 部署已取消"
            exit 1
        fi
    fi
else
    echo "⚠️  未检测到 Git 仓库"
fi

# 获取当前版本号
CURRENT_VERSION=$(grep '"version"' package.json | sed 's/.*"version": "\(.*\)".*/\1/')
echo "📦 当前版本: $CURRENT_VERSION"

# 询问是否更新版本号
echo "🔢 是否更新版本号? (y/n)"
read -r update_version
if [[ "$update_version" =~ ^[Yy]$ ]]; then
    echo "选择版本更新类型:"
    echo "1) patch (补丁版本, 如: 1.0.0 -> 1.0.1)"
    echo "2) minor (次要版本, 如: 1.0.0 -> 1.1.0)"
    echo "3) major (主要版本, 如: 1.0.0 -> 2.0.0)"
    echo "4) 手动输入版本号"
    read -r version_type
    
    case $version_type in
        1)
            npm version patch --no-git-tag-version
            ;;
        2)
            npm version minor --no-git-tag-version
            ;;
        3)
            npm version major --no-git-tag-version
            ;;
        4)
            echo "请输入新版本号 (格式: x.y.z):"
            read -r new_version
            npm version $new_version --no-git-tag-version
            ;;
        *)
            echo "无效选择，跳过版本更新"
            ;;
    esac
    
    NEW_VERSION=$(grep '"version"' package.json | sed 's/.*"version": "\(.*\)".*/\1/')
    echo "📦 新版本: $NEW_VERSION"
fi

# 停止现有容器
echo "🛑 停止现有容器..."
docker stop MyUi 2>/dev/null || echo "容器未运行"
docker rm MyUi 2>/dev/null || echo "容器不存在"

# 清理旧镜像 (可选)
echo "🧹 是否清理旧镜像? (y/n)"
read -r cleanup
if [[ "$cleanup" =~ ^[Yy]$ ]]; then
    echo "清理旧的 MyUI 镜像..."
    docker rmi myui:latest 2>/dev/null || echo "旧镜像不存在"
    docker image prune -f
fi

# 重新构建镜像
echo "🔨 重新构建 Docker 镜像..."
docker build -t myui:latest . --no-cache

if [ $? -ne 0 ]; then
    echo "❌ 镜像构建失败！"
    exit 1
fi

# 启动新容器
echo "🚀 启动新容器..."
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
        echo "❌ 服务启动超时"
        docker logs MyUi
        exit 1
    fi
done

# 显示部署信息
echo ""
echo "✅ 更新部署完成！"
echo "🌐 访问地址: http://localhost:5174"
echo "📦 当前版本: $(grep '"version"' package.json | sed 's/.*"version": "\(.*\)".*/\1/')"
echo "📊 容器状态: $(docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' | grep MyUi)"

# 提交版本更新 (如果有)
if [[ "$update_version" =~ ^[Yy]$ ]] && [ -d ".git" ]; then
    echo ""
    echo "📝 是否提交版本更新到 Git? (y/n)"
    read -r commit_git
    if [[ "$commit_git" =~ ^[Yy]$ ]]; then
        NEW_VERSION=$(grep '"version"' package.json | sed 's/.*"version": "\(.*\)".*/\1/')
        git add package.json
        git commit -m "chore: bump version to $NEW_VERSION"
        git tag "v$NEW_VERSION"
        echo "✅ 版本已提交到 Git"
        
        echo "📤 是否推送到远程仓库? (y/n)"
        read -r push_git
        if [[ "$push_git" =~ ^[Yy]$ ]]; then
            git push origin main
            git push origin "v$NEW_VERSION"
            echo "✅ 已推送到远程仓库"
        fi
    fi
fi

echo ""
echo "🎉 部署完成！"
