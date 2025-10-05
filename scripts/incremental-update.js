/**
 * 增量更新模块
 * 
 * 功能：
 * 1. 计算插件数据哈希值
 * 2. 检测插件数据变化
 * 3. 管理历史数据
 * 4. 生成变更报告
 * 
 * 作者：Augment AI Agent
 * 创建日期：2025-10-05
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// ========== 配置 ==========

const DATA_DIR = path.join(__dirname, '../data');
const HISTORY_FILE = path.join(DATA_DIR, 'plugin-history.json');
const CHANGES_FILE = path.join(DATA_DIR, 'plugin-changes.json');

// ========== 哈希计算 ==========

/**
 * 计算插件数据的哈希值
 * @param {Object} plugin - 插件数据对象
 * @returns {string} MD5 哈希值（32 个字符）
 */
function calculatePluginHash(plugin) {
  // 只包含影响页面内容的关键字段
  const data = {
    id: plugin.id,
    name: plugin.name,
    description: plugin.description,
    author: plugin.author,
    downloads: plugin.downloads,
    updated: plugin.updated,
    created: plugin.created,
    category: plugin.category
  };
  
  // 对键进行排序，确保顺序一致
  const sortedKeys = Object.keys(data).sort();
  const sortedData = {};
  sortedKeys.forEach(key => {
    sortedData[key] = data[key];
  });
  
  // 转换为 JSON 字符串
  const jsonString = JSON.stringify(sortedData);
  
  // 计算 MD5 哈希值
  return crypto.createHash('md5').update(jsonString).digest('hex');
}

// ========== 历史数据管理 ==========

/**
 * 加载历史数据
 * @returns {Object} 历史数据对象
 */
function loadHistory() {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      const data = fs.readFileSync(HISTORY_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('⚠ 读取历史数据失败:', error.message);
  }
  
  // 返回空的历史数据结构
  return {
    _comment: "插件历史数据，用于增量更新",
    _lastUpdated: "",
    _version: "1.0.0",
    _totalPlugins: 0,
    plugins: {}
  };
}

/**
 * 保存历史数据
 * @param {Object} history - 历史数据对象
 */
function saveHistory(history) {
  try {
    // 更新元数据
    history._lastUpdated = new Date().toISOString();
    history._totalPlugins = Object.keys(history.plugins).length;
    
    // 确保目录存在
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    // 保存历史数据
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8');
    console.log(`✓ 历史数据已保存: ${HISTORY_FILE}`);
    console.log(`  - 插件总数: ${history._totalPlugins}`);
  } catch (error) {
    console.error('✗ 保存历史数据失败:', error.message);
    throw error;
  }
}

/**
 * 更新历史数据
 * @param {Array} plugins - 插件数据数组
 * @returns {Object} 更新后的历史数据
 */
function updateHistory(plugins) {
  const history = loadHistory();
  
  // 更新每个插件的数据和哈希值
  plugins.forEach(plugin => {
    const hash = calculatePluginHash(plugin);
    
    history.plugins[plugin.id] = {
      name: plugin.name,
      description: plugin.description,
      author: plugin.author,
      downloads: plugin.downloads,
      updated: plugin.updated,
      created: plugin.created,
      category: plugin.category,
      hash: hash
    };
  });
  
  return history;
}

// ========== 变更检测 ==========

/**
 * 检测插件数据变化
 * @param {Array} newPlugins - 最新的插件数据数组
 * @returns {Object} 变更信息对象
 */
function detectChanges(newPlugins) {
  console.log('正在检测插件数据变化...');
  
  // 加载历史数据
  const history = loadHistory();
  const oldPlugins = history.plugins || {};
  
  // 初始化变更统计
  const changes = {
    added: [],
    updated: [],
    unchanged: [],
    removed: []
  };
  
  // 创建新插件 ID 集合
  const newIds = new Set(newPlugins.map(p => p.id));
  const oldIds = new Set(Object.keys(oldPlugins));
  
  // 检测新增和更新
  newPlugins.forEach(plugin => {
    const pluginId = plugin.id;
    const newHash = calculatePluginHash(plugin);
    
    if (!oldIds.has(pluginId)) {
      // 新增的插件
      changes.added.push(pluginId);
    } else {
      // 对比哈希值
      const oldHash = oldPlugins[pluginId].hash;
      
      if (oldHash !== newHash) {
        // 更新的插件
        changes.updated.push(pluginId);
      } else {
        // 未变化的插件
        changes.unchanged.push(pluginId);
      }
    }
  });
  
  // 检测删除的插件
  oldIds.forEach(pluginId => {
    if (!newIds.has(pluginId)) {
      changes.removed.push(pluginId);
    }
  });
  
  // 输出统计信息
  console.log('✓ 变更检测完成');
  console.log(`  - 插件总数: ${newPlugins.length}`);
  console.log(`  - 新增插件: ${changes.added.length}`);
  console.log(`  - 更新插件: ${changes.updated.length}`);
  console.log(`  - 未变化插件: ${changes.unchanged.length}`);
  console.log(`  - 删除插件: ${changes.removed.length}`);
  
  return changes;
}

/**
 * 获取需要生成页面的插件列表
 * @param {Object} changes - 变更信息对象
 * @returns {Array} 需要生成页面的插件 ID 数组
 */
function getPluginsToGenerate(changes) {
  // 新增和更新的插件都需要重新生成页面
  return [...changes.added, ...changes.updated];
}

// ========== 变更报告 ==========

/**
 * 保存变更报告
 * @param {Object} changes - 变更信息对象
 * @param {number} totalPlugins - 插件总数
 */
function saveChangesReport(changes, totalPlugins) {
  try {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: totalPlugins,
        added: changes.added.length,
        updated: changes.updated.length,
        unchanged: changes.unchanged.length,
        removed: changes.removed.length
      },
      changes: {
        added: changes.added,
        updated: changes.updated,
        removed: changes.removed
      }
    };
    
    // 确保目录存在
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    // 保存变更报告
    fs.writeFileSync(CHANGES_FILE, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`✓ 变更报告已保存: ${CHANGES_FILE}`);
  } catch (error) {
    console.error('✗ 保存变更报告失败:', error.message);
  }
}

/**
 * 生成变更摘要
 * @param {Object} changes - 变更信息对象
 * @param {number} totalPlugins - 插件总数
 * @returns {string} 变更摘要文本
 */
function generateChangesSummary(changes, totalPlugins) {
  const toGenerate = getPluginsToGenerate(changes);
  const percentage = totalPlugins > 0 
    ? ((toGenerate.length / totalPlugins) * 100).toFixed(1)
    : 0;
  
  let summary = '\n========================================\n';
  summary += '增量更新摘要\n';
  summary += '========================================\n\n';
  summary += `插件总数: ${totalPlugins}\n`;
  summary += `新增插件: ${changes.added.length}\n`;
  summary += `更新插件: ${changes.updated.length}\n`;
  summary += `未变化插件: ${changes.unchanged.length}\n`;
  summary += `删除插件: ${changes.removed.length}\n\n`;
  summary += `需要生成页面: ${toGenerate.length} 个 (${percentage}%)\n`;
  summary += `跳过生成页面: ${changes.unchanged.length} 个 (${(100 - percentage).toFixed(1)}%)\n`;
  
  if (toGenerate.length > 0 && toGenerate.length <= 10) {
    summary += '\n需要生成的插件:\n';
    toGenerate.forEach(id => {
      summary += `  - ${id}\n`;
    });
  }
  
  summary += '\n========================================\n';
  
  return summary;
}

// ========== 导出 ==========

module.exports = {
  calculatePluginHash,
  loadHistory,
  saveHistory,
  updateHistory,
  detectChanges,
  getPluginsToGenerate,
  saveChangesReport,
  generateChangesSummary
};

