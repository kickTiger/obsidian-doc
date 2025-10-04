/**
 * 广告位配置文件
 * 统一管理所有页面的广告位内容
 */

export interface AdConfig {
  position: string;        // 广告位位置标识
  title?: string;          // 广告标题
  content: string;         // 广告内容(支持 HTML)
  enabled: boolean;        // 是否启用
  priority?: number;       // 优先级(数字越大优先级越高)
}

/**
 * 广告位配置列表
 */
export const adsConfig: AdConfig[] = [
  // 详情页侧边栏广告位
  {
    position: 'detail-sidebar',
    title: '加入咖啡豆社区',
    content: `
      <div class="join-community-ad">
        <div class="ad-header">
          <div class="ad-icon">☕</div>
          <h3 class="ad-title">加入咖啡豆社区</h3>
        </div>
        <p class="ad-description">与更多 Obsidian 用户交流学习,分享使用技巧和心得</p>
        <div class="ad-features">
          <div class="feature-item">
            <span class="feature-icon">💬</span>
            <span class="feature-text">实时交流讨论</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📚</span>
            <span class="feature-text">独家教程资源</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎯</span>
            <span class="feature-text">问题快速解答</span>
          </div>
        </div>
        <div class="ad-qrcode">
          <div class="qrcode-placeholder">
            <span class="qrcode-icon">📱</span>
            <p class="qrcode-text">扫码加入微信群</p>
          </div>
        </div>
        <p class="ad-footer">咖啡豆文档 · 专注 Obsidian 中文社区</p>
      </div>
    `,
    enabled: true,
    priority: 1
  },
  
  // 详情页底部广告位
  {
    position: 'detail-bottom',
    title: '推荐阅读',
    content: `
      <div class="recommended-reading-ad">
        <h3 class="ad-title">📖 推荐阅读</h3>
        <div class="reading-list">
          <a href="/zh/bases/" class="reading-item">
            <span class="reading-icon">🎓</span>
            <div class="reading-info">
              <h4>Obsidian 基础教程</h4>
              <p>从零开始学习 Obsidian</p>
            </div>
          </a>
          <a href="/zh/workflow/" class="reading-item">
            <span class="reading-icon">⚡</span>
            <div class="reading-info">
              <h4>高效工作流</h4>
              <p>提升笔记效率的实用技巧</p>
            </div>
          </a>
          <a href="/zh/best-practices/" class="reading-item">
            <span class="reading-icon">💡</span>
            <div class="reading-info">
              <h4>最佳实践</h4>
              <p>社区精选的使用经验</p>
            </div>
          </a>
        </div>
      </div>
    `,
    enabled: true,
    priority: 2
  },
  
  // 列表页顶部广告位
  {
    position: 'list-top',
    title: '插件推荐',
    content: `
      <div class="plugin-recommendation-ad">
        <div class="ad-banner">
          <span class="banner-icon">⭐</span>
          <span class="banner-text">发现更多优质插件,提升你的 Obsidian 体验</span>
        </div>
      </div>
    `,
    enabled: true,
    priority: 3
  }
];

/**
 * 根据位置获取广告配置
 * @param position 广告位位置标识
 * @returns 广告配置对象,如果未找到或未启用则返回 null
 */
export function getAdByPosition(position: string): AdConfig | null {
  const ad = adsConfig.find(ad => ad.position === position && ad.enabled);
  return ad || null;
}

/**
 * 获取所有启用的广告位
 * @returns 启用的广告配置数组
 */
export function getEnabledAds(): AdConfig[] {
  return adsConfig
    .filter(ad => ad.enabled)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

/**
 * 检查指定位置是否有启用的广告
 * @param position 广告位位置标识
 * @returns 是否有启用的广告
 */
export function hasAdAtPosition(position: string): boolean {
  return adsConfig.some(ad => ad.position === position && ad.enabled);
}
