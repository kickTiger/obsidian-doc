---
title: Bases专栏🌞
index: true
icon: note
category:
  - Bases
---

# Bases专栏🌞

欢迎来到 `Obsidian Bases`专栏！这里汇集了 Obsidian Bases的基础语法和实例。

## Obsidian Bases 专栏介绍

本专栏主要介绍 Obsidian 核心插件 `Bases` 的基础使用方法、核心概念和入门技巧，帮助新用户快速上手 **Obsidian Bases**  核心插件。

## Obsidian Bases 数据库

Obsidian Bases 数据库是 Obsidian 的核心插件，它是一个强大的数据库，可以帮助你管理你的笔记。他是在 1.9.0 版本中引入的，是 Obsidian 的默认数据库。（目前内测阶段，需要内测用户才能使用，Obsidian 1.9.5 版本）

**注意：** 目前 Bases 数据库还在不断的更新，所以他的函数和特性也是在更新当中。

## Obsidian Bases 基础语法

Obsidian的Bases功能是一种新引入的数据库功能，允许用户将笔记内容结构化，创建自定义的视图、过滤器和公式。Bases文件以`.base`为后缀，语法基于YAML格式，同时支持定义视图（views）、过滤器（filters）和计算公式（formulas）。

### Bases基础语法结构

- **filters（过滤器）**：用于筛选符合条件的笔记，例如根据标签、文件夹、链接等属性进行逻辑组合筛选。
- **formulas（公式）**：可以定义字段的计算方式，比如格式化价格、计算比例等，支持JavaScript类似的表达式。
- **properties（属性）**：定义需要在视图中显示的字段名称和别名。
- **views（视图）**：定义数据的展示方式，如**表格（table）**或**卡片（card）**或**地图（map）**，并可对数据进行分组、排序和过滤。

### 语法示例（YAML格式）：
```yaml
filters:
  or:
    - file.hasTag("tag")
    - and:
      - file.hasTag("book")
      - file.hasLink("Textbook")
    - not:
      - file.hasTag("book")
      - file.inFolder("Required Reading")
formulas:
  formatted_price: 'if(price, price.toFixed(2) + " dollars")'
  ppu: "(price / age).toFixed(2)"
properties:
  status:
    displayName: Status
  formula.formatted_price:
    displayName: "Price"
  file.ext:
    displayName: Extension
views:
  - type: table
    name: "My table"
    limit: 10
    filters:
      and:
        - 'status != "done"'
        - or:
          - "formula.ppu > 5"
          - "price > 2.1"
    group_by: "status"
    order:
      - file.name
      - file.ext
      - note.age
      - formula.ppu
      - formula.formatted_price
  - type: map
    name: "Example map"
    filters: "has_coords == true"
    lat: lat
    long: long
    title: file.name
```

该语法允许用户对笔记进行灵活数据化和可视化，支持逻辑过滤组合（and/or/not），属性展示自定义，以及多种展示方式。

> **注意**：Bases功能目前仍处于抢先体验或Beta阶段，语法和功能可能会继续调整和优化。


:::info 💡 小贴士
本专栏内容持续更新中，如有问题或建议，欢迎在咖啡豆社区交流！
:::

::: danger 加群交流
如果在使用和学习中有不明白的地方，或者想看看别人的经验
- 可以查看[进阶用法](/zh/advanced)
- 可以加群和大家聊聊，加微信 `coffeebean1688` 蹦跶的咖啡豆，然后进群
- 可以查看[咖啡豆豆龙_哔哩哔哩](https://space.bilibili.com/618777356)) 视频教程。😜**关注、👍点赞、📀投币一键三连**
- 关注公众号(文章很多)：`蹦跶的咖啡豆
- 示例库（筹备中）
- 网站启用新域名：https://obsidian.vip 给VIP的你，很好记
:::