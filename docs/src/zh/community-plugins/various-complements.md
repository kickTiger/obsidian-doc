---
# 这是文章的标题
title: various complements
# 这是侧边栏的顺序
order: 7
# 这是页面的图标
icon: page
---
**插件简介：**  
Various Complements 是obsidian的自动短语补齐插件。能够识别当前 obsidian 库中已经输入的文字并提示。

::: info 
Various-Complements 除了识别已经存在的短语，也可以自定义提示文字，方便你的快捷输入。
:::
**插件安装：**
::: tip 插件安装
打开 obsidian → 设置 ⚙️ → 第三方插件 → 社区插件市场，搜索关键字安装

注意：你需要关闭第三方插件的**安全模式**，才能安装社区插件，建议关闭。
:::

## 插件使用
### 1/3 中文支持
在新版的Various Complements中加强了对中文的支持，不过你需要下载一个中文包，下载地址如下：

> 下载地址：[CC-CEDICT download - MDBG Chinese Dictionary](https://www.mdbg.net/chinese/dictionary?page=cc-cedict)

也可直接下载压缩 [cedict_1_0_ts_utf-8_mdbg.zip](https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.zip)，解压缩之后，将`cedict_ts.u8`文件复制到当前库的根目录下，然后重启obsidian 生效
::: tip 
将`cedict_ts.u8`文件复制到当前库的根目录下     
:::

::: tip 怎么打开当前库的根目录
> [!important] 怎么打开当前库的根目录
> 1. 当前库目录，就是你新建库文件时候建立的文件夹。打开步骤如下：
> 2. 左侧菜单栏，左下角 “打开其他库”
> 3. 在弹出窗口，在左侧找到你的库名称，点击旁边的"..."更多菜单，选择“在系统资源管理器中显示仓库文件夹”，会弹出资源管理器，如下图所示
> 4. 打开的资源管理器，点击你的库名称，就是根目录。注意是在和“`.obsidian`”文件夹同级的位置。

:::

![](/assets/2023042920082439.png)
![](/assets/2023042920082345.png)
![](/assets/2023042920081252.png)


### 2/3 自定义短语
1. 打开 Various Complements 设置，
2. 找到 `Custom dictionary complement` 选择打开，
3. 输入`Custom dictionary paths` 自定义短语的路径。
自己在库的根目录下，新建`custom-dictionary.txt`，将路径填写在 第3步的 配置栏中。

::: warning 注意
自定义短语文件中，必须符合规范的格式
:::

### 3/3 自定义字典规范

在 excel 中分 3 列添加，复制到 md 字典文件夹即可，直接复制粘贴，不要修改格式。编辑也在 excel 中。

-   第一列是输入的字符
-   第二列是描述
-   第三列是激活的别称

::: tip 技巧
可以将 Various-Complements 的确认键修改为 `tab` 键，这样不容打扰正常的输入法

设置方法：  
设置 → Various-Complements → Key customization：Select a suggestion key设为`tab`
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

