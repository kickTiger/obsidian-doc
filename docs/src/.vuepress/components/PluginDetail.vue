<template>
  <div class="plugin-detail-container">
    <div class="plugin-detail-main">
      <!-- 徽标：优先显示新增，其次显示更新 -->
      <div v-if="isNewlyAdded" class="new-badge">新增</div>
      <div v-else-if="isRecentlyUpdated" class="update-badge">更新</div>

      <!-- 插件头部 -->
      <div class="plugin-header">
        <div class="plugin-icon">
          <img src="/logo.svg" alt="plugin icon" />
        </div>
        <div class="plugin-title-section">
          <h1 class="plugin-title">{{ name }}</h1>
          <p class="plugin-tagline">{{ translatedDescription }}</p>
        </div>
      </div>

      <!-- 插件元信息 -->
      <div class="plugin-meta-bar">
        <div class="meta-item">
          <i class="iconfont icon-user"></i>
          <span class="meta-label">作者:</span>
          <span class="meta-value">{{ author }}</span>
        </div>
        <div class="meta-item">
          <i class="iconfont icon-download"></i>
          <span class="meta-label">下载量:</span>
          <span class="meta-value">{{ formatDownloads(downloads) }}</span>
        </div>
        <div class="meta-item">
          <i class="iconfont icon-calendar"></i>
          <span class="meta-label">更新时间:</span>
          <span class="meta-value">{{ formatDate(updated) }}</span>
        </div>
        <div class="meta-item">
          <i class="iconfont icon-tag"></i>
          <span class="meta-label">版本:</span>
          <span class="meta-value">v{{ version }}</span>
        </div>
        <div class="meta-item">
          <i class="iconfont icon-folder"></i>
          <span class="meta-label">分类:</span>
          <span class="meta-value category-badge">{{ categoryName }}</span>
        </div>
      </div>

      <!-- 快速操作按钮 -->
      <div class="plugin-actions">
        <a href="/zh/documentation/obsidian-plugins-download.html" class="action-btn primary">
          <i class="iconfont icon-download"></i>
          国内高速下载
        </a>
        <a :href="`obsidian://show-plugin?id=${id}`" class="action-btn secondary">
          <i class="iconfont icon-obsidian"></i>
          Obsidian安装
        </a>
        <a :href="`https://github.com/${repo}`" target="_blank" class="action-btn secondary">
          <i class="iconfont icon-github"></i>
          在 GitHub 上查看
        </a>
        <a href="/zh/plugins/" class="action-btn secondary">
          <i class="iconfont icon-back"></i>
          返回插件列表
        </a>
      </div>

      <!-- 横版广告位 -->
      <div class="horizontal-ad">
        <PluginAd position="detail-bottom" />
      </div>

      <!-- 插件内容插槽 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import PluginAd from './PluginAd.vue';

// Props 定义
interface Props {
  id: string;
  name: string;
  description: string;
  author: string;
  downloads: number;
  updated: number;
  repo: string;
  version: string;
  category: string;
  icon: string;
}

const props = defineProps<Props>();

// 分类ID到中文名称的映射（与搜索页面保持一致）
const CATEGORY_NAMES: Record<string, string> = {
  'note-taking': '笔记增强',
  'task-management': '任务管理',
  'data-processing': '数据处理',
  'visualization': '可视化',
  'drawing': '绘图',
  'calendar-time': '日历时间',
  'template': '模板',
  'automation': '自动化',
  'sync-backup': '备份同步',
  'editor-enhancement': '编辑增强',
  'appearance': '外观定制',
  'productivity': '效率工具',
  'integration': '集成',
  'other': '其他'
};

// 获取分类的中文名称
const getCategoryName = (categoryId: string): string => {
  return CATEGORY_NAMES[categoryId] || categoryId || '其他';
};

// 翻译数据
const translations = ref<Record<string, { description: string; notes?: string }>>({});

// 加载翻译数据
onMounted(async () => {
  try {
    const response = await fetch('/data/plugin-translations.json');
    if (response.ok) {
      translations.value = await response.json();
    }
  } catch (err) {
    console.log('翻译数据加载失败，使用原始描述');
  }
});

// 获取翻译后的描述
const translatedDescription = computed(() => {
  const translation = translations.value[props.id];
  return translation?.description || props.description;
});

// 获取分类的中文名称
const categoryName = computed(() => {
  return getCategoryName(props.category);
});

// 判断插件是否在一周内更新
const isRecentlyUpdated = computed(() => {
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7天前的时间戳
  return props.updated > oneWeekAgo;
});

// 判断插件是否在一个月内新增
const isNewlyAdded = computed(() => {
  const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30天前的时间戳
  return props.created > oneMonthAgo;
});

// 格式化下载量
const formatDownloads = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// 格式化日期
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toISOString().split('T')[0];
};
</script>

<style scoped>
/* 详情页容器 */
.plugin-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

/* 主内容区 */
.plugin-detail-main {
  width: 100%;
  position: relative; /* 为 NEW 徽标定位 */
}

/* 新增徽标（一个月内新增） */
.new-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 8px;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 6px rgba(255, 107, 107, 0.25);
  z-index: 100;
  animation: pulse 2s ease-in-out infinite;
}

/* 更新徽标（一周内更新） */
.update-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 8px;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 6px rgba(76, 175, 80, 0.25);
  z-index: 100;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(255, 107, 107, 0.6);
  }
}

/* 插件头部 */
.plugin-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.plugin-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  flex-shrink: 0;
  padding: 12px;
}

.plugin-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.plugin-title-section {
  flex: 1;
}

.plugin-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: white;
}

.plugin-tagline {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.6;
}

/* 元信息栏 */
.plugin-meta-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e4e7ed;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.meta-item i {
  color: #667eea;
  font-size: 16px;
}

.meta-label {
  color: #909399;
  font-weight: 500;
}

.meta-value {
  color: #303133;
  font-weight: 600;
}

.category-badge {
  background: linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%);
  color: #ff6b35;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 13px;
}

/* 操作按钮 */
.plugin-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.action-btn.secondary {
  background: white;
  color: #606266;
  border: 1px solid #dcdfe6;
}

.action-btn.secondary:hover {
  background: #f5f7fa;
  border-color: #c0c4cc;
}

/* 横版广告位 */
.horizontal-ad {
  width: 100%;
  margin-bottom: 30px;
}

/* 响应式 */

@media (max-width: 768px) {
  .plugin-header {
    flex-direction: column;
    text-align: center;
  }
  
  .plugin-icon {
    margin: 0 auto;
  }
  
  .plugin-meta-bar {
    flex-direction: column;
    gap: 12px;
  }
  
  .plugin-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>

