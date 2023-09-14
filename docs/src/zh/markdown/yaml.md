---
# 这是文章的标题
title: YAML和属性语法
# 这是侧边栏的顺序
order: 18
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
::: tip 更新记录✨<Badge text="Features" type="tip" />
- 2023-09-14 obsidian自从1.4之后将YAML元数据升级到**属性**
- 2023-09-14 更新对于属性值的描述，增加调用属性和编辑的方法，增加新的属性值，修订原始的属性值。 
:::

Obsidian是一款功能强大的笔记应用程序，它支持使用YAML语法来配置笔记文件的元数据 **frontmatter** 。YAML是一种轻量级的数据序列化格式，通常用于表示配置文件和数据传输。

::: tip 
**名词解释：**
- Frontmatter是一种通过在笔记顶部添加YAML或JSON来定义笔记元数据的方法。
- Metadata 元数据。
- 在Obsidian中，YAML语法被用来定义笔记文件的元数据frontmatter 
，例如标题、标签、别名、位置等。
- ==属性==✨新增 <Badge text="Features" type="tip" />，YAML元数据的加强版，增加了属性的数据类型，对Obsidian中的数据增加了UI界面，Obsidian的数据大一统时代到来。
:::

### 1 属性的语法和编辑
在Obsidian中，您可以通过在笔记文件的开头**第一行**（必须是第一行）添加一段YAML元数据块来定义笔记的各种属性。这个元数据块由三个破折号"==---=="分隔符包围，并且位于文件的开头，如下所示：

::: warning 注意 ✨新增 <Badge text="Features" type="tip" />
在新版1.4版本后，输入 `---`后，
- Obsidian会自动补全剩下的一半，然后会出现属性区的UI界面
- 在key字段的地方会自动识别，已经输入过的字段。
- 在value值的地方也会自动识别，并补全已经输入过的值
:::

1/3 典型的frontmatter YAML定义：
**现在推荐使用属性面板编辑YAML区域，会自动纠正语法和补全语法格式。**
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

### 2 Obsidian属性值的数据类型
✨新增 <Badge text="Features" type="tip" />
- **Text**，文本
- **List**，列表
- **Number**，数字
- **Checkbox**，勾选
- **Date**，日期
- **Date & time**，日期和时间

**为什么要定义属性的数据类型呢？**  
只有定义了数据类型，才是标准的数据，才方便进行计算和对比。比如日期和日期是可以对比计算的，但是如果字符和日期是不能的。同理，文本和数字也是不能直接进行计算的。

### 3 如何打开属性
2023-09-14 **✨新增** <Badge text="Features" type="tip" />  
- 属性在笔记的最顶部，就以前的YAML区域，如果你切换成源码模式，可以看到以前的YAML语法。
- 快速添加属性可快捷键 `Cmd/Ctrl`+`;`
- 单文件属性：命令面板输入 `properties` ，选择 `Toggle fold properties in current file` ，会在右侧面板打开当前文件的属性。可查看和编辑。
- 单文件属性：在右下角状态栏，会显示当前文件的属性数值。 `4个文档属性，`，点击后也可以打开文件属性面板。
### 4 Obsidian自带的元数据Metadata-属性值

自从 obsidian 更新到 1.4 版本后，元数据这块升级为 ==属性区域==**✨新增** <Badge text="Features" type="tip" />  ，也发生了一些变化，启用了一些元数据，统一使用新的元数据，大家要注意下使用新版的元数据。

> 这里也保留旧的用法，方便还没有升级的朋友查阅

| Key          | Description                                  |
| :----------- | :------------------------------------------- |
| ~~tag~~      | 单个标签(1.4后开始淘汰建议使用tags)          |
| `tags`       | 标签列表                                     |
| ~~alias~~    | 单个别名 (1.4后开始淘汰建议使用aliases)      |
| `aliases`    | 别名列表                                     |
| ~~cssclass~~ | 单个样式。 (1.4后开始淘汰建议使用cssclasses) |
| `cssclasses` | 允许您使用CSS代码段设置多个注释的样式。      |

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



### 5 新增发布属性
注意下面的属性**✨新增** <Badge text="Features" type="tip" />  ，需要你使用官方的发布服务后才起作用，尽量平时不要使用这些关键字，避免冲突。

当然也可以保持一致，当你需要发布的时候，直接可以使用。

| 属性值       | Description |
| :------------ | :---------- |
| `publish`     | 发布        |
| `permalink`   | 链接        |
| `description` | 描述        |
| `image`       | 图片        |
| `cover`       | 封面        |



> [点击：这里有我写的大量CSS片段使用](/zh/css-snippets/)