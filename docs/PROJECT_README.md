# Obsidian 文档项目说明

## 项目概述
这是一个基于 VuePress 2.0 的文档项目，用于构建 Obsidian 相关的文档网站。项目使用 VuePress Theme Hope 主题，支持中英文双语文档。

## 项目路径说明

### 绝对路径结构
```
E:\CodeProject\obsidian-doc\                    # Git仓库根目录
├── .gitignore                                  # Git忽略文件（已优化）
├── _gsdata_/                                   # GoodSync同步工具文件（已忽略）
├── docs/                                       # 主项目工作目录 ⭐
│   ├── src/                                    # VuePress源代码目录 ⭐
│   │   ├── .vuepress/                         # VuePress配置目录
│   │   │   ├── config.ts                      # 主配置文件
│   │   │   ├── theme.ts                       # 主题配置文件
│   │   │   ├── navbar/                        # 导航栏配置目录
│   │   │   ├── sidebar/                       # 侧边栏配置目录
│   │   │   ├── styles/                        # 样式文件目录
│   │   │   ├── public/                        # 静态资源目录
│   │   │   ├── dist/                          # 构建输出目录（已忽略）
│   │   │   ├── .cache/                        # 缓存目录（已忽略）
│   │   │   └── .temp/                         # 临时文件目录（已忽略）
│   │   ├── zh/                                # 中文文档主目录 📝
│   │   │   ├── documentation/                 # Obsidian指南文档
│   │   │   ├── bases/                         # Bases数据库专栏
│   │   │   ├── dataview/                      # Dataview插件专栏
│   │   │   ├── tasks/                         # Tasks插件专栏
│   │   │   ├── community-plugins/             # 社区插件文档
│   │   │   ├── core-plugins/                  # 核心插件文档
│   │   │   ├── workflow/                      # 工作流案例
│   │   │   ├── best-practices/                # 最佳实践
│   │   │   ├── advanced/                      # 进阶用法
│   │   │   ├── css-snippets/                  # CSS片段
│   │   │   ├── markdown/                      # Markdown语法
│   │   │   ├── template/                      # 模板文件
│   │   │   └── README.md                      # 中文首页
│   │   ├── assets/                            # 静态资源目录
│   │   ├── attachment/                        # 附件图片目录
│   │   ├── demo/                              # 示例文档
│   │   └── README.md                          # 网站首页
│   ├── node_modules/                          # 依赖包目录（已忽略）
│   ├── package.json                           # 项目配置文件
│   ├── package-lock.json                      # 依赖锁定文件
│   ├── netlify.toml                          # Netlify部署配置
│   ├── PROJECT_README.md                      # 项目说明文档
│   ├── 项目全面分析报告.md                      # 项目分析报告
│   └── 网站验证文件配置指南.md                   # 网站验证配置指南
└── netlify-deployment-troubleshooting.md      # 部署故障排除（已忽略）
```

### 网页正文页面位置 📝
**主要内容目录**: `E:\CodeProject\obsidian-doc\docs\src\zh\`

所有网站的正文页面都位于 `docs/src/zh/` 目录下，按功能模块组织：

1. **Obsidian指南** (`documentation/`): 基础教程、下载、FAQ等
2. **专栏内容**:
   - `bases/`: Bases数据库专栏 🌞
   - `dataview/`: Dataview插件专栏 🌞
   - `tasks/`: Tasks插件专栏 🌙
   - `plugins-templater/`: Templater插件专栏 🌙
3. **插件文档**:
   - `community-plugins/`: 1779+社区插件介绍
   - `core-plugins/`: 官方核心插件
4. **实用资源**:
   - `workflow/`: 工作流案例
   - `best-practices/`: 最佳实践
   - `css-snippets/`: CSS代码片段
   - `dataview-snippets/`: Dataview代码片段
5. **基础文档**:
   - `markdown/`: Markdown语法教程
   - `advanced/`: 进阶用法
   - `template/`: 模板和代码片段

### 关键路径说明
- **工作目录**: `E:\CodeProject\obsidian-doc\docs\` (package.json所在目录)
- **源码目录**: `E:\CodeProject\obsidian-doc\docs\src\` (VuePress源码)
- **内容目录**: `E:\CodeProject\obsidian-doc\docs\src\zh\` (所有中文文档)
- **配置目录**: `E:\CodeProject\obsidian-doc\docs\src\.vuepress\` (VuePress配置)
- **构建输出**: `E:\CodeProject\obsidian-doc\docs\src\.vuepress\dist\` (部署文件)

## 技术栈
- VuePress: 2.0.0-beta.61
- Vue: 3.2.47
- Node.js: >=18.12.0
- VuePress Theme Hope: 2.0.0-beta.205
- React: 16.14.0（用于特定组件）

## 开发环境设置

### 环境要求
1. 确保安装了 Node.js 18.12.0 或更高版本
2. 项目使用 npm 作为包管理器（与netlify.toml配置一致）

### 项目启动步骤

#### 1. 进入项目工作目录
```powershell
# 进入项目根目录
cd E:\CodeProject\obsidian-doc

# 进入主工作目录（package.json所在目录）
cd docs
```

#### 2. 安装依赖
```powershell
# 在 docs 目录下执行
npm install
```

#### 3. 开发模式启动
```powershell
# 启动开发服务器
npm run docs:dev
```
此命令会启动开发服务器，默认访问地址为 http://localhost:8080

#### 4. 清除缓存并启动
```powershell
# 清除VuePress缓存后启动
npm run docs:clean-dev
```

#### 5. 构建生产版本
```powershell
# 构建静态文件
npm run docs:build
```
构建后的文件将输出到 `src/.vuepress/dist/` 目录

### 目录导航说明
- **开发时工作目录**: `E:\CodeProject\obsidian-doc\docs\`
- **编辑文档位置**: `E:\CodeProject\obsidian-doc\docs\src\zh\`
- **配置文件位置**: `E:\CodeProject\obsidian-doc\docs\src\.vuepress\`
- **构建输出位置**: `E:\CodeProject\obsidian-doc\docs\src\.vuepress\dist\`

## 项目特性
- 🌙 支持深色模式
- 📱 响应式设计
- 🔍 全文搜索（通过 @vuepress/plugin-docsearch）
- 🌐 国际化支持
- 📝 Markdown 增强

## 注意事项
1. 所有文档使用 UTF-8 编码
2. 遵循响应式设计原则
3. 确保同时支持深色和浅色主题
4. 代码修改需经过充分测试
5. 保持现有功能完整性

## 开发规范
1. 代码提交前必须进行本地测试
2. 保持项目结构的一致性
3. 新功能开发需要考虑深浅色主题适配
4. 确保文档的多语言同步更新

## 常见问题解决
1. 如遇到依赖问题，尝试删除 node_modules 后重新安装
2. 开发服务器端口冲突时，可在 .vuepress/config.ts 中修改端口
3. 构建失败时，先尝试清除缓存后重新构建

## 文档编辑和内容管理

### 文档编辑位置
所有网站内容文档都位于：`E:\CodeProject\obsidian-doc\docs\src\zh\`

### 主要内容模块说明

#### 1. Obsidian指南 (`documentation/`)
- **路径**: `docs/src/zh/documentation/`
- **内容**: 基础教程、下载指南、FAQ、社区信息
- **主要文件**:
  - `README.md`: 指南首页
  - `初识obsidian.md`: 新手入门
  - `obsidian-guide.md`: 详细指南
  - `FAQ.md`: 常见问题
  - `obsidian-download.md`: 下载地址

#### 2. 专栏内容
- **Bases专栏** (`bases/`): Obsidian 1.9.0新功能
- **Dataview专栏** (`dataview/`): 数据查询插件教程
- **Tasks专栏** (`tasks/`): 任务管理插件
- **Templater专栏** (`plugins-templater/`): 模板插件

#### 3. 插件文档
- **社区插件** (`community-plugins/`): 1779+插件介绍
- **核心插件** (`core-plugins/`): 官方插件说明

#### 4. 实用资源
- **工作流** (`workflow/`): 真实使用案例
- **最佳实践** (`best-practices/`): 高效使用技巧
- **CSS片段** (`css-snippets/`): 样式代码
- **Markdown语法** (`markdown/`): 语法教程

### 新增文档步骤
1. **确定文档分类**: 选择合适的目录（如 `best-practices/`）
2. **创建Markdown文件**: 在对应目录下创建 `.md` 文件
3. **添加Front Matter**: 设置标题、分类、图标等元数据
4. **编写内容**: 使用Markdown语法编写文档
5. **更新侧边栏**: 如需要，在 `src/.vuepress/sidebar/zh.ts` 中添加链接

### 文档配置指南

#### 侧边栏配置
侧边栏配置文件位于 `src/.vuepress/sidebar/` 目录下。要添加新的栏目（如"进阶技巧"），需要执行以下步骤：

1. 在 `src/zh/` 目录下创建对应的文档目录（如 `advanced/`）
2. 在新目录中创建 `README.md` 作为该栏目的首页
3. 修改侧边栏配置：
   - 中文侧边栏：编辑 `src/.vuepress/sidebar/zh.ts`
   - 英文侧边栏：编辑 `src/.vuepress/sidebar/en.ts`

示例配置（添加"进阶技巧"栏目）：
```typescript
// src/.vuepress/sidebar/zh.ts
export const zhSidebar = {
  "/advanced/": [
    {
      text: "进阶技巧",
      icon: "lightbulb",
      prefix: "/advanced/",
      children: [
        "README.md", // 对应 advanced/README.md
        // 其他文档页面
      ],
    },
  ],
  // ... 其他配置 ...
};
```

### 创建新栏目步骤
1. 创建目录结构：
```
src/
└── advanced/           # 新栏目目录
    ├── README.md      # 栏目首页
    └── article1.md    # 具体文章
```

2. 更新侧边栏配置
3. 重启开发服务器以应用更改：`pnpm docs:dev`

注意：
- 确保文件路径在配置中正确对应
- 支持多级目录结构
- 可以使用 icon 属性添加图标
- 修改配置后需要重启开发服务器

## Git 忽略文件配置技巧

### 配置原则
本项目使用统一的 `.gitignore` 配置策略，遵循以下原则：

1. **单一配置文件**：只在Git仓库根目录使用一个 `.gitignore` 文件
2. **避免重复配置**：不在子目录创建额外的 `.gitignore` 文件
3. **路径相对性**：所有路径都相对于Git仓库根目录

### 配置文件位置
```
E:\CodeProject\obsidian-doc\.gitignore    # ✅ 主配置文件（唯一）
E:\CodeProject\obsidian-doc\docs\.gitignore    # ❌ 已删除（避免冲突）
```

### 主要忽略规则

#### Node.js 生态
```gitignore
# 依赖包目录
node_modules/
**/node_modules/**

# 包管理器文件和缓存
yarn-error.log
npm-debug.log*
.npm
.yarn/cache
```

#### VuePress 相关
```gitignore
# VuePress缓存和临时文件
**/.vuepress/.cache/**
**/.vuepress/.temp/**
docs/src/.vuepress/.cache/
docs/src/.vuepress/.temp/

# VuePress构建输出
**/.vuepress/dist/**
docs/src/.vuepress/dist/
```

#### 开发工具配置
```gitignore
# IDE配置文件
.idea/          # PyCharm/IntelliJ IDEA
**/.idea/       # 所有子目录的IDE配置
.vscode/        # Visual Studio Code
**/.vscode/     # 所有子目录的VSCode配置
```

#### 系统和同步工具
```gitignore
# 系统文件
.DS_Store       # macOS
desktop.ini     # Windows
Thumbs.db       # Windows

# 同步工具
_gsdata_/       # GoodSync
.stignore       # Syncthing
```

### 常见问题解决

#### 问题1：已跟踪文件无法忽略
**症状**：修改 `.gitignore` 后，某些文件仍然被Git跟踪

**解决方案**：
```bash
# 清理Git缓存并重新应用忽略规则
git rm -r --cached .
git add .
```

#### 问题2：多个.gitignore文件冲突
**症状**：项目中存在多个 `.gitignore` 文件，导致规则冲突

**解决方案**：
1. 保留根目录的 `.gitignore` 文件
2. 删除所有子目录的 `.gitignore` 文件
3. 将子目录的规则合并到根目录配置中

#### 问题3：路径配置错误
**症状**：忽略规则不生效，大量不应该跟踪的文件被Git跟踪

**解决方案**：
1. 确保所有路径都相对于Git仓库根目录
2. 使用 `git check-ignore <文件路径>` 测试规则是否生效
3. 使用 `**` 通配符匹配所有子目录

### 验证配置是否正确

#### 测试忽略规则
```bash
# 测试特定文件是否被忽略
git check-ignore docs/node_modules
git check-ignore docs/src/.vuepress/dist

# 查看详细的忽略信息
git check-ignore --verbose docs/node_modules
```

#### 检查Git状态
```bash
# 查看当前Git状态
git status

# 查看简洁的状态信息
git status --porcelain
```

### 最佳实践建议

1. **定期维护**：根据项目发展需要更新忽略规则
2. **团队协作**：确保团队成员了解统一的忽略规则
3. **文档记录**：在项目文档中记录重要的忽略规则说明
4. **测试验证**：修改配置后及时测试验证是否生效

### 配置模板参考

如果需要为新项目创建类似的 `.gitignore` 配置，可以参考本项目的完整配置文件：
- 位置：`E:\CodeProject\obsidian-doc\.gitignore`
- 包含：174行完整的忽略规则
- 覆盖：Node.js、VuePress、IDE、系统文件、同步工具等