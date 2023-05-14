---
# 这是文章的标题
title: obsidian open weather
# 这是侧边栏的顺序
order: 34
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
**插件简介：**  
obsidian open weather，一个很有意思的小插件，调用了免费的天气接口。实现了几个功能：
- 在状态栏中显示当前天气
- 将当前天气插入文档
- 提供四个可定制的天气字符串
- 可定制的状态栏天气字符串
- 模板支持自动将天气插入新文档
- 动态天气的DIV支持

::: warning 新增功能
2023-03-19 我给作者提了两个 `issue` 和我的解决代码：
1. 让天气显示为中文，和多语言支持。（2023-03-19作者已完成）
2. 用emoji表情对应天气。（作者已列入计划中，2023-03-23已完成）
:::


::: code-tabs
@tab 插入天气文本-样式1
```markdown
2023/03/19/ • 小雨 • 当前温度: 9°C • 体感温度: 9°C
```
@tab:active 插入天气文本-样式2
```markdown
Beijing: March 19 - 12:36 PM  
当前温度: 9°C • 体感温度: 8°C  
风力: 7 km/h from the West with gusts up to 7 km/h  
日升: 06:33:37 • 日落: 18:37:38  
```
:::

::: warning 特点
以纯文本的方式，将实时的天气插入到笔记中。
:::


![底部状态栏展示](/assets/plugin-openWeather.png =750x)


**插件安装：**
::: tip 插件安装
打开 obsidian → 设置 ⚙️ → 第三方插件 → 社区插件市场，搜索关键字安装

注意：你需要关闭第三方插件的**安全模式**，才能安装社区插件，建议关闭。
:::

**插件使用：**  
### 1 注册免费天气接口 📖

这里使用了 [https://openweathermap.org](https://openweathermap.org/) 的免费天气接口，效果还不错，接口可以直接访问。信息比较丰富。注册方法：

1.  打开 [https://openweathermap.org](https://openweathermap.org/) ，注册。[注册页面](https://home.openweathermap.org/users/sign_up) 
2.  右上角用户名点击，“My API keys”，复制 api 接口即可

::: warning
注意：根据实测，api审核生效可能要等10分钟到2小时左右，如果显示失败的话，可以稍等后尝试。
:::

### 2 填入天气 api 接口和城市 📌

打开 openweather 插件设置，在顶部输入

-   Enter Location，输入你需要查询城市的名称（拼音的全拼）
-   OpenWeather API Key，输入获取的 api 接口


### 3 修改状态栏显示的内容⛅

```js
%dateYear1%/%dateMonth2%/%dateDay2%/ |天气: %desc% %desc-em% | 温度: %temp%°C  |  日落: %sunset%
```

这里会显示，`2023/03/18 | 天气:小雨|温度:8°C|日落:18:37:03`

也可以根据自己的需要更改这里的参数，系统默认的是每15分钟更新一次天气数据

::: tip 新增emoji天气图标
新增特性，emoji 天气符号，使用命令`%desc-em%`
:::

::: warning 状态栏内容太多的处理
如果你的状态栏，原始内容太多，可以使用[Commander](/zh/community-plugins/Commander.md) 插件隐藏一部分不需要的内容。就可以放下天气了
:::

### 4 修改天气🌞描述为中文
在设置中，选择`language`，选择为“Chinese Simplified”即可。
::: tip 感谢作者的及时反馈
- 我在本地修改了一下语言，然后给作者发了 `issue`和解决代码，
- 结果作者一晚上就更改了。真的是为爱发电啊😄
:::

### 5 修改插入天气的模板
打开命令面板“Ctrl+P”，输入weather，选择插入样式：我的是修改成这样了

::: code-tabs#标签id要改不要重复(联动的上下一致)
@tab 插入天气1️⃣#id1
```js
%dateYear1%/%dateMonth2%/%dateDay2%/ • %desc% • 当前温度: %temp%°C • 体感温度: %feels%°C
```
@tab 插入天气2️⃣#id2
````js
%name%: %dateMonth4% %dateDay2% - %timeH2%:%timeM% %ampm1%
当前温度: %temp%°C • 体感温度: %feels%°C<br>
风力: %wind-speed% km/h from the %wind-dir%^ with gusts up to %wind-gust% km/h^<br>
日升: %sunrise% • 日落: %sunset%
````

:::

::: code-tabs#标签id要改不要重复(联动的上下一致)
@tab 插入天气1️⃣#id1
````markdown
2023/03/19/ • 小雨 • 当前温度: 9°C • 体感温度: 9°C
````
@tab 插入天气2️⃣#id2
````markdown
Beijing: March 19 - 12:36 PM  
当前温度: 9°C • 体感温度: 8°C  
风力: 7 km/h from the West with gusts up to 7 km/h  
日升: 06:33:37 • 日落: 18:37:38  
````
:::

###  6 在页面任何位置插入动态天气
只需要两步：
- 1、顶部YAML里引入css样式。
- 2、页面正文插入div代码。

顶部YAML：
````js
---
cssclass: openweather
---
````

正文样式
::: code-tabs#标签id要改不要重复(联动的上下一致)
@tab 代码1#id11
````markdown
<div class="weather_current_1"></div>
````
@tab 代码2#id22
````markdown
<div class="weather_current_2"></div>
````
@tab 代码3#id33
````markdown
<div class="weather_current_3"></div>
````
@tab 代码4#id44
````markdown
<div class="weather_current_4"></div>
````
:::

::: code-tabs#标签id要改不要重复(联动的上下一致)
@tab 样式1#id11
````markdown
2023/03/19/ • 小雨 • 当前温度: 9°C • 体感温度: 9°C
````
@tab 样式2#id22
````markdown
Beijing: March 19 - 12:36 PM  小雨
当前温度: 9°C • 体感温度: 8°C  
风力: 7 km/h from the West with gusts up to 7 km/h  
日升: 06:33:37 • 日落: 18:37:38  
````
@tab 样式3#id33
````markdown
🌧️Beijing: March 19 - 12:36 PM  小雨
当前温度: 9°C • 体感温度: 8°C  
风力: 7 km/h from the West with gusts up to 7 km/h  
日升: 06:33:37 • 日落: 18:37:38  
````
@tab 样式4#id44
````markdown
🌧️Beijing: March 19 - 12:36 PM  小雨
当前温度: 9°C • 体感温度: 8°C  
风力: 7 km/h from the West with gusts up to 7 km/h  
日升: 06:33:37 • 日落: 18:37:38  
````
:::

::: danger 加群交流

如果在使用和学习中有不明白的地方，或者想看看别人的经验
- 可以查看[进阶用法](/zh/advanced)
- 可以加群和大家聊聊，加微信 `coffeebean1688` 蹦跶的咖啡豆，然后进群
- 可以查看[咖啡豆豆龙_哔哩哔哩](https://space.bilibili.com/618777356)) 视频教程。😜**关注、👍点赞、📀投币一键三连**
- 关注公众号(文章很多)：`蹦跶的咖啡豆
- 示例库（筹备中）
:::

::: details 🌱【点我-扫码加群】
![加群交流！先加在拉](/assets/WeChat-QRcode.jpg =300x) 
::: 

::: details 🍻【点我-打赏】
![随缘支持](/assets/WeChat-Pay.jpg =x400)
::: 


