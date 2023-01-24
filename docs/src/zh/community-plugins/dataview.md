---
# 这是文章的标题
title: Dataview
# 这是侧边栏的顺序
order: 1
# 这是页面的图标
icon: page
---
 [![obsidian-dataview](https://img.shields.io/github/stars/blacksmithgu/obsidian-dataview?style=social)](https://github.com/blacksmithgu/obsidian-dataview)  [![obsidian-dataview](https://img.shields.io/github/last-commit/blacksmithgu/obsidian-dataview)](https://github.com/blacksmithgu/obsidian-dataview)
### dataview 简单示例
这是 obsidian 必装插件之一，能够实现增强的 obsidian 数据查询。
::: tip 提示
dataview 查询的结果，当文章发生改变的时候，新增文件，修改文件名后查询结果也会刷新。
:::
**案例1：**
实现查询 ”obsidian“ 文件下所有文件，当文章新增时，查询的结果也会自动刷新。  
**案例2：**
实现查询 “obsidian” 文件夹下的所有标签为 “技巧”的文章，当文章新增时，查询的结果也会自动刷新。

**试一试：**  
复制下面选项卡里的代码，拷贝到obsidian文件的任何位置。就可以看到查询的结果。查询的结果展示为列表，文件名带有链接，按照创建时间排序

::: code-tabs
@tab 案例1
````markdown
```dataview
list
from "obsidian"
sort file.ctime desc
```
````
@tab 案例2
````markdown
```dataview
list
from "obsidian" and #技巧
sort file.ctime desc
```
````
:::
::: danger 警告
- 请替换 `"obsidian"` 中的文字为你自己的文件夹，否则会查询为空
- 请替换 `#技巧` 中的文件为已经存在的标签，否则会查询为空
:::


当然 dataview 作为一款强大的插件，当然不仅仅实现这么简单的功能。我们可以从以上简单的实现去先使用插件。在逐步的深入了解 dataview 插件。

::: warning 扩展阅读
如果需要深入了解 dataview 的用法，可以继续阅读
:::

### 查询结果呈现方式
查询结果可以有四种样式：
 1. **TABLE**: 表格样式，传统的视图类型；每个数据点有一行，有几列的字段数据.
 2. **LIST**: 列表样式，匹配查询的页面的列表。你可以为每个页面输出一个单一的关联值.
 3. **TASK**: 任务列表，页面符合给定查询的任务列表.
 4. **CALENDAR**: 一个日历视图，通过其相关日期上的一个点来显示每一个命中率。