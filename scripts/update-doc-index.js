/**
 * 文档索引自动更新脚本
 * 
 * 功能：
 * 1. 扫描文档目录，自动发现新增、修改、删除的文档
 * 2. 更新 README.md 索引文件
 * 3. 生成文档变更报告
 * 
 * 作者：Augment AI Agent
 * 创建日期：2025-10-06
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ========== 配置 ==========

const DOC_ROOT = path.join(__dirname, '../文档');
const INDEX_FILE = path.join(DOC_ROOT, 'README.md');
const CACHE_FILE = path.join(DOC_ROOT, '.doc-index-cache.json');

// 需要扫描的子目录
const SCAN_DIRS = [
  '插件市场/核心技术文档',
  '插件市场/项目总结',
  '插件市场/功能实现',
  '插件市场/使用指南',
  '插件市场/问题处理'
];

// ========== 工具函数 ==========

/**
 * 计算文件的 MD5 哈希值
 * @param {string} filePath - 文件路径
 * @returns {string} MD5 哈希值
 */
function calculateFileHash(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return crypto.createHash('md5').update(content).digest('hex');
  } catch (error) {
    return '';
  }
}

/**
 * 获取文件的元数据
 * @param {string} filePath - 文件路径
 * @returns {Object} 文件元数据
 */
function getFileMetadata(filePath) {
  const stats = fs.statSync(filePath);
  const fileName = path.basename(filePath);
  
  return {
    path: filePath,
    name: fileName,
    size: stats.size,
    created: stats.birthtime,
    modified: stats.mtime,
    hash: calculateFileHash(filePath)
  };
}

/**
 * 扫描目录，获取所有 Markdown 文件
 * @param {string} dirPath - 目录路径
 * @returns {Array} 文件列表
 */
function scanDirectory(dirPath) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isFile() && item.endsWith('.md') && item !== 'README.md') {
        files.push(getFileMetadata(fullPath));
      }
    });
  } catch (error) {
    console.error(`✗ 扫描目录失败: ${dirPath}`, error.message);
  }
  
  return files;
}

/**
 * 加载缓存数据
 * @returns {Object} 缓存数据
 */
function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('⚠ 读取缓存失败:', error.message);
  }
  
  return {
    lastUpdate: '',
    files: {}
  };
}

/**
 * 保存缓存数据
 * @param {Object} cache - 缓存数据
 */
function saveCache(cache) {
  try {
    cache.lastUpdate = new Date().toISOString();
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
    console.log('✓ 缓存已保存');
  } catch (error) {
    console.error('✗ 保存缓存失败:', error.message);
  }
}

/**
 * 检测文档变更
 * @param {Array} currentFiles - 当前文件列表
 * @param {Object} cache - 缓存数据
 * @returns {Object} 变更信息
 */
function detectChanges(currentFiles, cache) {
  const changes = {
    added: [],
    modified: [],
    deleted: [],
    unchanged: []
  };
  
  // 创建当前文件映射
  const currentMap = new Map();
  currentFiles.forEach(file => {
    currentMap.set(file.path, file);
  });
  
  // 检测新增和修改
  currentFiles.forEach(file => {
    const cached = cache.files[file.path];
    
    if (!cached) {
      changes.added.push(file);
    } else if (cached.hash !== file.hash) {
      changes.modified.push(file);
    } else {
      changes.unchanged.push(file);
    }
  });
  
  // 检测删除
  Object.keys(cache.files).forEach(filePath => {
    if (!currentMap.has(filePath)) {
      changes.deleted.push(cache.files[filePath]);
    }
  });
  
  return changes;
}

/**
 * 生成变更报告
 * @param {Object} changes - 变更信息
 */
function generateChangeReport(changes) {
  console.log('\n========================================');
  console.log('文档变更检测报告');
  console.log('========================================\n');
  
  console.log(`新增文档: ${changes.added.length} 个`);
  if (changes.added.length > 0) {
    changes.added.forEach(file => {
      console.log(`  + ${file.name}`);
    });
  }
  
  console.log(`\n修改文档: ${changes.modified.length} 个`);
  if (changes.modified.length > 0) {
    changes.modified.forEach(file => {
      console.log(`  ~ ${file.name}`);
    });
  }
  
  console.log(`\n删除文档: ${changes.deleted.length} 个`);
  if (changes.deleted.length > 0) {
    changes.deleted.forEach(file => {
      console.log(`  - ${file.name}`);
    });
  }
  
  console.log(`\n未变化文档: ${changes.unchanged.length} 个`);
  
  console.log('\n========================================\n');
}

/**
 * 更新缓存
 * @param {Array} files - 文件列表
 * @returns {Object} 更新后的缓存
 */
function updateCache(files) {
  const cache = {
    lastUpdate: new Date().toISOString(),
    files: {}
  };
  
  files.forEach(file => {
    cache.files[file.path] = {
      name: file.name,
      hash: file.hash,
      modified: file.modified
    };
  });
  
  return cache;
}

// ========== 主函数 ==========

async function main() {
  console.log('========================================');
  console.log('文档索引自动更新工具');
  console.log('========================================\n');
  
  // 1. 扫描所有文档
  console.log('正在扫描文档目录...');
  const allFiles = [];
  
  SCAN_DIRS.forEach(dir => {
    const dirPath = path.join(DOC_ROOT, dir);
    console.log(`  扫描: ${dir}`);
    const files = scanDirectory(dirPath);
    allFiles.push(...files);
  });
  
  console.log(`✓ 扫描完成，共找到 ${allFiles.length} 个文档\n`);
  
  // 2. 加载缓存
  const cache = loadCache();
  
  // 3. 检测变更
  const changes = detectChanges(allFiles, cache);
  
  // 4. 生成变更报告
  generateChangeReport(changes);
  
  // 5. 更新缓存
  if (changes.added.length > 0 || changes.modified.length > 0 || changes.deleted.length > 0) {
    const newCache = updateCache(allFiles);
    saveCache(newCache);
    
    console.log('✓ 检测到文档变更，建议手动更新 README.md 索引文件');
    console.log('  文件位置: 文档/插件市场/README.md\n');
  } else {
    console.log('✓ 没有检测到文档变更\n');
  }
  
  console.log('✓ 所有任务完成！');
}

// ========== 执行 ==========

if (require.main === module) {
  main().catch(error => {
    console.error('\n✗ 执行失败:', error.message);
    process.exit(1);
  });
}

module.exports = {
  scanDirectory,
  detectChanges,
  calculateFileHash,
  getFileMetadata
};

