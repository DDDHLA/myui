# 使用 Node.js 18 (Debian) 作为基础镜像，避免 Alpine 兼容性问题
FROM node:18 AS builder

# 设置工作目录
WORKDIR /app

# 设置 npm 镜像源为淘宝镜像，加速依赖安装
RUN npm config set registry https://registry.npmmirror.com

# 复制 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 删除 package-lock.json 并重新安装依赖，确保原生模块正确安装
# 这解决了 ARM64 架构下 rollup 原生依赖的问题
RUN rm -f package-lock.json && \
    npm install --legacy-peer-deps && \
    npm install react@^18.0.0 react-dom@^18.0.0 --save-dev --legacy-peer-deps

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
