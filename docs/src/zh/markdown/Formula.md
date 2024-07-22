---
# 这是文章的标题
title: 公式
# 这是侧边栏的顺序
order: 13
# 这是页面的图标
icon: page
---
数学公式这个东西，并不是所有的markdown编辑器都支持的很好，各家有各花，显示效果都不一致。这里只能介绍一下方法。在 Markdown 中输入数学公式需要 LaTeX 语法的支持，你的编辑器支不支持很简单。试一下就知道了。

公式的表达很复杂，我觉得完全没必要去学习这个语法，用现成的转换工具进行转换就可以了。
- 手机APP就有一些很不错的转换工具，收费和免费的都有[^app]。
- 电脑上推荐使用在线公式转换工具[^online]

**代码：**
::: code-tabs
@tab 示例1
```LaTeX
$$
\begin{pmatrix}
1&a_1&a_1^2&\cdots&a_1^n\\
1&a_2&a_2^2&\cdots&a_2^n\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
1&a_m&a_m^2&\cdots&a_m^n\\
\end{pmatrix}
$$
```
@tab 示例2
```LaTeX
$$
\begin{matrix}   
 x & y \\   
 z & v \\  
\end{matrix}
$$
```
:::


**演示：**  
示例1：
$$
\begin{pmatrix}
1&a_1&a_1^2&\cdots&a_1^n\\
1&a_2&a_2^2&\cdots&a_2^n\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
1&a_m&a_m^2&\cdots&a_m^n\\
\end{pmatrix}
$$
示例2：
$$
\begin{matrix}   
 x & y \\   
 z & v \\  
\end{matrix}
$$


**扩展阅读：**

---
**在线LaTeX公式编辑器**
- [codecogs.com](https://editor.codecogs.com/) 在线LaTeX公式编辑器
- [在线LaTeX公式编辑器-编辑器 (latexlive.com)](https://www.latexlive.com/) 在线LaTeX公式编辑器

**参考文档**
- [Supported Functions · KaTeX](https://katex.org/docs/supported.html) 语法在线查询
- [帮助:数学公式 - 维基百科，自由的百科全书 (wikipedia.org)](https://zh.wikipedia.org/wiki/Help:%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F)

[^app]:  notability 识别手写公式、
[^online]:  在线LaTeX公式编辑器  
[codecogs.com](https://editor.codecogs.com/) 在线LaTeX公式编辑器  
[在线LaTeX公式编辑器-编辑器 (latexlive.com)](https://www.latexlive.com/) 在线LaTeX公式编辑器

**补充在线编辑器**
✨ 2024-07-22 更新在线编辑器

以下是几个知名且功能丰富的在线 LaTeX 编辑器：

1. **LaTeX Live**: 提供了一个在线 LaTeX 公式编辑器，可以识别图片中的公式，并支持多种格式的导出，如 SVG、PNG、JPG 和 MathML 等。 https://www.latexlive.com/ 
    
2. **Overleaf**: 这是一个易于使用的在线 LaTeX 编辑平台。它提供了一个简洁且直观的界面来编写和编辑复杂的 LaTeX 文档。Overleaf 支持实时协作功能，并提供了数百个模板供用户选择。它可以导出为多种格式，包括 PDF、HTML 和 PowerPoint。 https://www.overleaf.com/
    
3. **ShareLaTeX**: ShareLaTeX 后被 Overleaf 吸收合并，其功能与 Overleaf 类似，提供了一个强大且易于使用的在线 LaTeX 编辑器，支持实时预览和多人协作编辑。 https://www.sharelatex.com/
    
4. **Authorea**：除了 LaTeX 文档外，Authorea 还支持 Markdown、HTML 和多种科学计算格式。适合撰写科学论文、数据报告等文档，并支持在线协作。 https://www.authorea.com/

    
5. **MikTeX Online Editor**：这是一个网页版的 TeX 环境，不仅可以编辑 LaTeX 代码，而且可以直接运行 TeX 命令生成 PDF 输出。 https://miktex.org/
    
6. **Jupyter Notebook**: 虽然 Jupyter 不是专门用于 LaTeX 的编辑器，但它支持 LaTeX 格式输出，并且结合 Markdown 和 Python、R 或 Julia 等编程语言进行数据分析和报告撰写非常高效。 https://jupyter.org/

这些在线工具主要帮助用户在不需要安装任何本地软件的情况下编写数学公式、科学文档和其他需要 LaTeX 格式的文本内容。每个平台都有自己的特性和优点.

::: tip 欢迎投稿
公式这玩意用的不多，欢迎熟悉的同学投稿用法和纠错，评论区留言或者联系站长@咖啡豆
:::