/**
 * 生成分片统计数据脚本
 * 
 * 功能：
 * 1. 读取完整的插件数据和统计数据
 * 2. 生成分片的统计数据文件
 * 3. 优化数据加载性能
 * 
 * 输出文件：
 * - stats/summary.json          # 基础统计（5KB）
 * - stats/rankings-downloads.json   # 总下载量排行（20KB）
 * - stats/rankings-weekly.json      # 周下载量排行（20KB）
 * - stats/rankings-monthly.json     # 月下载量排行（20KB）
 * 
 * 使用方法：
 * node scripts/generate-sharded-stats.js
 * 
 * 作者：Augment AI Agent
 * 创建日期：2025-10-05
 */

const fs = require('fs');
const path = require('path');

// ========== 配置 ==========

const DATA_DIR = path.join(__dirname, '../docs/src/.vuepress/public/data');
const STATS_DIR = path.join(DATA_DIR, 'stats');
const PLUGINS_FILE = path.join(DATA_DIR, 'plugins.json');
const OLD_STATS_FILE = path.join(DATA_DIR, 'plugin-stats.json');

const VERSION = '1.0.0';

// ========== 工具函数 ==========

/**
 * 打印成功消息
 * @param {string} message - 消息文本
 */
function printSuccess(message) {
  console.log(`✓ ${message}`);
}

/**
 * 打印错误消息
 * @param {string} message - 消息文本
 */
function printError(message) {
  console.error(`✗ ${message}`);
}

/**
 * 打印信息消息
 * @param {string} message - 消息文本
 */
function printInfo(message) {
  console.log(`ℹ ${message}`);
}

/**
 * 计算中位数
 * @param {number[]} numbers - 数字数组
 * @returns {number} 中位数
 */
function calculateMedian(numbers) {
  if (numbers.length === 0) return 0;
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return Math.floor((sorted[mid - 1] + sorted[mid]) / 2);
  } else {
    return sorted[mid];
  }
}

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string} 格式化的文件大小
 */
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// ========== 数据读取 ==========

/**
 * 读取插件数据
 * @returns {Array} 插件数据数组
 */
function readPluginsData() {
  try {
    printInfo('正在读取插件数据...');
    const data = fs.readFileSync(PLUGINS_FILE, 'utf8');
    const plugins = JSON.parse(data);
    printSuccess(`读取到 ${plugins.length} 个插件`);
    return plugins;
  } catch (error) {
    printError(`读取插件数据失败: ${error.message}`);
    process.exit(1);
  }
}

/**
 * 读取旧的统计数据
 * @returns {Object} 统计数据对象
 */
function readOldStatsData() {
  try {
    printInfo('正在读取统计数据...');
    const data = fs.readFileSync(OLD_STATS_FILE, 'utf8');
    const stats = JSON.parse(data);
    printSuccess('统计数据读取完成');
    return stats;
  } catch (error) {
    printError(`读取统计数据失败: ${error.message}`);
    process.exit(1);
  }
}

// ========== 数据生成 ==========

/**
 * 生成基础统计数据
 * @param {Array} plugins - 插件数据数组
 * @param {Object} oldStats - 旧的统计数据
 * @returns {Object} 基础统计数据
 */
function generateSummary(plugins, oldStats) {
  printInfo('正在生成基础统计数据...');
  
  const now = Date.now();
  const totalDownloads = plugins.reduce((sum, p) => sum + p.downloads, 0);
  const downloads = plugins.map(p => p.downloads);
  
  const summary = {
    version: VERSION,
    lastUpdated: now,
    totalPlugins: plugins.length,
    totalDownloads,
    weeklyNewPlugins: oldStats.weeklyNewPlugins || 0,
    monthlyNewPlugins: oldStats.monthlyNewPlugins || 0,
    averageDownloads: Math.floor(totalDownloads / plugins.length),
    medianDownloads: calculateMedian(downloads),
    dataFiles: {
      rankingsDownloads: '/data/stats/rankings-downloads.json',
      rankingsWeekly: '/data/stats/rankings-weekly.json',
      rankingsMonthly: '/data/stats/rankings-monthly.json'
    }
  };
  
  printSuccess('基础统计数据生成完成');
  return summary;
}

/**
 * 生成排行榜数据
 * @param {string} type - 排行榜类型（downloads/weekly/monthly）
 * @param {Array} rankingData - 排行榜数据数组
 * @returns {Object} 排行榜数据对象
 */
function generateRanking(type, rankingData) {
  printInfo(`正在生成 ${type} 排行榜数据...`);
  
  const ranking = {
    version: VERSION,
    lastUpdated: Date.now(),
    type,
    data: rankingData.map((plugin, index) => ({
      rank: index + 1,
      ...plugin
    }))
  };
  
  printSuccess(`${type} 排行榜数据生成完成（${ranking.data.length} 个插件）`);
  return ranking;
}

// ========== 数据保存 ==========

/**
 * 确保目录存在
 * @param {string} dir - 目录路径
 */
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    printSuccess(`创建目录: ${dir}`);
  }
}

/**
 * 保存 JSON 文件
 * @param {string} filePath - 文件路径
 * @param {Object} data - 数据对象
 * @param {string} description - 文件描述
 */
function saveJSONFile(filePath, data, description) {
  try {
    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, json, 'utf8');
    
    const size = Buffer.byteLength(json, 'utf8');
    printSuccess(`${description}已保存: ${path.basename(filePath)} (${formatFileSize(size)})`);
  } catch (error) {
    printError(`保存${description}失败: ${error.message}`);
    throw error;
  }
}

/**
 * 保存所有分片数据
 * @param {Object} summary - 基础统计数据
 * @param {Object} rankingsDownloads - 总下载量排行
 * @param {Object} rankingsWeekly - 周下载量排行
 * @param {Object} rankingsMonthly - 月下载量排行
 */
function saveShardedData(summary, rankingsDownloads, rankingsWeekly, rankingsMonthly) {
  printInfo('正在保存分片数据...');
  
  // 确保 stats 目录存在
  ensureDirectoryExists(STATS_DIR);
  
  // 保存各个文件
  saveJSONFile(
    path.join(STATS_DIR, 'summary.json'),
    summary,
    '基础统计数据'
  );
  
  saveJSONFile(
    path.join(STATS_DIR, 'rankings-downloads.json'),
    rankingsDownloads,
    '总下载量排行'
  );
  
  saveJSONFile(
    path.join(STATS_DIR, 'rankings-weekly.json'),
    rankingsWeekly,
    '周下载量排行'
  );
  
  saveJSONFile(
    path.join(STATS_DIR, 'rankings-monthly.json'),
    rankingsMonthly,
    '月下载量排行'
  );
  
  printSuccess('所有分片数据保存完成');
}

// ========== 主函数 ==========

/**
 * 主函数
 */
function main() {
  console.log('========================================');
  console.log('生成分片统计数据');
  console.log('========================================');
  console.log('');
  
  try {
    // 1. 读取数据
    const plugins = readPluginsData();
    const oldStats = readOldStatsData();
    
    console.log('');
    
    // 2. 生成分片数据
    const summary = generateSummary(plugins, oldStats);
    const rankingsDownloads = generateRanking('downloads', oldStats.topByDownloads || []);
    const rankingsWeekly = generateRanking('weekly', oldStats.topByWeekly || []);
    const rankingsMonthly = generateRanking('monthly', oldStats.topByMonthly || []);
    
    console.log('');
    
    // 3. 保存数据
    saveShardedData(summary, rankingsDownloads, rankingsWeekly, rankingsMonthly);
    
    console.log('');
    console.log('========================================');
    printSuccess('分片统计数据生成完成！');
    console.log('========================================');
    
    // 4. 输出摘要
    console.log('');
    console.log('数据摘要:');
    console.log(`  - 插件总数: ${summary.totalPlugins.toLocaleString()}`);
    console.log(`  - 总下载量: ${summary.totalDownloads.toLocaleString()}`);
    console.log(`  - 平均下载量: ${summary.averageDownloads.toLocaleString()}`);
    console.log(`  - 中位下载量: ${summary.medianDownloads.toLocaleString()}`);
    console.log(`  - 本周新增: ${summary.weeklyNewPlugins}`);
    console.log(`  - 本月新增: ${summary.monthlyNewPlugins}`);
    console.log('');
    console.log('生成的文件:');
    console.log(`  - ${path.join('stats', 'summary.json')}`);
    console.log(`  - ${path.join('stats', 'rankings-downloads.json')}`);
    console.log(`  - ${path.join('stats', 'rankings-weekly.json')}`);
    console.log(`  - ${path.join('stats', 'rankings-monthly.json')}`);
    
  } catch (error) {
    console.log('');
    console.log('========================================');
    printError('生成失败！');
    console.log('========================================');
    console.error(error);
    process.exit(1);
  }
}

// ========== 执行 ==========

// 捕获未处理的错误
process.on('uncaughtException', (error) => {
  printError('发生未捕获的错误:');
  console.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  printError('发生未处理的 Promise 拒绝:');
  console.error(reason);
  process.exit(1);
});

// 运行主函数
main();

