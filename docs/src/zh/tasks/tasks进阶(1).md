---
number headings: auto, first-level 2, max 6, start-at 1, 1.1
# 这是文章的标题
title: Tasks进阶(1)
# 这是侧边栏的顺序
order: 1
# 这是页面的图标
icon: page
---
## 1 tasks插件简介
在 [task](/zh/community-plugins/tasks.md) 介绍一文，我们已经了解到task是 obsidian 的任务管理插件。他可以实现丰富的任务管理。
<BiliBili bvid="BV12y4y1d7N6" />
### 1.1 演示1:obsidian四象限(咖啡豆原创制作)
![obsidian四象限](/assets/Obsidian_WE64ijIAsy-w750.png) 

### 1.2 演示2：obsidian回顾面板(咖啡豆原创制作)
![obsidian回顾面板](/assets/Obsidian_k70QbE5PE9-w750.png)

::: danger 加群交流
如果在使用和学习中有不明白的地方，或者想看看别人的经验
- 可以查看[进阶用法](/zh/advanced/)
- 可以加群和大家聊聊，加微信 `coffeebean1688` 蹦跶的咖啡豆，然后进群
- 可以查看[咖啡豆豆龙_哔哩哔哩](https://space.bilibili.com/618777356)) 视频教程。😜**关注、👍点赞、📀投币一键三连**
- 关注公众号(文章很多)：`蹦跶的咖啡豆
- 示例库（筹备中）
- 网站启用新域名：https://obsidian.vip 给VIP的你，很好记
:::
::: details 🌱【点我-扫码加群】
![加群交流！先加在拉](/assets/WeChat-QRcode.jpg =300x) 
::: 

::: details 🍻【点我-打赏】
![随缘支持](/assets/WeChat-Pay.jpg =x400)
::: 


## 2 tasks插件的优势
以上的演示，除了样式比较好看外，还可以自动获取task添加的任务。
- 可以按照事情的轻重缓急，时间限定显示。
- 可以实时刷新。
- 如果你安装 Reminder 插件，还可以按时间设置，弹窗提醒任务。

除了系统默认基础设置，tasks插件还提供了众多的语法，可以实现更灵活的查询方式。可以达到或者查过市面上的TODO类型的软件。task也支持在移动版上使用。

## 3 tasks插件的使用方法
### 3.1 安装
::: tip 插件安装
打开 obsidian → 设置 ⚙️ → 第三方插件 → 社区插件市场，搜索关键字安装

注意：你需要关闭第三方插件的**安全模式**，才能安装社区插件，建议关闭。
:::

### 3.2 配置
tasks 插件无需过多配置。但是有一点要注意，经过测试，如果不开启 Global task filter的话，会导致obsidian很卡。
::: warning
强烈推荐：安装 tasks 插件后，开启 Global task filter 全局标签过滤。
- 打开插件 → 设置 找到tasks ，找到 Global task filter 全局标签过滤
- 在这里填写 `#task` 。意思是过滤包含`#task`标签的任务。
:::

### 3.3 使用
**常规添加task任务：**
1. 首先添加任务，输入内容
2. 然后在 命令面板，输入 task，选择Tasks: Create or edit task。
3. 在面板依次填入任务信息和完成时间等信息。
4. 或者直接从第二步也可以

**推荐做法：**
::: tip 自定义tasks快捷键
- 打开 obsidian → 设置 ⚙️ → 快捷键，
- 搜索`task`，找到 `Tasks: Create or edit task`，点后面的 + 号图标。添加你的快捷键。我的设置为 `Ctrl + T` 。
:::

在文档中输入文字，然后按自定义的快捷键 `Ctrl + T` 。就会弹出来 tasks 插件的面板。会自动添加`#task` 标签给任务了。

注意：

::: warning  
因为我们打开了`Global task filter` 全局标签过滤，只会检索包含标签`#task` 的任务。所以要注意添加。
:::

**tasks任务示例：**  
- [ ] 这个是系统自带的待办事项
- [x] 这个是系统自带的待办事项完成
- [ ] #task 这个是tasks插件添加的任务

## 4 task面板元素
**弹出task的面板，界面的意思如下：**  
1. Description：任务描述，就是正文
2. Priority：重要程度，依次是 Low 低、Normal一般、Medium中等、High高
3. Recurs：循环任务，按周期
4. Due：到期时间
5. Scheduled：计划任务
6. Start：开始时间
7. Status 状态
	- todo，计划
	- Done
	- In Progress
	- Cancelled

::: tip 按需填写
按需填入所需要的信息。我重点使用的只有一个，就是Due 到期时间。当然这与我的任务管理方案有关系，是GTD任务管理的一种拓展。
:::

如果你要实现上图所示的GTD四象限的图示，那你需要填写 Priority：重要程序，依次是 Low 低、Normal一般、Medium中等、High高。

::: tip 图标不要删除
当填写完成后，点击 Apply 应用。刚刚的任务就会转化成 tasks 插件专有任务，添加了`task`标签和特定的emoji图标，这些图标不要删除。是提供给tasks插件查询的
:::

本章节讲解了 tasks 的基本操作，和注意的事项。以及增加快捷键的技巧。下一节将讲解tasks 的语法。[Tasks进阶(2) | obsidian文档咖啡豆版](/zh/tasks/tasks进阶(2).md)

::: danger 加群交流

如果在使用和学习中有不明白的地方，或者想看看别人的经验
- 可以查看[进阶用法](/zh/advanced)
- 可以加群和大家聊聊，加微信 `coffeebean1688` 蹦跶的咖啡豆，然后进群
- 可以查看[咖啡豆豆龙_哔哩哔哩](https://space.bilibili.com/618777356)) 视频教程。😜**关注、👍点赞、📀投币一键三连**
- 关注公众号(文章很多)：`蹦跶的咖啡豆
- 示例库（筹备中）
- 网站启用新域名：https://obsidian.vip 给VIP的你，很好记
:::

::: details 🌱【点我-扫码加群】
![加群交流！先加在拉](/assets/WeChat-QRcode.jpg =300x) 
::: 

::: details 🍻【点我-打赏】
![随缘支持](/assets/WeChat-Pay.jpg =x400)
::: 

