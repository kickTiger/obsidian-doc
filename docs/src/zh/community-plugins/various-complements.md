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

