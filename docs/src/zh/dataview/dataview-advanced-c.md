---
title: Dataview进阶(3)
order: 3
icon: page
headerDepth: 2
---
这是新开的一节内容，距离以前的 `dataview` 系列讲解已经很久了。汇总一些大家常见的问题，重新补充。

另外想把这个 `dataview` 系列重构一下，变得更简单易理解。同时可能会配合官方即将推出的 `database` 核心功能打基础。

::: danger 还有必要学习 dataview 插件吗？
**1 官方的Database出来我还有必要看dataview吗？**

其实没有太大的关系，按照惯例，官方的database功能，应该会考虑到和dataview的兼容性。同时官方的database功能短时间，应该是比不上 dataview 插件的功能强大的。

现在很多人都是基于 dataview 构建的知识库，并且还有大量的 dataviewjs 代码，示例和讲解很多，所以不用担心浪费时间。

**2 官方的database语法应该类似于dataview**

- 数据库说到底都是基于JavaScript 和SQL的类似语法，万变不离其宗。核心的理论不会太大的变动，而且也没有必要去变动。两者想通的
- 最多就是细微的语法差别和表现的区别，不会有太大的变动，官方也要考虑一个平滑过渡的问题。
:::

### 1 Inline DQL 内联DQL查询
这里讲解一个前面没有提及的内容，就是 dataview 的内联查询，`Inline DQL`。大家可以将他和行内代码块类似，

日常我们使用大的代码块，但是还有一个行内代码块，这点 dataview 引用了和基础markdown语法类似的概念。可以在文章的任何地方插入查询语句，不在局限于固定的代码块查询。


::: code-tabs
@tab 基础语法-用英文单引号包裹
```markdown 
`= this.file.name`
```
@tab 联合使用-嵌入正文中
```markdown
Today is `= date(today)` - `= [[exams]].deadline - date(today)` until exams!
```
@tab 通过前缀访问**当前页面**的属性
```markdown
`= this.file.name`
`= this.file.mtime`
`= this.someMetadataField`
`= [[secondPage]].file.name`
`= [[secondPage]].file.mtime`
`= [[secondPage]].someMetadataField`
```
:::

::: tip 内联语法的用途
- 他的主要作用是只显示一个值，那么就可以嵌入到任何的地方。不受样式的限制。在实时预览，和阅读模式下生效。
- 内联查询无法查询多个页面。它们始终只显示一个值，而不是值的列表（或表）。您可以通过前缀访问**当前页面**的属性，也可以通过 访问其他页面的属性。`this.``[[linkToPage]]`
:::

### 2 内联数据视图中的JS
和普通的dataview语法一样，还有对应的 dataviewjs 语法。内联查询也同样可以使用 JavaScript 的能力，写入更灵活的语法。 

**JS 内联查询演示**
- 规范，同样是使用英文的单引号包裹语法，如下

```
`$= dv.current().file.mtime`
```

::: tip JS内联查询和内联查询的区别
与内联 DQL 查询不同，内联 JS 查询==可以访问 Dataview JS 查询可用的所有内容==，因此可以查询和输出多个页面。
:::

在内联 DataviewJS 中，您可以像在代码块中一样访问变量，并且可以进行所有相同的调用。结果 应该是计算结果为 JavaScript 值的东西，Dataview 将自动适当地呈现该值。`dv` `dataviewjs`

