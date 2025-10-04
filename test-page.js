// 简单的测试脚本
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    // 检查是否包含 PluginShowcase
    if (data.includes('PluginShowcase')) {
      console.log('✓ 页面包含 PluginShowcase 组件');
    } else {
      console.log('✗ 页面不包含 PluginShowcase 组件');
    }
    
    // 检查是否有错误
    if (data.includes('Failed to resolve component')) {
      console.log('✗ 页面有组件解析错误');
    } else {
      console.log('✓ 没有组件解析错误');
    }
    
    console.log('\n前 500 个字符:');
    console.log(data.substring(0, 500));
  });
});

req.on('error', (e) => {
  console.error(`请求错误: ${e.message}`);
});

req.end();
