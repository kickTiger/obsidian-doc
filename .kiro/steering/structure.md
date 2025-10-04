# 项目结构

## 根目录结构

```
coffeebean-dos-obsidian/
├── docs/                    # VuePress 文档站点主目录
├── archives/                # 归档文件（报告、测试脚本等）
├── scripts/                 # 项目脚本
├── .kiro/                   # Kiro IDE 配置
│   └── steering/           # Kiro 引导规则
├── .git/                    # Git 版本控制
└── [配置文件]              # 项目级配置文件
```

## 核心目录：docs/

所有开发工作都在 `docs/` 目录下进行：

```
docs/
├── src/                     # 源代码目录
│   ├── .vuepress/          # VuePress 配置
│   ├── zh/                 # 中文内容目录
│   ├── advanced/           # 高级内容
│   ├── assets/             # 资源文件
│   ├── attachment/         # 附件和图片
│   └── README.md           # 首页
├── node_modules/           # 依赖包（自动生成）
├── package.json            # 项目依赖配置
├── package-lock.json       # 依赖锁定文件
└── netlify.toml            # Netlify 部署配置
```

## VuePress 配置目录：docs/src/.vuepress/

```
.vuepress/
├── config.ts               # 主配置文件
├── theme.ts                # 主题配置
├── client.ts               # 客户端配置
├── navbar/                 # 导航栏配置
├── sidebar/                # 侧边栏配置
├── components/             # 自定义组件
├── styles/                 # 自定义样式
├── public/                 # 静态资源
├── dist/                   # 构建输出（自动生成，已忽略）
├── .cache/                 # 缓存（自动生成，已忽略）
└── .temp/                  # 临时文件（自动生成，已忽略）
```

## 内容目录：docs/src/zh/

中文文档的主要内容组织：

```
zh/
├── README.md               # 中文首页
├── documentation/          # Obsidian 官方文档
├── plugins/                # 插件总览
├── core-plugins/           # 核心插件文档
├── community-plugins/      # 社区插件文档（1779+ 个）
├── bases/                  # 基础专栏
├── dataview/               # Dataview 专栏
├── dataview-snippets/      # Dataview 代码片段
├── tasks/                  # Tasks 专栏
├── plugins-templater/      # Templater 专栏
├── css-snippets/           # CSS 代码片段
├── markdown/               # Markdown 语法指南
├── workflow/               # 工作流示例
├── best-practices/         # 最佳实践
├── FAQ/                    # 常见问题
├── advanced/               # 高级内容
├── template/               # 模板
└── Coffeetea.TOP.SHOW/     # 特色展示
```

## 重要文件说明

### 配置文件
- `docs/package.json` - 项目依赖和脚本定义
- `docs/netlify.toml` - Netlify 部署配置
- `docs/src/.vuepress/config.ts` - VuePress 主配置
- `docs/src/.vuepress/theme.ts` - 主题配置

### 内容文件
- 所有 Markdown 文件（`.md`）都是文档内容
- 图片和附件存放在 `docs/src/attachment/`
- 静态资源存放在 `docs/src/.vuepress/public/`

### 自动生成目录（不要手动修改）
- `docs/node_modules/` - npm 依赖包
- `docs/src/.vuepress/dist/` - 构建输出
- `docs/src/.vuepress/.cache/` - VuePress 缓存
- `docs/src/.vuepress/.temp/` - VuePress 临时文件

## 工作目录

所有命令必须在 `docs/` 目录下运行：

```bash
cd docs
npm install
npm run docs:dev
```

## 文件命名规范

- Markdown 文件使用中文命名或英文命名
- 图片文件使用时间戳命名（如 `2023051419070158.png`）
- 配置文件使用英文命名
- 目录名称使用英文或拼音

## 注意事项

1. **不要修改根目录结构** - 所有开发工作在 `docs/` 目录下进行
2. **不要提交构建产物** - `dist/`、`.cache/`、`.temp/` 已在 `.gitignore` 中
3. **保持内容组织** - 新内容应放在 `docs/src/zh/` 对应的分类目录下
4. **遵循现有结构** - 添加新功能时保持与现有目录结构一致
