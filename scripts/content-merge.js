/**
 * 内容合并模块
 * 
 * 功能：
 * 1. 从现有页面中提取自定义内容
 * 2. 将自定义内容合并回新生成的页面
 * 3. 处理各种边界情况和错误
 * 
 * 作者：Augment AI Agent
 * 创建日期：2025-10-05
 */

const fs = require('fs');
const path = require('path');

// ========== 工具函数 ==========

/**
 * 转义正则表达式中的特殊字符
 * @param {string} str - 要转义的字符串
 * @returns {string} 转义后的字符串
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ========== 内容提取函数 ==========

/**
 * 从现有页面中提取自定义内容
 * @param {string} filePath - 页面文件路径
 * @returns {Array} 自定义内容数组
 */
function extractCustomContent(filePath) {
  try {
    // 1. 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.log(`  ℹ 文件不存在，将创建新页面: ${path.basename(filePath)}`);
      return [];
    }
    
    // 2. 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 3. 检查是否包含自定义内容标签
    if (!content.includes('<!-- CUSTOM_CONTENT_START')) {
      console.log(`  ℹ 页面不包含自定义内容标签: ${path.basename(filePath)}`);
      return [];
    }
    
    // 4. 提取所有自定义内容区域
    const customContents = [];

    // 正则表达式：匹配 CUSTOM_CONTENT 标签及其内容
    // 支持可选的标识符（如 :tutorial 或 :dataview-tutorial）
    // 标识符可以包含字母、数字、下划线和连字符
    const regex = /<!-- CUSTOM_CONTENT_START(?::([\w-]+))? -->([\s\S]*?)<!-- CUSTOM_CONTENT_END(?::\1)? -->/g;
    
    let match;
    let matchCount = 0;
    
    while ((match = regex.exec(content)) !== null) {
      matchCount++;
      const identifier = match[1] || 'default';
      const extractedContent = match[2];
      
      customContents.push({
        identifier: identifier,
        content: extractedContent,
        startIndex: match.index,
        endIndex: match.index + match[0].length
      });
      
      console.log(`  ✓ 提取自定义内容区域: ${identifier} (${extractedContent.trim().length} 字符)`);
    }
    
    if (matchCount > 0) {
      console.log(`  ✓ 共提取 ${matchCount} 个自定义内容区域`);
    }
    
    // 5. 检查是否有未闭合的标签
    const unclosedStarts = (content.match(/<!-- CUSTOM_CONTENT_START(?::\w+)? -->/g) || []).length;
    const unclosedEnds = (content.match(/<!-- CUSTOM_CONTENT_END(?::\w+)? -->/g) || []).length;
    
    if (unclosedStarts !== unclosedEnds) {
      console.warn(`  ⚠ 警告: 发现未闭合的标签 (START: ${unclosedStarts}, END: ${unclosedEnds})`);
    }
    
    return customContents;
    
  } catch (error) {
    console.warn(`  ⚠ 提取自定义内容失败: ${error.message}`);
    console.warn(`  - 将按新页面处理`);
    return [];
  }
}

// ========== 内容合并函数 ==========

/**
 * 将自定义内容合并回新生成的页面
 * @param {string} newContent - 新生成的页面内容
 * @param {Array} customContents - 提取的自定义内容数组
 * @returns {string} 合并后的页面内容
 */
function mergeCustomContent(newContent, customContents) {
  try {
    // 1. 如果没有自定义内容，直接返回新内容
    if (!customContents || customContents.length === 0) {
      return newContent;
    }
    
    console.log(`  ℹ 开始合并 ${customContents.length} 个自定义内容区域`);
    
    let mergedContent = newContent;
    let mergedCount = 0;
    
    // 2. 遍历所有自定义内容区域
    customContents.forEach((item, index) => {
      const { identifier, content } = item;
      
      // 3. 构建标签
      const startTag = identifier === 'default' 
        ? '<!-- CUSTOM_CONTENT_START -->'
        : `<!-- CUSTOM_CONTENT_START:${identifier} -->`;
      const endTag = identifier === 'default'
        ? '<!-- CUSTOM_CONTENT_END -->'
        : `<!-- CUSTOM_CONTENT_END:${identifier} -->`;
      
      // 4. 构建正则表达式，匹配标签之间的内容
      const regexPattern = `${escapeRegex(startTag)}[\\s\\S]*?${escapeRegex(endTag)}`;
      const regex = new RegExp(regexPattern, 'g');
      
      // 5. 检查新内容中是否存在对应的标签
      if (!regex.test(mergedContent)) {
        console.warn(`  ⚠ 警告: 新模板中未找到对应的标签: ${identifier}`);
        console.warn(`  - 该自定义内容将被丢弃`);
        return;
      }
      
      // 6. 重置正则表达式的 lastIndex
      regex.lastIndex = 0;
      
      // 7. 替换标签之间的内容
      mergedContent = mergedContent.replace(
        regex,
        `${startTag}${content}${endTag}`
      );
      
      mergedCount++;
      console.log(`  ✓ 合并自定义内容区域: ${identifier}`);
    });
    
    console.log(`  ✓ 成功合并 ${mergedCount}/${customContents.length} 个自定义内容区域`);
    
    return mergedContent;
    
  } catch (error) {
    console.error(`  ✗ 内容合并失败: ${error.message}`);
    console.error(`  - 将使用新生成的内容`);
    return newContent;
  }
}

// ========== 检测函数 ==========

/**
 * 检查内容是否包含自定义内容标签
 * @param {string} content - 页面内容
 * @returns {boolean} 是否包含自定义内容标签
 */
function hasCustomContentTags(content) {
  return content.includes('<!-- CUSTOM_CONTENT_START');
}

/**
 * 检查文件是否包含自定义内容标签
 * @param {string} filePath - 文件路径
 * @returns {boolean} 是否包含自定义内容标签
 */
function fileHasCustomContentTags(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    return hasCustomContentTags(content);
  } catch (error) {
    return false;
  }
}

// ========== 统计函数 ==========

/**
 * 统计自定义内容区域的数量
 * @param {string} content - 页面内容
 * @returns {Object} 统计信息
 */
function countCustomContentRegions(content) {
  const startTags = (content.match(/<!-- CUSTOM_CONTENT_START(?::[\w-]+)? -->/g) || []).length;
  const endTags = (content.match(/<!-- CUSTOM_CONTENT_END(?::[\w-]+)? -->/g) || []).length;
  
  return {
    startTags,
    endTags,
    matched: Math.min(startTags, endTags),
    unmatched: Math.abs(startTags - endTags)
  };
}

// ========== 验证函数 ==========

/**
 * 验证自定义内容标签是否正确匹配
 * @param {string} content - 页面内容
 * @returns {Object} 验证结果
 */
function validateCustomContentTags(content) {
  const stats = countCustomContentRegions(content);
  
  return {
    isValid: stats.unmatched === 0,
    stats: stats,
    message: stats.unmatched === 0 
      ? `所有标签正确匹配 (${stats.matched} 对)`
      : `发现 ${stats.unmatched} 个未匹配的标签`
  };
}

// ========== 导出函数 ==========

module.exports = {
  extractCustomContent,
  mergeCustomContent,
  hasCustomContentTags,
  fileHasCustomContentTags,
  countCustomContentRegions,
  validateCustomContentTags,
  escapeRegex
};

