```ts
// docs/src/.vuepress/config.ts 网站配置

import { defineUserConfig } from "vuepress";  
import theme from "./theme.js";  
  
export default defineUserConfig({  
  // 网站根目录,一般不用修改
  base: "/",  
  
  // 多语言配置, 主页显示什么语言版本和这个无关.是在README里面手动写的代码
  locales: {  
    "/": {  
      lang: "en-US",  
      title: "obsidian Docs ",  
      description: "A docs for obsidian",  
    },  
    "/zh/": {  
      lang: "zh-CN",  
      title: "obsidian文档咖啡豆版",  
      description: "obsidian文档和使用技巧",  
    },  
  },  
  
  theme,  
  
  shouldPrefetch: false,  
});
```