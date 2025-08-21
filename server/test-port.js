// Quick test for port 3001
const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/',
    method: 'GET'
};

console.log('Testing server on port 3001...');

const req = http.request(options, (res) => {
    console.log(`✅ Server responding! Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        console.log('Response:', data);
        console.log('\nServer is working! You can now test the authentication routes.');
        process.exit(0);
    });
});

req.on('error', (err) => {
    console.log('❌ Server not responding on port 3001:', err.message);
    console.log('Please start the server with: npm start');
    process.exit(1);
});

req.timeout = 5000;
req.on('timeout', () => {
    console.log('❌ Request timed out');
    req.destroy();
    process.exit(1);
});

req.end();
