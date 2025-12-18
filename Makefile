# MyUI Docker 部署 Makefile

.PHONY: help deploy status logs stop start restart clean backup dev build

# 默认目标
help:
	@echo "MyUI Docker 部署命令:"
	@echo ""
	@echo "  make deploy      - 🚀 部署/更新服务"
	@echo ""
	@echo "  make status      - 📊 查看容器状态"
	@echo "  make logs        - 📝 查看容器日志"
	@echo "  make stop        - 🛑 停止容器"
	@echo "  make start       - ▶️  启动容器"
	@echo "  make restart     - 🔄 重启容器"
	@echo "  make clean       - 🧹 清理资源"
	@echo ""
	@echo "  make backup      - 💾 备份当前镜像"
	@echo "  make dev         - 🛠️  启动开发服务器"
	@echo "  make build       - 🔨 仅构建镜像"

# 部署/更新
deploy:
	@echo "🚀 部署 MyUI..."
	./deploy.sh

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
