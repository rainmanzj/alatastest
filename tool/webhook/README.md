# Webhook

## 说明

目前只适用于 Coding.net 的 Webhook，启动后默认会监听 9091 端口。

## 部署步骤

```bash
# 导入数据库
mysql -uuser -p < webhook.sql

# 编辑配置文件
cp config.js.sample config.js && vim config.js

# 安装依赖
npm install
```

## 使用

### 查看webhook日志

访问 http://url:port/log

### 查看使用此脚本同步的项目

访问 http://url:port/projects

### 添加项目

编辑 config.js下的projects,添加对应服务器path和coding的url.

### 手动操作

访问 http://url:poer/[projectName]/[clone|pull]

### 运行
直接调用 `npm start` 运行，或者将其写入 supervisor 配置文件。
