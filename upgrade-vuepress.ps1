# VuePress版本升级脚本
# 用途：自动升级VuePress和Theme Hope到最新RC版本
# 使用方法：在PowerShell中运行 .\upgrade-vuepress.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "VuePress版本升级脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查当前目录
if (-not (Test-Path "docs/package.json")) {
    Write-Host "❌ 错误：请在项目根目录运行此脚本" -ForegroundColor Red
    exit 1
}

Write-Host "📋 当前版本信息：" -ForegroundColor Yellow
Write-Host ""

# 读取当前版本
$packageJson = Get-Content "docs/package.json" -Raw | ConvertFrom-Json
$currentVuePress = $packageJson.devDependencies.vuepress
$currentTheme = $packageJson.devDependencies.'vuepress-theme-hope'

Write-Host "  VuePress: $currentVuePress" -ForegroundColor White
Write-Host "  Theme Hope: $currentTheme" -ForegroundColor White
Write-Host ""

# 询问是否继续
$confirm = Read-Host "是否继续升级到最新RC版本？(y/n)"
if ($confirm -ne 'y') {
    Write-Host "❌ 升级已取消" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🔄 开始升级流程..." -ForegroundColor Green
Write-Host ""

# 步骤1：备份
Write-Host "📦 步骤1/6：备份当前配置..." -ForegroundColor Cyan
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupDir = "backup-$timestamp"

New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
Copy-Item "docs/package.json" "$backupDir/package.json"
Copy-Item "docs/package-lock.json" "$backupDir/package-lock.json" -ErrorAction SilentlyContinue
Copy-Item "docs/src/.vuepress/config.ts" "$backupDir/config.ts"
Copy-Item "docs/src/.vuepress/theme.ts" "$backupDir/theme.ts"

Write-Host "  ✓ 备份已保存到: $backupDir" -ForegroundColor Green
Write-Host ""

# 步骤2：更新package.json
Write-Host "📝 步骤2/6：更新package.json..." -ForegroundColor Cyan

$packageJson.devDependencies.'@vuepress/client' = "2.0.0-rc.25"
$packageJson.devDependencies.'@vuepress/core' = "2.0.0-rc.25"
$packageJson.devDependencies.'@vuepress/plugin-docsearch' = "2.0.0-rc.25"
$packageJson.devDependencies.'@vuepress/shared' = "2.0.0-rc.25"
$packageJson.devDependencies.'@vuepress/utils' = "2.0.0-rc.25"
$packageJson.devDependencies.vue = "3.5.13"
$packageJson.devDependencies.'vue-router' = "4.5.0"
$packageJson.devDependencies.vuepress = "2.0.0-rc.25"
$packageJson.devDependencies.'vuepress-theme-hope' = "2.0.0-rc.94"

$packageJson | ConvertTo-Json -Depth 10 | Set-Content "docs/package.json"

Write-Host "  ✓ package.json已更新" -ForegroundColor Green
Write-Host ""

# 步骤3：清理旧依赖
Write-Host "🗑️  步骤3/6：清理旧依赖..." -ForegroundColor Cyan

if (Test-Path "docs/node_modules") {
    Remove-Item "docs/node_modules" -Recurse -Force
    Write-Host "  ✓ node_modules已删除" -ForegroundColor Green
}

if (Test-Path "docs/package-lock.json") {
    Remove-Item "docs/package-lock.json" -Force
    Write-Host "  ✓ package-lock.json已删除" -ForegroundColor Green
}

Write-Host ""

# 步骤4：安装新依赖
Write-Host "📥 步骤4/6：安装新依赖（这可能需要几分钟）..." -ForegroundColor Cyan
Write-Host ""

Set-Location "docs"
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ 依赖安装失败！" -ForegroundColor Red
    Write-Host "正在恢复备份..." -ForegroundColor Yellow
    
    Set-Location ..
    Copy-Item "$backupDir/package.json" "docs/package.json" -Force
    Copy-Item "$backupDir/package-lock.json" "docs/package-lock.json" -Force -ErrorAction SilentlyContinue
    
    Write-Host "✓ 已恢复到升级前状态" -ForegroundColor Green
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "  ✓ 依赖安装成功" -ForegroundColor Green
Write-Host ""

# 步骤5：清理缓存
Write-Host "🧹 步骤5/6：清理VuePress缓存..." -ForegroundColor Cyan

if (Test-Path "docs/src/.vuepress/.cache") {
    Remove-Item "docs/src/.vuepress/.cache" -Recurse -Force
    Write-Host "  ✓ .cache已清理" -ForegroundColor Green
}

if (Test-Path "docs/src/.vuepress/.temp") {
    Remove-Item "docs/src/.vuepress/.temp" -Recurse -Force
    Write-Host "  ✓ .temp已清理" -ForegroundColor Green
}

Write-Host ""

# 步骤6：测试构建
Write-Host "🧪 步骤6/6：测试本地构建..." -ForegroundColor Cyan
Write-Host ""
Write-Host "是否现在测试本地构建？(y/n)" -ForegroundColor Yellow
$testBuild = Read-Host

if ($testBuild -eq 'y') {
    Write-Host ""
    Write-Host "开始测试构建（这可能需要几分钟）..." -ForegroundColor Cyan
    Write-Host ""
    
    Set-Location "docs"
    npm run docs:build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ 构建测试成功！" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ 构建测试失败！" -ForegroundColor Red
        Write-Host "请检查错误信息，可能需要调整配置" -ForegroundColor Yellow
    }
    
    Set-Location ..
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ 升级完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 新版本信息：" -ForegroundColor Yellow
Write-Host "  VuePress: 2.0.0-rc.25" -ForegroundColor White
Write-Host "  Theme Hope: 2.0.0-rc.94" -ForegroundColor White
Write-Host "  Vue: 3.5.13" -ForegroundColor White
Write-Host "  Vue Router: 4.5.0" -ForegroundColor White
Write-Host ""
Write-Host "📝 下一步操作：" -ForegroundColor Yellow
Write-Host "  1. 测试本地开发：npm run docs:dev" -ForegroundColor White
Write-Host "  2. 测试本地构建：npm run docs:build" -ForegroundColor White
Write-Host "  3. 如果一切正常，提交到Git并触发Netlify构建" -ForegroundColor White
Write-Host ""
Write-Host "🔄 如需回滚：" -ForegroundColor Yellow
Write-Host "  备份位置：$backupDir" -ForegroundColor White
Write-Host "  恢复命令：" -ForegroundColor White
Write-Host "    Copy-Item $backupDir/package.json docs/package.json -Force" -ForegroundColor Gray
Write-Host "    cd docs && npm install" -ForegroundColor Gray
Write-Host ""
