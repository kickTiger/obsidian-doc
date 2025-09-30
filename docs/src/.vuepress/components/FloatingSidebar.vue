<template>
  <Teleport to="body">
    <div
      class="floating-sidebar"
      :class="{
        'is-expanded': isExpanded,
        'is-mobile': isMobile,
        'show-qrcode': showQRCode
      }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- 触发器图标 -->
      <div class="sidebar-trigger" @click="handleTriggerClick">
        <svg class="sidebar-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <div class="trigger-glow"></div>
      </div>
      
      <!-- 展开内容 -->
      <Transition name="sidebar-expand">
        <div v-show="isExpanded" class="sidebar-content">
          <!-- 回到顶部 -->
          <div class="sidebar-item" @click="scrollToTop" title="回到顶部">
            <svg class="item-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
            <span class="item-text">回到顶部</span>
          </div>
          
          <!-- 回到底部 -->
          <div class="sidebar-item" @click="scrollToBottom" title="回到底部">
            <svg class="item-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
            </svg>
            <span class="item-text">回到底部</span>
          </div>
          
          <!-- 加群二维码 -->
          <div class="sidebar-item qrcode-item" @mouseenter="showQRCodeHover" @mouseleave="hideQRCodeHover" title="加群二维码">
            <svg class="item-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4z"/>
              <path d="M18 13h-2v2h2v-2zM20 15h-2v2h2v-2zM16 15h-2v2h2v-2zM18 17h-2v2h2v-2zM20 19h-2v2h2v-2z"/>
            </svg>
            <span class="item-text">加群交流</span>
            <!-- 悬停显示的二维码 -->
            <div class="qrcode-hover" v-show="showQRCode">
              <div class="qrcode-content">
                <img src="/assets/WeChat-QRcode.jpg" alt="加群二维码" class="qrcode-image" />
                <p class="qrcode-text">扫码加微信</p>
                <p class="qrcode-desc">coffeebean1688</p>
              </div>
            </div>
          </div>
          
          <!-- 使用指南 -->
          <div class="sidebar-item">
            <a href="/zh/documentation/" class="item-link" title="使用指南">
              <svg class="item-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
              <span class="item-text">使用指南</span>
            </a>
          </div>
          
          <!-- 插件搜索 -->
          <div class="sidebar-item">
            <a href="/zh/community-plugins/" class="item-link" title="插件大全">
              <svg class="item-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <span class="item-text">插件大全</span>
            </a>
          </div>
          
          <!-- 视频教程 -->
          <div class="sidebar-item">
            <a href="https://space.bilibili.com/618777356" target="_blank" class="item-link" title="视频教程">
              <svg class="item-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span class="item-text">视频教程</span>
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// 响应式状态
const isExpanded = ref(false)
const showQRCode = ref(false)
const isMobile = ref(false)

// 检测移动端
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// 移除滚动检测逻辑，组件始终可见

// 鼠标事件处理
const handleMouseEnter = () => {
  if (!isMobile.value) {
    isExpanded.value = true
  }
}

const handleMouseLeave = () => {
  if (!isMobile.value) {
    isExpanded.value = false
  }
}

// 移动端点击处理
const handleTriggerClick = () => {
  if (isMobile.value) {
    isExpanded.value = !isExpanded.value
  }
}

// 滚动功能
const scrollToTop = () => {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth' 
  })
  // 移动端点击后收起
  if (isMobile.value) {
    isExpanded.value = false
  }
}

const scrollToBottom = () => {
  window.scrollTo({ 
    top: document.documentElement.scrollHeight, 
    behavior: 'smooth' 
  })
  // 移动端点击后收起
  if (isMobile.value) {
    isExpanded.value = false
  }
}

// 二维码悬停功能
const showQRCodeHover = () => {
  showQRCode.value = true
}

const hideQRCodeHover = () => {
  showQRCode.value = false
}

// 键盘事件处理
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    if (isExpanded.value && isMobile.value) {
      isExpanded.value = false
    }
  }
}

// 生命周期
onMounted(() => {
  nextTick(() => {
    window.addEventListener('resize', checkMobile)
    window.addEventListener('keydown', handleKeydown)

    // 初始化检测
    checkMobile()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('keydown', handleKeydown)
})
</script>
