---
# 这是文章的标题
title: Image-Auto-Upload-Plugin
# 这是侧边栏的顺序
order: 18
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
**插件简介：**  
Image Auto Upload Plugin，是一个图片上传的插件，这是一个支持 PicGo、PicGo-Core 上传图片到图床的工具 

**1.剪切板上传**： 
支持黏贴剪切板的图片的时候直接上传，目前支持复制系统内图像直接上传。 支持通过设置 `frontmatter` 来控制单个文件的上传，默认值为 `true`，控制关闭请将该值设置为 `false`

支持 ".png", ".jpg", ".jpeg", ".bmp", ".gif", ".svg", ".tiff"

**2.批量上传一个文件中的所有图像文件**：  
输入 `ctrl+P` 呼出面板，输入 `download all images`，点击回车，就会自动开始下载。只在 win 进行过测试

**3.支持右键菜单上传图片**  

**4.支持拖拽上传**  
仅在使用 picGo 客户端时生效

**5.支持 Picgo-Core**  



::: warning
更新插件后记得重启一下 Obsidian
:::

**插件安装：**
::: tip 插件安装
打开 obsidian → 设置 ⚙️ → 第三方插件 → 社区插件市场，搜索关键字安装

注意：你需要关闭第三方插件的**安全模式**，才能安装社区插件，建议关闭。
:::

**插件使用：**  
1.  安装 PicGo 工具，并进行配置，配置参考[官网](https://github.com/Molunerfinn/PicGo)
2.  开启 PicGo 的 Server 服务，并记住端口号
3.  安装插件
4.  打开插件配置项，设置为[http://127.0.0.1:{{PicGo设置的端口号}}/upload（例如：http://127.0.0.1:36677/upload）](http://127.0.0.1:%7B%7BPicGo%E8%AE%BE%E7%BD%AE%E7%9A%84%E7%AB%AF%E5%8F%A3%E5%8F%B7%7D%7D/upload%EF%BC%88%E4%BE%8B%E5%A6%82%EF%BC%9Ahttp://127.0.0.1:36677/upload%EF%BC%89)
5.  接下来试试看能否上传成功

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

