#!/usr/bin/env node
/**
 * 自动化截图测试脚本
 *
 * 用法:
 *   node scripts/screenshot-test.mjs [url] [options]
 *
 * 示例:
 *   # 本地开发服务器截图
 *   node scripts/screenshot-test.mjs http://localhost:3000/
 *
 *   # GitHub Pages 预览截图
 *   node scripts/screenshot-test.mjs http://localhost:3000/ccstudy-top/
 *
 *   # 指定输出文件
 *   node scripts/screenshot-test.mjs http://localhost:3000/ -o screenshot.png
 *
 *   # 全页面截图
 *   node scripts/screenshot-test.mjs http://localhost:3000/ --full-page
 */

import { chromium } from 'playwright';
import { parseArgs } from 'util';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdir } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 解析命令行参数
const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    output: { type: 'string', short: 'o', default: 'e2e-screenshots/screenshot.png' },
    'full-page': { type: 'boolean', default: false },
    width: { type: 'string', default: '1280' },
    height: { type: 'string', default: '720' },
    wait: { type: 'string', default: '2000' },
    help: { type: 'boolean', short: 'h', default: false },
  },
  allowPositionals: true,
});

if (values.help) {
  console.log(`
自动化截图测试脚本

用法:
  node scripts/screenshot-test.mjs [url] [options]

参数:
  url                     要截图的页面 URL (默认: http://localhost:3000/)

选项:
  -o, --output <path>     输出文件路径 (默认: e2e-screenshots/screenshot.png)
  --full-page             截取全页面而不仅是视口
  --width <number>        视口宽度 (默认: 1280)
  --height <number>       视口高度 (默认: 720)
  --wait <milliseconds>   等待页面加载的时间 (默认: 2000ms)
  -h, --help              显示帮助信息

示例:
  # 本地构建预览截图
  node scripts/screenshot-test.mjs http://localhost:3000/

  # GitHub Pages 路径截图
  node scripts/screenshot-test.mjs http://localhost:3000/ccstudy-top/

  # 指定输出路径和尺寸
  node scripts/screenshot-test.mjs http://localhost:3000/ -o docs/preview.png --width 1920 --height 1080
`);
  process.exit(0);
}

const url = positionals[0] || 'http://localhost:3000/';
const outputPath = join(process.cwd(), values.output);
const screenshotDir = dirname(outputPath);

// 主函数
async function main() {
  console.log(`🎬 启动浏览器...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: {
      width: parseInt(values.width),
      height: parseInt(values.height),
    },
  });
  const page = await context.newPage();

  try {
    console.log(`🌐 访问页面: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });

    // 等待额外时间让动画完成
    const waitTime = parseInt(values.wait);
    if (waitTime > 0) {
      console.log(`⏳ 等待 ${waitTime}ms 让页面完全渲染...`);
      await page.waitForTimeout(waitTime);
    }

    // 确保输出目录存在
    await mkdir(screenshotDir, { recursive: true });

    // 截图
    console.log(`📸 正在截图...`);
    await page.screenshot({
      path: outputPath,
      fullPage: values['full-page'],
    });

    console.log(`✅ 截图已保存: ${outputPath}`);

    // 获取页面信息
    const title = await page.title();
    const pageUrl = page.url();
    console.log(`📄 页面标题: ${title}`);
    console.log(`🔗 页面 URL: ${pageUrl}`);

    // 检查是否有加载错误
    const logs = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(`[ERROR] ${msg.text()}`);
      }
    });

    page.on('pageerror', error => {
      logs.push(`[PAGE ERROR] ${error.message}`);
    });

    // 给一点时间收集日志
    await page.waitForTimeout(500);

    if (logs.length > 0) {
      console.log('\n⚠️  页面错误日志:');
      logs.forEach(log => console.log(`  ${log}`));
    } else {
      console.log('✅ 未发现页面错误');
    }

  } catch (error) {
    console.error(`❌ 截图失败: ${error.message}`);
    process.exit(1);
  } finally {
    await browser.close();
    console.log('🔒 浏览器已关闭');
  }
}

main();
