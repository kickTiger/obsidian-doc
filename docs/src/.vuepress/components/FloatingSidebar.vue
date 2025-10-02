<template>
  <Teleport to="body">
    <div
      ref="floatingSidebarRef"
      class="modern-floating-sidebar"
      :class="{
        'is-expanded': isExpanded,
        'is-mobile': isMobile,
        'is-minimized': isMinimized
      }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleMobileClick"
    >
      <!-- 主菜单容器 -->
      <div ref="sidebarMenuRef" class="sidebar-menu">
        <!-- 移动端最小化按钮 - 作为第一个菜单项 -->
        <div
          v-if="isMobile && !isMinimized"
          class="menu-item minimize-btn"
          @click.stop="toggleMinimize"
          title="收起菜单"
          :style="{ transitionDelay: '0ms' }"
        >
          <div class="item-icon-wrapper">
            <svg class="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
          <span class="item-label">收起</span>
        </div>

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
          @click="handleLinkClick"
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
          @click="handleLinkClick"
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
          @click="handleLinkClick"
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// 响应式状态
const isExpanded = ref(false)
const showQRCode = ref(false)
const isMobile = ref(false)
const isAtTop = ref(true)
const isAtBottom = ref(false)

// 移动端最小化状态 - 从localStorage读取
const STORAGE_KEY = 'floating-sidebar-minimized'
const isMinimized = ref(false)

// DOM引用
const floatingSidebarRef = ref<HTMLElement | null>(null)
const sidebarMenuRef = ref<HTMLElement | null>(null)

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

// 动态调整垂直居中位置
const updateVerticalPosition = () => {
  // 移动端不需要垂直居中,保持右下角定位
  if (isMobile.value || !sidebarMenuRef.value) {
    return
  }

  nextTick(() => {
    if (!sidebarMenuRef.value) return

    // 获取菜单容器的实际高度
    const menuHeight = sidebarMenuRef.value.offsetHeight
    const viewportHeight = window.innerHeight

    // 计算居中所需的top值
    // 使用 calc 方式: 50vh - (菜单高度的一半)
    const topPosition = `calc(50vh - ${menuHeight / 2}px)`

    if (floatingSidebarRef.value) {
      floatingSidebarRef.value.style.top = topPosition
    }
  })
}

// 鼠标事件处理 - 自动展开/收起(仅桌面端)
const handleMouseEnter = () => {
  if (isMobile.value) return
  isExpanded.value = true
}

const handleMouseLeave = () => {
  if (isMobile.value) return
  isExpanded.value = false
  // 离开时也隐藏二维码
  showQRCode.value = false
}

// 移动端点击菜单容器时的处理
const handleMobileClick = (event: MouseEvent) => {
  if (!isMobile.value) return

  // 最小化状态下点击展开
  if (isMinimized.value) {
    event.preventDefault()
    event.stopPropagation()
    toggleMinimize()
  }
}

// 移动端链接点击处理
const handleLinkClick = (event: MouseEvent) => {
  if (!isMobile.value) return

  // 最小化状态下点击链接,阻止跳转,只展开菜单
  if (isMinimized.value) {
    event.preventDefault()
    event.stopPropagation()
    toggleMinimize()
  }
  // 正常状态下允许跳转
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

// 移动端最小化/展开功能
const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
  // 保存状态到localStorage
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, isMinimized.value ? 'true' : 'false')
  }
}

// 生命周期
onMounted(() => {
  window.addEventListener('resize', checkMobile)
  window.addEventListener('scroll', checkScrollPosition)
  checkMobile()
  checkScrollPosition()

  // 从localStorage读取最小化状态
  if (typeof localStorage !== 'undefined') {
    const savedState = localStorage.getItem(STORAGE_KEY)
    if (savedState === 'true') {
      isMinimized.value = true
    }
  }

  // 初始化垂直居中位置
  updateVerticalPosition()

  // 使用 ResizeObserver 监听菜单容器高度变化
  if (sidebarMenuRef.value && typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver(() => {
      updateVerticalPosition()
    })
    resizeObserver.observe(sidebarMenuRef.value)

    // 保存observer引用以便清理
    if (floatingSidebarRef.value) {
      (floatingSidebarRef.value as any)._resizeObserver = resizeObserver
    }
  }

  // 监听窗口大小变化时也更新位置
  window.addEventListener('resize', updateVerticalPosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('scroll', checkScrollPosition)
  window.removeEventListener('resize', updateVerticalPosition)

  // 清理 ResizeObserver
  if (floatingSidebarRef.value) {
    const observer = (floatingSidebarRef.value as any)._resizeObserver
    if (observer) {
      observer.disconnect()
    }
  }
})
</script>
