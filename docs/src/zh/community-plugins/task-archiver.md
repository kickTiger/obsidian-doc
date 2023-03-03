---
# 这是文章的标题
title: task archiver
# 这是侧边栏的顺序
order: 32
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
**插件简介：**  
task archiver，一个有点意思的插件。可以将当前页面的任务归档，移动任务到页面指定位置或者新文档中。⭐️⭐️

::: tip 应用场景
如果你也像我一样，把任务都收集到一个页面。
完成和未完成的任务混合在一起着实太乱，这个插件可以帮你把完成的任务都归档移走
:::

::: warning
修改正文内容的插件，需要谨慎测试，最好备份后测试无误使用。
:::

**插件安装：**
::: tip 插件安装
打开 obsidian → 设置 ⚙️ → 第三方插件 → 社区插件市场，搜索关键字安装

注意：你需要关闭第三方插件的**安全模式**，才能安装社区插件，建议关闭。
:::

**插件使用：**  
- 在当前文件生效
- 通过命令行调用，`Ctrl+P`呼出命令面板。输入task archiver后，选择`Archiver: Archive tasks including nested tasks in this file` 归档:归档任务包括该文件中的嵌套任务.
- 这样会自动将本页中的完成的task任务移动到标题下。

::: tip 设置项目
打开插件设置：
- Depth of new archive headings：这里设置归档标题等级，`2级`
- Order archived tasks：归档任务排序，可选择`Newest first`
- Archive heading text：设置归档标题为：`任务归档`
:::

::: tip 关闭选项
注意关闭有两个选项：插件设置中的 Date tree settings
- Use weeks 关闭
- Use days 关闭
这2个生成一个双链的文件，感觉毫无意义，可以关闭。
:::

