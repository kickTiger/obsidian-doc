<template>
  <div class="plugin-showcase">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>正在加载插件数据...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-container">
      <p class="error-message">{{ error }}</p>
      <button @click="reload" class="retry-button">重试</button>
    </div>

    <!-- 主内容 -->
    <div v-else class="plugin-content">
      <!-- 顶部区域 -->
      <div class="top-section">
        <!-- Hero 横幅 -->
        <div class="hero-banner">
          <div class="hero-content">
            <h1 class="hero-title">Obsidian 插件市场</h1>
            <p class="hero-subtitle">探索 1,779+ 个优秀社区插件，提升你的笔记体验</p>
          </div>
        </div>

        <!-- 统计面板 -->
        <div class="stats-section">
          <StatsPanel :stats="pluginStats" :animated="true" />
        </div>

        <!-- 搜索栏 -->
        <div class="search-section">
          <div class="search-wrapper">
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              placeholder="搜索插件名称、描述或作者..."
              @input="handleSearch"
            />
            <button class="search-button">
              <span class="search-icon">🔍</span>
              搜索
            </button>
          </div>
        </div>
      </div>

      <!-- 主体内容区 - 左右分栏 -->
      <div class="main-layout">
        <!-- 左侧筛选栏 -->
        <aside class="sidebar-filters">
          <div class="filter-header">
            <h3>筛选条件</h3>
            <button v-if="hasActiveFilters" @click="clearFilters" class="clear-all">
              清除全部
            </button>
          </div>

          <!-- 分类筛选 -->
          <div class="filter-block">
            <h4 class="filter-title">分类</h4>
            <div class="filter-options">
              <label class="filter-option">
                <input type="radio" v-model="filters.category" value="" />
                <span>全部分类</span>
              </label>
              <label class="filter-option">
                <input type="radio" v-model="filters.category" value="productivity" />
                <span>生产力</span>
              </label>
              <label class="filter-option">
                <input type="radio" v-model="filters.category" value="note-taking" />
                <span>笔记</span>
              </label>
              <label class="filter-option">
                <input type="radio" v-model="filters.category" value="visualization" />
                <span>可视化</span>
              </label>
              <label class="filter-option">
                <input type="radio" v-model="filters.category" value="automation" />
                <span>自动化</span>
              </label>
              <label class="filter-option">
                <input type="radio" v-model="filters.category" value="integration" />
                <span>集成</span>
              </label>
            </div>
          </div>

          <!-- 下载量筛选 -->
          <div class="filter-block">
            <h4 class="filter-title">下载量</h4>
            <div class="filter-options">
              <label class="filter-option">
                <input type="radio" v-model="filters.downloadRange" value="" />
                <span>不限</span>
              </label>
              <label class="filter-option">
                <input type="radio" v-model="filters.downloadRange" value="1000000+" />
                <span>100万+</span>
              </label>
              <label class="filter-option">
                <input type="radio" v-model="filters.downloadRange" value="100000-1000000" />
                <span>10万 - 100万</span>
              </label>
              <label class="filter-option">
                <input type="radio" v-model="filters.downloadRange" value="10000-100000" />
                <span>1万 - 10万</span>
              </label>
              <label class="filter-option">
                <input type="radio" v-model="filters.downloadRange" value="1000-10000" />
                <span>1千 - 1万</span>
              </label>
            </div>
          </div>

          <!-- 更新时间筛选 -->
          <div class="filter-block">
            <h4 class="filter-title">更新时间</h4>
            <div class="filter-options">
              <label class="filter-option">
                <input type="radio" v-model="filters.updateTime" value="" />
                <span>不限</span>
              </label>
              <label class="filter-option">
                <input type="radio" v-model="filters.updateTime" value="7" />
                <span>最近 7 天</span>
              </label>
              <label class="filter-option">
                <input type="radio" v-model="filters.updateTime" value="30" />
                <span>最近 30 天</span>
              </label>
              <label class="filter-option">
                <input type="radio" v-model="filters.updateTime" value="90" />
                <span>最近 90 天</span>
              </label>
            </div>
          </div>
        </aside>

        <!-- 右侧内容区 -->
        <main class="content-area">
          <!-- 工具栏 -->
          <div class="toolbar">
            <div class="toolbar-left">
              <span class="result-count">找到 <strong>{{ filteredPlugins.length }}</strong> 个插件</span>
            </div>
            <div class="toolbar-right">
              <!-- 排序 -->
              <select v-model="sortOption" class="sort-select">
                <option value="downloads-desc">下载量从高到低</option>
                <option value="downloads-asc">下载量从低到高</option>
                <option value="updated-desc">最新更新</option>
                <option value="updated-asc">最早更新</option>
                <option value="name-asc">名称 A-Z</option>
                <option value="name-desc">名称 Z-A</option>
              </select>

              <!-- 视图切换 -->
              <div class="view-switcher">
                <button 
                  :class="['view-btn', { active: viewMode === 'card' }]"
                  @click="viewMode = 'card'"
                  title="卡片视图"
                >
                  <span>⊞</span>
                </button>
                <button 
                  :class="['view-btn', { active: viewMode === 'list' }]"
                  @click="viewMode = 'list'"
                  title="列表视图"
                >
                  <span>☰</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 插件列表 -->
          <div class="plugin-list-section">
          <div v-if="filteredPlugins.length === 0" class="empty-results">
            <div class="empty-icon">🔍</div>
            <p class="empty-title">没有找到匹配的插件</p>
            <p class="empty-hint">试试调整筛选条件或搜索关键词</p>
          </div>
          
          <!-- 卡片视图 -->
          <div v-else-if="viewMode === 'card'" class="plugin-list plugin-list-card">
            <div 
              v-for="item in filteredPlugins" 
              :key="item.id" 
              class="plugin-item plugin-card"
            >
              <!-- 左侧：下载量徽章 -->
              <div class="plugin-badge">
                <div class="badge-icon">⬇️</div>
                <div class="badge-count">{{ formatNumber(item.downloads) }}</div>
              </div>

              <!-- 中间：插件信息 -->
              <div class="plugin-info">
                <div class="plugin-header">
                  <h3 class="plugin-name">{{ item.name }}</h3>
                  <span v-if="item.category" class="plugin-tag">{{ item.category }}</span>
                </div>
                <p class="plugin-description">{{ item.description }}</p>
                <div class="plugin-meta">
                  <span class="meta-item">
                    <span class="meta-icon">👤</span>
                    {{ item.author }}
                  </span>
                  <span class="meta-divider">•</span>
                  <span class="meta-item">
                    <span class="meta-icon">📅</span>
                    {{ formatDate(item.updated) }}
                  </span>
                  <span v-if="item.latestVersion" class="meta-divider">•</span>
                  <span v-if="item.latestVersion" class="meta-item">
                    <span class="meta-icon">🏷️</span>
                    v{{ item.latestVersion }}
                  </span>
                </div>
              </div>

              <!-- 右侧：操作按钮 -->
              <div class="plugin-actions">
                <button class="action-button primary">查看详情</button>
              </div>
            </div>
          </div>

          <!-- 列表视图 -->
          <div v-else-if="viewMode === 'list'" class="plugin-list plugin-list-table">
            <table class="plugin-table">
              <thead>
                <tr>
                  <th class="col-name">插件名称</th>
                  <th class="col-author">作者</th>
                  <th class="col-downloads">下载量</th>
                  <th class="col-updated">更新时间</th>
                  <th class="col-version">版本</th>
                  <th class="col-actions">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="item in filteredPlugins" 
                  :key="item.id"
                  class="plugin-row"
                >
                  <td class="col-name">
                    <div class="name-cell">
                      <strong>{{ item.name }}</strong>
                      <span v-if="item.category" class="plugin-tag-small">{{ item.category }}</span>
                    </div>
                    <div class="description-cell">{{ item.description }}</div>
                  </td>
                  <td class="col-author">{{ item.author }}</td>
                  <td class="col-downloads">
                    <strong>{{ formatNumber(item.downloads) }}</strong>
                  </td>
                  <td class="col-updated">{{ formatDate(item.updated) }}</td>
                  <td class="col-version">
                    <span v-if="item.latestVersion" class="version-badge">v{{ item.latestVersion }}</span>
                    <span v-else class="text-muted">-</span>
                  </td>
                  <td class="col-actions">
                    <button class="action-button-small">查看</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 紧凑视图 -->
          <div v-else-if="viewMode === 'compact'" class="plugin-list plugin-list-compact">
            <div
              v-for="item in filteredPlugins"
              :key="item.id"
              class="plugin-compact-item"
            >
              <div class="compact-main">
                <span class="compact-name">{{ item.name }}</span>
                <span class="compact-separator">•</span>
                <span class="compact-author">{{ item.author }}</span>
                <span class="compact-separator">•</span>
                <span class="compact-downloads">⬇️ {{ formatNumber(item.downloads) }}</span>
              </div>
              <p class="compact-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import StatsPanel from './StatsPanel.vue';
import RankingTabs from './RankingTabs.vue';

// 数据类型定义
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

interface PluginStats {
  totalPlugins: number;
  totalDownloads: number;
  weeklyNewPlugins: number;
  monthlyNewPlugins: number;
  topByDownloads: Plugin[];
  topByWeekly: Plugin[];
  topByMonthly: Plugin[];
  lastUpdated: number;
}

interface FilterOptions {
  category?: string;
  downloadRange?: string;
  updateTime?: string;
}

type SortOption = 'downloads-desc' | 'downloads-asc' | 'updated-desc' | 'updated-asc' | 'name-asc' | 'name-desc';
type ViewMode = 'card' | 'list' | 'compact';

// 响应式数据
const plugins = ref<Plugin[]>([]);
const pluginStats = ref<PluginStats | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const searchQuery = ref('');
const filters = ref<FilterOptions>({});
const sortOption = ref<SortOption>('downloads-desc');
const viewMode = ref<ViewMode>('card');
let searchTimeout: NodeJS.Timeout | null = null;

// 过滤后的插件列表
const filteredPlugins = computed(() => {
  let result = [...plugins.value];
  
  // 1. 搜索过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(plugin => {
      return (
        plugin.name.toLowerCase().includes(query) ||
        plugin.description.toLowerCase().includes(query) ||
        plugin.author.toLowerCase().includes(query) ||
        (plugin.category && plugin.category.toLowerCase().includes(query))
      );
    });
  }
  
  // 2. 分类筛选
  if (filters.value.category) {
    result = result.filter(plugin => plugin.category === filters.value.category);
  }
  
  // 3. 下载量范围筛选
  if (filters.value.downloadRange) {
    const range = filters.value.downloadRange;
    if (range === '1000000+') {
      result = result.filter(plugin => plugin.downloads >= 1000000);
    } else {
      const [min, max] = range.split('-').map(Number);
      result = result.filter(plugin => plugin.downloads >= min && plugin.downloads < max);
    }
  }
  
  // 4. 更新时间筛选
  if (filters.value.updateTime) {
    const days = parseInt(filters.value.updateTime);
    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);
    result = result.filter(plugin => plugin.updated >= cutoffTime);
  }
  
  // 5. 排序
  result.sort((a, b) => {
    switch (sortOption.value) {
      case 'downloads-desc':
        return b.downloads - a.downloads;
      case 'downloads-asc':
        return a.downloads - b.downloads;
      case 'updated-desc':
        return b.updated - a.updated;
      case 'updated-asc':
        return a.updated - b.updated;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
  
  return result;
});

// 加载数据
const loadData = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    // 加载插件列表数据
    const pluginsResponse = await fetch('/data/plugins-sample.json');
    if (!pluginsResponse.ok) {
      throw new Error('加载插件数据失败');
    }
    plugins.value = await pluginsResponse.json();
    
    // 加载统计数据
    const statsResponse = await fetch('/data/plugin-stats-sample.json');
    if (!statsResponse.ok) {
      throw new Error('加载统计数据失败');
    }
    pluginStats.value = await statsResponse.json();
    
    loading.value = false;
  } catch (err) {
    error.value = err instanceof Error ? err.message : '加载数据时发生错误';
    loading.value = false;
    console.error('数据加载错误:', err);
  }
};

// 重新加载
const reload = () => {
  loadData();
};

// 搜索处理(防抖)
const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  // 防抖 300ms
  searchTimeout = setTimeout(() => {
    // 搜索逻辑已在 computed 中处理
  }, 300);
};

// 清除搜索
const clearSearch = () => {
  searchQuery.value = '';
};

// 计算是否有激活的筛选条件
const hasActiveFilters = computed(() => {
  return !!(
    filters.value.category ||
    filters.value.downloadRange ||
    filters.value.updateTime
  );
});

// 清除筛选
const clearFilters = () => {
  filters.value = {
    category: '',
    downloadRange: '',
    updateTime: ''
  };
};

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

// 格式化日期
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  });
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
/* ========== 全局容器 ========== */
.plugin-showcase {
  width: 100%;
  margin: 0;
  padding: 0;
  background: #f5f7fa;
  min-height: 100vh;
}

.plugin-content {
  width: 100%;
}

/* ========== 顶部区域 ========== */
.top-section {
  background: white;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 20px;
}

/* Hero 横幅 */
.hero-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  text-align: center;
}

.hero-content {
  max-width: 1400px;
  margin: 0 auto;
}

.hero-title {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin: 0 0 12px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  font-weight: 400;
}

/* 统计区域 */
.stats-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
}

/* 搜索区域 */
.search-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 30px;
}

.search-wrapper {
  display: flex;
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  height: 48px;
  padding: 0 20px;
  border: 2px solid #dcdfe6;
  border-radius: 8px;
  font-size: 14px;
  color: #303133;
  background: white;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-input::placeholder {
  color: #909399;
}

.search-button {
  height: 48px;
  padding: 0 32px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-button:hover {
  background: #5568d3;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.search-icon {
  font-size: 16px;
}

/* ========== 主体布局 ========== */
.main-layout {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 40px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* ========== 左侧筛选栏 ========== */
.sidebar-filters {
  width: 240px;
  flex-shrink: 0;
  background: white;
  border-radius: 12px;
  border: 1px solid #e4e7ed;
  padding: 20px;
  position: sticky;
  top: 20px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f2f5;
}

.filter-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #303133;
  margin: 0;
}

.clear-all {
  font-size: 12px;
  color: #f56c6c;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.clear-all:hover {
  background: #fef0f0;
}

.filter-block {
  margin-bottom: 24px;
}

.filter-block:last-child {
  margin-bottom: 0;
}

.filter-title {
  font-size: 14px;
  font-weight: 600;
  color: #606266;
  margin: 0 0 12px 0;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-option:hover {
  background: #f5f7fa;
}

.filter-option input[type="radio"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #667eea;
}

.filter-option span {
  font-size: 13px;
  color: #606266;
  user-select: none;
}

.filter-option input[type="radio"]:checked + span {
  color: #667eea;
  font-weight: 600;
}

/* ========== 右侧内容区 ========== */
.content-area {
  flex: 1;
  min-width: 0;
}

/* 工具栏 */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 12px;
  border: 1px solid #e4e7ed;
  padding: 16px 20px;
  margin-bottom: 20px;
}

.toolbar-left {
  display: flex;
  align-items: center;
}

.result-count {
  font-size: 14px;
  color: #606266;
}

.result-count strong {
  color: #667eea;
  font-weight: 700;
  font-size: 16px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sort-select {
  height: 36px;
  padding: 0 32px 0 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 13px;
  color: #606266;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.sort-select:hover {
  border-color: #c0c4cc;
}

.sort-select:focus {
  outline: none;
  border-color: #667eea;
}

.view-switcher {
  display: flex;
  gap: 4px;
  background: #f5f7fa;
  padding: 4px;
  border-radius: 8px;
}

.view-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #909399;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 18px;
}

.view-btn:hover {
  background: white;
  color: #606266;
}

.view-btn.active {
  background: #667eea;
  color: white;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
}

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 错误状态 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
}

.error-message {
  color: var(--vp-c-danger);
  font-size: 1.1rem;
}

.retry-button {
  padding: 0.5rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.retry-button:hover {
  opacity: 0.9;
}

/* ========== Hero 区域 ========== */
.hero-section {
  width: 100%;
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-dark) 100%);
  padding: 4rem 2rem;
  margin: 0;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 500;
}

/* ========== 统计面板包装器 ========== */
.stats-wrapper {
  width: 100%;
  background: var(--vp-c-bg-soft);
  padding: 3rem 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ========== 主容器 ========== */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* ========== 搜索筛选区域 ========== */
.search-filter-section {
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, white, #fafbfc);
  border: 3px solid #e1e4e8;
  border-radius: 16px;
  padding: 1.2rem 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06);
}

.search-box:focus-within {
  border-color: var(--vp-c-brand);
  box-shadow: 0 6px 20px rgba(var(--vp-c-brand-rgb), 0.25), 0 0 0 4px rgba(var(--vp-c-brand-rgb), 0.1);
  transform: translateY(-2px);
}

.search-icon {
  font-size: 1.4rem;
  margin-right: 1rem;
  color: var(--vp-c-brand);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  outline: none;
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
  font-weight: 400;
}

.clear-button {
  padding: 0.4rem 0.7rem;
  background: #fee;
  border: 2px solid #fcc;
  border-radius: 8px;
  color: #c33;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1;
  transition: all 0.2s ease;
}

.clear-button:hover {
  background: #fcc;
  border-color: #faa;
  color: #a11;
  transform: scale(1.1);
}

.search-results-info {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.search-results-info strong {
  color: var(--vp-c-brand);
  font-weight: 600;
}

/* 空状态 */
.empty-results {
  text-align: center;
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 3px dashed #dee2e6;
  border-radius: 16px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  opacity: 0.4;
  filter: grayscale(0.5);
}

.empty-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.75rem 0;
}

.empty-hint {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin: 0;
  font-weight: 500;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.page-description {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
}

/* ========== 插件列表区域 ========== */
.plugin-list-section {
  width: 100%;
}

/* 空状态 */
.empty-results {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e4e7ed;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 8px 0;
}

.empty-hint {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

/* 卡片视图 */
.plugin-list-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

/* 卡片项 */
.plugin-card {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.plugin-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

/* 徽章 */
.plugin-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  align-self: flex-start;
}

.badge-icon {
  font-size: 18px;
}

.badge-count {
  font-size: 14px;
  font-weight: 700;
  color: white;
}

/* 插件信息 */
.plugin-info {
  flex: 1;
}

.plugin-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.plugin-name {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  line-height: 1.4;
}

.plugin-card:hover .plugin-name {
  color: #667eea;
}

.plugin-tag {
  font-size: 11px;
  padding: 4px 8px;
  background: #f0f2f5;
  color: #909399;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.plugin-description {
  font-size: 13px;
  color: #606266;
  line-height: 1.6;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.plugin-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #909399;
  margin-top: auto;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-icon {
  font-size: 14px;
}

.meta-divider {
  color: #dcdfe6;
}

/* 操作按钮 */
.plugin-actions {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f2f5;
}

.action-button {
  width: 100%;
  height: 36px;
  padding: 0 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button:hover {
  background: #5568d3;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.action-button.primary {
  background: #667eea;
}

/* ========== 列表视图 ========== */
.plugin-list-table {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  overflow: hidden;
}

.plugin-table {
  width: 100%;
  border-collapse: collapse;
}

.plugin-table thead {
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}

.plugin-table th {
  padding: 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #606266;
}

.plugin-table td {
  padding: 16px;
  border-bottom: 1px solid #f0f2f5;
  color: #303133;
  font-size: 13px;
}

.plugin-row {
  transition: all 0.2s;
  cursor: pointer;
}

.plugin-row:hover {
  background: #f5f7fa;
}

.plugin-row:last-child td {
  border-bottom: none;
}

.col-name {
  width: 40%;
}

.col-author {
  width: 15%;
}

.col-downloads {
  width: 12%;
}

.col-updated {
  width: 15%;
}

.col-version {
  width: 10%;
}

.col-actions {
  width: 8%;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  font-weight: 600;
}

.description-cell {
  font-size: 12px;
  color: #909399;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.plugin-tag-small {
  font-size: 11px;
  padding: 2px 6px;
  background: #f0f2f5;
  color: #909399;
  border-radius: 4px;
  font-weight: 600;
}

.version-badge {
  font-size: 12px;
  padding: 4px 8px;
  background: #f0f2f5;
  border-radius: 4px;
  font-weight: 500;
  color: #606266;
}

.text-muted {
  color: #c0c4cc;
}

.action-button-small {
  padding: 6px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button-small:hover {
  background: #5568d3;
}

/* ========== 响应式设计 ========== */
@media (max-width: 768px) {
  .hero-banner {
    padding: 30px 16px;
  }

  .hero-title {
    font-size: 24px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .stats-section {
    padding: 20px 16px;
  }

  .search-section {
    padding: 0 16px 20px;
  }

  .search-wrapper {
    flex-direction: column;
  }

  .search-button {
    width: 100%;
    justify-content: center;
  }

  .main-layout {
    flex-direction: column;
    padding: 0 16px 30px;
  }

  .sidebar-filters {
    width: 100%;
    position: static;
    margin-bottom: 20px;
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .toolbar-right {
    justify-content: space-between;
  }

  .plugin-list-card {
    grid-template-columns: 1fr;
  }

  .plugin-list-table {
    overflow-x: auto;
  }

  .plugin-table {
    min-width: 700px;
  }
}

/* ========== 深色模式 ========== */
/* 深色模式适配 */
html.dark .plugin-showcase {
  background: #1a1a1a;
}

html.dark .top-section,
html.dark .sidebar-filters,
html.dark .toolbar,
html.dark .plugin-card,
html.dark .plugin-list-table,
html.dark .empty-results {
  background: #2d2d2d;
  border-color: #404040;
}

html.dark .hero-title,
html.dark .filter-header h3,
html.dark .filter-title,
html.dark .plugin-name,
html.dark .result-count,
html.dark .name-cell {
  color: #e0e0e0;
}

html.dark .hero-subtitle,
html.dark .filter-option span,
html.dark .plugin-description,
html.dark .meta-item,
html.dark .description-cell {
  color: #b0b0b0;
}

html.dark .plugin-table thead {
  background: #252525;
}

html.dark .plugin-row:hover {
  background: #353535;
}

html.dark .search-input,
html.dark .sort-select {
  background: #2d2d2d;
  border-color: #404040;
  color: #e0e0e0;
}

html.dark .view-switcher {
  background: #252525;
}
</style>

<style>
/* 非scoped样式 - 用于覆盖父容器的宽度限制 */
/* 插件展示页面的父容器全宽设置 */
.plugin-showcase-container .page,
.plugin-showcase-container main {
  padding-left: 0 !important;
  padding-right: 0 !important;
  max-width: 100% !important;
}

.plugin-showcase-container .theme-hope-content {
  max-width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin: 0 !important;
}

.plugin-showcase-container .theme-default-content,
.plugin-showcase-container .vp-page {
  max-width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
