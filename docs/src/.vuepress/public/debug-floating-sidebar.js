// 浮动侧边栏调试脚本
// 在浏览器控制台运行此脚本来检查组件状态

(function() {
  console.log('🔍 开始检查浮动侧边栏组件...');
  
  // 等待DOM加载完成
  function waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }
  
  // 等待Vue应用挂载
  function waitForVue() {
    return new Promise((resolve) => {
      const checkVue = () => {
        if (window.Vue || document.querySelector('[data-v-]')) {
          resolve();
        } else {
          setTimeout(checkVue, 100);
        }
      };
      checkVue();
    });
  }
  
  async function checkComponent() {
    await waitForDOM();
    await waitForVue();
    
    // 等待一点时间让组件完全加载
    setTimeout(() => {
      console.log('📋 组件检查报告:');
      console.log('================');
      
      // 1. 检查组件是否存在
      const component = document.querySelector('.floating-sidebar');
      console.log('1. 组件存在:', !!component);
      
      if (component) {
        // 2. 检查组件样式
        const styles = getComputedStyle(component);
        console.log('2. 组件样式:');
        console.log('   - Position:', styles.position);
        console.log('   - Z-index:', styles.zIndex);
        console.log('   - Right:', styles.right);
        console.log('   - Bottom:', styles.bottom);
        console.log('   - Opacity:', styles.opacity);
        
        // 3. 检查子元素
        const trigger = component.querySelector('.sidebar-trigger');
        const content = component.querySelector('.sidebar-content');
        const items = component.querySelectorAll('.sidebar-item');
        
        console.log('3. 子元素检查:');
        console.log('   - 触发器:', !!trigger);
        console.log('   - 内容面板:', !!content);
        console.log('   - 功能项数量:', items.length);
        
        // 4. 列出所有功能项
        if (items.length > 0) {
          console.log('4. 功能项列表:');
          items.forEach((item, index) => {
            const text = item.querySelector('.item-text')?.textContent || '未知';
            console.log(`   - ${index + 1}. ${text}`);
          });
        }
        
        // 5. 检查事件监听器
        console.log('5. 事件监听器:');
        console.log('   - 滚动事件:', !!window.onscroll || getEventListeners(window).scroll?.length > 0);
        console.log('   - 窗口调整:', !!window.onresize || getEventListeners(window).resize?.length > 0);
        
        // 6. 手动测试功能
        console.log('6. 手动测试功能:');
        console.log('   运行以下命令测试功能:');
        console.log('   - 显示组件: component.classList.add("is-visible")');
        console.log('   - 展开面板: component.classList.add("is-expanded")');
        console.log('   - 模拟滚动: window.scrollTo(0, 400)');
        
        // 7. 提供全局访问
        window.floatingSidebarComponent = component;
        window.testFloatingSidebar = {
          show: () => component.classList.add('is-visible'),
          hide: () => component.classList.remove('is-visible'),
          expand: () => component.classList.add('is-expanded'),
          collapse: () => component.classList.remove('is-expanded'),
          scrollTest: () => window.scrollTo(0, 400),
          getInfo: () => ({
            visible: component.classList.contains('is-visible'),
            expanded: component.classList.contains('is-expanded'),
            mobile: component.classList.contains('is-mobile'),
            scrollY: window.scrollY
          })
        };
        
        console.log('7. 全局测试对象已创建: window.testFloatingSidebar');
        console.log('   可用方法: show(), hide(), expand(), collapse(), scrollTest(), getInfo()');
        
      } else {
        console.log('❌ 组件未找到，可能的原因:');
        console.log('   1. client.ts 配置问题');
        console.log('   2. 组件注册失败');
        console.log('   3. Vue应用未正确挂载');
        console.log('   4. 样式文件未加载');
        
        // 检查可能的错误
        console.log('🔧 错误排查:');
        
        // 检查Vue应用
        const vueApp = document.querySelector('#app');
        console.log('   - Vue应用容器:', !!vueApp);
        
        // 检查样式
        const styleSheets = Array.from(document.styleSheets);
        const hasFloatingStyles = styleSheets.some(sheet => {
          try {
            return Array.from(sheet.cssRules).some(rule => 
              rule.selectorText && rule.selectorText.includes('floating-sidebar')
            );
          } catch (e) {
            return false;
          }
        });
        console.log('   - 浮动侧边栏样式:', hasFloatingStyles);
        
        // 检查控制台错误
        console.log('   - 请检查控制台是否有JavaScript错误');
      }
      
      console.log('================');
      console.log('✅ 检查完成');
      
    }, 1000);
  }
  
  checkComponent();
})();

// 自动运行检查
console.log('🚀 浮动侧边栏调试脚本已加载');
console.log('💡 如果组件未立即显示，请等待1-2秒后查看检查结果');
