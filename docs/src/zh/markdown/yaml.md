---
# 这是文章的标题
title: YAML语法
# 这是侧边栏的顺序
order: 18
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
Obsidian是一款功能强大的笔记应用程序，它支持使用YAML语法来配置笔记文件的元数据 **frontmatter** 。YAML是一种轻量级的数据序列化格式，通常用于表示配置文件和数据传输。

::: tip 
**名词解释：**
- Frontmatter是一种通过在笔记顶部添加YAML或JSON来定义笔记元数据的方法。
- Metadata 元数据。
- 在Obsidian中，YAML语法被用来定义笔记文件的元数据frontmatter 
，例如标题、标签、别名、位置等。
:::

在Obsidian中，您可以通过在笔记文件的开头**第一行**（必须是第一行）添加一段YAML元数据块来定义笔记的各种属性。这个元数据块由三个破折号（---）分隔符包围，并且位于文件的开头，如下所示：

1/3 典型的frontmatter YAML定义：
````markdown
    ---
    alias: "document"
    last-reviewed: 2021-08-17
    thoughts:
      rating: 8
      reviewable: false
    ---
````
2/3 以上定义了几个字段，具体含义如下：
-   `alias`是一个文本，因为它被包装在 “” 中
-   `last-reviewed`是一个日期，因为它遵循 ISO 日期格式
-   `thoughts`是一个对象字段，因为它使用 YAML 前置对象语法
3/3 我们想查询 `thoughts.rating 为8` 的结果，以列表样式显示。
````markdown
```dataview
LIST
WHERE thoughts.rating = 8
```
````
::: warning 字段也可以是中文
注意：我们也可以直接用中文作为值
:::
1/3 定义frontmatter YAML
````markdown
    ---
    别名: "文档"
    最后审查: 2021-08-17
    想法:
      等级: 8
      可审查: 否
    ---
````
2/3 以上定义了几个字段，具体含义如下：
-   `别名`是一个文本，因为它被包装在 “” 中
-   `最后审查`是一个日期，因为它遵循 ISO 日期格式
-   `想法`是一个对象字段，因为它使用 YAML 前置对象语法
3/3 我们想查询 `想法.等级为8` 的结果，以列表样式显示。
````markdown
```dataview
LIST
WHERE 想法.等级 = 8
```
````
::: danger 标点符号必须是英文
- 特别注意，在查询和定义是时候，`:`、`""`、`.` 这些符号必须是英文符号
- 单词之间用空格间隔
:::

## Obsidian自带的元数据Metadata

| Key        | Description                             |
| :--------- | :-------------------------------------- |
| `tag`      | 单个标签                                |
| `tags`     | 标签列表                                |
| `alias`    | 单个别名                                |
| `aliases`  | 别名列表                                |
| `cssclass` | 允许您使用CSS代码段设置单个注释的样式。 |


::: code-tabs
@tab 为笔记添加别名
````yaml
---
alias: Doggo
---
````
@tab 使用逗号为笔记添加多个别名
```yaml
---
aliases: Doggo, Woofer, Yapper
---
```
@tab 使用YAML数组添加多个别名
```yaml
---
aliases:
  - Doggo
  - Woofer
  - Yapper
---
```
:::

::: code-tabs
@tab 添加标签
```YAML
---
tag: meeting
---
```
@tab 使用逗号添加多个标签
```YAML
---
tags: recipe, cooking
---
```
@tab 使用数组添加多个标签
```YAML
tags:
  - recipe
  - cooking
```
:::

::: code-tabs
@tab 引用cssclass，这个css只在单页面中生效
````markdown
---
cssclass: coffeebean-full-screen
---
````
:::

> [点击：这里有我写的大量CSS片段使用](/zh/css-snippets/)