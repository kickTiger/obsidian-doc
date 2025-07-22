import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      icon: "discover",
      text: "Demo",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "Docs",
      icon: "note",
      prefix: "guide/",
      children: "structure",
    },
    "slides",
  ],
  "/advanced/": [
    {
      text: "Advanced Tips",
      icon: "lightbulb",
      prefix: "/advanced/",
      children: [
        "README.md",
      ],
    },
  ],
});
