const http = require('http');

console.log('🔍 MONITORING LIVE REQUESTS...\n');

// Create a simple server to monitor requests
const server = http.createServer((req, res) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] 📥 ${req.method} ${req.url}`);
    console.log(`[${timestamp}] 📋 Headers:`, req.headers);
    
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
        if (body) {
            console.log(`[${timestamp}] 📦 Body:`, body);
        }
        console.log(`[${timestamp}] ✅ Request received successfully\n`);
        
        // Forward to the actual backend
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: req.url,
            method: req.method,
            headers: req.headers
        };
        
        const proxyReq = http.request(options, (proxyRes) => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
        });
        
        proxyReq.on('error', (error) => {
            console.error(`[${timestamp}] ❌ Proxy error:`, error.message);
            res.writeHead(500);
            res.end('Proxy error');
        });
        
        if (body) {
            proxyReq.write(body);
        }
        proxyReq.end();
    });
});

server.listen(3001, () => {
    console.log('🚀 Request monitor running on port 3001');
    console.log('📝 Change frontend API_URL to http://localhost:3001/api to monitor requests');
    console.log('🔍 Or just watch what requests come to port 5000\n');
});

// Also monitor the actual backend port
const monitorBackend = () => {
    const originalRequest = http.request;
    http.request = function(options, callback) {
        if (options.port === 5000) {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] 🎯 BACKEND REQUEST: ${options.method || 'GET'} ${options.path}`);
        }
        return originalRequest.call(this, options, callback);
    };
};

monitorBackend();
