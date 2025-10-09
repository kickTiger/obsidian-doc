#!/usr/bin/env node

/**
 * 构建监控脚本
 * 用于监控VuePress构建过程，提供进度反馈和性能统计
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class BuildMonitor {
  constructor() {
    this.startTime = Date.now();
    this.phases = {
      'Initializing and preparing data': { start: null, end: null },
      'Compiling with vite': { start: null, end: null },
      'Rendering pages': { start: null, end: null },
      'Generating bundle': { start: null, end: null }
    };
    this.currentPhase = null;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
    
    const colors = {
      info: '\x1b[36m',    // cyan
      success: '\x1b[32m', // green
      warning: '\x1b[33m', // yellow
      error: '\x1b[31m',   // red
      reset: '\x1b[0m'
    };
    
    console.log(`${colors[type]}[${elapsed}s] ${message}${colors.reset}`);
  }

  detectPhase(line) {
    for (const phase of Object.keys(this.phases)) {
      if (line.includes(phase)) {
        if (this.currentPhase && !this.phases[this.currentPhase].end) {
          this.phases[this.currentPhase].end = Date.now();
          const duration = ((this.phases[this.currentPhase].end - this.phases[this.currentPhase].start) / 1000).toFixed(1);
          this.log(`✓ ${this.currentPhase} completed in ${duration}s`, 'success');
        }
        
        this.currentPhase = phase;
        this.phases[phase].start = Date.now();
        this.log(`🚀 Starting: ${phase}`, 'info');
        return true;
      }
    }
    return false;
  }

  analyzeProgress(line) {
    // 检测进度指示器
    if (line.includes('✔') || line.includes('done')) {
      this.log(`Progress: ${line.trim()}`, 'success');
    } else if (line.includes('⚠') || line.includes('warning')) {
      this.log(`Warning: ${line.trim()}`, 'warning');
    } else if (line.includes('✖') || line.includes('error')) {
      this.log(`Error: ${line.trim()}`, 'error');
    } else if (line.includes('%') || line.includes('files processed')) {
      this.log(`Progress: ${line.trim()}`, 'info');
    }
  }

  generateReport() {
    const totalTime = ((Date.now() - this.startTime) / 1000).toFixed(1);
    
    this.log('\n📊 Build Report:', 'info');
    this.log(`Total build time: ${totalTime}s`, 'info');
    
    for (const [phase, timing] of Object.entries(this.phases)) {
      if (timing.start) {
        const duration = timing.end 
          ? ((timing.end - timing.start) / 1000).toFixed(1)
          : 'In progress...';
        this.log(`  ${phase}: ${duration}s`, 'info');
      }
    }
    
    // 保存报告到文件
    const report = {
      timestamp: new Date().toISOString(),
      totalTime: parseFloat(totalTime),
      phases: this.phases,
      success: this.currentPhase !== null
    };
    
    fs.writeFileSync('build-report.json', JSON.stringify(report, null, 2));
    this.log('📄 Build report saved to build-report.json', 'success');
  }

  async startBuild() {
    this.log('🏗️  Starting VuePress build with monitoring...', 'info');
    
    const buildProcess = spawn('node', [
      '--max-old-space-size=8192',
      '--max-semi-space-size=1024',
      '--optimize-for-size',
      'node_modules/vuepress/bin/vuepress.js',
      'build',
      'src'
    ], {
      stdio: ['inherit', 'pipe', 'pipe'],
      cwd: process.cwd()
    });

    buildProcess.stdout.on('data', (data) => {
      const lines = data.toString().split('\n');
      for (const line of lines) {
        if (line.trim()) {
          if (!this.detectPhase(line)) {
            this.analyzeProgress(line);
          }
        }
      }
    });

    buildProcess.stderr.on('data', (data) => {
      const lines = data.toString().split('\n');
      for (const line of lines) {
        if (line.trim()) {
          this.log(`Error: ${line.trim()}`, 'error');
        }
      }
    });

    buildProcess.on('close', (code) => {
      if (this.currentPhase && !this.phases[this.currentPhase].end) {
        this.phases[this.currentPhase].end = Date.now();
      }
      
      this.generateReport();
      
      if (code === 0) {
        this.log('🎉 Build completed successfully!', 'success');
      } else {
        this.log(`❌ Build failed with exit code ${code}`, 'error');
      }
      
      process.exit(code);
    });

    // 设置超时监控（50分钟）
    const timeout = setTimeout(() => {
      this.log('⏰ Build timeout reached (50 minutes), terminating...', 'error');
      buildProcess.kill('SIGTERM');
      
      setTimeout(() => {
        buildProcess.kill('SIGKILL');
      }, 5000);
    }, 50 * 60 * 1000);

    buildProcess.on('close', () => {
      clearTimeout(timeout);
    });
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const monitor = new BuildMonitor();
  monitor.startBuild().catch(console.error);
}

module.exports = BuildMonitor;
