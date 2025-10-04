<template>
  <div class="stats-panel">
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="stat-card"
      :class="{ 'animate': animated }"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      <div class="stat-icon" :style="{ background: stat.iconBg }">
        <i :class="stat.iconClass" :style="{ color: stat.iconColor }"></i>
      </div>
      <div class="stat-content">
        <div class="stat-value">
          <span v-if="animated">{{ animatedValues[index] }}</span>
          <span v-else>{{ stat.value }}</span>
        </div>
        <div class="stat-label">{{ stat.label }}</div>
        <div v-if="stat.trend" class="stat-trend" :class="stat.trendType">
          <i class="iconfont icon-arrow-up trend-icon"></i>
          <span class="trend-text">{{ stat.trend }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

// Props 定义
interface PluginStats {
  totalPlugins: number;
  totalDownloads: number;
  weeklyNewPlugins: number;
  monthlyNewPlugins: number;
  lastUpdated?: number;
}

interface Props {
  stats: PluginStats | null;
  animated?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  animated: true
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

// 统计数据配置
const stats = computed(() => {
  if (!props.stats) return [];

  return [
    {
      iconClass: 'iconfont icon-grid',
      iconColor: '#7c3aed',
      iconBg: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
      value: formatNumber(props.stats.totalPlugins),
      rawValue: props.stats.totalPlugins,
      label: '总插件数',
      trend: null,
      trendType: null
    },
    {
      iconClass: 'iconfont icon-like',
      iconColor: '#06b6d4',
      iconBg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)',
      value: formatNumber(props.stats.totalDownloads),
      rawValue: props.stats.totalDownloads,
      label: '总下载量',
      trend: null,
      trendType: null
    },
    {
      iconClass: 'iconfont icon-time',
      iconColor: '#10b981',
      iconBg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)',
      value: props.stats.weeklyNewPlugins.toString(),
      rawValue: props.stats.weeklyNewPlugins,
      label: '本周新增',
      trend: '较上周',
      trendType: 'up'
    },
    {
      iconClass: 'iconfont icon-date',
      iconColor: '#f59e0b',
      iconBg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 146, 60, 0.15) 100%)',
      value: props.stats.monthlyNewPlugins.toString(),
      rawValue: props.stats.monthlyNewPlugins,
      label: '本月新增',
      trend: '较上月',
      trendType: 'up'
    }
  ];
});

// 动画值
const animatedValues = ref<string[]>([]);

// 数字动画函数
const animateNumber = (target: number, index: number, duration: number = 1000) => {
  const start = 0;
  const startTime = Date.now();
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // 使用缓动函数
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (target - start) * easeOutQuart);
    
    animatedValues.value[index] = formatNumber(current);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      animatedValues.value[index] = formatNumber(target);
    }
  };
  
  animate();
};

// 初始化动画
onMounted(() => {
  if (props.animated && props.stats) {
    animatedValues.value = stats.value.map(() => '0');
    
    // 延迟启动动画
    setTimeout(() => {
      stats.value.forEach((stat, index) => {
        animateNumber(stat.rawValue, index, 1500);
      });
    }, 100);
  }
});

// 监听 stats 变化
watch(() => props.stats, (newStats) => {
  if (props.animated && newStats) {
    stats.value.forEach((stat, index) => {
      animateNumber(stat.rawValue, index, 1000);
    });
  }
});
</script>

<style scoped>
.stats-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand-light);
}

.stat-card:hover::before {
  transform: scaleX(1);
}

.stat-card.animate {
  animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-icon {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05));
}

.stat-icon i {
  font-size: 32px;
  line-height: 1;
}

.stat-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.stat-trend {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-top: 0.25rem;
}

.stat-trend.up {
  color: var(--vp-c-success);
  background: var(--vp-c-success-soft);
}

.stat-trend.down {
  color: var(--vp-c-danger);
  background: var(--vp-c-danger-soft);
}

.trend-icon {
  font-weight: bold;
}

.trend-text {
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-panel {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .stat-card {
    padding: 1.25rem;
    gap: 1rem;
  }

  .stat-icon {
    font-size: 2rem;
  }

  .stat-value {
    font-size: 1.6rem;
  }

  .stat-label {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .stats-panel {
    grid-template-columns: 1fr;
  }

  .stat-card {
    flex-direction: row;
  }
}

/* 深色模式优化 */
@media (prefers-color-scheme: dark) {
  .stat-card {
    background: var(--vp-c-bg-soft);
  }

  .stat-card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
}
</style>
