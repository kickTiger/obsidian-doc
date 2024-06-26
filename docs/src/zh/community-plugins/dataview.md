---
# 这是文章的标题
title: Dataview
# 这是侧边栏的顺序
order: 2
# 这是页面的图标
icon: page
---
### 插件简介  
dataview插件  ⭐️⭐️⭐️  

这是一款在 obsidian 上必装的插件，少了 dataview 的 obsidian 也少了很多的便捷和乐趣。他能够在纯文本的md文件里，实现接近于数据库的查询效果。只需要掌握简单的语法就能达到动态的查询。  
  
**应用场景：**
比如你想找到某个文件夹下包含某个标签的所有文件，并且当增删改文件的时候，这个查询结果会实时更新。那么用dataview就能轻松实现。  
  
我们可以做一些自动归类的工作，比如我想同时查看 Windows 文件夹下的 `#技巧` 的所有文章，还有 Windows 文件夹下的`#问题`，我可以在一个文件下。同时检索这2个分类，而且当文件增删改的时候，这个结果也实时更新不需要手动修改。

::: warning 无限可能
你可以用查询功能实现很多的功能，甚至可以做一个你自己的管理系统。有 dataview 的 obsidian，你可以替换一些管理系统了。

- 一个小鸟管理系统
- 一个代码片段管理系统
- 一个分类图书馆
- 一个日历的展示区
- ...

下面跟着我的脚步，慢慢的认识 dataview 插件
:::

## 插件安装
::: tip 插件安装
打开 obsidian → 设置 ⚙️ → 第三方插件 → 社区插件市场，搜索关键字安装

注意：你需要关闭第三方插件的**安全模式**，才能安装社区插件，建议关闭。
:::

## 插件使用
### dataview 简单示例
这是 obsidian 必装插件之一，能够实现增强的 obsidian 数据查询。
::: tip 提示
dataview 查询的结果，当文章发生改变的时候，新增文件，修改文件名后查询结果也会刷新。
:::
**案例1：**
实现查询 ”obsidian“ 文件夹下所有文件，当文章新增时，查询的结果也会自动刷新。  
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

## 扩展阅读
::: warning 扩展阅读
如果需要深入了解 dataview 的用法，请继续阅读 [进阶用法](/zh/advanced/)
:::

::: danger 推荐 dataview 专栏
应大家的要求，单独设立 dataview 专栏，更推荐这里。

请继续阅读 [Obsidian Dataview 专栏](/zh/dataview/README.md)
:::

::: danger 加群交流

如果在使用和学习中有不明白的地方，或者想看看别人的经验
- 可以查看[进阶用法](/zh/advanced)
- 可以加群和大家聊聊，加微信 `coffeebean1688` 蹦跶的咖啡豆，然后进群
- 可以查看[咖啡豆豆龙_哔哩哔哩](https://space.bilibili.com/618777356)) 视频教程。😜**关注、👍点赞、📀投币一键三连**
- 示例库（筹备中）
- 网站启用新域名：https://obsidian.vip 给VIP的你，很好记
:::

::: details 🌱【点我-扫码加群】
![加群交流！先加在拉](/assets/WeChat-QRcode.jpg =300x) 
::: 

::: details 🍻【点我-打赏】
![随缘支持](/assets/WeChat-Pay.jpg =x400)
::: 

