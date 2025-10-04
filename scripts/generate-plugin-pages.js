/**
 * Obsidian 插件详情页面生成脚本
 * 
 * 功能：
 * 1. 读取插件数据（plugins.json）
 * 2. 读取页面模板（plugin-detail.md）
 * 3. 替换模板变量生成插件详情页面
 * 4. 同步页面（新增/删除）
 * 
 * 作者：Augment AI Agent
 * 创建日期：2025-10-04
 */

const fs = require('fs');
const path = require('path');

// ========== 配置常量 ==========

// 数据文件路径
const PLUGINS_DATA_PATH = path.join(__dirname, '../docs/src/.vuepress/public/data/plugins.json');

// 模板文件路径
const TEMPLATE_PATH = path.join(__dirname, 'templates/plugin-detail.md');

// 输出目录路径
const OUTPUT_DIR = path.join(__dirname, '../docs/src/zh/plugins');

// 需要排除的文件（不会被删除）
const EXCLUDED_FILES = ['README.md', 'dataview.md', 'templater-obsidian.md', 'obsidian-kanban.md'];

// ========== 工具函数 ==========

/**
 * 格式化数字（添加千位分隔符）
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * 格式化日期（时间戳转为 YYYY-MM-DD 格式）
 * @param {number} timestamp - 时间戳（毫秒）
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 转义 YAML frontmatter 中的特殊字符
 * @param {string} str - 要转义的字符串
 * @returns {string} 转义后的字符串（如果包含特殊字符则用单引号包裹）
 */
function escapeYamlString(str) {
  if (typeof str !== 'string') return str;

  // 检查是否包含需要转义的字符
  const needsQuoting = /[:"'#\[\]{}|>@`!%&*]/.test(str) || str.includes('\n');

  if (needsQuoting) {
    // 使用单引号包裹，并转义单引号
    return `'${str.replace(/'/g, "''")}'`;
  }

  return str;
}

/**
 * 转义 HTML 属性中的特殊字符
 * @param {string} str - 需要转义的字符串
 * @returns {string} 转义后的字符串
 */
function escapeHtmlAttr(str) {
  if (typeof str !== 'string') return str;
  // 转义 HTML 属性中的双引号和其他特殊字符
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * 转义 Markdown 内容中的特殊字符
 * @param {string} str - 需要转义的字符串
 * @returns {string} 转义后的字符串
 */
function escapeMarkdownChars(str) {
  if (typeof str !== 'string') return str;
  // 转义 Markdown 中的特殊字符
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

// ========== 核心函数 ==========

/**
 * 读取插件数据
 * @returns {Array} 插件数据数组
 */
function readPluginsData() {
  try {
    console.log('正在读取插件数据...');
    console.log(`数据文件路径: ${PLUGINS_DATA_PATH}`);
    
    if (!fs.existsSync(PLUGINS_DATA_PATH)) {
      throw new Error(`插件数据文件不存在: ${PLUGINS_DATA_PATH}`);
    }
    
    const data = fs.readFileSync(PLUGINS_DATA_PATH, 'utf8');
    const plugins = JSON.parse(data);
    
    console.log(`✓ 成功读取 ${plugins.length} 个插件数据`);
    return plugins;
    
  } catch (error) {
    console.error('✗ 读取插件数据失败:', error.message);
    throw error;
  }
}

/**
 * 读取模板文件
 * @returns {string} 模板内容
 */
function readTemplate() {
  try {
    console.log('正在读取模板文件...');
    console.log(`模板文件路径: ${TEMPLATE_PATH}`);
    
    if (!fs.existsSync(TEMPLATE_PATH)) {
      throw new Error(`模板文件不存在: ${TEMPLATE_PATH}`);
    }
    
    const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    
    console.log(`✓ 成功读取模板文件 (${template.length} 字符)`);
    return template;
    
  } catch (error) {
    console.error('✗ 读取模板文件失败:', error.message);
    throw error;
  }
}

/**
 * 替换模板变量
 * @param {string} template - 模板内容
 * @param {Object} plugin - 插件数据对象
 * @returns {string} 替换后的内容
 */
function replaceVariables(template, plugin) {
  try {
    let content = template;

    // 分离 frontmatter 和内容部分
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontmatterMatch) {
      throw new Error('模板格式错误：未找到 frontmatter');
    }

    let frontmatter = frontmatterMatch[1];
    let body = frontmatterMatch[2];

    // 替换 frontmatter 中的变量（使用 YAML 转义）
    frontmatter = frontmatter.replace(/\{\{name\}\}/g, escapeYamlString(plugin.name) || '');
    frontmatter = frontmatter.replace(/\{\{description\}\}/g, escapeYamlString(plugin.description) || '');
    frontmatter = frontmatter.replace(/\{\{author\}\}/g, escapeYamlString(plugin.author) || '');
    frontmatter = frontmatter.replace(/\{\{repo\}\}/g, plugin.repo || '');
    frontmatter = frontmatter.replace(/\{\{version\}\}/g, plugin.latestVersion || plugin.version || '1.0.0');
    frontmatter = frontmatter.replace(/\{\{category\}\}/g, plugin.category || '其他');
    frontmatter = frontmatter.replace(/\{\{icon\}\}/g, plugin.icon || 'plugin');
    frontmatter = frontmatter.replace(/\{\{downloads\}\}/g, plugin.downloads || 0);
    frontmatter = frontmatter.replace(/\{\{updated\}\}/g, plugin.updated || Date.now());

    // 替换 body 中的变量
    // 在 PluginDetail 组件属性中使用 HTML 转义
    body = body.replace(/\{\{id\}\}/g, plugin.id || '');
    body = body.replace(/\{\{name\}\}/g, escapeHtmlAttr(plugin.name) || '');
    body = body.replace(/\{\{description\}\}/g, escapeHtmlAttr(plugin.description) || '');
    body = body.replace(/\{\{author\}\}/g, escapeHtmlAttr(plugin.author) || '');
    body = body.replace(/\{\{repo\}\}/g, plugin.repo || '');
    body = body.replace(/\{\{version\}\}/g, plugin.latestVersion || plugin.version || '1.0.0');
    body = body.replace(/\{\{category\}\}/g, plugin.category || '其他');
    body = body.replace(/\{\{icon\}\}/g, plugin.icon || 'plugin');
    body = body.replace(/\{\{downloads\}\}/g, plugin.downloads || 0);
    body = body.replace(/\{\{updated\}\}/g, plugin.updated || Date.now());

    // 格式化字段替换
    body = body.replace(/\{\{downloadsFormatted\}\}/g, formatNumber(plugin.downloads || 0));
    body = body.replace(/\{\{updatedDate\}\}/g, formatDate(plugin.updated || Date.now()));

    // 重新组合
    content = `---\n${frontmatter}\n---\n${body}`;

    return content;

  } catch (error) {
    console.error(`✗ 替换变量失败 (插件: ${plugin.id}):`, error.message);
    throw error;
  }
}

/**
 * 生成单个插件页面
 * @param {Object} plugin - 插件数据对象
 * @param {string} template - 模板内容
 * @returns {string} 生成的页面内容
 */
function generatePluginPage(plugin, template) {
  try {
    const content = replaceVariables(template, plugin);
    return content;
  } catch (error) {
    console.error(`✗ 生成插件页面失败 (插件: ${plugin.id}):`, error.message);
    throw error;
  }
}

/**
 * 保存插件页面
 * @param {string} pluginId - 插件 ID
 * @param {string} content - 页面内容
 */
function savePluginPage(pluginId, content) {
  try {
    // 确保输出目录存在
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      console.log(`✓ 创建输出目录: ${OUTPUT_DIR}`);
    }
    
    // 生成文件路径
    const filePath = path.join(OUTPUT_DIR, `${pluginId}.md`);
    
    // 保存文件
    fs.writeFileSync(filePath, content, 'utf8');
    
    return filePath;
    
  } catch (error) {
    console.error(`✗ 保存插件页面失败 (插件: ${pluginId}):`, error.message);
    throw error;
  }
}

/**
 * 生成所有插件页面
 * @param {Array} plugins - 插件数据数组
 * @param {string} template - 模板内容
 * @returns {Object} 生成结果统计
 */
function generateAllPages(plugins, template) {
  console.log('\n========================================');
  console.log('开始生成插件页面');
  console.log('========================================\n');
  
  let successCount = 0;
  let failCount = 0;
  const failedPlugins = [];
  
  plugins.forEach((plugin, index) => {
    try {
      // 显示进度
      if ((index + 1) % 100 === 0 || index === 0 || index === plugins.length - 1) {
        console.log(`进度: ${index + 1}/${plugins.length} (${((index + 1) / plugins.length * 100).toFixed(1)}%)`);
      }
      
      // 生成页面内容
      const content = generatePluginPage(plugin, template);
      
      // 保存页面
      savePluginPage(plugin.id, content);
      
      successCount++;
      
    } catch (error) {
      failCount++;
      failedPlugins.push({
        id: plugin.id,
        name: plugin.name,
        error: error.message
      });
    }
  });
  
  console.log('\n========================================');
  console.log('页面生成完成');
  console.log('========================================');
  console.log(`✓ 成功: ${successCount} 个`);
  console.log(`✗ 失败: ${failCount} 个`);
  
  if (failedPlugins.length > 0) {
    console.log('\n失败的插件:');
    failedPlugins.forEach(p => {
      console.log(`  - ${p.id} (${p.name}): ${p.error}`);
    });
  }
  
  return {
    total: plugins.length,
    success: successCount,
    fail: failCount,
    failedPlugins
  };
}

// ========== 页面同步函数 ==========

/**
 * 获取现有页面列表
 * @returns {Array} 现有页面的插件 ID 列表
 */
function getExistingPages() {
  try {
    console.log('正在扫描现有页面...');

    if (!fs.existsSync(OUTPUT_DIR)) {
      console.log('输出目录不存在，将创建新目录');
      return [];
    }

    const files = fs.readdirSync(OUTPUT_DIR);
    const pluginIds = files
      .filter(file => file.endsWith('.md'))
      .filter(file => !EXCLUDED_FILES.includes(file))
      .map(file => file.replace('.md', ''));

    console.log(`✓ 找到 ${pluginIds.length} 个现有页面`);
    return pluginIds;

  } catch (error) {
    console.error('✗ 扫描现有页面失败:', error.message);
    throw error;
  }
}

/**
 * 检测需要新建的插件
 * @param {Array} allPlugins - 所有插件数据
 * @param {Array} existingPages - 现有页面 ID 列表
 * @returns {Array} 需要新建的插件列表
 */
function detectNewPlugins(allPlugins, existingPages) {
  const existingSet = new Set(existingPages);
  const newPlugins = allPlugins.filter(plugin => !existingSet.has(plugin.id));

  console.log(`✓ 检测到 ${newPlugins.length} 个新插件`);
  return newPlugins;
}

/**
 * 检测需要删除的插件页面
 * @param {Array} allPlugins - 所有插件数据
 * @param {Array} existingPages - 现有页面 ID 列表
 * @returns {Array} 需要删除的页面 ID 列表
 */
function detectRemovedPlugins(allPlugins, existingPages) {
  const currentPluginIds = new Set(allPlugins.map(p => p.id));
  const removedPages = existingPages.filter(pageId => !currentPluginIds.has(pageId));

  console.log(`✓ 检测到 ${removedPages.length} 个已移除的插件`);
  return removedPages;
}

/**
 * 删除插件页面
 * @param {string} pluginId - 插件 ID
 */
function deletePluginPage(pluginId) {
  try {
    // 安全检查：防止删除排除列表中的文件
    if (EXCLUDED_FILES.includes(`${pluginId}.md`)) {
      console.log(`⚠ 跳过删除受保护的文件: ${pluginId}.md`);
      return false;
    }

    const filePath = path.join(OUTPUT_DIR, `${pluginId}.md`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✓ 已删除: ${pluginId}.md`);
      return true;
    } else {
      console.log(`⚠ 文件不存在: ${pluginId}.md`);
      return false;
    }

  } catch (error) {
    console.error(`✗ 删除页面失败 (插件: ${pluginId}):`, error.message);
    throw error;
  }
}

/**
 * 同步页面
 * @param {Array} plugins - 所有插件数据
 * @param {string} template - 模板内容
 * @returns {Object} 同步结果统计
 */
function syncPages(plugins, template) {
  console.log('\n========================================');
  console.log('开始同步插件页面');
  console.log('========================================\n');

  // 1. 获取现有页面
  const existingPages = getExistingPages();

  // 2. 检测新增插件
  const newPlugins = detectNewPlugins(plugins, existingPages);

  // 3. 检测已移除插件
  const removedPages = detectRemovedPlugins(plugins, existingPages);

  // 4. 生成新插件页面
  let newPagesCount = 0;
  let newPagesFailed = 0;

  if (newPlugins.length > 0) {
    console.log(`\n正在生成 ${newPlugins.length} 个新插件页面...`);
    newPlugins.forEach((plugin, index) => {
      try {
        const content = generatePluginPage(plugin, template);
        savePluginPage(plugin.id, content);
        newPagesCount++;

        if ((index + 1) % 50 === 0) {
          console.log(`  进度: ${index + 1}/${newPlugins.length}`);
        }
      } catch (error) {
        newPagesFailed++;
        console.error(`  ✗ 生成失败: ${plugin.id}`);
      }
    });
    console.log(`✓ 新增页面: ${newPagesCount} 个`);
  } else {
    console.log('✓ 没有需要新增的页面');
  }

  // 5. 删除已移除插件的页面
  let deletedCount = 0;
  let deleteFailed = 0;

  if (removedPages.length > 0) {
    console.log(`\n正在删除 ${removedPages.length} 个已移除插件的页面...`);
    removedPages.forEach(pageId => {
      try {
        if (deletePluginPage(pageId)) {
          deletedCount++;
        }
      } catch (error) {
        deleteFailed++;
        console.error(`  ✗ 删除失败: ${pageId}`);
      }
    });
    console.log(`✓ 删除页面: ${deletedCount} 个`);
  } else {
    console.log('✓ 没有需要删除的页面');
  }

  // 6. 输出同步报告
  console.log('\n========================================');
  console.log('页面同步完成');
  console.log('========================================');
  console.log(`总插件数: ${plugins.length}`);
  console.log(`现有页面: ${existingPages.length}`);
  console.log(`新增页面: ${newPagesCount} 个`);
  console.log(`删除页面: ${deletedCount} 个`);
  console.log(`当前页面: ${existingPages.length + newPagesCount - deletedCount} 个`);

  if (newPagesFailed > 0 || deleteFailed > 0) {
    console.log(`\n⚠ 警告:`);
    if (newPagesFailed > 0) console.log(`  - 新增失败: ${newPagesFailed} 个`);
    if (deleteFailed > 0) console.log(`  - 删除失败: ${deleteFailed} 个`);
  }

  return {
    total: plugins.length,
    existing: existingPages.length,
    newPages: newPagesCount,
    deletedPages: deletedCount,
    newPagesFailed,
    deleteFailed
  };
}

// ========== 导出函数 ==========

module.exports = {
  readPluginsData,
  readTemplate,
  replaceVariables,
  generatePluginPage,
  savePluginPage,
  generateAllPages,
  getExistingPages,
  detectNewPlugins,
  detectRemovedPlugins,
  deletePluginPage,
  syncPages,
  formatNumber,
  formatDate,
  escapeYamlString,
  escapeHtmlAttr,
  escapeMarkdownChars
};

// ========== 主函数（如果直接运行此脚本） ==========

async function main() {
  try {
    console.log('========================================');
    console.log('Obsidian 插件页面生成工具');
    console.log('========================================\n');

    // 1. 读取插件数据
    const plugins = readPluginsData();

    // 2. 读取模板
    const template = readTemplate();

    // 3. 同步页面
    const result = syncPages(plugins, template);

    console.log('\n✓ 所有任务完成！');

    return result;

  } catch (error) {
    console.error('\n========================================');
    console.error('错误: 页面生成失败');
    console.error('========================================');
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

