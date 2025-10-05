/**
 * 应用插件翻译
 * 
 * 功能：
 * 1. 读取翻译数据文件
 * 2. 将翻译数据保存到独立的JSON文件
 * 3. 前端显示时动态合并翻译内容
 * 
 * 使用方法：
 * node scripts/apply-translations.js
 * 
 * 输入文件：
 * - translations/plugin-translations.json - 翻译数据
 * 
 * 输出文件：
 * - docs/src/.vuepress/public/data/plugin-translations.json - 前端使用的翻译数据
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
const SOURCE_TRANSLATIONS_FILE = path.join(TRANSLATIONS_DIR, 'plugin-translations.json');
const OUTPUT_TRANSLATIONS_FILE = path.join(DATA_DIR, 'plugin-translations.json');

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
 * 读取翻译数据
 */
function readTranslations() {
  try {
    if (!fs.existsSync(SOURCE_TRANSLATIONS_FILE)) {
      printError(`翻译数据文件不存在: ${SOURCE_TRANSLATIONS_FILE}`);
      printInfo('请先运行: node scripts/export-for-translation.js');
      process.exit(1);
    }
    const data = fs.readFileSync(SOURCE_TRANSLATIONS_FILE, 'utf8');
    const translations = JSON.parse(data);
    
    // 过滤掉注释和示例
    const filtered = {};
    for (const [key, value] of Object.entries(translations)) {
      if (!key.startsWith('_')) {
        filtered[key] = value;
      }
    }
    
    return filtered;
  } catch (error) {
    printError(`读取翻译数据失败: ${error.message}`);
    process.exit(1);
  }
}

/**
 * 应用翻译
 */
function applyTranslations() {
  printInfo('正在应用翻译...');
  
  const plugins = readPlugins();
  const translations = readTranslations();
  
  // 统计信息
  const stats = {
    totalPlugins: plugins.length,
    translatedCount: Object.keys(translations).length,
    withNotes: 0,
    coverage: 0
  };
  
  // 统计有补充说明的插件数量
  for (const translation of Object.values(translations)) {
    if (translation.notes) {
      stats.withNotes++;
    }
  }
  
  stats.coverage = ((stats.translatedCount / stats.totalPlugins) * 100).toFixed(2) + '%';
  
  // 保存翻译数据到前端可访问的位置
  fs.writeFileSync(OUTPUT_TRANSLATIONS_FILE, JSON.stringify(translations, null, 2), 'utf8');
  
  printSuccess(`翻译数据已保存: ${OUTPUT_TRANSLATIONS_FILE}`);
  printInfo(`  - 总插件数: ${stats.totalPlugins}`);
  printInfo(`  - 已翻译: ${stats.translatedCount}`);
  printInfo(`  - 有补充说明: ${stats.withNotes}`);
  printInfo(`  - 翻译覆盖率: ${stats.coverage}`);
  
  return stats;
}

// ========== 主函数 ==========

function main() {
  console.log('========================================');
  console.log('应用插件翻译');
  console.log('========================================');
  console.log('');
  
  try {
    const stats = applyTranslations();
    
    console.log('');
    console.log('========================================');
    console.log('下一步操作：');
    console.log('========================================');
    console.log('');
    console.log('1. 翻译数据已保存到前端可访问的位置');
    console.log('2. 前端组件会自动加载并合并翻译数据');
    console.log('3. 如果有新插件需要翻译：');
    console.log('   - 运行：node scripts/export-for-translation.js');
    console.log('   - 翻译新插件的描述');
    console.log('   - 再次运行：node scripts/apply-translations.js');
    console.log('');
    console.log('========================================');
    printSuccess('应用完成！');
    console.log('========================================');
    
  } catch (error) {
    console.log('');
    console.log('========================================');
    printError('应用失败！');
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
  applyTranslations
};

