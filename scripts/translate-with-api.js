/**
 * 使用API翻译插件描述
 * 
 * 支持：
 * - DeepL API
 * - 腾讯翻译API
 * - 自动轮播
 * - 断点续传
 * - 限额检测
 * 
 * 使用方法：
 * 1. 复制 .env.example 为 .env
 * 2. 填入API密钥
 * 3. 运行：node scripts/translate-with-api.js
 * 
 * 作者：Augment AI Agent
 * 创建日期：2025-10-05
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// ========== 配置 ==========

// 加载环境变量
require('dotenv').config();

const TRANSLATIONS_DIR = path.join(__dirname, '../translations');
const TO_TRANSLATE_FILE = path.join(TRANSLATIONS_DIR, 'to-translate.json');
const TRANSLATIONS_FILE = path.join(TRANSLATIONS_DIR, 'plugin-translations.json');
const PROGRESS_FILE = path.join(TRANSLATIONS_DIR, 'translation-progress.json');

const CONFIG = {
  deeplApiKey: process.env.DEEPL_API_KEY,
  deeplApiUrl: process.env.DEEPL_API_URL || 'https://api-free.deepl.com/v2/translate',
  tencentSecretId: process.env.TENCENT_SECRET_ID,
  tencentSecretKey: process.env.TENCENT_SECRET_KEY,
  tencentRegion: process.env.TENCENT_REGION || 'ap-guangzhou',
  preferredApi: process.env.PREFERRED_API || 'deepl',
  batchSize: parseInt(process.env.BATCH_SIZE) || 50,
  requestDelay: parseInt(process.env.REQUEST_DELAY) || 1000
};

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

function printWarning(message) {
  console.warn(`⚠ ${message}`);
}

// 延迟函数
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ========== DeepL API ==========

async function translateWithDeepL(text) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      auth_key: CONFIG.deeplApiKey,
      text: text,
      source_lang: 'EN',
      target_lang: 'ZH'
    });

    const url = new URL(CONFIG.deeplApiUrl);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(params.toString())
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          
          // 检查错误
          if (res.statusCode === 456) {
            reject(new Error('DeepL API 配额已用完'));
            return;
          }
          
          if (res.statusCode !== 200) {
            reject(new Error(`DeepL API 错误: ${res.statusCode} - ${data}`));
            return;
          }
          
          if (result.translations && result.translations.length > 0) {
            resolve(result.translations[0].text);
          } else {
            reject(new Error('DeepL API 返回格式错误'));
          }
        } catch (error) {
          reject(new Error(`解析DeepL响应失败: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`DeepL API 请求失败: ${error.message}`));
    });

    req.write(params.toString());
    req.end();
  });
}

// ========== 腾讯翻译API ==========

function sha256(message, secret = '', encoding) {
  const hmac = crypto.createHmac('sha256', secret);
  return hmac.update(message).digest(encoding);
}

function getHash(message, encoding = 'hex') {
  const hash = crypto.createHash('sha256');
  return hash.update(message).digest(encoding);
}

function getDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getUTCFullYear();
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + date.getUTCDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

async function translateWithTencent(text) {
  return new Promise((resolve, reject) => {
    const endpoint = 'tmt.tencentcloudapi.com';
    const service = 'tmt';
    const region = CONFIG.tencentRegion;
    const action = 'TextTranslate';
    const version = '2018-03-21';
    const timestamp = Math.floor(Date.now() / 1000);
    const date = getDate(timestamp);

    // ************* 步骤 1：拼接规范请求串 *************
    const payload = JSON.stringify({
      SourceText: text,
      Source: 'en',
      Target: 'zh',
      ProjectId: 0
    });

    const hashedRequestPayload = getHash(payload);
    const httpRequestMethod = 'POST';
    const canonicalUri = '/';
    const canonicalQueryString = '';
    const canonicalHeaders = `content-type:application/json\nhost:${endpoint}\n`;
    const signedHeaders = 'content-type;host';

    const canonicalRequest = `${httpRequestMethod}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${hashedRequestPayload}`;

    // ************* 步骤 2：拼接待签名字符串 *************
    const algorithm = 'TC3-HMAC-SHA256';
    const hashedCanonicalRequest = getHash(canonicalRequest);
    const credentialScope = `${date}/${service}/tc3_request`;
    const stringToSign = `${algorithm}\n${timestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;

    // ************* 步骤 3：计算签名 *************
    const kDate = sha256(date, 'TC3' + CONFIG.tencentSecretKey);
    const kService = sha256(service, kDate);
    const kSigning = sha256('tc3_request', kService);
    const signature = sha256(stringToSign, kSigning, 'hex');

    // ************* 步骤 4：拼接 Authorization *************
    const authorization = `${algorithm} Credential=${CONFIG.tencentSecretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    // ************* 步骤 5：发送请求 *************
    const options = {
      hostname: endpoint,
      path: '/',
      method: 'POST',
      headers: {
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Host': endpoint,
        'X-TC-Action': action,
        'X-TC-Timestamp': timestamp.toString(),
        'X-TC-Version': version,
        'X-TC-Region': region
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          
          // 检查错误
          if (result.Response.Error) {
            const error = result.Response.Error;
            
            // 检查是否超出配额
            if (error.Code === 'ResourceUnavailable.InsufficientBalance' || 
                error.Code === 'LimitExceeded') {
              reject(new Error('腾讯翻译API 配额已用完'));
              return;
            }
            
            reject(new Error(`腾讯翻译API 错误: ${error.Code} - ${error.Message}`));
            return;
          }
          
          if (result.Response.TargetText) {
            resolve(result.Response.TargetText);
          } else {
            reject(new Error('腾讯翻译API 返回格式错误'));
          }
        } catch (error) {
          reject(new Error(`解析腾讯翻译响应失败: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`腾讯翻译API 请求失败: ${error.message}`));
    });

    req.write(payload);
    req.end();
  });
}

// ========== 翻译管理 ==========

async function translate(text, preferredApi = 'deepl') {
  try {
    if (preferredApi === 'deepl') {
      return await translateWithDeepL(text);
    } else {
      return await translateWithTencent(text);
    }
  } catch (error) {
    // 如果首选API失败，尝试备用API
    printWarning(`${preferredApi} 翻译失败: ${error.message}`);
    
    if (error.message.includes('配额已用完')) {
      throw error; // 配额用完，不尝试备用API
    }
    
    printInfo('尝试使用备用API...');
    const backupApi = preferredApi === 'deepl' ? 'tencent' : 'deepl';
    
    try {
      if (backupApi === 'deepl') {
        return await translateWithDeepL(text);
      } else {
        return await translateWithTencent(text);
      }
    } catch (backupError) {
      throw new Error(`所有API都失败: ${backupError.message}`);
    }
  }
}

// ========== 主函数 ==========

async function main() {
  console.log('========================================');
  console.log('使用API翻译插件描述');
  console.log('========================================');
  console.log('');

  // 检查API配置
  if (!CONFIG.deeplApiKey && !CONFIG.tencentSecretId) {
    printError('未配置任何API密钥！');
    printInfo('请编辑 .env 文件并填入API密钥');
    process.exit(1);
  }

  if (CONFIG.preferredApi === 'deepl' && !CONFIG.deeplApiKey) {
    printWarning('DeepL API未配置，将使用腾讯翻译API');
    CONFIG.preferredApi = 'tencent';
  }

  if (CONFIG.preferredApi === 'tencent' && !CONFIG.tencentSecretId) {
    printWarning('腾讯翻译API未配置，将使用DeepL API');
    CONFIG.preferredApi = 'deepl';
  }

  printInfo(`使用API: ${CONFIG.preferredApi}`);
  printInfo(`批次大小: ${CONFIG.batchSize}`);
  printInfo(`请求间隔: ${CONFIG.requestDelay}ms`);
  console.log('');

  // 读取待翻译列表
  const toTranslateData = JSON.parse(fs.readFileSync(TO_TRANSLATE_FILE, 'utf8'));
  const items = toTranslateData.items;

  // 读取已有翻译
  let translations = {};
  if (fs.existsSync(TRANSLATIONS_FILE)) {
    translations = JSON.parse(fs.readFileSync(TRANSLATIONS_FILE, 'utf8'));
  }

  // 读取进度
  let progress = { completed: 0, failed: [] };
  if (fs.existsSync(PROGRESS_FILE)) {
    progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  }

  // 筛选未翻译的插件
  const toTranslate = items.filter(item => !translations[item.id]);
  
  printInfo(`总插件数: ${items.length}`);
  printInfo(`已翻译: ${Object.keys(translations).length}`);
  printInfo(`待翻译: ${toTranslate.length}`);
  console.log('');

  if (toTranslate.length === 0) {
    printSuccess('所有插件已翻译完成！');
    return;
  }

  printInfo('开始翻译...');
  console.log('');

  let successCount = 0;
  let failCount = 0;
  let quotaExhausted = false;

  for (let i = 0; i < toTranslate.length; i++) {
    const item = toTranslate[i];
    
    try {
      printInfo(`[${i + 1}/${toTranslate.length}] 翻译: ${item.name}`);
      
      const translatedText = await translate(item.description, CONFIG.preferredApi);
      
      translations[item.id] = {
        description: translatedText,
        translatedAt: new Date().toISOString()
      };
      
      successCount++;
      progress.completed++;
      
      printSuccess(`✓ ${item.name}`);
      
      // 每10个保存一次
      if (successCount % 10 === 0) {
        fs.writeFileSync(TRANSLATIONS_FILE, JSON.stringify(translations, null, 2), 'utf8');
        fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf8');
        printInfo(`已保存进度: ${successCount}/${toTranslate.length}`);
      }
      
      // 延迟以避免超出API限制
      await delay(CONFIG.requestDelay);
      
    } catch (error) {
      failCount++;
      progress.failed.push({
        id: item.id,
        name: item.name,
        error: error.message
      });
      
      printError(`✗ ${item.name}: ${error.message}`);
      
      // 检查是否配额用完
      if (error.message.includes('配额已用完')) {
        quotaExhausted = true;
        printError('API配额已用完，停止翻译');
        break;
      }
    }
  }

  // 最终保存
  fs.writeFileSync(TRANSLATIONS_FILE, JSON.stringify(translations, null, 2), 'utf8');
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf8');

  console.log('');
  console.log('========================================');
  console.log('翻译完成');
  console.log('========================================');
  printSuccess(`成功: ${successCount}`);
  printError(`失败: ${failCount}`);
  printInfo(`总进度: ${Object.keys(translations).length}/${items.length}`);
  
  if (quotaExhausted) {
    console.log('');
    printWarning('API配额已用完，请稍后继续');
    printInfo('再次运行此脚本将从断点继续翻译');
  }
}

// ========== 执行 ==========

if (require.main === module) {
  main().catch(error => {
    console.error('');
    printError('翻译失败！');
    console.error(error);
    process.exit(1);
  });
}

module.exports = {
  translate,
  translateWithDeepL,
  translateWithTencent
};

