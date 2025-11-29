# 使用 Node.js 18 (Debian) 作为基础镜像，避免 Alpine 兼容性问题
FROM node:18 AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json
COPY package.json ./

# 安装依赖（使用 npm install 而非 npm ci，确保安装正确平台的依赖）
RUN npm install --legacy-peer-deps

# 复制源代码（排除 node_modules）
COPY . .

# 构建应用
RUN npm run build

# 使用 nginx 作为生产环境服务器
FROM nginx:alpine

# 复制构建产物到 nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口 5174
EXPOSE 5174

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
