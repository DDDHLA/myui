# MyUI Docker 部署 Makefile

.PHONY: help deploy update quick-update hot-update rollback status logs stop start restart clean

# 默认目标
help:
	@echo "MyUI Docker 部署命令:"
	@echo ""
	@echo "  make deploy      - 首次部署"
	@echo "  make update      - 完整更新部署 (交互式)"
	@echo "  make quick       - 快速更新 (无交互)"
	@echo "  make hot         - 热更新 (零停机)"
	@echo "  make rollback    - 回滚到之前版本"
	@echo ""
	@echo "  make status      - 查看容器状态"
	@echo "  make logs        - 查看容器日志"
	@echo "  make stop        - 停止容器"
	@echo "  make start       - 启动容器"
	@echo "  make restart     - 重启容器"
	@echo "  make clean       - 清理资源"
	@echo ""
	@echo "  make backup      - 备份当前镜像"
	@echo "  make dev         - 启动开发服务器"
	@echo "  make build       - 仅构建镜像"

# 首次部署
deploy:
	@echo "🚀 首次部署 MyUI..."
	./deploy.sh

# 完整更新部署
update:
	@echo "🔄 完整更新部署..."
	./update-deploy.sh

# 快速更新
quick:
	@echo "⚡ 快速更新..."
	./quick-update.sh

# 热更新
hot:
	@echo "🔥 热更新..."
	./hot-update.sh

# 回滚
rollback:
	@echo "🔙 回滚..."
	./rollback.sh

# 查看状态
status:
	@echo "📊 容器状态:"
	@docker ps | grep MyUi || echo "容器未运行"
	@echo ""
	@echo "📦 镜像信息:"
	@docker images | grep myui || echo "无 MyUI 镜像"

# 查看日志
logs:
	@echo "📝 容器日志:"
	@docker logs MyUi --tail=50 -f

# 停止容器
stop:
	@echo "🛑 停止容器..."
	@docker stop MyUi || echo "容器未运行"

# 启动容器
start:
	@echo "🚀 启动容器..."
	@docker start MyUi || echo "容器不存在，请先部署"

# 重启容器
restart:
	@echo "🔄 重启容器..."
	@docker restart MyUi || echo "容器不存在"

# 清理资源
clean:
	@echo "🧹 清理 Docker 资源..."
	@docker stop MyUi 2>/dev/null || true
	@docker rm MyUi 2>/dev/null || true
	@docker rmi myui:latest 2>/dev/null || true
	@docker image prune -f
	@echo "✅ 清理完成"

# 备份当前镜像
backup:
	@echo "💾 备份当前镜像..."
	@TIMESTAMP=$$(date +%Y%m%d-%H%M%S) && \
	docker tag myui:latest myui:backup-$$TIMESTAMP && \
	echo "✅ 备份完成: myui:backup-$$TIMESTAMP"

# 启动开发服务器
dev:
	@echo "🛠️ 启动开发服务器..."
	@npm run dev

# 仅构建镜像
build:
	@echo "🔨 构建 Docker 镜像..."
	@docker build -t myui:latest .
