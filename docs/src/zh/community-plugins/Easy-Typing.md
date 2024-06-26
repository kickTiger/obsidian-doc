---
# 这是文章的标题
title: Easy-Typing
# 这是侧边栏的顺序
order: 15
# 这是页面的图标
icon: page
---
::: details 🌱【点我-扫码加群】
![加群交流！先加在拉](/assets/WeChat-QRcode.jpg =300x) 
::: 

::: details 🍻【点我-打赏】
![随缘支持](/assets/WeChat-Pay.jpg =x400)
::: 
**插件简介：**  
Easy-Typing，是一个 Obsidian 的书写体验增强插件，功能包含编辑时自动格式化文本和符号编辑增强。自动格式化文本对文档的格式进行规范化，并且美化文档的观感。编辑增强优化用户的编辑体验。

::: warning
注意：本插件专为 Obsidian 中的中英文混合输入设计，对其他语言不一定有效。
:::

**插件核心功能**：  
- 1.1 首字母大写
- 1.2 中英文间插入空格/中文间消除空格/标点与文本间插入空格
- 1.3 不同区块间的空格策略
- 1.4 自定义正则区块
- 符号配对/删除
	- 符号自动配对
	- 配对符号删除

更多功能安装插件后查看设置

::: danger 
我用的最多的就是 中英文间插入空格，对中英文混合输入太舒服了。但是某些时候需要注意，特殊的文本中防止他随意插入空格。这个时候需要自己写一些正则表达式匹配。
:::


**插件安装：**
::: tip 插件安装
打开 obsidian → 设置 ⚙️ → 第三方插件 → 社区插件市场，搜索关键字安装

注意：你需要关闭第三方插件的**安全模式**，才能安装社区插件，建议关闭。
:::

**插件使用：**  
基础设置比较简单，打开设置进入插件，按需使用。

### 自定义正则
::: tip 自定义正则区块(Custom regular expressions block)
这一块注意一下，当原始的规则干扰了你的写作了，比如录入 17:33:03 时间格式被加了空格，或者其他的情况。就需要**自定义正则**了
:::


::: tip 指定文件不自动格式化
在插件设置里：指定文件不自动格式化（Exclude Folders/Files），输入不需要格式化的文件夹或者文件，一行一个。
:::
::: danger 正则使用方法
每行未尾3个字符的固定为|和两个空格策略，`|-+` 这种格式。下面的正则最后末尾都要加上这3个字符。这两个空格策略符号分别为匹配区块的左右两边的空格策略，
- `|`+左边策略+右边策略，
- 策略有3种，空格策略符号为`-=+`，分别代表**不要求空格**(-)，**软空格**(=)，**严格空格**(+)
- 比如：**左右两边不想要空格**，先用下面的正则表达式，最后加上`正则表达式|--`表示左右两边都不要空格
:::

### 1. 识别网络连接、本地文件链接  
识别本地文件链接、网络连接、obsidian链接、zotero链接、ftp链接，防止误格式化。==这段是完整代码，不需要加策略符号==
```js
(file:///|https?://|ftp://|obsidian://|zotero://|www.)[^\s（）《》。,，！？;；：“”‘’\)\(\[\]\{\}']+|++
```

### 2 识别 callout 语法块
识别 callout 语法块的头部，防止误格式化。==这段是完整代码，不需要加策略符号==
```js
\[\!.*?\][-+]{0,1}|-+
```
### 3 识别双尖括号
是用来识别双尖括号块的，保证其内部文本不被自动格式化影响。如在使用 Templater 插件创建模板时，需要使用  这样的语法。启用该自定义规则可以防止其内容被错误添加空格（因为内部的点号会被认为句子的结束，从而本插件会自动在点号与后面的文本间添加空格）。==这段是完整代码，不需要加策略符号==
```js
<.*?>|--
```

### 4 识别数字时间  
识别如同 12:16 这样的时间文本，不会对其自动格式化导致空格的误添加。==这段是完整代码，不需要加策略符号==

```js
\d{2}:\d{1,2}|++
```

### 5 识别标签 tag
==这段是完整代码，不需要加策略符号==
```js
#[\u4e00-\u9fa5\w\/]+|++
```

::: danger 正则使用方法
每行未尾3个字符的固定为|和两个空格策略，`|-+` 这种格式。下面的正则最后末尾都要加上这3个字符。这两个空格策略符号分别为匹配区块的左右两边的空格策略，
- `|`+左边策略+右边策略，
- 策略有3种，空格策略符号为`-=+`，分别代表**不要求空格**(-)，**软空格**(=)，**严格空格**(+)
- 比如：**左右两边不想要空格**，先用下面的正则表达式，最后加上`正则表达式|--`表示左右两边都不要空格
:::

## 更多正则表达式
[正则表达式速查表](/zh/advanced/regular-expression.md)

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

