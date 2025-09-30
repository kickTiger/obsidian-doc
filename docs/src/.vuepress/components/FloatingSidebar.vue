<template>
  <Teleport to="body">
    <div
      class="modern-floating-sidebar"
      :class="{
        'is-expanded': isExpanded,
        'is-mobile': isMobile
      }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- 主菜单容器 -->
      <div class="sidebar-menu">
        <!-- 智能滚动按钮 - 根据位置显示顶部或底部 -->
        <div
          v-if="!isAtTop"
          class="menu-item"
          @click="scrollToTop"
          title="回到顶部"
          :style="{ transitionDelay: '0ms' }"
        >
          <div class="item-icon-wrapper">
            <svg class="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </div>
          <span class="item-label">顶部</span>
        </div>

        <div
          v-if="!isAtBottom"
          class="menu-item"
          @click="scrollToBottom"
          title="回到底部"
          :style="{ transitionDelay: '0ms' }"
        >
          <div class="item-icon-wrapper">
            <svg class="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
          <span class="item-label">底部</span>
        </div>

        <!-- 加群二维码 -->
        <div
          class="menu-item qrcode-trigger"
          @mouseenter="showQRCodeHover"
          @mouseleave="hideQRCodeHover"
          title="加群交流"
          :style="{ transitionDelay: '100ms' }"
        >
          <div class="item-icon-wrapper">
            <svg class="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <path d="M14 14h7v7h-7z"/>
            </svg>
          </div>
          <span class="item-label">加群</span>

          <!-- 二维码弹出卡片 -->
          <Transition name="qrcode-pop">
            <div v-show="showQRCode" class="qrcode-card">
              <div class="qrcode-inner">
                <img src="/assets/WeChat-QRcode.jpg" alt="加群二维码" class="qrcode-img" />
                <div class="qrcode-info">
                  <p class="qrcode-title">扫码加微信</p>
                  <p class="qrcode-id">coffeebean1688</p>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- 使用指南 -->
        <a
          href="/zh/documentation/"
          class="menu-item"
          title="使用指南"
          :style="{ transitionDelay: '150ms' }"
        >
          <div class="item-icon-wrapper">
            <svg class="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </div>
          <span class="item-label">指南</span>
        </a>

        <!-- 插件大全 -->
        <a
          href="/zh/community-plugins/"
          class="menu-item"
          title="插件大全"
          :style="{ transitionDelay: '200ms' }"
        >
          <div class="item-icon-wrapper">
            <svg class="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
          <span class="item-label">插件</span>
        </a>

        <!-- 视频教程 -->
        <a
          href="https://space.bilibili.com/618777356"
          target="_blank"
          class="menu-item"
          title="视频教程"
          :style="{ transitionDelay: '250ms' }"
        >
          <div class="item-icon-wrapper">
            <svg class="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <span class="item-label">视频</span>
        </a>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式状态
const isExpanded = ref(false)
const showQRCode = ref(false)
const isMobile = ref(false)
const isAtTop = ref(true)
const isAtBottom = ref(false)

// 检测移动端
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// 检测滚动位置
const checkScrollPosition = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight

  // 判断是否在顶部(允许50px的误差)
  isAtTop.value = scrollTop < 50

  // 判断是否在底部(允许50px的误差)
  isAtBottom.value = scrollTop + clientHeight >= scrollHeight - 50
}

// 鼠标事件处理 - 自动展开/收起
const handleMouseEnter = () => {
  isExpanded.value = true
}

const handleMouseLeave = () => {
  isExpanded.value = false
  // 离开时也隐藏二维码
  showQRCode.value = false
}

// 滚动功能
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  })
}

// 二维码悬停功能
const showQRCodeHover = () => {
  showQRCode.value = true
}

const hideQRCodeHover = () => {
  showQRCode.value = false
}

// 生命周期
onMounted(() => {
  window.addEventListener('resize', checkMobile)
  window.addEventListener('scroll', checkScrollPosition)
  checkMobile()
  checkScrollPosition()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('scroll', checkScrollPosition)
})
</script>
