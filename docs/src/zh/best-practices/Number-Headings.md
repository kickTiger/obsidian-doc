---
number headings: auto, first-level 2, max 6, start-at 1, 1.1
# 这是文章的标题
title: 提升长文写作体验-自动编号
# 这是侧边栏的顺序
order: 4
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
## 1 应用场景
在使用[obsidian 能写小说论文长文吗？当然](/zh/best-practices/obsidian-Longform.md) 中提到的。可以对最终整合文件自动编写序号。

当然平时在普通的编写文章时，也可以使用obsidian-Number-Headings 自动生成序号，他也有着配置项目可自定义。

## 2 安装插件
首先安装 Number Headings 插件，
**插件安装：**
::: tip 插件安装
打开 obsidian → 设置 ⚙️ → 第三方插件 → 社区插件市场，搜索关键字安装

注意：你需要关闭第三方插件的**安全模式**，才能安装社区插件，建议关闭。
:::

## 3 修改配置
然后在设置中添加默认值，以后调用命令的时候会优先调用默认值。

**各设置项目如下**：推荐配置也在这里
- `Skip top heading level`：使用默认 `关闭`，跳过顶级标题
- `First heading level`：我设置的是 `2` 级。初始第一级编号，意思是从第几等级标题开始。(**这里可自定义**)
- `Start numbering at`：我设置的是 `1`。编号的样式会类似 `1.1`
- `Maximum heading level`：使用默认 `6`，不用设置，最高到6层，太多了没意义。
- `Style for level 1 headings`：设置为 `1`
- `Style for lower level headings (below level 1)`：设置为 `1`
- `Automatic numbering`：将这个 `关闭`，自动编号，确实没有必要。
- 其他默认即可

::: tip 以上配置的效果
从2级标题开始自动序号，格式是 `1`，`1.1`，`1.1.1` 依次展开
:::

## 4 使用编号
### 4.1 给页面编号  
在打开的文件页面，使用 Ctrl+P 打开命令面板，搜索 `Number Headings`，选择 `Number Headings: Number all headings in document`。

### 4.2 去除页面编号
 Ctrl+P 打开命令面板，搜索 `Number Headings`，选择 `Number Headings: Remove numbering from all headings in document`。

### 4.3 自定义单页的样式
除了默认的设置外，还可以为单页设置不同的方式。使用 frontmatter 的 yaml 控制，格式如下：
```yaml
number headings: first-level l, start-at 2, max 6, l.l, auto, contents ^toc
```
yaml 的含义可以和上面的设置选项一一对应。