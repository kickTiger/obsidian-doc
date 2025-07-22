import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  { text: "Obsidian Guide", icon: "discover", link: "/zh/documentation/" },
  {
    text: "Markdown Syntax",
    icon: "creative",
    prefix: "/zh/markdown/",
    link: "/zh/markdown/",
  },
  {
    text: "Plugins",
    icon: "creative",
    prefix: "/zh/",
    children: [
      {
        text: "Core Plugins",
        icon: "creative",
        prefix: "core-plugins/",
        link: "core-plugins/",
      },
      {
        text: "Community Plugins",
        icon: "config",
        prefix: "community-plugins/",
        link: "community-plugins/",
      },
    ],
  },
  {
    text: "Bases Column",
    icon: "creative",
    prefix: "/zh/bases/",
    link: "/zh/bases/",
  },
  {
    text: "Update Log",
    icon: "note",
    link: "/zh/documentation/Update-Log.md",
  },
]);
