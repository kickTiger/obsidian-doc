<template>
  <div class="ranking-tabs">
    <div class="ranking-header">
      <h2 class="ranking-title">🏆 插件排行榜</h2>
      <p class="ranking-subtitle">发现最受欢迎和增长最快的插件</p>
    </div>

    <!-- 标签页导航 -->
    <div class="tabs-nav">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-button"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- 标签页内容 -->
    <div class="tabs-content">
      <transition name="fade" mode="out-in">
        <div :key="activeTab" class="tab-panel">
          <div v-if="currentRanking.length === 0" class="empty-state">
            <p>暂无排行数据</p>
          </div>
          <div v-else class="ranking-list">
            <div
              v-for="(plugin, index) in currentRanking"
              :key="plugin.id"
              class="ranking-item"
              :class="{ 'top-three': index < 3 }"
              @click="navigateToPlugin(plugin.id)"
            >
              <!-- 排名徽章 -->
              <div class="rank-badge" :class="`rank-${index + 1}`">
                <span v-if="index < 3" class="rank-medal">{{ getMedal(index) }}</span>
                <span v-else class="rank-number">{{ index + 1 }}</span>
              </div>

              <!-- 插件信息 -->
              <div class="plugin-info">
                <div class="plugin-name-row">
                  <h3 class="plugin-name">{{ plugin.name }}</h3>
                  <span v-if="plugin.category" class="plugin-category">{{ plugin.category }}</span>
                </div>
                <p class="plugin-author">{{ plugin.author }}</p>
              </div>

              <!-- 统计数据 -->
              <div class="plugin-stats">
                <div class="stat-item">
                  <span class="stat-icon">⬇️</span>
                  <span class="stat-value">{{ formatNumber(getStatValue(plugin)) }}</span>
                </div>
                <div v-if="showGrowth(plugin)" class="growth-indicator" :class="getGrowthClass(plugin)">
                  <span class="growth-icon">{{ getGrowthIcon(plugin) }}</span>
                  <span class="growth-value">{{ getGrowthValue(plugin) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Props 定义
interface Plugin {
  id: string;
  name: string;
  author: string;
  description: string;
  repo: string;
  downloads: number;
  updated: number;
  weeklyDownloads?: number;
  monthlyDownloads?: number;
  weeklyGrowth?: number;
  monthlyGrowth?: number;
  latestVersion?: string;
  category?: string;
}

interface Rankings {
  topByDownloads: Plugin[];
  topByWeekly: Plugin[];
  topByMonthly: Plugin[];
}

interface Props {
  rankings: Rankings | null;
}

const props = defineProps<Props>();

// 当前激活的标签页
const activeTab = ref<'downloads' | 'weekly' | 'monthly'>('downloads');

// 标签页配置
const tabs = [
  { key: 'downloads' as const, label: '总下载排行', icon: '👑' },
  { key: 'weekly' as const, label: '每周热门', icon: '🔥' },
  { key: 'monthly' as const, label: '当月热门', icon: '⭐' }
];

// 当前排行榜数据
const currentRanking = computed(() => {
  if (!props.rankings) return [];
  
  switch (activeTab.value) {
    case 'downloads':
      return props.rankings.topByDownloads || [];
    case 'weekly':
      return props.rankings.topByWeekly || [];
    case 'monthly':
      return props.rankings.topByMonthly || [];
    default:
      return [];
  }
});

// 格式化数字
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// 获取奖牌图标
const getMedal = (index: number): string => {
  const medals = ['🥇', '🥈', '🥉'];
  return medals[index] || '';
};

// 获取统计值
const getStatValue = (plugin: Plugin): number => {
  switch (activeTab.value) {
    case 'downloads':
      return plugin.downloads;
    case 'weekly':
      return plugin.weeklyDownloads || 0;
    case 'monthly':
      return plugin.monthlyDownloads || 0;
    default:
      return 0;
  }
};

// 是否显示增长指标
const showGrowth = (plugin: Plugin): boolean => {
  if (activeTab.value === 'weekly') {
    return typeof plugin.weeklyGrowth === 'number';
  }
  if (activeTab.value === 'monthly') {
    return typeof plugin.monthlyGrowth === 'number';
  }
  return false;
};

// 获取增长值
const getGrowthValue = (plugin: Plugin): string => {
  let growth = 0;
  if (activeTab.value === 'weekly' && plugin.weeklyGrowth) {
    growth = plugin.weeklyGrowth;
  } else if (activeTab.value === 'monthly' && plugin.monthlyGrowth) {
    growth = plugin.monthlyGrowth;
  }
  return `${growth > 0 ? '+' : ''}${growth.toFixed(1)}%`;
};

// 获取增长图标
const getGrowthIcon = (plugin: Plugin): string => {
  let growth = 0;
  if (activeTab.value === 'weekly' && plugin.weeklyGrowth) {
    growth = plugin.weeklyGrowth;
  } else if (activeTab.value === 'monthly' && plugin.monthlyGrowth) {
    growth = plugin.monthlyGrowth;
  }
  
  if (growth > 0) return '↑';
  if (growth < 0) return '↓';
  return '→';
};

// 获取增长样式类
const getGrowthClass = (plugin: Plugin): string => {
  let growth = 0;
  if (activeTab.value === 'weekly' && plugin.weeklyGrowth) {
    growth = plugin.weeklyGrowth;
  } else if (activeTab.value === 'monthly' && plugin.monthlyGrowth) {
    growth = plugin.monthlyGrowth;
  }
  
  if (growth > 0) return 'growth-up';
  if (growth < 0) return 'growth-down';
  return 'growth-neutral';
};

// 导航到插件详情页
const navigateToPlugin = (pluginId: string) => {
  // 暂时只是控制台输出,后续实现路由跳转
  console.log('Navigate to plugin:', pluginId);
  // window.location.href = `/zh/plugins/${pluginId}.html`;
};
</script>

<style scoped>
.ranking-tabs {
  margin: 3rem 0;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

/* 排行榜标题 */
.ranking-header {
  text-align: center;
  margin-bottom: 2rem;
}

.ranking-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem 0;
}

.ranking-subtitle {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* 标签页导航 */
.tabs-nav {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  overflow-x: auto;
}

.tab-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-button:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.tab-button.active {
  background: var(--vp-c-brand);
  color: white;
}

.tab-icon {
  font-size: 1.2rem;
}

/* 标签页内容 */
.tabs-content {
  position: relative;
  min-height: 400px;
}

.tab-panel {
  width: 100%;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--vp-c-text-3);
}

/* 排行榜列表 */
.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ranking-item:hover {
  transform: translateX(4px);
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.ranking-item.top-three {
  background: linear-gradient(135deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
  border-width: 2px;
}

/* 排名徽章 */
.rank-badge {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.1rem;
}

.rank-badge.rank-1,
.rank-badge.rank-2,
.rank-badge.rank-3 {
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand));
  color: white;
}

.rank-badge .rank-medal {
  font-size: 1.8rem;
}

.rank-badge .rank-number {
  color: var(--vp-c-text-2);
  font-size: 1.2rem;
}

/* 插件信息 */
.plugin-info {
  flex: 1;
  min-width: 0;
}

.plugin-name-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.plugin-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.plugin-category {
  flex-shrink: 0;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  border-radius: 4px;
}

.plugin-author {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 统计数据 */
.plugin-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.stat-icon {
  font-size: 1rem;
}

.stat-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

/* 增长指标 */
.growth-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.growth-indicator.growth-up {
  background: var(--vp-c-success-soft);
  color: var(--vp-c-success);
}

.growth-indicator.growth-down {
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger);
}

.growth-indicator.growth-neutral {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
}

.growth-icon {
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ranking-tabs {
    padding: 1.5rem 1rem;
  }

  .ranking-title {
    font-size: 1.6rem;
  }

  .ranking-subtitle {
    font-size: 0.9rem;
  }

  .tabs-nav {
    gap: 0.25rem;
    padding: 0.25rem;
  }

  .tab-button {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .tab-icon {
    font-size: 1rem;
  }

  .tab-label {
    display: none;
  }

  .ranking-item {
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1rem;
  }

  .rank-badge {
    width: 40px;
    height: 40px;
  }

  .rank-badge .rank-medal {
    font-size: 1.5rem;
  }

  .plugin-stats {
    width: 100%;
    justify-content: space-between;
  }

  .plugin-name {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .plugin-name-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .stat-item {
    padding: 0.4rem 0.6rem;
  }

  .stat-value {
    font-size: 0.9rem;
  }
}
</style>
