<template>
  <div class="plugin-detail-container">
    <div class="plugin-detail-main">
      <!-- 插件头部 -->
      <div class="plugin-header">
        <div class="plugin-icon">
          <i :class="`iconfont icon-${icon}`"></i>
        </div>
        <div class="plugin-title-section">
          <h1 class="plugin-title">{{ name }}</h1>
          <p class="plugin-tagline">{{ description }}</p>
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
          <span class="meta-value category-badge">{{ category }}</span>
        </div>
      </div>

      <!-- 快速操作按钮 -->
      <div class="plugin-actions">
        <a :href="`https://github.com/${repo}`" target="_blank" class="action-btn primary">
          <i class="iconfont icon-github"></i>
          在 GitHub 上查看
        </a>
        <a href="/zh/plugins/" class="action-btn secondary">
          <i class="iconfont icon-back"></i>
          返回插件列表
        </a>
      </div>

      <!-- 插件内容插槽 -->
      <slot></slot>
    </div>

    <!-- 侧边栏 -->
    <aside class="plugin-detail-sidebar">
      <!-- 广告位占位 -->
      <div class="sidebar-ad">
        <PluginAd position="detail-sidebar" />
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PluginAd from './PluginAd.vue';

// Props 定义
interface Props {
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
  display: flex;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
}

/* 主内容区 */
.plugin-detail-main {
  flex: 1;
  min-width: 0;
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
  margin-bottom: 30px;
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

/* 侧边栏 */
.plugin-detail-sidebar {
  width: 300px;
  flex-shrink: 0;
}

.sidebar-ad {
  position: sticky;
  top: 20px;
}

/* 响应式 */
@media (max-width: 1024px) {
  .plugin-detail-container {
    flex-direction: column;
  }
  
  .plugin-detail-sidebar {
    width: 100%;
  }
}

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

