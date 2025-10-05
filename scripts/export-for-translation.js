/**
 * 导出插件描述用于翻译
 * 
 * 功能：
 * 1. 读取所有插件数据
 * 2. 导出未翻译的插件描述
 * 3. 生成易于翻译的JSON文件
 * 
 * 使用方法：
 * node scripts/export-for-translation.js
 * 
 * 输出文件：
 * - translations/to-translate.json - 待翻译的插件列表
 * - translations/plugin-translations.json - 翻译数据文件（如果不存在则创建）
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
const TRANSLATIONS_FILE = path.join(TRANSLATIONS_DIR, 'plugin-translations.json');
const TO_TRANSLATE_FILE = path.join(TRANSLATIONS_DIR, 'to-translate.json');

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
    if (!fs.existsSync(TRANSLATIONS_FILE)) {
      return {};
    }
    const data = fs.readFileSync(TRANSLATIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    printError(`读取翻译数据失败: ${error.message}`);
    return {};
  }
}

/**
 * 导出待翻译列表
 */
function exportForTranslation() {
  printInfo('正在导出待翻译列表...');
  
  const plugins = readPlugins();
  const translations = readTranslations();
  
  // 筛选未翻译的插件
  const toTranslate = plugins
    .filter(plugin => !translations[plugin.id])
    .sort((a, b) => b.downloads - a.downloads) // 按下载量排序
    .map((plugin, index) => ({
      priority: index + 1,
      id: plugin.id,
      name: plugin.name,
      description: plugin.description,
      downloads: plugin.downloads,
      category: plugin.category || 'other'
    }));
  
  // 确保目录存在
  if (!fs.existsSync(TRANSLATIONS_DIR)) {
    fs.mkdirSync(TRANSLATIONS_DIR, { recursive: true });
  }
  
  // 保存待翻译列表
  const exportData = {
    generatedAt: new Date().toISOString(),
    totalPlugins: plugins.length,
    translatedCount: Object.keys(translations).length,
    toTranslateCount: toTranslate.length,
    coverage: ((Object.keys(translations).length / plugins.length) * 100).toFixed(2) + '%',
    items: toTranslate
  };
  
  fs.writeFileSync(TO_TRANSLATE_FILE, JSON.stringify(exportData, null, 2), 'utf8');
  
  printSuccess(`待翻译列表已导出: ${TO_TRANSLATE_FILE}`);
  printInfo(`  - 总插件数: ${exportData.totalPlugins}`);
  printInfo(`  - 已翻译: ${exportData.translatedCount}`);
  printInfo(`  - 待翻译: ${exportData.toTranslateCount}`);
  printInfo(`  - 翻译覆盖率: ${exportData.coverage}`);
  
  // 如果翻译文件不存在，创建一个空的模板
  if (!fs.existsSync(TRANSLATIONS_FILE)) {
    const template = {
      "_comment": "插件翻译数据文件",
      "_instructions": "每个插件ID对应一个翻译对象，包含description（翻译后的描述）和notes（补充说明）",
      "_example": {
        "plugin-id": {
          "description": "翻译后的插件描述",
          "notes": "补充说明（可选）",
          "translatedAt": "2025-10-05T12:00:00.000Z"
        }
      }
    };
    
    fs.writeFileSync(TRANSLATIONS_FILE, JSON.stringify(template, null, 2), 'utf8');
    printSuccess(`翻译数据文件已创建: ${TRANSLATIONS_FILE}`);
  }
  
  return exportData;
}

// ========== 主函数 ==========

function main() {
  console.log('========================================');
  console.log('导出插件描述用于翻译');
  console.log('========================================');
  console.log('');
  
  try {
    const result = exportForTranslation();
    
    console.log('');
    console.log('========================================');
    console.log('下一步操作：');
    console.log('========================================');
    console.log('');
    console.log('1. 打开文件：translations/to-translate.json');
    console.log('2. 使用AI工具（如ChatGPT）批量翻译描述');
    console.log('3. 将翻译结果填入：translations/plugin-translations.json');
    console.log('   格式：');
    console.log('   {');
    console.log('     "plugin-id": {');
    console.log('       "description": "翻译后的描述",');
    console.log('       "notes": "补充说明（可选）",');
    console.log('       "translatedAt": "2025-10-05T12:00:00.000Z"');
    console.log('     }');
    console.log('   }');
    console.log('');
    console.log('4. 运行：node scripts/apply-translations.js');
    console.log('');
    console.log('========================================');
    printSuccess('导出完成！');
    console.log('========================================');
    
  } catch (error) {
    console.log('');
    console.log('========================================');
    printError('导出失败！');
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
  exportForTranslation
};

