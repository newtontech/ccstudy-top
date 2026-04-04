#!/usr/bin/env node
/**
 * 开发服务器启动脚本
 *
 * 自动检测环境并启动合适的服务器
 *
 * 用法:
 *   node scripts/dev-server.mjs [mode]
 *
 * Mode:
 *   local    - 本地开发模式 (无 basePath, 端口 3000)
 *   github   - GitHub Pages 模式 (basePath=/ccstudy-top, 端口 3000)
 *   dev      - Next.js 开发服务器 (端口 3000)
 */

import { spawn } from 'child_process';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { existsSync } from 'fs';

const mode = process.argv[2] || 'local';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

// 启动 Next.js 开发服务器
function startNextDev() {
  console.log('🚀 启动 Next.js 开发服务器...');
  console.log('📍 访问: http://localhost:3000/');

  const proc = spawn('npx', ['next', 'dev'], {
    stdio: 'inherit',
    shell: true,
  });

  return proc;
}

// 启动静态文件服务器
function startStaticServer(buildDir, basePath) {
  const port = 3000;
  const serverRoot = basePath
    ? join(process.cwd(), buildDir, basePath)
    : join(process.cwd(), buildDir);

  if (!existsSync(serverRoot)) {
    console.error(`❌ 构建目录不存在: ${serverRoot}`);
    console.error(`请先运行: npm run build:${mode === 'github' ? 'github' : 'local'}`);
    process.exit(1);
  }

  const server = createServer(async (req, res) => {
    let filePath = join(serverRoot, req.url === '/' ? 'index.html' : req.url);

    // 处理路由（SPA 支持）
    if (!extname(filePath)) {
      const htmlPath = filePath + '.html';
      if (existsSync(htmlPath)) {
        filePath = htmlPath;
      } else if (existsSync(join(filePath, 'index.html'))) {
        filePath = join(filePath, 'index.html');
      }
    }

    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      const content = await readFile(filePath);
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      });
      res.end(content);
    } catch (error) {
      // 尝试返回 index.html（SPA 回退）
      try {
        const indexContent = await readFile(join(serverRoot, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexContent);
      } catch {
        res.writeHead(404);
        res.end('Not Found');
      }
    }
  });

  server.listen(port, () => {
    console.log(`\n✅ 静态服务器已启动`);
    console.log(`📍 访问: http://localhost:${port}${basePath}/`);
    console.log(`📁 服务目录: ${serverRoot}\n`);
  });

  return server;
}

// 主函数
async function main() {
  console.log(`🔧 模式: ${mode}\n`);

  switch (mode) {
    case 'dev':
      startNextDev();
      break;

    case 'local': {
      const buildDir = 'out';
      const basePath = '';
      startStaticServer(buildDir, basePath);
      break;
    }

    case 'github': {
      const buildDir = 'dist';
      // 为 GitHub Pages 预览，需要创建 ccstudy-top 子目录
      const { execSync } = await import('child_process');
      try {
        execSync('mkdir -p dist-preview && rm -rf dist-preview/ccstudy-top && cp -r dist dist-preview/ccstudy-top', { stdio: 'inherit' });
      } catch (e) {
        console.error('❌ 创建预览目录失败');
        process.exit(1);
      }
      startStaticServer('dist-preview', '');
      break;
    }

    default:
      console.error(`❌ 未知模式: ${mode}`);
      console.error('可用模式: dev, local, github');
      process.exit(1);
  }
}

main();
