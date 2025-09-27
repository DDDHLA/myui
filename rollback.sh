#!/bin/bash

# MyUI 回滚脚本
echo "🔙 MyUI 回滚脚本"

# 显示可用的镜像版本
echo "📋 可用的镜像版本:"
docker images | grep myui

echo ""
echo "请选择回滚方式:"
echo "1) 回滚到上一个版本 (如果有备份镜像)"
echo "2) 从 Git 特定提交重新构建"
echo "3) 从 Git 特定标签重新构建"
read -r rollback_type

case $rollback_type in
    1)
        echo "📋 可用的备份镜像:"
        docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.CreatedAt}}" | grep myui
        echo "请输入要回滚的镜像标签 (例如: backup-20231201):"
        read -r backup_tag
        
        if docker images | grep -q "myui.*$backup_tag"; then
            echo "🔄 回滚到镜像: myui:$backup_tag"
            docker stop MyUi && docker rm MyUi
            docker run -d --name MyUi -p 5174:5174 --restart unless-stopped myui:$backup_tag
            echo "✅ 回滚完成！"
        else
            echo "❌ 镜像不存在: myui:$backup_tag"
            exit 1
        fi
        ;;
    2)
        echo "请输入要回滚的 Git 提交 hash (例如: abc1234):"
        read -r commit_hash
        
        if git cat-file -e $commit_hash 2>/dev/null; then
            echo "🔄 回滚到提交: $commit_hash"
            
            # 备份当前状态
            git stash push -m "Backup before rollback to $commit_hash"
            
            # 检出指定提交
            git checkout $commit_hash
            
            # 重新构建和部署
            docker stop MyUi && docker rm MyUi
            docker build -t myui:rollback-$commit_hash .
            docker run -d --name MyUi -p 5174:5174 --restart unless-stopped myui:rollback-$commit_hash
            
            echo "✅ 回滚完成！"
            echo "💡 要恢复到最新状态，运行: git checkout main && git stash pop"
        else
            echo "❌ 无效的提交 hash: $commit_hash"
            exit 1
        fi
        ;;
    3)
        echo "📋 可用的 Git 标签:"
        git tag -l | tail -10
        echo "请输入要回滚的标签 (例如: v1.0.0):"
        read -r tag_name
        
        if git tag -l | grep -q "^$tag_name$"; then
            echo "🔄 回滚到标签: $tag_name"
            
            # 备份当前状态
            git stash push -m "Backup before rollback to $tag_name"
            
            # 检出指定标签
            git checkout $tag_name
            
            # 重新构建和部署
            docker stop MyUi && docker rm MyUi
            docker build -t myui:$tag_name .
            docker run -d --name MyUi -p 5174:5174 --restart unless-stopped myui:$tag_name
            
            echo "✅ 回滚完成！"
            echo "💡 要恢复到最新状态，运行: git checkout main && git stash pop"
        else
            echo "❌ 无效的标签: $tag_name"
            exit 1
        fi
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo "🌐 访问: http://localhost:5174"
