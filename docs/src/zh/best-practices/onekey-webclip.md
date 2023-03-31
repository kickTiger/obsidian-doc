---
# 这是文章的标题
title: 一键收藏网址和内容到ob
# 这是侧边栏的顺序
order: 4
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
## 1 缘起
有时候在浏览网站时，可能会遇到一些感兴趣的内容，但是由于时间或其他原因，无法立即阅读完毕。这时，我们需要将这些内容收藏起来，以便稍后阅读。

我研究了一种比较方便的方法，能够实现将网址和选中的文字直接写进 Obsidian 库中，以便稍后阅读。主要是使用了obsidian插件和浏览器插件Obsidian Web，具体配置方法如下：


::: tip summary
> - 可通过浏览器直接操作 ob 库，比如按照设定好的 template 记录摘录网页内容
> - 也可以别的程序通过 api 接口操作 obsidian 库，

::: tip 自定义标题
info note tip warning danger details(默认折叠)
details(这个是默认折叠的)
:::


## 2 首先 obsidian 安装 Local REST API 插件
安装：第三方库中搜索 `Local REST API` 插件，然后安装并启用。

### 2.1 获取 api key 备用
**获取 api key**：打开插件的设置，这里会提供一个 `Your APl Key` ，是一串字母和数字的组合。保存好，稍后要用，会提供给浏览器插件使用。

### 2.2 安装 SSL 证书
安装 SSL 证书是为了使用 https 协议，插件自动生成的自签证书。

点击设置页面，如下图位置，`download this cetificate` 下载 SSL 证书，这个是为了使用 `https` 然后进行的自签，下载后默认安装即可。
![[Obsidian_2Nooep7DxA.png]]

💡注意：不安装这个，也可以使用 http 协议连接

## 3 第二步：浏览器安装插件 Obsidian Web
在 chrome 商店安装插件 [Obsidian Web](https://chrome.google.com/webstore/detail/obsidian-web/edoacekkjanmingkbkgjndndibhkegad/related)，edge 浏览器也可以装这个

安装完毕后，将 Obsidian Web 钉在插件栏，点击右键打开 Obsidian Web 设置，进入 Obsidian Web Settings 后，设置 api key

输入第一步中获取的 api key，也就是 obsidian Local REST API 插件中的 key。回车保存即可。

> [!question]+ 如果在浏览器插件显示 Local REST API 未启用
> 注意：如果在浏览器插件显示 Local REST API 未启用
> 可以打开 Local REST API 的 `Enable Insecure HTTP Server` 模式，这样就会直接调用 `http` 模式，一样能启用接口

## 4 第三步：刷新页面并使用 obsidian web 插件
安装完毕后，刷新网页，点击 obsidian web 插件图标，出来的菜单，选择你要使用的动作。

![[Pasted image 20230108133403.png]]

### 4.1 示例1：
- 在网页上任选一段文字，
- 点击 obsidian web 插件图标，出来的菜单，选择 Create new note，点击右侧图标。
- 文字就会被保存在 obsidian 的库里，新建了一个 md 文件


## 5 增加稍后读😜
### 5.1 添加新动作
在浏览器插件中修改：
- 打开插件，选择“Templates”，点击＋号
- 输入“Read-Later”，编辑以下几个参数

![[msedge_IqRukFOZJb.png]]
### 5.2 设置参数
![[Quicker_G10YSM6LUZ.png]]
### 5.3 PATCH
选择 `PATCH` ，将内容插入到，当前打开的 obsidian 笔记的特定标题插入文本，不是附加到文件末尾。
> [!danger] 
> 注意选择 PATCH，是打补丁添加，而不是直接覆盖或者新建文件



### 5.4 API URL: 
按你需要修改为自己的库路径
`/vault/080 Template/shaohoudu/read-later.md`

### 5.5 HTTP headers
```yaml
Content-Insertion-Position: beginning
Heading: Read-later
```

### 5.6 Content
```yaml
### {{date}}
[{{json page.title}}]({{page.url}})
{{#if page.selectedText}}

{{quote page.selectedText}}
{{/if}}
```
:::