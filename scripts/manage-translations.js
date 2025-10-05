/**
 * 插件描述翻译管理脚本
 * 
 * 功能：
 * 1. 检测未翻译的插件描述
 * 2. 生成待翻译清单
 * 3. 应用翻译记录
 * 4. 管理翻译状态
 * 
 * 使用方法：
 * node scripts/manage-translations.js [command]
 * 
 * 命令：
 * - check: 检查未翻译的插件
 * - generate: 生成待翻译清单
 * - apply: 应用翻译记录
 * - stats: 显示翻译统计
 * 
 * 作者：Augment AI Agent
 * 创建日期：2025-10-05
 */

const fs = require('fs');
const path = require('path');

// ========== 配置 ==========

const DATA_DIR = path.join(__dirname, '../docs/src/.vuepress/public/data');
const PLUGINS_FILE = path.join(DATA_DIR, 'plugins.json');
const TRANSLATIONS_DIR = path.join(__dirname, '../translations');
const TRANSLATIONS_FILE = path.join(TRANSLATIONS_DIR, 'plugin-descriptions.json');
const TODO_FILE = path.join(TRANSLATIONS_DIR, 'todo-translations.json');

// ========== 工具函数 ==========

function printSuccess(message) {
  console.log(`✓ ${message}`);
}

function printError(message) {
  console.error(`✗ ${message}`);
}

function printInfo(message) {
  console.log(`ℹ ${message}`);
}

// ========== 核心功能 ==========

/**
 * 读取插件数据
 */
function readPlugins() {
  try {
    const data = fs.readFileSync(PLUGINS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    printError(`读取插件数据失败: ${error.message}`);
    process.exit(1);
  }
}

/**
 * 读取翻译记录
 */
function readTranslations() {
  try {
    if (!fs.existsSync(TRANSLATIONS_FILE)) {
      return {};
    }
    const data = fs.readFileSync(TRANSLATIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    printError(`读取翻译记录失败: ${error.message}`);
    return {};
  }
}

/**
 * 保存翻译记录
 */
function saveTranslations(translations) {
  try {
    // 确保目录存在
    if (!fs.existsSync(TRANSLATIONS_DIR)) {
      fs.mkdirSync(TRANSLATIONS_DIR, { recursive: true });
    }
    
    fs.writeFileSync(TRANSLATIONS_FILE, JSON.stringify(translations, null, 2), 'utf8');
    printSuccess(`翻译记录已保存: ${TRANSLATIONS_FILE}`);
  } catch (error) {
    printError(`保存翻译记录失败: ${error.message}`);
    throw error;
  }
}

/**
 * 检查是否需要翻译
 */
function needsTranslation(description) {
  // 简单的中文检测：如果包含中文字符，认为已翻译
  return !/[\u4e00-\u9fa5]/.test(description);
}

/**
 * 检查未翻译的插件
 */
function checkUntranslated() {
  printInfo('正在检查未翻译的插件...');
  
  const plugins = readPlugins();
  const translations = readTranslations();
  
  const untranslated = plugins.filter(plugin => {
    // 如果已有翻译记录，跳过
    if (translations[plugin.id]) {
      return false;
    }
    
    // 如果描述需要翻译
    return needsTranslation(plugin.description);
  });
  
  printSuccess(`检查完成`);
  printInfo(`  - 总插件数: ${plugins.length}`);
  printInfo(`  - 已翻译: ${Object.keys(translations).length}`);
  printInfo(`  - 未翻译: ${untranslated.length}`);
  printInfo(`  - 翻译覆盖率: ${((Object.keys(translations).length / plugins.length) * 100).toFixed(1)}%`);
  
  return untranslated;
}

/**
 * 生成待翻译清单
 */
function generateTodoList() {
  printInfo('正在生成待翻译清单...');
  
  const untranslated = checkUntranslated();
  
  // 按下载量排序，优先翻译热门插件
  untranslated.sort((a, b) => b.downloads - a.downloads);
  
  // 生成待翻译清单
  const todoList = untranslated.map((plugin, index) => ({
    priority: index + 1,
    id: plugin.id,
    name: plugin.name,
    description: plugin.description,
    downloads: plugin.downloads,
    translation: '', // 待填写
    status: 'pending' // pending, translated, reviewed
  }));
  
  // 保存待翻译清单
  try {
    if (!fs.existsSync(TRANSLATIONS_DIR)) {
      fs.mkdirSync(TRANSLATIONS_DIR, { recursive: true });
    }
    
    fs.writeFileSync(TODO_FILE, JSON.stringify({
      generatedAt: new Date().toISOString(),
      totalCount: todoList.length,
      items: todoList
    }, null, 2), 'utf8');
    
    printSuccess(`待翻译清单已生成: ${TODO_FILE}`);
    printInfo(`  - 待翻译插件数: ${todoList.length}`);
    printInfo(`  - 建议分批翻译，每次50-100个`);
  } catch (error) {
    printError(`生成待翻译清单失败: ${error.message}`);
    throw error;
  }
}

/**
 * 应用翻译记录
 */
function applyTranslations() {
  printInfo('正在应用翻译记录...');
  
  const plugins = readPlugins();
  const translations = readTranslations();
  
  let appliedCount = 0;
  
  // 应用翻译
  const updatedPlugins = plugins.map(plugin => {
    if (translations[plugin.id]) {
      appliedCount++;
      return {
        ...plugin,
        description: translations[plugin.id].translation,
        descriptionEn: plugin.description, // 保留英文原文
        translatedAt: translations[plugin.id].translatedAt
      };
    }
    return plugin;
  });
  
  // 保存更新后的插件数据
  try {
    fs.writeFileSync(PLUGINS_FILE, JSON.stringify(updatedPlugins, null, 2), 'utf8');
    printSuccess(`翻译已应用到插件数据`);
    printInfo(`  - 应用翻译数: ${appliedCount}`);
  } catch (error) {
    printError(`应用翻译失败: ${error.message}`);
    throw error;
  }
}

/**
 * 显示翻译统计
 */
function showStats() {
  printInfo('翻译统计信息：');
  console.log('');
  
  const plugins = readPlugins();
  const translations = readTranslations();
  
  const totalPlugins = plugins.length;
  const translatedCount = Object.keys(translations).length;
  const untranslatedCount = totalPlugins - translatedCount;
  const coverage = (translatedCount / totalPlugins * 100).toFixed(1);
  
  console.log(`总插件数：${totalPlugins}`);
  console.log(`已翻译：${translatedCount} (${coverage}%)`);
  console.log(`未翻译：${untranslatedCount}`);
  console.log('');
  
  // 按分类统计
  const categoryStats = {};
  plugins.forEach(plugin => {
    const category = plugin.category || 'other';
    if (!categoryStats[category]) {
      categoryStats[category] = { total: 0, translated: 0 };
    }
    categoryStats[category].total++;
    if (translations[plugin.id]) {
      categoryStats[category].translated++;
    }
  });
  
  console.log('分类翻译统计：');
  Object.entries(categoryStats)
    .sort((a, b) => b[1].total - a[1].total)
    .forEach(([category, stats]) => {
      const coverage = (stats.translated / stats.total * 100).toFixed(1);
      console.log(`  ${category}: ${stats.translated}/${stats.total} (${coverage}%)`);
    });
}

// ========== 主函数 ==========

function main() {
  const command = process.argv[2] || 'check';
  
  console.log('========================================');
  console.log('插件描述翻译管理');
  console.log('========================================');
  console.log('');
  
  try {
    switch (command) {
      case 'check':
        checkUntranslated();
        break;
      
      case 'generate':
        generateTodoList();
        break;
      
      case 'apply':
        applyTranslations();
        break;
      
      case 'stats':
        showStats();
        break;
      
      default:
        printError(`未知命令: ${command}`);
        console.log('');
        console.log('可用命令：');
        console.log('  check    - 检查未翻译的插件');
        console.log('  generate - 生成待翻译清单');
        console.log('  apply    - 应用翻译记录');
        console.log('  stats    - 显示翻译统计');
        process.exit(1);
    }
    
    console.log('');
    console.log('========================================');
    printSuccess('操作完成！');
    console.log('========================================');
    
  } catch (error) {
    console.log('');
    console.log('========================================');
    printError('操作失败！');
    console.log('========================================');
    console.error(error);
    process.exit(1);
  }
}

// ========== 执行 ==========

if (require.main === module) {
  main();
}

module.exports = {
  checkUntranslated,
  generateTodoList,
  applyTranslations,
  showStats
};

