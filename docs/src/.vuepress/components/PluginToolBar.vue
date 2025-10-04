<template>
  <div class="plugin-toolbar">
    <!-- 筛选器区域 -->
    <div class="toolbar-section filters-section">
      <div class="section-label">筛选</div>
      
      <!-- 分类筛选 -->
      <div class="filter-group">
        <label class="filter-label">分类</label>
        <select v-model="localFilters.category" class="filter-select" @change="emitFiltersChange">
          <option value="">全部分类</option>
          <option value="productivity">生产力</option>
          <option value="note-taking">笔记</option>
          <option value="visualization">可视化</option>
          <option value="automation">自动化</option>
          <option value="integration">集成</option>
          <option value="other">其他</option>
        </select>
      </div>

      <!-- 下载量范围筛选 -->
      <div class="filter-group">
        <label class="filter-label">下载量</label>
        <select v-model="localFilters.downloadRange" class="filter-select" @change="emitFiltersChange">
          <option value="">不限</option>
          <option value="0-1000">0 - 1K</option>
          <option value="1000-10000">1K - 10K</option>
          <option value="10000-100000">10K - 100K</option>
          <option value="100000-1000000">100K - 1M</option>
          <option value="1000000+">1M+</option>
        </select>
      </div>

      <!-- 更新时间筛选 -->
      <div class="filter-group">
        <label class="filter-label">更新时间</label>
        <select v-model="localFilters.updateTime" class="filter-select" @change="emitFiltersChange">
          <option value="">不限</option>
          <option value="7">最近 7 天</option>
          <option value="30">最近 30 天</option>
          <option value="90">最近 90 天</option>
          <option value="180">最近 180 天</option>
          <option value="365">最近一年</option>
        </select>
      </div>

      <!-- 清除筛选按钮 -->
      <button 
        v-if="hasActiveFilters" 
        class="clear-filters-btn"
        @click="clearFilters"
        title="清除所有筛选条件"
      >
        <span class="btn-icon">✕</span>
        <span class="btn-text">清除筛选</span>
      </button>
    </div>

    <!-- 排序和视图区域 -->
    <div class="toolbar-section sort-view-section">
      <!-- 排序选择器 -->
      <div class="sort-group">
        <label class="sort-label">排序</label>
        <select v-model="localSort" class="sort-select" @change="emitSortChange">
          <option value="downloads-desc">下载量：从高到低</option>
          <option value="downloads-asc">下载量：从低到高</option>
          <option value="updated-desc">更新时间：最新优先</option>
          <option value="updated-asc">更新时间：最旧优先</option>
          <option value="name-asc">名称：A-Z</option>
          <option value="name-desc">名称：Z-A</option>
        </select>
      </div>

      <!-- 视图模式切换 -->
      <div class="view-mode-group">
        <label class="view-label">视图</label>
        <div class="view-buttons">
          <button
            class="view-btn"
            :class="{ active: localViewMode === 'card' }"
            @click="changeViewMode('card')"
            title="卡片视图"
          >
            <span class="view-icon">▦</span>
          </button>
          <button
            class="view-btn"
            :class="{ active: localViewMode === 'list' }"
            @click="changeViewMode('list')"
            title="列表视图"
          >
            <span class="view-icon">☰</span>
          </button>
          <button
            class="view-btn"
            :class="{ active: localViewMode === 'compact' }"
            @click="changeViewMode('compact')"
            title="紧凑视图"
          >
            <span class="view-icon">≡</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 结果统计 -->
    <div class="toolbar-results">
      <span class="results-text">
        显示 <strong>{{ resultCount }}</strong> 个插件
        <span v-if="hasActiveFilters || hasSearch" class="results-filtered">
          （已筛选）
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// Props 定义
interface FilterOptions {
  category?: string;
  downloadRange?: string;
  updateTime?: string;
}

type SortOption = 'downloads-desc' | 'downloads-asc' | 'updated-desc' | 'updated-asc' | 'name-asc' | 'name-desc';
type ViewMode = 'card' | 'list' | 'compact';

interface Props {
  filters?: FilterOptions;
  sort?: SortOption;
  viewMode?: ViewMode;
  resultCount?: number;
  hasSearch?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  filters: () => ({}),
  sort: 'downloads-desc',
  viewMode: 'card',
  resultCount: 0,
  hasSearch: false
});

// Emits 定义
const emit = defineEmits<{
  'update:filters': [filters: FilterOptions];
  'update:sort': [sort: SortOption];
  'update:viewMode': [viewMode: ViewMode];
}>();

// 本地状态
const localFilters = ref<FilterOptions>({
  category: props.filters.category || '',
  downloadRange: props.filters.downloadRange || '',
  updateTime: props.filters.updateTime || ''
});

const localSort = ref<SortOption>(props.sort);
const localViewMode = ref<ViewMode>(props.viewMode);

// 计算是否有激活的筛选条件
const hasActiveFilters = computed(() => {
  return !!(
    localFilters.value.category ||
    localFilters.value.downloadRange ||
    localFilters.value.updateTime
  );
});

// 监听 props 变化
watch(() => props.filters, (newFilters) => {
  localFilters.value = {
    category: newFilters.category || '',
    downloadRange: newFilters.downloadRange || '',
    updateTime: newFilters.updateTime || ''
  };
}, { deep: true });

watch(() => props.sort, (newSort) => {
  localSort.value = newSort;
});

watch(() => props.viewMode, (newViewMode) => {
  localViewMode.value = newViewMode;
});

// 方法
const emitFiltersChange = () => {
  emit('update:filters', {
    category: localFilters.value.category || undefined,
    downloadRange: localFilters.value.downloadRange || undefined,
    updateTime: localFilters.value.updateTime || undefined
  });
};

const emitSortChange = () => {
  emit('update:sort', localSort.value);
};

const changeViewMode = (mode: ViewMode) => {
  localViewMode.value = mode;
  emit('update:viewMode', mode);
};

const clearFilters = () => {
  localFilters.value = {
    category: '',
    downloadRange: '',
    updateTime: ''
  };
  emitFiltersChange();
};
</script>

<style scoped>
/* ========== 工具栏容器 ========== */
.plugin-toolbar {
  background: linear-gradient(to bottom, #ffffff, #fafbfc);
  border: 2px solid #e1e4e8;
  border-radius: 16px;
  padding: 0;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

/* ========== 工具栏区域 ========== */
.toolbar-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1.25rem 1.5rem;
  background: white;
  border-bottom: 2px solid #e1e4e8;
  position: relative;
}

.toolbar-section:last-of-type {
  border-bottom: none;
}

.toolbar-section::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, var(--vp-c-brand), var(--vp-c-brand-light));
}

.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-right: 0.75rem;
  padding: 0.4rem 0.8rem;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
}

/* ========== 筛选器组 ========== */
.filters-section {
  position: relative;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: #f6f8fa;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #e1e4e8;
}

.filter-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-select {
  padding: 0.6rem 0.9rem;
  border: 2px solid #d1d5da;
  border-radius: 8px;
  background: white;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 150px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.filter-select:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.filter-select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 4px rgba(var(--vp-c-brand-rgb), 0.15);
}

/* 清除筛选按钮 */
.clear-filters-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  background: #fff5f5;
  border: 2px solid #feb2b2;
  border-radius: 8px;
  color: #c53030;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.clear-filters-btn:hover {
  background: #fed7d7;
  border-color: #fc8181;
  color: #9b2c2c;
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(197, 48, 48, 0.2);
}

.btn-icon {
  font-size: 1rem;
  line-height: 1;
}

.btn-text {
  font-weight: 500;
}

/* ========== 排序和视图区域 ========== */
.sort-view-section {
  justify-content: space-between;
}

/* 排序组 */
.sort-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: #f6f8fa;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #e1e4e8;
}

.sort-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sort-select {
  padding: 0.6rem 0.9rem;
  border: 2px solid #d1d5da;
  border-radius: 8px;
  background: white;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.sort-select:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.sort-select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 4px rgba(var(--vp-c-brand-rgb), 0.15);
}

/* 视图模式组 */
.view-mode-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: #f6f8fa;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #e1e4e8;
}

.view-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.view-buttons {
  display: flex;
  gap: 0.5rem;
  background: white;
  padding: 0.4rem;
  border-radius: 8px;
  border: 2px solid #d1d5da;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.view-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: transparent;
  border: 2px solid transparent;
  border-radius: 6px;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn:hover {
  background: #f6f8fa;
  color: var(--vp-c-text-1);
  border-color: #d1d5da;
}

.view-btn.active {
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-dark));
  color: white;
  border-color: var(--vp-c-brand);
  box-shadow: 0 3px 8px rgba(var(--vp-c-brand-rgb), 0.4);
  transform: scale(1.05);
}

.view-icon {
  font-size: 1.2rem;
  line-height: 1;
}

/* ========== 结果统计 ========== */
.toolbar-results {
  padding: 1rem 1.5rem;
  background: linear-gradient(to right, #f0f9ff, #e0f2fe);
  border-top: 2px solid #bae6fd;
}

.results-text {
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.results-text strong {
  color: var(--vp-c-brand);
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.2rem 0.5rem;
  background: white;
  border-radius: 6px;
  border: 2px solid var(--vp-c-brand-light);
}

.results-filtered {
  color: #0369a1;
  font-size: 0.85rem;
  font-weight: 600;
  margin-left: 0.5rem;
  padding: 0.2rem 0.6rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #7dd3fc;
}

/* ========== 响应式设计 ========== */
@media (max-width: 768px) {
  .plugin-toolbar {
    padding: 1rem;
  }

  .toolbar-section {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .section-label {
    margin-bottom: 0.5rem;
  }

  .filter-group,
  .sort-group,
  .view-mode-group {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .filter-label,
  .sort-label,
  .view-label {
    font-size: 0.8rem;
  }

  .filter-select,
  .sort-select {
    width: 100%;
    min-width: auto;
  }

  .clear-filters-btn {
    margin-left: 0;
    justify-content: center;
  }

  .sort-view-section {
    flex-direction: column;
  }

  .view-buttons {
    width: 100%;
    justify-content: space-around;
  }

  .view-btn {
    flex: 1;
  }

  .toolbar-results {
    text-align: center;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .filters-section {
    flex-wrap: wrap;
  }

  .filter-select,
  .sort-select {
    min-width: 120px;
  }
}

/* ========== 深色模式 ========== */
@media (prefers-color-scheme: dark) {
  .plugin-toolbar {
    background: var(--vp-c-bg-soft);
    border-color: var(--vp-c-divider);
  }

  .filter-select,
  .sort-select {
    background: var(--vp-c-bg);
    border-color: var(--vp-c-divider);
  }

  .view-buttons {
    background: var(--vp-c-bg);
  }

  .view-btn:hover {
    background: var(--vp-c-bg-mute);
  }
}
</style>
