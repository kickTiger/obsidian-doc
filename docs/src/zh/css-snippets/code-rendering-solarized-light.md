---
# 这是文章的标题
title: CSS片段-代码块着色太阳亮色
# 这是侧边栏的顺序
order: 10
# 这是页面的图标
icon: page
---
**说明：**  
修改obsidian的代码块着色为黑色okaidia主题，在预览模式下生效。

**使用方法：**  
1. 复制以下代码，保存为`coffebean-代码块着色亮色solarized-light主题.css`文件格式
2. 将`coffebean-代码块着色亮色solarized-light主题.css`复制到库的css片段中，刷新obsidian片段。重启obsidian生效

::: tip 添加启动css片段的方法
1. 打开obsidian设置 → 外观 → CSS 代码片段，点击此处的文件夹图标📁，打开css片段文件夹
2. 复制你的css文件到这个文件夹，回到obsidian中，刷新并启动片段。偶尔**需要重启ob生效**
:::

SOLARIZED LIGHT
solarized-light
**代码**  
代码框右下有复制按钮，点击自动复制代码
```css
/* 
@Author   : 咖啡豆
@contact  : https://coffeetea.top/
@File     : coffebean-代码块着色亮色solarized-light主题.css
@Software : vscode
@Date     : 2022-04-09
@update   : 2023-02-07
@Desc     : 调整代码块着色浅色背景主题 
*/
/* PrismJS 1.27.0
https://prismjs.com/download.html#themes=prism-coy&languages=markup+css+clike+javascript+abap+abnf+actionscript+ada+agda+al+antlr4+apacheconf+apex+apl+applescript+aql+arduino+arff+armasm+arturo+asciidoc+aspnet+asm6502+asmatmel+autohotkey+autoit+avisynth+avro-idl+awk+bash+basic+batch+bbcode+bicep+birb+bison+bnf+brainfuck+brightscript+bro+bsl+c+csharp+cpp+cfscript+chaiscript+cil+clojure+cmake+cobol+coffeescript+concurnas+csp+cooklang+coq+crystal+css-extras+csv+cue+cypher+d+dart+dataweave+dax+dhall+diff+django+dns-zone-file+docker+dot+ebnf+editorconfig+eiffel+ejs+elixir+elm+etlua+erb+erlang+excel-formula+fsharp+factor+false+firestore-security-rules+flow+fortran+ftl+gml+gap+gcode+gdscript+gedcom+gettext+gherkin+git+glsl+gn+linker-script+go+go-module+graphql+groovy+haml+handlebars+haskell+haxe+hcl+hlsl+hoon+http+hpkp+hsts+ichigojam+icon+icu-message-format+idris+ignore+inform7+ini+io+j+java+javadoc+javadoclike+javastacktrace+jexl+jolie+jq+jsdoc+js-extras+json+json5+jsonp+jsstacktrace+js-templates+julia+keepalived+keyman+kotlin+kumir+kusto+latex+latte+less+lilypond+liquid+lisp+livescript+llvm+log+lolcode+lua+magma+makefile+markdown+markup-templating+mata+matlab+maxscript+mel+mermaid+mizar+mongodb+monkey+moonscript+n1ql+n4js+nand2tetris-hdl+naniscript+nasm+neon+nevod+nginx+nim+nix+nsis+objectivec+ocaml+odin+opencl+openqasm+oz+parigp+parser+pascal+pascaligo+psl+pcaxis+peoplecode+perl+php+phpdoc+php-extras+plant-uml+plsql+powerquery+powershell+processing+prolog+promql+properties+protobuf+pug+puppet+pure+purebasic+purescript+python+qsharp+q+qml+qore+r+racket+cshtml+jsx+tsx+reason+regex+rego+renpy+rest+rip+roboconf+robotframework+ruby+rust+sas+sass+scss+scala+scheme+shell-session+smali+smalltalk+smarty+sml+solidity+solution-file+soy+sparql+splunk-spl+sqf+sql+squirrel+stan+stata+iecst+stylus+supercollider+swift+systemd+t4-templating+t4-cs+t4-vb+tap+tcl+tt2+textile+toml+tremor+turtle+twig+typescript+typoscript+unrealscript+uorazor+uri+v+vala+vbnet+velocity+verilog+vhdl+vim+visual-basic+warpscript+wasm+web-idl+wiki+wolfram+wren+xeora+xml-doc+xojo+xquery+yaml+yang+zig */
.theme-light code[class*=language-],
.theme-light pre[class*=language-] {
    color: #000;
    background: 0 0;
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

.theme-light pre[class*=language-] {
    position: relative;
    margin: .5em 0;
    overflow: visible;
    padding: 1px
}

.theme-light pre[class*=language-]>code {
    position: relative;
    z-index: 1;
    border-left: 10px solid #358ccb;
    box-shadow: -1px 0 0 0 #358ccb, 0 0 0 1px #dfdfdf;
    background-color: #fdfdfd;
    background-image: linear-gradient(transparent 50%, rgba(69, 142, 209, .04) 50%);
    background-size: 3em 3em;
    background-origin: content-box;
    background-attachment: local
}

.theme-light code[class*=language-] {
    max-height: inherit;
    height: inherit;
    padding: 0 1em;
    display: block;
    overflow: auto
}

.theme-light :not(pre)>code[class*=language-],
.theme-light pre[class*=language-] {
    background-color: #fdfdfd;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 1em
}

.theme-light :not(pre)>code[class*=language-] {
    position: relative;
    padding: .2em;
    border-radius: .3em;
    color: #c92c2c;
    border: 1px solid rgba(0, 0, 0, .1);
    display: inline;
    white-space: normal
}

.theme-light pre[class*=language-]:after,
/* .theme-light pre[class*=language-]:before {
    content: '';
    display: block;
    position: absolute;
    bottom: .75em;
    left: .18em;
    width: 40%;
    height: 20%;
    max-height: 13em;
    box-shadow: 0 13px 8px #979797;
    -webkit-transform: rotate(-2deg);
    -moz-transform: rotate(-2deg);
    -ms-transform: rotate(-2deg);
    -o-transform: rotate(-2deg);
    transform: rotate(-2deg)
} */

.theme-light pre[class*=language-]:after {
    right: .75em;
    left: auto;
    -webkit-transform: rotate(2deg);
    -moz-transform: rotate(2deg);
    -ms-transform: rotate(2deg);
    -o-transform: rotate(2deg);
    transform: rotate(2deg)
}

.theme-light .token.block-comment,
.theme-light .token.cdata,
.theme-light .token.comment,
.theme-light .token.doctype,
.theme-light .token.prolog {
    color: #7d8b99
}

.theme-light .token.punctuation {
    color: #5f6364
}

.theme-light .token.boolean,
.theme-light .token.constant,
.theme-light .token.deleted,
.theme-light .token.function-name,
.theme-light .token.number,
.theme-light .token.property,
.theme-light .token.symbol,
.theme-light .token.tag {
    color: #c92c2c
}

.theme-light .token.attr-name,
.theme-light .token.builtin,
.theme-light .token.char,
.theme-light .token.function,
.theme-light .token.inserted,
.theme-light .token.selector,
.theme-light .token.string {
    color: #2f9c0a
}

.theme-light .token.entity,
.theme-light .token.operator,
.theme-light .token.url,
.theme-light .token.variable {
    color: #a67f59;
    background: rgba(255, 255, 255, .5)
}

.theme-light .token.atrule,
.theme-light .token.attr-value,
.theme-light .token.class-name,
.theme-light .token.keyword {
    color: #1990b8
}

.theme-light .token.important,
.theme-light .token.regex {
    color: #e90
}

.theme-light .language-css .token.string,
.theme-light .style .token.string {
    color: #a67f59;
    background: rgba(255, 255, 255, .5)
}

.theme-light .token.important {
    font-weight: 400
}

.theme-light .token.bold {
    font-weight: 700
}

.theme-light .token.italic {
    font-style: italic
}

.theme-light .token.entity {
    cursor: help
}

.theme-light .token.namespace {
    opacity: .7
}

@media screen and (max-width:767px) {

    .theme-light pre[class*=language-]:after,
    .theme-light pre[class*=language-]:before {
        bottom: 14px;
        box-shadow: none
    }
}

.theme-light pre[class*=language-].line-numbers.line-numbers {
    padding-left: 0
}

.theme-light pre[class*=language-].line-numbers.line-numbers code {
    padding-left: 3.8em
}

.theme-light pre[class*=language-].line-numbers.line-numbers .line-numbers-rows {
    left: 0
}

.theme-light pre[class*=language-][data-line] {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0
}

.theme-light pre[data-line] code {
    position: relative;
    padding-left: 4em
}

.theme-light pre .line-highlight {
    margin-top: 0
}
```