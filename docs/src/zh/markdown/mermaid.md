---
# 这是文章的标题
title: mermaid流程图
# 这是侧边栏的顺序
order: 15
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
**插件简介：**  
mermaid，是markdown自带的**流程图语法**，obsidian中也支持了部分mermaid的特性。我们不用了解太多，照着下面的用就可以了。

**代码：**  
::: code-tabs
@tab 流程图语法
````markdown
```mermaid
  flowchart TB
      A("开始") --> B["一级"]
      A --> C("二级")
      A --> D("三级")
```
````

@tab 带说明的流程图
````markdown
```mermaid
  flowchart TB
      A("开始") --> B["一级"]
      A --> C("二级")
      A -->|"说明"| D("三级")
```
````
@tab 带子菜单的流程图
````markdown
```mermaid
  flowchart TB
      A("开始") --> B["一级"]
      A --> C("二级")
      A -->|"说明"| D("三级")
	  B --> B1("我是B的下级菜单")
	  C --> C1("我是C的下级菜单")
```
````
@tab 调整方向
````markdown
```mermaid
  flowchart LR
      A("开始") --> B["一级"]
      A --> C("二级")
      A -->|"说明"| D("三级")
	  B --> B1("我是B的下级菜单")
	  C --> C1("我是C的下级菜单")
```
````
:::

**流程图演示1：**
```mermaid
  flowchart TB
      A("开始") --> B["一级"]
      A --> C("二级")
      A --> D("三级")
```

**流程图演示1：**  
```mermaid
  flowchart TB
      A("开始") --> B["一级"]
      A --> C("二级")
      A -->|"说明"| D("三级")
```
**流程图演示3：**  

```mermaid
  flowchart TB
      A("开始") --> B["一级"]
      A --> C("二级")
      A -->|"说明"| D("三级")
	  B --> B1("我是B的下级菜单")
	  C --> C1("我是C的下级菜单")
```

**流程图演示4：**  
```mermaid
  flowchart LR
      A("开始") --> B["一级"]
      A --> C("二级")
      A -->|"说明"| D("三级")
	  B --> B1("我是B的下级菜单")
	  C --> C1("我是C的下级菜单")
```


