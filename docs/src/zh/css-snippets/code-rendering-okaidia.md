---
# 这是文章的标题
title: CSS片段-代码块着色黑色主题
# 这是侧边栏的顺序
order: 9
# 这是页面的图标
icon: page
---
**说明：**  
修改obsidian的代码块着色为黑色okaidia主题，在预览模式下生效。

**使用方法：**  
1. 复制以下代码，保存为`coffebean-代码块着色黑色okaidia主题.css`文件格式
2. 将`coffebean-代码块着色黑色okaidia主题.css`复制到库的css片段中，刷新obsidian片段。重启obsidian生效

::: tip 添加启动css片段的方法
1. 打开obsidian设置 → 外观 → CSS 代码片段，点击此处的文件夹图标📁，打开css片段文件夹
2. 复制你的css文件到这个文件夹，回到obsidian中，刷新并启动片段。偶尔**需要重启ob生效**
:::


::: tip 更新记录
2023-02-25 修复了一下代码，用这版新的，在阅读模式下生效
:::
**代码**  
代码框右下有复制按钮，点击自动复制代码
```css
/*
 @Author   : coffeebean
 @contact  : https://obsidian.vip/
 @File     : coffeebean-prism-source-view.css
 @Software : vscode
 @Date     :  2022-04-09
 @update   :  2023-02-25
 @Desc     : 调整了一下代码块的样式，暗黑主题
 */

/* PrismJS 1.27.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+abap+abnf+actionscript+ada+agda+al+antlr4+apacheconf+apex+apl+applescript+aql+arduino+arff+armasm+arturo+asciidoc+aspnet+asm6502+asmatmel+autohotkey+autoit+avisynth+avro-idl+awk+bash+basic+batch+bbcode+bicep+birb+bison+bnf+brainfuck+brightscript+bro+bsl+c+csharp+cpp+cfscript+chaiscript+cil+clojure+cmake+cobol+coffeescript+concurnas+csp+cooklang+coq+crystal+css-extras+csv+cue+cypher+d+dart+dataweave+dax+dhall+diff+django+dns-zone-file+docker+dot+ebnf+editorconfig+eiffel+ejs+elixir+elm+etlua+erb+erlang+excel-formula+fsharp+factor+false+firestore-security-rules+flow+fortran+ftl+gml+gap+gcode+gdscript+gedcom+gettext+gherkin+git+glsl+gn+linker-script+go+go-module+graphql+groovy+haml+handlebars+haskell+haxe+hcl+hlsl+hoon+http+hpkp+hsts+ichigojam+icon+icu-message-format+idris+ignore+inform7+ini+io+j+java+javadoc+javadoclike+javastacktrace+jexl+jolie+jq+jsdoc+js-extras+json+json5+jsonp+jsstacktrace+js-templates+julia+keepalived+keyman+kotlin+kumir+kusto+latex+latte+less+lilypond+liquid+lisp+livescript+llvm+log+lolcode+lua+magma+makefile+markdown+markup-templating+mata+matlab+maxscript+mel+mermaid+mizar+mongodb+monkey+moonscript+n1ql+n4js+nand2tetris-hdl+naniscript+nasm+neon+nevod+nginx+nim+nix+nsis+objectivec+ocaml+odin+opencl+openqasm+oz+parigp+parser+pascal+pascaligo+psl+pcaxis+peoplecode+perl+php+phpdoc+php-extras+plant-uml+plsql+powerquery+powershell+processing+prolog+promql+properties+protobuf+pug+puppet+pure+purebasic+purescript+python+qsharp+q+qml+qore+r+racket+cshtml+jsx+tsx+reason+regex+rego+renpy+rest+rip+roboconf+robotframework+ruby+rust+sas+sass+scss+scala+scheme+shell-session+smali+smalltalk+smarty+sml+solidity+solution-file+soy+sparql+splunk-spl+sqf+sql+squirrel+stan+stata+iecst+stylus+supercollider+swift+systemd+t4-templating+t4-cs+t4-vb+tap+tcl+tt2+textile+toml+tremor+turtle+twig+typescript+typoscript+unrealscript+uorazor+uri+v+vala+vbnet+velocity+verilog+vhdl+vim+visual-basic+warpscript+wasm+web-idl+wiki+wolfram+wren+xeora+xml-doc+xojo+xquery+yaml+yang+zig */
.markdown-reading-view code[class*=language-],
.markdown-reading-view pre[class*=language-] {
    color: #f8f8f2;
    background: 0 0;
    text-shadow: 0 1px rgba(0, 0, 0, .3);
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none
}

.markdown-reading-view pre[class*=language-] {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
    border-radius: .3em
}

.markdown-reading-view :not(pre)>code[class*=language-],
.markdown-reading-view pre[class*=language-] {
    background: #272822
}

.markdown-reading-view :not(pre)>code[class*=language-] {
    padding: .1em;
    border-radius: .3em;
    white-space: normal
}

.markdown-reading-view .token.cdata,
.markdown-reading-view .token.comment,
.markdown-reading-view .token.doctype,
.markdown-reading-view .token.prolog {
    color: #8292a2
}

.markdown-reading-view .token.punctuation {
    color: #f8f8f2
}

.markdown-reading-view .token.namespace {
    opacity: .7
}

.markdown-reading-view .token.constant,
.markdown-reading-view .token.deleted,
.markdown-reading-view .token.property,
.markdown-reading-view .token.symbol,
.markdown-reading-view .token.tag {
    color: #f92672
}

.markdown-reading-view .token.boolean,
.markdown-reading-view .token.number {
    color: #ae81ff
}

.markdown-reading-view .token.attr-name,
.markdown-reading-view .token.builtin,
.markdown-reading-view .token.char,
.markdown-reading-view .token.inserted,
.markdown-reading-view .token.selector,
.markdown-reading-view .token.string {
    color: #a6e22e
}

.markdown-reading-view .language-css .token.string,
.markdown-reading-view .style .token.string,
.markdown-reading-view .token.entity,
.markdown-reading-view .token.operator,
.markdown-reading-view .token.url,
.markdown-reading-view .token.variable {
    color: #f8f8f2
}

.markdown-reading-view .token.atrule,
.markdown-reading-view .token.attr-value,
.markdown-reading-view .token.class-name,
.markdown-reading-view .token.function {
    color: #e6db74
}

.markdown-reading-view .token.keyword {
    color: #66d9ef
}

.markdown-reading-view .token.important,
.markdown-reading-view .token.regex {
    color: #fd971f
}

.markdown-reading-view .token.bold,
.markdown-reading-view .token.important {
    font-weight: 700
}

.markdown-reading-view .token.italic {
    font-style: italic
}

.markdown-reading-view .token.entity {
    cursor: help
}


```