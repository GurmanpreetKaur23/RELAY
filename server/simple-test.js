const http = require('http');

// Simple test to check if basic routes work
function testBasicRoute() {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/',
        method: 'GET'
    };

    console.log('Testing basic server route...');
    
    const req = http.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('Response:', data);
            
            if (res.statusCode === 200) {
                console.log('✅ Basic route working!');
                testAuthEndpoint();
            } else {
                console.log('❌ Basic route failed');
            }
        });
    });

    req.on('error', (err) => {
        console.log('❌ Request failed:', err.message);
    });

    req.end();
}

function testAuthEndpoint() {
    console.log('\nTesting if auth route exists...');
    
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const req = http.request(options, (res) => {
        console.log(`Auth endpoint status: ${res.statusCode}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('Auth response:', data);
            
            if (res.statusCode === 400 || res.statusCode === 422) {
                console.log('✅ Auth route exists (returning validation error as expected)');
            } else if (res.statusCode === 500) {
                console.log('⚠️  Auth route exists but database might not be connected');
            } else {
                console.log('❓ Unexpected response');
            }
        });
    });

    req.on('error', (err) => {
        console.log('❌ Auth request failed:', err.message);
    });

    req.end();
}

testBasicRoute();
