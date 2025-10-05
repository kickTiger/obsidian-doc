/**
 * 手动更新插件数据脚本
 * 
 * 功能：
 * 1. 获取最新插件数据
 * 2. 生成插件详情页面
 * 3. 显示更新摘要
 * 
 * 使用方法：
 * node scripts/manual-update.js
 * 
 * 作者：Augment AI Agent
 * 创建日期：2025-10-05
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ========== 配置 ==========

const SCRIPTS_DIR = __dirname;
const FETCH_SCRIPT = path.join(SCRIPTS_DIR, 'fetch-plugins-data.js');
const GENERATE_SCRIPT = path.join(SCRIPTS_DIR, 'generate-plugin-pages.js');

// ========== 工具函数 ==========

/**
 * 打印分隔线
 */
function printSeparator() {
  console.log('========================================');
}

/**
 * 打印标题
 * @param {string} title - 标题文本
 */
function printTitle(title) {
  printSeparator();
  console.log(title);
  printSeparator();
  console.log('');
}

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
 * 执行命令
 * @param {string} command - 要执行的命令
 * @param {string} description - 命令描述
 * @returns {boolean} 是否成功
 */
function executeCommand(command, description) {
  try {
    console.log(`正在${description}...`);
    execSync(command, { stdio: 'inherit' });
    printSuccess(`${description}完成`);
    return true;
  } catch (error) {
    printError(`${description}失败`);
    console.error(error.message);
    return false;
  }
}

/**
 * 检查文件是否存在
 * @param {string} filePath - 文件路径
 * @returns {boolean} 文件是否存在
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * 获取当前时间字符串
 * @returns {string} 格式化的时间字符串
 */
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleString('zh-CN', { 
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * 检查 Git 是否有变化
 * @returns {boolean} 是否有变化
 */
function hasGitChanges() {
  try {
    const output = execSync('git status --porcelain', { encoding: 'utf8' });
    return output.trim().length > 0;
  } catch (error) {
    printError('检查 Git 状态失败');
    return false;
  }
}

/**
 * 获取变化的文件列表
 * @returns {string[]} 变化的文件列表
 */
function getChangedFiles() {
  try {
    const output = execSync('git status --porcelain', { encoding: 'utf8' });
    return output.trim().split('\n').filter(line => line.length > 0);
  } catch (error) {
    return [];
  }
}

// ========== 主函数 ==========

/**
 * 主函数
 */
async function main() {
  printTitle('Obsidian 插件数据手动更新工具');
  
  console.log(`执行时间: ${getCurrentTime()}\n`);
  
  // ========== 步骤1：检查脚本文件 ==========
  
  printInfo('步骤 1/4: 检查脚本文件');
  
  if (!fileExists(FETCH_SCRIPT)) {
    printError(`数据获取脚本不存在: ${FETCH_SCRIPT}`);
    process.exit(1);
  }
  
  if (!fileExists(GENERATE_SCRIPT)) {
    printError(`页面生成脚本不存在: ${GENERATE_SCRIPT}`);
    process.exit(1);
  }
  
  printSuccess('脚本文件检查通过');
  console.log('');
  
  // ========== 步骤2：获取插件数据 ==========
  
  printInfo('步骤 2/4: 获取插件数据');
  
  const fetchSuccess = executeCommand(
    `node "${FETCH_SCRIPT}"`,
    '获取插件数据'
  );
  
  if (!fetchSuccess) {
    printError('数据获取失败，终止执行');
    process.exit(1);
  }
  
  console.log('');
  
  // ========== 步骤3：生成插件页面 ==========
  
  printInfo('步骤 3/4: 生成插件页面');
  
  const generateSuccess = executeCommand(
    `node "${GENERATE_SCRIPT}"`,
    '生成插件页面'
  );
  
  if (!generateSuccess) {
    printError('页面生成失败，终止执行');
    process.exit(1);
  }
  
  console.log('');
  
  // ========== 步骤4：检查变化 ==========
  
  printInfo('步骤 4/4: 检查变化');
  
  if (hasGitChanges()) {
    const changedFiles = getChangedFiles();
    printSuccess(`检测到 ${changedFiles.length} 个文件发生变化`);
    
    console.log('\n变化的文件:');
    changedFiles.slice(0, 10).forEach(file => {
      console.log(`  ${file}`);
    });
    
    if (changedFiles.length > 10) {
      console.log(`  ... 还有 ${changedFiles.length - 10} 个文件`);
    }
    
    console.log('\n下一步操作:');
    console.log('1. 检查变化: git status');
    console.log('2. 查看差异: git diff');
    console.log('3. 提交变更: git add . && git commit -m "chore: 手动更新插件数据"');
    console.log('4. 推送到远程: git push');
    console.log('5. Netlify 将自动部署');
    
  } else {
    printInfo('未检测到变化，数据已是最新');
  }
  
  console.log('');
  
  // ========== 完成 ==========
  
  printSeparator();
  printSuccess('所有任务完成！');
  printSeparator();
  
  console.log(`\n完成时间: ${getCurrentTime()}`);
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
main().catch(error => {
  printError('执行失败:');
  console.error(error);
  process.exit(1);
});

