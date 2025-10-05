/**
 * 检查成功获取创建时间的插件
 */

const fs = require('fs');
const path = require('path');

// 读取插件数据
const pluginsPath = path.join(__dirname, '../docs/src/.vuepress/public/data/plugins.json');
const plugins = JSON.parse(fs.readFileSync(pluginsPath, 'utf-8'));

// 筛选有创建时间的插件
const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
const withCreated = plugins
  .filter(p => p.created && p.created > 0)
  .sort((a, b) => b.created - a.created);

console.log('========================================');
console.log('成功获取创建时间的插件列表');
console.log('========================================\n');

console.log(`总数: ${withCreated.length} 个\n`);

// 统计新增插件
const newPlugins = withCreated.filter(p => p.created > oneMonthAgo);
console.log(`一个月内新增: ${newPlugins.length} 个`);
console.log(`一个月前创建: ${withCreated.length - newPlugins.length} 个\n`);

console.log('========================================');
console.log('详细列表（按创建时间倒序）');
console.log('========================================\n');

withCreated.forEach((p, i) => {
  const createdDate = new Date(p.created).toISOString().split('T')[0];
  const updatedDate = new Date(p.updated).toISOString().split('T')[0];
  const isNew = p.created > oneMonthAgo;
  const badge = isNew ? '🆕 新增' : '📝 更新';
  
  console.log(`${i + 1}. ${p.name} ${badge}`);
  console.log(`   ID: ${p.id}`);
  console.log(`   创建时间: ${createdDate}`);
  console.log(`   更新时间: ${updatedDate}`);
  console.log(`   下载量: ${p.downloads.toLocaleString()}`);
  console.log('');
});

console.log('========================================');
console.log('一个月内新增的插件');
console.log('========================================\n');

if (newPlugins.length > 0) {
  newPlugins.forEach((p, i) => {
    const createdDate = new Date(p.created).toISOString().split('T')[0];
    console.log(`${i + 1}. ${p.name}`);
    console.log(`   创建时间: ${createdDate}`);
    console.log(`   下载量: ${p.downloads.toLocaleString()}`);
    console.log('');
  });
} else {
  console.log('没有一个月内新增的插件\n');
}

console.log('========================================');
console.log('徽标显示测试');
console.log('========================================\n');

const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

withCreated.forEach((p) => {
  let badge = '';
  
  // 判断徽标
  if (p.created > oneMonthAgo && p.updated > oneWeekAgo) {
    badge = '🔴 新增';
  } else if (p.updated > oneWeekAgo) {
    badge = '🟢 更新';
  } else {
    badge = '⚪ 无徽标';
  }
  
  console.log(`${badge} - ${p.name}`);
});

console.log('\n========================================');
console.log('统计摘要');
console.log('========================================\n');

const newBadge = withCreated.filter(p => p.created > oneMonthAgo && p.updated > oneWeekAgo).length;
const updateBadge = withCreated.filter(p => p.created <= oneMonthAgo && p.updated > oneWeekAgo).length;
const noBadge = withCreated.filter(p => p.updated <= oneWeekAgo).length;

console.log(`显示"新增"徽标: ${newBadge} 个`);
console.log(`显示"更新"徽标: ${updateBadge} 个`);
console.log(`不显示徽标: ${noBadge} 个`);
console.log(`总计: ${withCreated.length} 个\n`);

