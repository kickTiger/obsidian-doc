<template>
  <div class="plugin-pagination">
    <!-- 分页信息 -->
    <div class="pagination-info">
      <span class="info-text">
        显示 <strong>{{ startIndex + 1 }}-{{ endIndex }}</strong> / 共 <strong>{{ total }}</strong> 个插件
      </span>
    </div>

    <!-- 分页控制 -->
    <div class="pagination-controls">
      <!-- 上一页按钮 -->
      <button
        class="pagination-button prev-button"
        :disabled="currentPage === 1"
        @click="goToPrevPage"
        title="上一页 (←)"
      >
        <i class="iconfont icon-arrow-left"></i>
        上一页
      </button>

      <!-- 页码按钮 -->
      <div class="page-numbers">
        <!-- 第一页 -->
        <button
          v-if="showFirstPage"
          class="page-button"
          :class="{ active: currentPage === 1 }"
          @click="goToPage(1)"
        >
          1
        </button>

        <!-- 左侧省略号 -->
        <span v-if="showLeftEllipsis" class="ellipsis">...</span>

        <!-- 中间页码 -->
        <button
          v-for="page in visiblePages"
          :key="page"
          class="page-button"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <!-- 右侧省略号 -->
        <span v-if="showRightEllipsis" class="ellipsis">...</span>

        <!-- 最后一页 -->
        <button
          v-if="showLastPage"
          class="page-button"
          :class="{ active: currentPage === totalPages }"
          @click="goToPage(totalPages)"
        >
          {{ totalPages }}
        </button>
      </div>

      <!-- 下一页按钮 -->
      <button
        class="pagination-button next-button"
        :disabled="currentPage === totalPages"
        @click="goToNextPage"
        title="下一页 (→)"
      >
        下一页
        <i class="iconfont icon-arrow-right"></i>
      </button>
    </div>

    <!-- 每页显示数量和跳转 -->
    <div class="pagination-options">
      <!-- 每页显示数量 -->
      <div class="page-size-selector">
        <span class="selector-label">每页显示</span>
        <select
          v-model="localPageSize"
          class="page-size-select"
          @change="handlePageSizeChange"
        >
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
        <span class="selector-label">条</span>
      </div>

      <!-- 跳转到指定页 -->
      <div class="page-jumper">
        <span class="jumper-label">跳转到</span>
        <input
          v-model.number="jumpPage"
          type="number"
          class="jump-input"
          :min="1"
          :max="totalPages"
          @keyup.enter="handleJump"
        />
        <button class="jump-button" @click="handleJump">
          跳转
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

// Props 定义
interface Props {
  page: number;
  pageSize: number;
  total: number;
}

const props = withDefaults(defineProps<Props>(), {
  page: 1,
  pageSize: 20,
  total: 0
});

// Emits 定义
interface Emits {
  (e: 'update:page', value: number): void;
  (e: 'update:pageSize', value: number): void;
}

const emit = defineEmits<Emits>();

// 本地状态
const localPageSize = ref(props.pageSize);
const jumpPage = ref<number | string>('');

// 计算属性
const currentPage = computed(() => props.page);

// 总页数
const totalPages = computed(() => {
  return Math.ceil(props.total / props.pageSize) || 1;
});

// 当前页起始索引
const startIndex = computed(() => {
  return (currentPage.value - 1) * props.pageSize;
});

// 当前页结束索引
const endIndex = computed(() => {
  return Math.min(startIndex.value + props.pageSize, props.total);
});

// 可见页码范围
const visiblePages = computed(() => {
  const pages: number[] = [];
  const current = currentPage.value;
  const total = totalPages.value;
  
  // 如果总页数小于等于7,显示所有页码
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  // 计算可见页码范围
  let start = Math.max(2, current - 2);
  let end = Math.min(total - 1, current + 2);
  
  // 调整范围以保持5个页码
  if (current <= 3) {
    end = 5;
  } else if (current >= total - 2) {
    start = total - 4;
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

// 是否显示第一页
const showFirstPage = computed(() => {
  return totalPages.value > 1 && !visiblePages.value.includes(1);
});

// 是否显示最后一页
const showLastPage = computed(() => {
  return totalPages.value > 1 && !visiblePages.value.includes(totalPages.value);
});

// 是否显示左侧省略号
const showLeftEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[0] > 2;
});

// 是否显示右侧省略号
const showRightEllipsis = computed(() => {
  return visiblePages.value.length > 0 && 
         visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1;
});

// 方法
const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) {
    return;
  }
  emit('update:page', page);
};

const goToPrevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1);
  }
};

const handlePageSizeChange = () => {
  emit('update:pageSize', localPageSize.value);
  // 切换每页显示数量后,跳转到第一页
  emit('update:page', 1);
};

const handleJump = () => {
  const page = typeof jumpPage.value === 'number' ? jumpPage.value : parseInt(jumpPage.value as string);
  
  if (isNaN(page) || page < 1 || page > totalPages.value) {
    jumpPage.value = '';
    return;
  }
  
  goToPage(page);
  jumpPage.value = '';
};

// 键盘快捷键处理
const handleKeyboard = (event: KeyboardEvent) => {
  // 如果焦点在输入框中,不处理快捷键
  const target = event.target as HTMLElement;
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
    return;
  }
  
  // 左方向键 - 上一页
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    goToPrevPage();
  }
  
  // 右方向键 - 下一页
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    goToNextPage();
  }
};

// 监听 pageSize 变化
watch(() => props.pageSize, (newValue) => {
  localPageSize.value = newValue;
});

// 生命周期
onMounted(() => {
  // 添加键盘事件监听
  window.addEventListener('keydown', handleKeyboard);
});

onUnmounted(() => {
  // 移除键盘事件监听
  window.removeEventListener('keydown', handleKeyboard);
});
</script>

<style scoped>
/* ========== 分页容器 ========== */
.plugin-pagination {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e4e7ed;
  padding: 24px;
  margin-top: 24px;
}

/* ========== 分页信息 ========== */
.pagination-info {
  text-align: center;
}

.info-text {
  font-size: 14px;
  color: #606266;
}

.info-text strong {
  color: #667eea;
  font-weight: 700;
}

/* ========== 分页控制 ========== */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

/* 上一页/下一页按钮 */
.pagination-button {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 16px;
  background: white;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-button:hover:not(:disabled) {
  background: #f5f7fa;
  border-color: #c0c4cc;
  color: #303133;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button i {
  font-size: 14px;
}

/* 页码容器 */
.page-numbers {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 页码按钮 */
.page-button {
  min-width: 40px;
  height: 40px;
  padding: 0 8px;
  background: white;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  cursor: pointer;
  transition: all 0.2s;
}

.page-button:hover {
  background: #f5f7fa;
  border-color: #c0c4cc;
  color: #303133;
}

.page-button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 省略号 */
.ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  font-size: 14px;
  color: #909399;
  user-select: none;
}

/* ========== 分页选项 ========== */
.pagination-options {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding-top: 20px;
  border-top: 1px solid #f0f2f5;
}

/* 每页显示数量选择器 */
.page-size-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.selector-label {
  font-size: 14px;
  color: #606266;
}

.page-size-select {
  height: 36px;
  padding: 0 32px 0 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  color: #606266;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.page-size-select:hover {
  border-color: #c0c4cc;
}

.page-size-select:focus {
  outline: none;
  border-color: #667eea;
}

/* 页面跳转 */
.page-jumper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.jumper-label {
  font-size: 14px;
  color: #606266;
}

.jump-input {
  width: 60px;
  height: 36px;
  padding: 0 8px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  transition: all 0.2s;
}

.jump-input:hover {
  border-color: #c0c4cc;
}

.jump-input:focus {
  outline: none;
  border-color: #667eea;
}

/* 移除数字输入框的上下箭头 */
.jump-input::-webkit-inner-spin-button,
.jump-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.jump-input[type="number"] {
  -moz-appearance: textfield;
}

.jump-button {
  height: 36px;
  padding: 0 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.jump-button:hover {
  background: linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* ========== 响应式设计 ========== */
@media (max-width: 768px) {
  .plugin-pagination {
    padding: 16px;
    gap: 16px;
  }

  .pagination-controls {
    flex-wrap: wrap;
    gap: 8px;
  }

  .pagination-button {
    height: 36px;
    padding: 0 12px;
    font-size: 13px;
  }

  .page-button {
    min-width: 36px;
    height: 36px;
    font-size: 13px;
  }

  .ellipsis {
    min-width: 36px;
    height: 36px;
  }

  .pagination-options {
    flex-direction: column;
    gap: 12px;
  }

  .page-size-selector,
  .page-jumper {
    width: 100%;
    justify-content: center;
  }
}

/* ========== 深色主题适配 ========== */
[data-theme="dark"] .plugin-pagination {
  background: #1f2937;
  border-color: #374151;
}

[data-theme="dark"] .info-text {
  color: #9ca3af;
}

[data-theme="dark"] .info-text strong {
  color: #818cf8;
}

[data-theme="dark"] .pagination-button {
  background: #374151;
  border-color: #4b5563;
  color: #d1d5db;
}

[data-theme="dark"] .pagination-button:hover:not(:disabled) {
  background: #4b5563;
  border-color: #6b7280;
  color: #f3f4f6;
}

[data-theme="dark"] .page-button {
  background: #374151;
  border-color: #4b5563;
  color: #d1d5db;
}

[data-theme="dark"] .page-button:hover {
  background: #4b5563;
  border-color: #6b7280;
  color: #f3f4f6;
}

[data-theme="dark"] .page-button.active {
  background: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
  border-color: transparent;
  color: white;
}

[data-theme="dark"] .ellipsis {
  color: #6b7280;
}

[data-theme="dark"] .pagination-options {
  border-top-color: #374151;
}

[data-theme="dark"] .selector-label,
[data-theme="dark"] .jumper-label {
  color: #9ca3af;
}

[data-theme="dark"] .page-size-select,
[data-theme="dark"] .jump-input {
  background: #374151;
  border-color: #4b5563;
  color: #d1d5db;
}

[data-theme="dark"] .page-size-select:hover,
[data-theme="dark"] .jump-input:hover {
  border-color: #6b7280;
}

[data-theme="dark"] .page-size-select:focus,
[data-theme="dark"] .jump-input:focus {
  border-color: #818cf8;
}

[data-theme="dark"] .jump-button {
  background: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
}

[data-theme="dark"] .jump-button:hover {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}
</style>
