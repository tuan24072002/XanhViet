# Stage 1: Build stage
FROM node:18-alpine AS builder

# Cài đặt các dependencies hệ thống cần thiết cho build (ví dụ: python, make, g++)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy các file package.json và package-lock.json của backend
COPY package*.json ./

# Copy file package.json của frontend
COPY frontend/package*.json ./frontend/

# Cài đặt dependencies cho backend và frontend
RUN npm install
RUN npm install --prefix frontend

# Copy toàn bộ mã nguồn
COPY . .

# Build frontend (chạy lệnh build trong thư mục frontend)
RUN npm run build --prefix frontend

# Stage 2: Production stage
FROM node:18-alpine

WORKDIR /app

# Copy file package.json và package-lock.json của backend
COPY package*.json ./
# Cài đặt các dependency cho production
RUN npm install --production
# Copy mã nguồn backend (vì backend không cần build riêng)
COPY backend ./backend
COPY .env /app/.env

# Copy các file đã build của frontend từ stage builder
COPY --from=builder /app/frontend/dist ./frontend/dist

# Mở cổng 80 (hoặc cổng mà backend của bạn lắng nghe)
EXPOSE 80

# Chạy ứng dụng backend theo script "start"
CMD ["npm", "start"]
