import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
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
