---
title: Execute Python
order: 37
icon: page
headerDepth: 2
---
## 1 插件简介
- 插件ID: obsidian-execute-python
- 作者: williamechols
- 描述: 用来执行Python代码
- 仓库地址: williamechols/obsidian-execute-python

::: tip 一句话介绍用途
`Execute Python`是一个轻量级的插件，用来执行Python代码的
:::
---

`Execute Python`是一个轻量级的插件，用来执行Python代码的。主要是在 Obsidian 笔记中执行嵌入的 Python 代码片段，支持运行时输入。更详细的示例在文末提供。


::: danger 加群交流
如果在使用和学习中有不明白的地方，或者想看看别人的经验
- 可以查看[进阶用法](/zh/advanced)
- 可以加群和大家聊聊，加微信 `coffeebean1688` 蹦跶的咖啡豆，然后进群
- 可以查看[咖啡豆豆龙_哔哩哔哩](https://space.bilibili.com/618777356)) 视频教程。😜**关注、👍点赞、📀投币一键三连**
- 关注公众号(文章很多)：`蹦跶的咖啡豆
- 关注公众号(文章很多)：`蹦跶的咖啡豆
- 示例库（筹备中）
- 网站启用新域名：https://obsidian.vip 给VIP的你，很好记
:::

::: tip 🌱【点我-扫码加群】
![加群交流！先加在拉](/assets/WeChat-QRcode.jpg =200x)  
::: 
::: details 🍻【点我-打赏】
![随缘支持](/assets/WeChat-Pay.jpg =x400)
::: 


## 2 特点 
- **运行 Python 代码块**： 只需在标记符代码块中编写 Python 代码，然后点击预览模式中出现的 "开始 "按钮。代码块将被执行，并在同一代码块中显示输出结果。
- **实时 Python 控制台**： 每个 Python 代码块都具有实时 Python 控制台的功能。您可以在输入框中输入内容，然后按 "提交输入 "按钮或回车键提交。输入内容将传递给 Python 代码并显示结果。这一过程在代码执行过程中进行，允许有条件或循环输入。
- **控制显示元素**： 你可以选择隐藏代码片段、输入框和退出代码信息。
- **支持不同的 Python 版本**： 你可以在设置中指定 Python 可执行文件的名称（如 "python "或 "python3"）。

::: warning

:::

## 3 插件安装
::: tip 插件安装
打开 obsidian → 设置 ⚙️ → 第三方插件 → 社区插件市场，搜索关键字安装

注意：你需要关闭第三方插件的**安全模式**，才能安装社区插件，建议关闭。
:::

## 4 插件使用 
1.打开或创建一个注释并编写一个 Python 代码块。Python 代码块是用一对三个反引号括起来的任何文本，在第一组后面加上单词“python”，如下所示：
```python
print("Hello, World!")
```

2.单击“开始”以在关联的代码块中运行 Python 代码。
3.代码的输出将显示在同一块中。如果您的代码需要输入，请在出现提示时在输入框中输入，然后按“提交输入”或 Enter 键。
4.可以通过再次按“开始”按钮重新运行代码片段。要清除输出和输入字段，请单击“重置”按钮。
5.要修改插件的设置，请在黑曜石设置中导航到插件的设置选项卡。设置选项如下。

## 5 设置
您可以在黑曜石设置选项卡中修改以下设置：

- **Python 可执行文件名称**：指定 Python 可执行文件的名称。这通常是“python”或“python3”。
- **在预览中显示** Python 代码：切换是在降价预览中显示还是隐藏 Python 代码。
- **显示** Python 退出代码：切换是否在运行 Python 代码后显示退出代码消息。
- **显示输入框**：可以在代码块中的任何位置使用“#noinput”注释按块进行设置。

## 6 注意

- **小心任意代码执行，不要执行任何您不熟悉的代码**
- 该插件为每个代码块创建一个新的 Python 进程。小心长时间运行或资源密集型代码，因为它可能会影响黑曜石的性能。
- 确保 Python 可执行文件位于系统的 PATH 中。该插件使用设置中指定的 Python 可执行文件的名称来查找和运行 Python。
- “`#noinput`”指令可以包含在 Python 代码块中，以隐藏该特定代码块的输入框和“提交输入”按钮。“`#noinput`”指令将不会显示在降价预览中。例如：

````md
```python
#noinput
x = 1
print(x+1)
```
````

## 7 更多示例

### 7.1 带 `#noinput` 的打印示例

````md
```python
#noinput
print("Hello, World!")
print("Line 2")
```
````

### 7.2 基本变量

````md
```python
#noinput
x = 2
print(x + 1)
print(x)
```
````

### 7.3 多个输入，中间有更新

````md
```python
name = input("name: ")
print("\nentered name")
color = input("color: ")
print(f"\n{name} likes the color {color}")
```
````

### 7.4 带输入的循环

````md
```python
num_over_10 = 0
while (num_over_10 <= 10):
	num_over_10 = int(input("enter num: \n"))
print(f"{num_over_10} > 10")
```
````

### 7.5 变量依赖于块（这将导致错误）

````md
```python
#noinput
print(x)
```
````

