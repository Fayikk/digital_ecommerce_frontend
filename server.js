const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    
    // Özel statik dosya işleme
    if (pathname.startsWith('/_next/') || 
        pathname === '/favicon.ico' ||
        pathname.match(/\.(js|css|map|ico|png|jpg|jpeg|gif|svg)$/)) {
      console.log(`Serving static file: ${pathname}`);
    }
    
    // Tüm istekleri Next.js'e yönlendir
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});