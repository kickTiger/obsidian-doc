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

**代码**  
代码框右下有复制按钮，点击自动复制代码
```css
/*
 @Author   : coffeebean
 @contact  : https://coffeetea.top/
 @File     : coffebean-代码块着色黑色okaidia主题.css
 @Software : vscode
 @Date     : 2022-04-09
 @update   : 2023-02-07
 @Desc     : 调整代码块着色黑色主题
 */

/* PrismJS 1.27.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+abap+abnf+actionscript+ada+agda+al+antlr4+apacheconf+apex+apl+applescript+aql+arduino+arff+armasm+arturo+asciidoc+aspnet+asm6502+asmatmel+autohotkey+autoit+avisynth+avro-idl+awk+bash+basic+batch+bbcode+bicep+birb+bison+bnf+brainfuck+brightscript+bro+bsl+c+csharp+cpp+cfscript+chaiscript+cil+clojure+cmake+cobol+coffeescript+concurnas+csp+cooklang+coq+crystal+css-extras+csv+cue+cypher+d+dart+dataweave+dax+dhall+diff+django+dns-zone-file+docker+dot+ebnf+editorconfig+eiffel+ejs+elixir+elm+etlua+erb+erlang+excel-formula+fsharp+factor+false+firestore-security-rules+flow+fortran+ftl+gml+gap+gcode+gdscript+gedcom+gettext+gherkin+git+glsl+gn+linker-script+go+go-module+graphql+groovy+haml+handlebars+haskell+haxe+hcl+hlsl+hoon+http+hpkp+hsts+ichigojam+icon+icu-message-format+idris+ignore+inform7+ini+io+j+java+javadoc+javadoclike+javastacktrace+jexl+jolie+jq+jsdoc+js-extras+json+json5+jsonp+jsstacktrace+js-templates+julia+keepalived+keyman+kotlin+kumir+kusto+latex+latte+less+lilypond+liquid+lisp+livescript+llvm+log+lolcode+lua+magma+makefile+markdown+markup-templating+mata+matlab+maxscript+mel+mermaid+mizar+mongodb+monkey+moonscript+n1ql+n4js+nand2tetris-hdl+naniscript+nasm+neon+nevod+nginx+nim+nix+nsis+objectivec+ocaml+odin+opencl+openqasm+oz+parigp+parser+pascal+pascaligo+psl+pcaxis+peoplecode+perl+php+phpdoc+php-extras+plant-uml+plsql+powerquery+powershell+processing+prolog+promql+properties+protobuf+pug+puppet+pure+purebasic+purescript+python+qsharp+q+qml+qore+r+racket+cshtml+jsx+tsx+reason+regex+rego+renpy+rest+rip+roboconf+robotframework+ruby+rust+sas+sass+scss+scala+scheme+shell-session+smali+smalltalk+smarty+sml+solidity+solution-file+soy+sparql+splunk-spl+sqf+sql+squirrel+stan+stata+iecst+stylus+supercollider+swift+systemd+t4-templating+t4-cs+t4-vb+tap+tcl+tt2+textile+toml+tremor+turtle+twig+typescript+typoscript+unrealscript+uorazor+uri+v+vala+vbnet+velocity+verilog+vhdl+vim+visual-basic+warpscript+wasm+web-idl+wiki+wolfram+wren+xeora+xml-doc+xojo+xquery+yaml+yang+zig */
.markdown-source-view.mod-cm6 code[class*=language-],
.markdown-source-view.mod-cm6 pre[class*=language-] {
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

.markdown-source-view.mod-cm6 pre[class*=language-] {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
    border-radius: .3em
}

.markdown-source-view.mod-cm6 :not(pre)>code[class*=language-],
.markdown-source-view.mod-cm6 pre[class*=language-] {
    background: #272822
}

.markdown-source-view.mod-cm6 :not(pre)>code[class*=language-] {
    padding: .1em;
    border-radius: .3em;
    white-space: normal
}

.markdown-source-view.mod-cm6 .token.cdata,
.markdown-source-view.mod-cm6 .token.comment,
.markdown-source-view.mod-cm6 .token.doctype,
.markdown-source-view.mod-cm6 .token.prolog {
    color: #8292a2
}

.markdown-source-view.mod-cm6 .token.punctuation {
    color: #f8f8f2
}

.markdown-source-view.mod-cm6 .token.namespace {
    opacity: .7
}

.markdown-source-view.mod-cm6 .token.constant,
.markdown-source-view.mod-cm6 .token.deleted,
.markdown-source-view.mod-cm6 .token.property,
.markdown-source-view.mod-cm6 .token.symbol,
.markdown-source-view.mod-cm6 .token.tag {
    color: #f92672
}

.markdown-source-view.mod-cm6 .token.boolean,
.markdown-source-view.mod-cm6 .token.number {
    color: #ae81ff
}

.markdown-source-view.mod-cm6 .token.attr-name,
.markdown-source-view.mod-cm6 .token.builtin,
.markdown-source-view.mod-cm6 .token.char,
.markdown-source-view.mod-cm6 .token.inserted,
.markdown-source-view.mod-cm6 .token.selector,
.markdown-source-view.mod-cm6 .token.string {
    color: #a6e22e
}

.markdown-source-view.mod-cm6 .language-css .token.string,
.markdown-source-view.mod-cm6 .style .token.string,
.markdown-source-view.mod-cm6 .token.entity,
.markdown-source-view.mod-cm6 .token.operator,
.markdown-source-view.mod-cm6 .token.url,
.markdown-source-view.mod-cm6 .token.variable {
    color: #f8f8f2
}

.markdown-source-view.mod-cm6 .token.atrule,
.markdown-source-view.mod-cm6 .token.attr-value,
.markdown-source-view.mod-cm6 .token.class-name,
.markdown-source-view.mod-cm6 .token.function {
    color: #e6db74
}

.markdown-source-view.mod-cm6 .token.keyword {
    color: #66d9ef
}

.markdown-source-view.mod-cm6 .token.important,
.markdown-source-view.mod-cm6 .token.regex {
    color: #fd971f
}

.markdown-source-view.mod-cm6 .token.bold,
.markdown-source-view.mod-cm6 .token.important {
    font-weight: 700
}

.markdown-source-view.mod-cm6 .token.italic {
    font-style: italic
}

.markdown-source-view.mod-cm6 .token.entity {
    cursor: help
}
```