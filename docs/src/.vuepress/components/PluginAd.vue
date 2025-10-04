<template>
  <div v-if="adConfig" class="plugin-ad-container" :class="`ad-position-${position}`">
    <div class="plugin-ad-content" v-html="adConfig.content"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getAdByPosition } from '../config/ads';

// Props 定义
interface Props {
  position: 'detail-sidebar' | 'detail-bottom' | 'list-top';
}

const props = defineProps<Props>();

// 获取广告配置
const adConfig = computed(() => {
  return getAdByPosition(props.position);
});
</script>

<style scoped>
/* 广告容器基础样式 */
.plugin-ad-container {
  width: 100%;
  margin: 0;
  padding: 0;
}

.plugin-ad-content {
  width: 100%;
}

/* ========== 加入社区广告样式 ========== */
.plugin-ad-content :deep(.join-community-ad) {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 2px solid #e9ecef;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.plugin-ad-content :deep(.ad-header) {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.plugin-ad-content :deep(.ad-icon) {
  font-size: 32px;
  line-height: 1;
}

.plugin-ad-content :deep(.ad-title) {
  font-size: 20px;
  font-weight: 700;
  color: #303133;
  margin: 0;
}

.plugin-ad-content :deep(.ad-description) {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.plugin-ad-content :deep(.ad-features) {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.plugin-ad-content :deep(.feature-item) {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: all 0.3s;
}

.plugin-ad-content :deep(.feature-item:hover) {
  border-color: #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
}

.plugin-ad-content :deep(.feature-icon) {
  font-size: 20px;
  flex-shrink: 0;
}

.plugin-ad-content :deep(.feature-text) {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.plugin-ad-content :deep(.ad-qrcode) {
  margin: 20px 0;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 2px dashed #d1d5db;
}

.plugin-ad-content :deep(.qrcode-placeholder) {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 8px;
}

.plugin-ad-content :deep(.qrcode-icon) {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.plugin-ad-content :deep(.qrcode-text) {
  font-size: 14px;
  color: #606266;
  margin: 0;
  font-weight: 500;
}

.plugin-ad-content :deep(.ad-footer) {
  text-align: center;
  font-size: 12px;
  color: #909399;
  margin: 0;
  padding-top: 16px;
  border-top: 1px solid #e9ecef;
}

/* ========== 推荐阅读广告样式 ========== */
.plugin-ad-content :deep(.recommended-reading-ad) {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  padding: 24px;
}

.plugin-ad-content :deep(.recommended-reading-ad .ad-title) {
  font-size: 18px;
  font-weight: 700;
  color: #303133;
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #f3f4f6;
}

.plugin-ad-content :deep(.reading-list) {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plugin-ad-content :deep(.reading-item) {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-decoration: none;
  transition: all 0.3s;
}

.plugin-ad-content :deep(.reading-item:hover) {
  background: white;
  border-color: #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
  transform: translateX(4px);
}

.plugin-ad-content :deep(.reading-icon) {
  font-size: 24px;
  flex-shrink: 0;
}

.plugin-ad-content :deep(.reading-info h4) {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 4px 0;
}

.plugin-ad-content :deep(.reading-info p) {
  font-size: 12px;
  color: #606266;
  margin: 0;
}

/* ========== 插件推荐广告样式 ========== */
.plugin-ad-content :deep(.plugin-recommendation-ad) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.plugin-ad-content :deep(.ad-banner) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.plugin-ad-content :deep(.banner-icon) {
  font-size: 24px;
  color: white;
}

.plugin-ad-content :deep(.banner-text) {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

/* ========== 不同位置的特殊样式 ========== */

/* 侧边栏广告位 */
.ad-position-detail-sidebar {
  position: sticky;
  top: 20px;
}

/* 底部广告位 */
.ad-position-detail-bottom {
  margin-top: 30px;
}

/* 列表顶部广告位 */
.ad-position-list-top {
  margin-bottom: 20px;
}

/* ========== 响应式设计 ========== */
@media (max-width: 1024px) {
  .ad-position-detail-sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .plugin-ad-content :deep(.join-community-ad) {
    padding: 20px;
  }
  
  .plugin-ad-content :deep(.ad-title) {
    font-size: 18px;
  }
  
  .plugin-ad-content :deep(.ad-features) {
    gap: 10px;
  }
  
  .plugin-ad-content :deep(.feature-item) {
    padding: 8px;
  }
  
  .plugin-ad-content :deep(.reading-item) {
    padding: 10px;
  }
}

/* ========== 深色主题适配 ========== */
@media (prefers-color-scheme: dark) {
  .plugin-ad-content :deep(.join-community-ad) {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    border-color: #374151;
  }
  
  .plugin-ad-content :deep(.ad-title) {
    color: #f9fafb;
  }
  
  .plugin-ad-content :deep(.ad-description) {
    color: #d1d5db;
  }
  
  .plugin-ad-content :deep(.feature-item) {
    background: #111827;
    border-color: #374151;
  }
  
  .plugin-ad-content :deep(.feature-item:hover) {
    border-color: #667eea;
  }
  
  .plugin-ad-content :deep(.feature-text) {
    color: #f9fafb;
  }
  
  .plugin-ad-content :deep(.ad-qrcode) {
    background: #111827;
    border-color: #4b5563;
  }
  
  .plugin-ad-content :deep(.qrcode-placeholder) {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  }
  
  .plugin-ad-content :deep(.qrcode-text) {
    color: #d1d5db;
  }
  
  .plugin-ad-content :deep(.ad-footer) {
    color: #9ca3af;
    border-color: #374151;
  }
  
  .plugin-ad-content :deep(.recommended-reading-ad) {
    background: #1f2937;
    border-color: #374151;
  }
  
  .plugin-ad-content :deep(.recommended-reading-ad .ad-title) {
    color: #f9fafb;
    border-color: #374151;
  }
  
  .plugin-ad-content :deep(.reading-item) {
    background: #111827;
    border-color: #374151;
  }
  
  .plugin-ad-content :deep(.reading-item:hover) {
    background: #1f2937;
  }
  
  .plugin-ad-content :deep(.reading-info h4) {
    color: #f9fafb;
  }
  
  .plugin-ad-content :deep(.reading-info p) {
    color: #d1d5db;
  }
}
</style>
