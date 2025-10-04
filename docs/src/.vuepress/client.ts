import { defineClientConfig } from '@vuepress/client'
import FloatingSidebar from './components/FloatingSidebar.vue'
import PluginShowcase from './components/PluginShowcase.vue'
import StatsPanel from './components/StatsPanel.vue'
import RankingTabs from './components/RankingTabs.vue'

export default defineClientConfig({
  enhance({ app }) {
    // 注册全局组件
    app.component('FloatingSidebar', FloatingSidebar)
    app.component('PluginShowcase', PluginShowcase)
    app.component('StatsPanel', StatsPanel)
    app.component('RankingTabs', RankingTabs)
  },
  
  setup() {
    // 客户端设置逻辑
  },
  
  rootComponents: [
    // 将浮动侧边栏作为根组件添加到每个页面
    FloatingSidebar,
  ],
})
