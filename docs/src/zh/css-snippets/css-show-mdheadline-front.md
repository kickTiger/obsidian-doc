---
# 这是文章的标题
title: CSS片段-显示h标题等级
# 这是侧边栏的顺序
order: 7
# 这是页面的图标
icon: page
---
**说明：**  
显示h标题的等级，显示在最前面

**使用方法：**  
1. 复制以下代码，保存为`coffebean-显示h标题等级.css`文件格式
2. 将`coffebean-显示h标题等级.css`复制到库的css片段中，刷新obsidian片段。重启obsidian生效

::: tip 添加启动css片段的方法
1. 打开obsidian设置 → 外观 → CSS 代码片段，点击此处的文件夹图标📁，打开css片段文件夹
2. 复制你的css文件到这个文件夹，回到obsidian中，刷新并启动片段。偶尔需要重启ob生效
:::

**代码**  
代码框右下有复制按钮，点击自动复制代码
```css
/*  
@collecte : 咖啡豆  
@contact  : https://obsidian.vip/  
@File     : coffeebean-显示h标题等级.css  
@Software : vscode  
@Date     : 2022-11-12  
@upDate   : 2022-11-12  
@Desc     : 显示h标题等级（在标题前端，在实时预览模式中）  
*/  
  
.is-live-preview div.cm-contentContainer > div > div:not(.HyperMD-header.HyperMD-header-1.cm-line.cm-active) > span.cm-header.cm-header-1::before{  
  content: 'H1';  
  color: #6b6d6f;  
  margin-right: 0px;  
  font-size: 0.8rem;  
  margin-right: 5px;  
  font-weight: normal;  
}  
  
.is-live-preview div.cm-contentContainer > div > div:not(.HyperMD-header.HyperMD-header-2.cm-line.cm-active) > span.cm-header.cm-header-2::before{  
  content: 'H2';  
  color: #6b6d6f;  
  margin-right: 0px;  
  font-size: 0.8rem;  
  margin-right: 5px;  
  font-weight: normal;  
}  
  
.is-live-preview div.cm-contentContainer > div > div:not(.HyperMD-header.HyperMD-header-3.cm-line.cm-active) > span.cm-header.cm-header-3::before{  
  content: 'H3';  
  color: #6b6d6f;  
  margin-right: 0px;  
  font-size: 0.8rem;  
  margin-right: 5px;  
  font-weight: normal;  
}  
  
.is-live-preview div.cm-contentContainer > div > div:not(.HyperMD-header.HyperMD-header-4.cm-line.cm-active) > span.cm-header.cm-header-4::before{  
  content: 'H4';  
  color: #6b6d6f;  
  margin-right: 0px;  
  font-size: 0.8rem;  
  margin-right: 5px;  
  font-weight: normal;  
}  
  
.is-live-preview div.cm-contentContainer > div > div:not(.HyperMD-header.HyperMD-header-5.cm-line.cm-active) > span.cm-header.cm-header-5::before{  
  content: 'H5';  
  color: #6b6d6f;  
  margin-right: 0px;  
  font-size: 0.8rem;  
  margin-right: 5px;  
  font-weight: normal;  
}  
  
.is-live-preview div.cm-contentContainer > div > div:not(.HyperMD-header.HyperMD-header-6.cm-line.cm-active) > span.cm-header.cm-header-6::before{  
  content: 'H6';  
  color: #6b6d6f;  
  margin-right: 0px;  
  font-size: 0.8rem;  
  margin-right: 5px;  
  font-weight: normal;  
}
```