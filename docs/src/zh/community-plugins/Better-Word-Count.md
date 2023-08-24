---
# 这是文章的标题
title: Better Word Count
# 这是侧边栏的顺序
order: 23
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
**插件简介：**  
Better Word Count，主要是统计文档的字符数量的。
- 包括当前文档的字符数
- 所选择的文字的字符数
- 今天输入的字符数
- 全库文件的字符数

::: warning 全库文件的字符数
如果文件很多的话，这个功能建议不要开启，避免卡死。
:::

**插件安装：**
::: tip 插件安装
打开 obsidian → 设置 ⚙️ → 第三方插件 → 社区插件市场，搜索关键字安装

注意：你需要关闭第三方插件的**安全模式**，才能安装社区插件，建议关闭。
:::

**插件使用：**  
1/2 **添加 今日输入文字数**  
- 打开 obsidian → 设置 → 第三方插件 → 打开 Better Word Count 的设置。
- 找到 `Markdown Status Bar`，add item 新增，或者 直接修改下面的选项。
- Metric Counter 设置为：Words
- Metric Type 设置为：Daily Metric（每日计量）
- Suffix Text 设置为： words Today （这个是左下角显示的字符）

2/2 全库文字统计
如上，重新 add item 或者修改旧的
- Metric Counter 设置为：Words
- Metric Type 设置为：Total in Vault（每日计量）
- Suffix Text 设置为：  characters ALL （这个是左下角显示的字符）

然后重启obsidian，查看左下角，会出现类似于这样的字符。
```
244 words Daily 80794 characters ALL
```

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



