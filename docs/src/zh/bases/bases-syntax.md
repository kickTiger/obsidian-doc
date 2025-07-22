---
title: 2. Bases基础语法
icon: edit
order: 2
category:
  - Bases
  - 基础语法
tag:
  - Bases
  - 数据库
  - 语法
number headings: auto, first-level 2, max 6, start-at 1, 1.1
---

# Bases基础语法

Obsidian Bases 是 1.9.0 版本引入的核心插件，让您可以将笔记转换为强大的数据库视图。本文将介绍 Bases 的基础语法和使用方法。

## 1 什么是 Bases？

Bases 是 Obsidian 的原生数据库功能，具有以下特点：

- **基于属性**：使用笔记的 Properties（属性）作为数据源
- **表格视图**：以表格形式显示和管理笔记
- **动态过滤**：支持复杂的过滤和查询条件
- **公式支持**：可以创建计算字段和动态属性
- **本地存储**：所有数据仍然存储在本地 Markdown 文件中

## 2 启用 Bases 功能

### 2.1 前置要求

- Obsidian 版本 1.9.0 或更高
- 目前仍处于早期测试阶段，需要 Catalyst 许可证

### 2.2 启用步骤

1. 打开 **设置 → 核心插件**
2. 找到 **Bases** 并启用
3. 同时建议启用 **Properties** 插件

## 3 创建第一个 Base

### 3.1 创建方式

有几种方法可以创建新的 Base：

```markdown
1. 命令面板：Ctrl/Cmd + P → "Bases: Create new base"
2. 右键文件夹 → "New base"
3. 功能区按钮：点击 "New Base" 按钮
4. 嵌入方式：Ctrl/Cmd + P → "Bases: Insert new base"
```

### 3.2 Base 文件格式

Base 文件使用 `.base` 扩展名，内容为结构化的配置：

```yaml
views:
  - name: "Table"
    type: "table"
    filters:
      and:
        - file.hasTag("project")
    properties:
      - name
      - tags
      - created
```

## 4 属性类型

Bases 支持多种属性类型：

| 属性类型 | 描述 | 示例值 |
|---------|------|--------|
| **Text** | 文本值 | `"我的项目"` |
| **List** | 多个文本值 | `["标签1", "标签2"]` |
| **Number** | 数值 | `42` |
| **Checkbox** | 布尔值 | `true` / `false` |
| **Date** | 日期 | `2024-01-15` |
| **Date & Time** | 日期时间 | `2024-01-15T10:30:00` |

## 5 过滤器语法

### 5.1 基本过滤条件

每个过滤器包含三个组件：

1. **属性**：要过滤的字段
2. **操作符**：比较方式
3. **值**：比较的目标值

### 5.2 文件相关过滤器

```javascript
// 按标签过滤
file.hasTag("project")
file.hasTag("project", "active")

// 按文件夹过滤
file.inFolder("Projects")
file.inFolder(this.file.folder)

// 按链接过滤
file.hasLink("[[目标笔记]]")
file.hasLink(this)

// 按时间过滤
file.ctime.date() == today()
file.mtime >= today() - "7d"
```

### 5.3 属性过滤器

```javascript
// 文本属性
status == "完成"
title.contains("项目")

// 列表属性
tags.contains("重要")
assignees.contains(this)

// 数值属性
priority > 5
progress >= 80

// 日期属性
deadline <= today() + "7d"
created >= today() - "30d"
```

### 5.4 高级过滤语法

#### 5.4.1 逻辑操作符

```yaml
filters:
  and:  # 所有条件都必须满足
    - file.hasTag("project")
    - status == "active"
  
  or:   # 任一条件满足即可
    - priority > 8
    - deadline <= today()
  
  not:  # 条件不满足
    - status == "completed"
```

#### 5.4.2 复合条件

```javascript
// 使用 ! 表示否定
!file.hasTag("archived")
!status.contains("completed")

// 检查属性是否存在
note.keys().contains("priority")
priority || priority == null

// 组合条件
(priority > 5) && (deadline <= today() + "7d")
```

## 6 公式和计算字段

### 6.1 基本公式

```javascript
// 链接公式
link(file, title)  // 使用标题作为显示文本
link("2024-01-15", "今天")  // 自定义显示文本

// 日期计算
today()
today() + "7d"
today() - "1w"

// 字符串操作
file.name.split(' ')[0]
title.toLowerCase()
```

### 6.2 实用公式示例

```javascript
// 计算剩余天数
(deadline - today()).days()

// 格式化日期
created.format("YYYY年MM月DD日")

// 条件显示
priority > 7 ? "高优先级" : "普通"

// 进度百分比
(completed_tasks / total_tasks * 100).round() + "%"
```

## 7 视图配置

### 7.1 多视图管理

```yaml
views:
  - name: "活跃项目"
    filters:
      and:
        - file.hasTag("project")
        - status == "active"
    
  - name: "本周任务"
    filters:
      and:
        - file.hasTag("task")
        - deadline <= today() + "7d"
```

### 7.2 视图操作

- **重命名视图**：点击视图名旁的箭头 → "Configure view"
- **新建视图**：点击视图切换器 → "New View"
- **复制视图**：复制现有视图并修改条件
- **删除视图**：在视图配置中删除

## 8 嵌入 Bases

### 8.1 基本嵌入语法

```markdown
// 嵌入整个 Base
![[项目管理.base]]

// 嵌入特定视图
![[项目管理.base#活跃项目]]

// 在代码块中嵌入
```base
view: "Table"
filters:
  and:
    - file.hasTag("book")
properties:
  - title
  - author
  - rating
```
```

## 9 实际应用案例

### 9.1 项目管理

```yaml
# 项目管理.base
views:
  - name: "活跃项目"
    filters:
      and:
        - file.hasTag("project")
        - status != "completed"
    properties:
      - name
      - status
      - priority
      - deadline
      - assignee
```

### 8.2 读书列表

```yaml
# 读书清单.base
views:
  - name: "待读"
    filters:
      and:
        - file.hasTag("book")
        - read == false
    properties:
      - title
      - author
      - category
      - added_date
```

## 9 常用语法速查

### 9.1 时间相关

```javascript
today()                    // 今天
today() + "1d"            // 明天
today() - "1w"            // 一周前
file.ctime                // 文件创建时间
file.mtime                // 文件修改时间
deadline.format("MMM DD") // 格式化日期
```

### 9.2 文件操作

```javascript
file.name                 // 文件名
file.path                 // 文件路径
file.folder               // 文件夹
file.size                 // 文件大小
file.hasTag("tag")        // 是否包含标签
file.hasLink("note")      // 是否链接到笔记
```

### 9.3 属性操作

```javascript
property.contains("value") // 列表是否包含值
property == "value"        // 属性等于值
property > 5               // 数值比较
!property                  // 属性为空或false
note.keys()               // 所有属性名列表
```

## 10 最佳实践


::: info 💡 使用建议
 - 从简单的过滤条件开始，逐步增加复杂性
 - 利用多视图功能为不同场景创建专门的视图
 - 合理使用公式字段增强数据的可读性
 - 定期整理和优化 Base 的结构
:::


::: danger ⚠️ 注意事项
- Bases 目前仅支持表格视图
- 图片属性无法在表格中预览
- 行内属性不受支持
- 功能仍在快速迭代中，语法可能会有变化
:::

### 10.1 下一步学习

掌握了基础语法后，您可以：

- 学习如何创建复杂的数据库视图
- 探索 Bases 的高级功能和公式
- 查看更多实用的应用示例
- 了解与其他插件的集成方法


::: danger 加群交流
如果在使用和学习中有不明白的地方，或者想看看别人的经验
- 可以查看[进阶用法](/zh/advanced)
- 可以加群和大家聊聊，加微信 `coffeebean1688` 蹦跶的咖啡豆，然后进群
- 可以查看[咖啡豆豆龙_哔哩哔哩](https://space.bilibili.com/618777356)) 视频教程。😜**关注、👍点赞、📀投币一键三连**
- 关注公众号(文章很多)：`蹦跶的咖啡豆
- 示例库（筹备中）
- 网站启用新域名：https://obsidian.vip 给VIP的你，很好记
:::