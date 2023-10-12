---
# 这是文章的标题
title: 图床
# 这是侧边栏的顺序
order: 13
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
::: danger 不推荐使用图床
- 首先，我要申明我的观点，如果没有发布需求的话，==不推荐使用图床==。
- 其次，使用图床的话，一定要注意**不要泄露**自己图床地址。
- 总之，如果你需要将图床地址发布的话，如果使用cos，oss或者七牛云等地址的话。一定要将防盗链的措施做到位，**不要被人刷流量**了。非常非常重要！
:::

请确定你都了解了上面的申明，咖啡豆不推荐使用图床。如果你都明白并一定要使用图床的话，下面是使用方法：

### Obsidian图床方案

总体就是使用obsidian插件`Image auto upload Plugin`和软件`PicGo`。利用插件调用PicGo中的配置，实现图片的图床化。

### 首先安装Image auto upload Plugin插件
**插件安装：**
::: tip 插件安装
打开 obsidian → 设置 ⚙️ → 第三方插件 → 社区插件市场，搜索关键字安装

注意：你需要关闭第三方插件的**安全模式**，才能安装社区插件，建议关闭。
:::

:::  danger Obsidian插件国内高速下载
有些同学无法正常访问Obsidian第三方市场，那么可以使用 ==obsidian.vip== 网站提供的插件。
- 不限速，不限次数下载
- 所有插件，包括未上架的插件。
- 会实时更新插件

**下载地址：**

- obsidian**插件下载** | obsidian文档咖啡豆版  
https://obsidian.vip/zh/documentation/obsidian-plugins-download.html

- obsidian**程序下载**(所有平台所有历史版本) | obsidian文档咖啡豆版  
https://obsidian.vip/zh/documentation/obsidian-download.html

- obsidian**主题下载**(所有主题) | obsidian文档咖啡豆版  
https://obsidian.vip/zh/documentation/obsidian-themes-download.html
:::

### 安装PicGo软件

下载PicGo软件，并按照说明配置好你的自用图床。这点就不再赘述，可自行搜索方法。

得到一个PicGo的端口地址，类似下面，然后复制备用。
```lua
http://127.0.0.1:36677/upload
```

### 设置Image auto upload Plugin插件

安装后启用插件，并打开设置。在PicGo server下输入刚刚复制的PicGo的端口地址，按照你的实际修改：下面是示例

```lua
http://127.0.0.1:36677/upload
```

其他设置

![PicGo设置](/assets/2023101113011405.png) . 

### 使用：粘贴即上传

启用剪切板自动上传：启用该选项后，粘贴图片时会自动上传。

整体流程比较简单，如果你有PicGo的使用经验的话，很容易就配置好了