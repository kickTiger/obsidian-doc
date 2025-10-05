/**
 * 插件自动分类脚本
 * 
 * 功能：
 * 1. 读取插件数据
 * 2. 基于关键词自动分类
 * 3. 计算分类置信度
 * 4. 生成分类报告和审核清单
 * 
 * 使用方法：
 * node scripts/classify-plugins.js
 * 
 * 作者：Augment AI Agent
 * 创建日期：2025-10-05
 */

const fs = require('fs');
const path = require('path');

// ========== 配置 ==========

const DATA_DIR = path.join(__dirname, '../docs/src/.vuepress/public/data');
const PLUGINS_FILE = path.join(DATA_DIR, 'plugins.json');
const OUTPUT_DIR = path.join(__dirname, '../文档');
const REPORT_FILE = path.join(OUTPUT_DIR, '2025-10-05-插件分类报告.json');
const REVIEW_FILE = path.join(OUTPUT_DIR, '2025-10-05-插件分类审核清单.json');

// 置信度阈值
const CONFIDENCE_THRESHOLDS = {
  HIGH: 2.0,    // 高置信度：自动分类
  MEDIUM: 1.0   // 中置信度：需要审核
};

// ========== 分类规则配置 ==========

const CATEGORY_RULES = {
  'note-taking': {
    name: '笔记增强',
    keywords: ['note', 'markdown', 'writing', 'editor', 'format', 'text', '笔记', '编辑', '格式', '文本'],
    weight: 1.0
  },
  'task-management': {
    name: '任务管理',
    keywords: ['task', 'todo', 'gtd', 'checklist', 'reminder', 'project', '任务', '待办', '清单', '提醒'],
    weight: 1.0
  },
  'data-processing': {
    name: '数据处理',
    keywords: ['dataview', 'query', 'database', 'table', 'data', 'sql', '数据', '查询', '表格', '数据库'],
    weight: 1.0
  },
  'visualization': {
    name: '可视化',
    keywords: ['chart', 'graph', 'diagram', 'mindmap', 'visualization', 'map', '图表', '可视化', '思维导图', '脑图'],
    weight: 1.0
  },
  'drawing': {
    name: '绘图',
    keywords: ['draw', 'sketch', 'canvas', 'excalidraw', 'whiteboard', 'paint', '绘图', '画板', '白板', '手绘'],
    weight: 1.0
  },
  'calendar-time': {
    name: '日历时间',
    keywords: ['calendar', 'date', 'time', 'schedule', 'daily', 'journal', '日历', '时间', '日程', '日记'],
    weight: 1.0
  },
  'template': {
    name: '模板',
    keywords: ['template', 'templater', 'snippet', 'boilerplate', '模板', '模版'],
    weight: 1.0
  },
  'automation': {
    name: '自动化',
    keywords: ['automation', 'workflow', 'script', 'macro', 'auto', '自动化', '工作流', '脚本', '自动'],
    weight: 1.0
  },
  'sync-backup': {
    name: '备份同步',
    keywords: ['sync', 'backup', 'export', 'import', 'git', 'cloud', '同步', '备份', '导出', '导入', '云'],
    weight: 1.0
  },
  'editor-enhancement': {
    name: '编辑增强',
    keywords: ['editor', 'enhance', 'vim', 'shortcut', 'command', 'input', '编辑器', '增强', '快捷键', '命令'],
    weight: 1.0
  },
  'appearance': {
    name: '外观定制',
    keywords: ['theme', 'style', 'css', 'appearance', 'ui', 'color', 'icon', '主题', '样式', '外观', '颜色', '图标'],
    weight: 1.0
  },
  'productivity': {
    name: '效率工具',
    keywords: ['productivity', 'efficiency', 'tool', 'utility', 'quick', '效率', '工具', '快速'],
    weight: 0.8  // 权重较低，避免过度匹配
  },
  'integration': {
    name: '集成',
    keywords: ['integration', 'api', 'service', 'connect', 'publish', 'share', '集成', '发布', '连接', '分享'],
    weight: 1.0
  }
};

// ========== 工具函数 ==========

/**
 * 打印成功消息
 */
function printSuccess(message) {
  console.log(`✓ ${message}`);
}

/**
 * 打印错误消息
 */
function printError(message) {
  console.error(`✗ ${message}`);
}

/**
 * 打印信息消息
 */
function printInfo(message) {
  console.log(`ℹ ${message}`);
}

// ========== 分类算法 ==========

/**
 * 计算插件与分类的匹配度
 */
function calculateCategoryScore(plugin, categoryId) {
  const rule = CATEGORY_RULES[categoryId];
  if (!rule) return 0;
  
  const text = `${plugin.name} ${plugin.description}`.toLowerCase();
  const nameText = plugin.name.toLowerCase();
  
  let score = 0;
  let matchCount = 0;
  
  // 检查每个关键词
  for (const keyword of rule.keywords) {
    const keywordLower = keyword.toLowerCase();
    
    // 描述中包含关键词
    if (text.includes(keywordLower)) {
      matchCount++;
      score += rule.weight;
    }
    
    // 插件名称中包含关键词，额外加分
    if (nameText.includes(keywordLower)) {
      score += 0.5;
    }
  }
  
  return score;
}

/**
 * 自动分类插件
 */
function autoClassifyPlugin(plugin) {
  const scores = {};
  
  // 计算每个分类的得分
  for (const categoryId of Object.keys(CATEGORY_RULES)) {
    scores[categoryId] = calculateCategoryScore(plugin, categoryId);
  }
  
  // 找出得分最高的分类
  let bestCategory = null;
  let bestScore = 0;
  
  for (const [categoryId, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestCategory = categoryId;
    }
  }
  
  // 如果最高分仍然很低，归类为 other
  if (bestScore < CONFIDENCE_THRESHOLDS.MEDIUM) {
    bestCategory = 'other';
  }
  
  return {
    category: bestCategory,
    confidence: bestScore,
    scores: scores
  };
}

// ========== 数据处理 ==========

/**
 * 读取插件数据
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
 * 批量分类插件
 */
function classifyAllPlugins(plugins) {
  printInfo('正在进行批量分类...');
  
  const results = [];
  const stats = {
    total: plugins.length,
    highConfidence: 0,
    mediumConfidence: 0,
    lowConfidence: 0,
    categoryDistribution: {}
  };
  
  // 初始化分类统计
  for (const categoryId of Object.keys(CATEGORY_RULES)) {
    stats.categoryDistribution[categoryId] = 0;
  }
  stats.categoryDistribution['other'] = 0;
  
  // 分类每个插件
  for (const plugin of plugins) {
    const result = autoClassifyPlugin(plugin);
    
    // 添加分类信息到插件数据
    const classifiedPlugin = {
      ...plugin,
      category: result.category,
      categoryConfidence: result.confidence,
      categorySource: 'auto',
      categoryScores: result.scores
    };
    
    results.push(classifiedPlugin);
    
    // 更新统计
    stats.categoryDistribution[result.category]++;
    
    if (result.confidence >= CONFIDENCE_THRESHOLDS.HIGH) {
      stats.highConfidence++;
    } else if (result.confidence >= CONFIDENCE_THRESHOLDS.MEDIUM) {
      stats.mediumConfidence++;
    } else {
      stats.lowConfidence++;
    }
  }
  
  printSuccess(`批量分类完成`);
  printInfo(`  - 高置信度: ${stats.highConfidence} (${(stats.highConfidence / stats.total * 100).toFixed(1)}%)`);
  printInfo(`  - 中置信度: ${stats.mediumConfidence} (${(stats.mediumConfidence / stats.total * 100).toFixed(1)}%)`);
  printInfo(`  - 低置信度: ${stats.lowConfidence} (${(stats.lowConfidence / stats.total * 100).toFixed(1)}%)`);
  
  return { results, stats };
}

/**
 * 生成审核清单
 */
function generateReviewList(classifiedPlugins) {
  printInfo('正在生成审核清单...');
  
  const needsReview = classifiedPlugins.filter(plugin => {
    return plugin.categoryConfidence >= CONFIDENCE_THRESHOLDS.MEDIUM &&
           plugin.categoryConfidence < CONFIDENCE_THRESHOLDS.HIGH;
  });
  
  const reviewList = needsReview.map(plugin => ({
    id: plugin.id,
    name: plugin.name,
    description: plugin.description.substring(0, 100) + '...',
    suggestedCategory: plugin.category,
    categoryName: CATEGORY_RULES[plugin.category]?.name || '其他',
    confidence: plugin.categoryConfidence,
    topScores: Object.entries(plugin.categoryScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat, score]) => ({
        category: cat,
        categoryName: CATEGORY_RULES[cat]?.name || '其他',
        score: score
      })),
    reason: '中等置信度，建议人工审核'
  }));
  
  printSuccess(`生成审核清单完成（${reviewList.length} 个插件需要审核）`);
  
  return reviewList;
}

/**
 * 保存分类结果
 */
function saveResults(classifiedPlugins, stats, reviewList) {
  printInfo('正在保存分类结果...');
  
  try {
    // 保存分类报告
    const report = {
      generatedAt: new Date().toISOString(),
      summary: stats,
      categoryDetails: Object.entries(stats.categoryDistribution).map(([id, count]) => ({
        id,
        name: CATEGORY_RULES[id]?.name || '其他',
        count,
        percentage: (count / stats.total * 100).toFixed(2) + '%'
      })).sort((a, b) => b.count - a.count)
    };
    
    fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2), 'utf8');
    printSuccess(`分类报告已保存: ${REPORT_FILE}`);
    
    // 保存审核清单
    const reviewData = {
      generatedAt: new Date().toISOString(),
      totalNeedsReview: reviewList.length,
      items: reviewList
    };
    
    fs.writeFileSync(REVIEW_FILE, JSON.stringify(reviewData, null, 2), 'utf8');
    printSuccess(`审核清单已保存: ${REVIEW_FILE}`);
    
    // 保存分类后的插件数据
    fs.writeFileSync(PLUGINS_FILE, JSON.stringify(classifiedPlugins, null, 2), 'utf8');
    printSuccess(`分类后的插件数据已保存: ${PLUGINS_FILE}`);
    
  } catch (error) {
    printError(`保存结果失败: ${error.message}`);
    throw error;
  }
}

// ========== 主函数 ==========

function main() {
  console.log('========================================');
  console.log('插件自动分类程序');
  console.log('========================================');
  console.log('');
  
  try {
    // 1. 读取插件数据
    const plugins = readPluginsData();
    console.log('');
    
    // 2. 批量分类
    const { results, stats } = classifyAllPlugins(plugins);
    console.log('');
    
    // 3. 生成审核清单
    const reviewList = generateReviewList(results);
    console.log('');
    
    // 4. 保存结果
    saveResults(results, stats, reviewList);
    console.log('');
    
    // 5. 输出摘要
    console.log('========================================');
    console.log('分类完成！');
    console.log('========================================');
    console.log('');
    console.log('分类统计:');
    console.log(`  - 总插件数: ${stats.total}`);
    console.log(`  - 高置信度: ${stats.highConfidence} (${(stats.highConfidence / stats.total * 100).toFixed(1)}%)`);
    console.log(`  - 中置信度: ${stats.mediumConfidence} (${(stats.mediumConfidence / stats.total * 100).toFixed(1)}%)`);
    console.log(`  - 低置信度: ${stats.lowConfidence} (${(stats.lowConfidence / stats.total * 100).toFixed(1)}%)`);
    console.log('');
    console.log('分类分布（Top 5）:');
    const topCategories = Object.entries(stats.categoryDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    topCategories.forEach(([id, count]) => {
      const name = CATEGORY_RULES[id]?.name || '其他';
      console.log(`  - ${name}: ${count} (${(count / stats.total * 100).toFixed(1)}%)`);
    });
    console.log('');
    console.log('生成的文件:');
    console.log(`  - 分类报告: ${path.basename(REPORT_FILE)}`);
    console.log(`  - 审核清单: ${path.basename(REVIEW_FILE)}`);
    
  } catch (error) {
    console.log('');
    console.log('========================================');
    printError('分类失败！');
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
  autoClassifyPlugin,
  calculateCategoryScore,
  CATEGORY_RULES
};

