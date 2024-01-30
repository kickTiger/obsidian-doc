---
title: Templater常用语法(视频+模板)
order: 2
icon: page
headerDepth: 2
number headings: auto, first-level 2, max 6, start-at 1, 1.1
---
## 1 拿来就用

如果你就是简单使用，可以不用看后面的语法了。直接在这个页面里面复制粘贴就OK了，一般的使用应该是完全够用了。

## 2 日期相关

::: tip 日期相关的函数有4个
- now
- tomorrow
- weekday
- yesterday
:::

### 2.1 日期的格式化

在下面可以对日期进行格式化，比如 

::: warning 更详细的时间格式：关注资源更多
微信公众号里更详细的时间格式。[​Obsidian最佳实践：时间格式化的秘密：让你的时间管理变得更加轻松！](https://mp.weixin.qq.com/s?__biz=Mzk0OTQ0NjM5MQ==&mid=2247484005&idx=1&sn=674d6a63c92354dadde0b17596f2b134&chksm=c35971fdf42ef8ebfac053d0985ea2f4f6fa7c854652cc4799bea7e15a439a19e3de971adfbd&token=506593959&lang=zh_CN#rd) 
:::
 
::: code-tabs#实战1
@tab 年月日#id11
````js
YYYY-MM-DD
````
@tab 年月日2#id22
````js
YYYYMMDD
````
:::

::: code-tabs#实战1
@tab 年月日#id11
````markdown
2023-10-03
````
@tab 年月日2#id22
````markdown
20231003
````
:::

### 2.2 获取当天日期
::: code-tabs
@tab 获取当天日期
````js
<% tp.date.now() %> 
````
@tab 获取当天日期并格式化
````js
<% tp.date.now("YYYY-MM-DD") %>
````

:::

### 2.3 获取间隔日期

::: code-tabs
@tab 获取7天前的日期
````js
<% tp.date.now("YYYY-MM-DD", -7) %>
````
@tab 获取7天后的日期
````js
<% tp.date.now("YYYY-MM-DD", +7) %>
````
@tab 获取下个月的日期
````js
<% tp.date.now("YYYY-MM-DD", "P-1M") %>
````
@tab 获取明年的日期
````js
<% tp.date.now("YYYY-MM-DD", "P1Y") %>
````

:::

### 2.4 常用日期
::: code-tabs
@tab 昨天
````js
<% tp.date.yesterday("YYYY-MM-DD") %>
<% tp.date.now("YYYY-MM-DD", -1) %>
````
@tab 明天
````js
<% tp.date.tomorrow("YYYY-MM-DD") %>
<% tp.date.now("YYYY-MM-DD", +1) %>
````
@tab 本周星期一
````js
<% tp.date.weekday("YYYY-MM-DD", 0) %>
````
:::


## 3 文件相关

### 3.1 获取笔记常用信息
::: code-tabs
@tab 笔记的标题title
````js
<% tp.file.title %>
````
@tab 笔记的标签tags
````js
<% tp.file.tags %>
````
@tab 笔记的绝对路径
````js
<% tp.file.path() %>
````
@tab 笔记的相对路径(相对Obsidian库根目录)
````js
<% tp.file.path(true) %>
````
:::

### 3.2 获取笔记其他信息
::: code-tabs
@tab 笔记正文
````js
<% tp.file.content %>
````
@tab 笔记创建时间
````js
<% tp.file.creation_date() %>
````
@tab 笔记最后修改时间
````js
<% tp.file.last_modified_date() %>
````

:::

### 3.3 笔记操作

::: code-tabs
@tab 移动文件1
````js
<% await tp.file.move("/A/B/" + tp.file.title) %>
````
@tab 移动文件2
````js
<% await tp.file.move("/A/B/NewTitle") %>
````
@tab 重命名文件
````js
<% await tp.file.rename("MyNewName") %>
````
:::

## 4 文件frontmatter属性值

这个是用来获取顶部属性区域的函数，可以直接获取对应属性的值，也就是以前的YAML区域。

举例：
::: code-tabs#标签id要改不要重复(联动的上下一致)
@tab 假设顶部属性定义1#id1
````markdown
---
aliases: myfile
note type: seedling
---
````

:::

::: code-tabs#标签id要改不要重复(联动的上下一致)
@tab 获取属性值alias#id1
````js
<% tp.frontmatter.alias %>
````

:::

## 5 每日一句/一图

插件提供了一个很有意思的东西，每天随意调用一句话或者一张图片。加了一些乐趣

::: code-tabs
@tab 每日一句
````js
<%+ tp.web.daily_quote() %>
````
@tab 每日一图
````js
<%+ tp.web.random_picture() %>
````
@tab 每日一图，控制图片尺寸
````js
<% tp.web.random_picture("200x200") %>
````
@tab 每日一图，控制图片尺寸+关键字
````js
<% tp.web.random_picture("200x200", "landscape,water") %>
````
:::

## 6 组合用法：日记

::: code-tabs#标签id要改不要重复(联动的上下一致)
@tab 昨天+今天+明天#id1
````js
[[<% tp.date.now("YYYY-MM-DD", -1) %>]] | [[<% tp.date.now() %>]] | [[<% tp.date.now("YYYY-MM-DD", +1) %>]]
````
@tab 上周+今天+下周#id2
````js
[[<% tp.date.now("YYYY-MM-DD", -7) %>]] | [[<% tp.date.now() %>]] | [[<% tp.date.now("YYYY-MM-DD", +7) %>]]
````

:::

::: code-tabs#标签id要改不要重复(联动的上下一致)
@tab 昨天+今天+明天#id1
````js
2023-10-02 | 2023-10-03 | 2023-10-04
````
@tab 上周+今天+下周#id2
````js
2023-09-26 | 2023-10-03 | 2023-10-10
````

:::

## 7 完整日记模板(视频讲解+模板下载)

**文字版：完整代码和模板(微信公众号)**  
[Obsidian最佳实践：(视频教程)自动插入静态天气的日记模板3.0版(生活工作统管)完美解决方案](https://mp.weixin.qq.com/s?__biz=Mzk0OTQ0NjM5MQ==&mid=2247484013&idx=1&sn=106d4509d2d01b5ccc11081e67c3fa7d&chksm=c35971f5f42ef8e35e9748f4bb85d924ee52b982472cfefcedb2cc4f793f7d10d6e2a2d64fc8&token=506593959&lang=zh_CN&poc_token=HBz4GmWjS81jVSpCDlvR9IUxjsK1CN2e1D-Vica-)

**配套视频讲解-喂饭教程**
<BiliBili bvid="BV1m24y1T7k7" />


![扫码关注 公众号【蹦跶的咖啡豆】-**内容多更新快**](/assets/2023072422104650.png =400x)

::: danger 加群交流
如果在使用和学习中有不明白的地方，或者想看看别人的经验
- 可以查看[进阶用法](/zh/advanced)
- 可以加群和大家聊聊，加微信 `coffeebean1688` 蹦跶的咖啡豆，然后进群
- 可以查看[咖啡豆豆龙_哔哩哔哩](https://space.bilibili.com/618777356)) 视频教程。😜**关注、👍点赞、📀投币一键三连**
- 关注公众号(文章很多)：`蹦跶的咖啡豆
- 示例库（筹备中）
- 网站启用新域名：https://obsidian.vip 给VIP的你，很好记
:::
::: tip 🌱【点我-扫码加群】
![加群交流！先加在拉](/assets/WeChat-QRcode.jpg =300x) 
::: 
::: tip 🍻【微信扫码-打赏】
![微信扫码-打赏-更新不易](/assets/WeChat-Pay.jpg =x300)
::: 


