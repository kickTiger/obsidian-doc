# 技术栈

## 核心框架
- **VuePress**: 2.0.0-beta.61（静态站点生成器）
- **Vue**: 3.2.47
- **VuePress Theme Hope**: 2.0.0-beta.205
- **Node.js**: >=18.12.0（必需）

## 包管理器
- **npm**（配置用于 Netlify 部署）

## 主要特性
- 国际化（i18n）支持
- DocSearch 集成（Algolia）
- 深色/浅色主题支持
- 响应式设计
- Markdown 增强功能

## 常用命令

所有命令必须在 `docs/` 目录下运行：

```bash
# 导航到工作目录
cd docs

# 安装依赖
npm install

# 开发服务器（http://localhost:8080）
npm run docs:dev

# 清理缓存并启动开发服务器
npm run docs:clean-dev

# 生产环境构建
npm run docs:build
```

## 构建输出
- 源代码：`docs/src/`
- 构建输出：`docs/src/.vuepress/dist/`
- 缓存：`docs/src/.vuepress/.cache/`（已忽略）
- 临时文件：`docs/src/.vuepress/.temp/`（已忽略）

## 配置文件
- 主配置：`docs/src/.vuepress/config.ts`
- 主题配置：`docs/src/.vuepress/theme.ts`
- 导航栏：`docs/src/.vuepress/navbar/`
- 侧边栏：`docs/src/.vuepress/sidebar/`
- 部署配置：`docs/netlify.toml`
