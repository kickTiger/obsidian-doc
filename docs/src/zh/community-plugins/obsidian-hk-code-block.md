---
# 这是文章的标题
title: obsidian-hk-code-block
# 这是侧边栏的顺序
order: 22
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
**插件简介：**  
obsidian hk code block，这是一个未上架的插件。有兴趣可以测试安装。安装方法如下：

**插件作用：**  
改善原始代码块的表现，增加了：
- 显示行号
- 折叠代码区
- 复制按钮、
- 代码的标题
- 高亮显示某行
- 提示符，Prompt，增加一个提示区
- 添加结果，Result，会增加一个块，标记为结果

**插件安装：**
::: tip 通过BRAT插件安装
打开 obsidian → 设置 ⚙️ → 第三方插件 → 社区插件市场，搜索 BRAT 安装BRAT插件  

打开 BRAT 插件，找到Beta Plugin List，点击`Add Beta plugin`，弹窗输入要安装的插件的GitHub地址。也可以输入 `HeekangPark/obsidian-hk-code-block` 格式。BRAT插件就会自动安装和追踪最新的插件了  


注意：你需要关闭第三方插件的**安全模式**，才能安装社区插件，建议关闭。
:::

**插件使用：**  
经过测试，有些功能是默认开启，不需要特殊操作，也不会对代码入侵添加额外的代码。比如：
- 显示行号

部分需要自定义的特性
- 代码折叠，
- 代码标题
- 添加提示
- 添加结果

::: tip
以下代码演示区、还有代码解释分开存放  
点击代码区，下方的解释区会同步切换
:::
::: code-tabs#标签id要改
@tab 代码块带标题#id1
````markdown
```python title:"Title of the code block"
print("Hello world")
```
````
@tab 折叠:默认折叠#id2
````markdown
```python title:"Title of the code block" collapse
print("Hello world")
```
````
@tab 折叠:默认展开#id3
````markdown
```python title:"Title of the code block" collapse:false
print("Hello world")
```
````
@tab 高亮指定行#id4
````markdown
```python highlight:"2-4,8,10"
print("line 1")
print("line 2")
print("line 3")
print("line 4")
print("line 5")
print("line 6")
print("line 7")
print("line 8")
print("line 9")
print("line 10")
print("line 11")
```
````
@tab 插入结果区#id5
````markdown
```python
print("Hello world!")
```

```result
Hello world!
```
````
:::

使用方法解释：  
::: code-tabs#标签id要改
@tab 代码块带标题#id1
````markdown
```python title:"Title of the code block"

注意：你必须把标题用引号引起来。可以使用单引号和双引号。

经过测试，有些 语言 写法不被支持，注意更换 语言 说明就可以折叠了
````
@tab 折叠:默认折叠#id2
````markdown
```python title:"Title of the code block" collapse

必须使用标题功能才能使用折叠功能
````
@tab 折叠:默认展开#id3
````markdown
```python title:"Title of the code block" collapse:false

这个是折叠代码，但默认是展开的
````
@tab 折叠:默认展开#id4
````markdown
行号必须用引号括起来。可以使用单引号和双引号。也可以使用短划线指定行号范围。
如果您使用行号功能并设置行号不从1开始，则必须根据此设置输入要突出显示的行号。

````
@tab 插入结果区#id5
````markdown
1.请注意，结果代码块必须放在结果所属的代码块之后。不能在它们之间放置任何其他组件
2.如果您使用行号功能并设置行号不从1开始，则必须根据此设置输入要突出显示的行号。
3.结果代码块不是动态生成的。结果代码块只是简单的纯文本代码块。必须手动输入结果
4.只能在结果代码块中使用行号和行突出显示功能。其他功能将被忽略，即使您指定了它们
````
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

::: details 🌱【点我-扫码加群】
![加群交流！先加在拉](/assets/WeChat-QRcode.jpg =300x) 
::: 

::: details 🍻【点我-打赏】
![随缘支持](/assets/WeChat-Pay.jpg =x400)
::: 



