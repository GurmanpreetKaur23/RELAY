const http = require('http');

// Test if server is running
function testServerHealth() {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`✅ Server is running! Status: ${res.statusCode}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('Response:', data);
            testAuthRoutes();
        });
    });

    req.on('error', (err) => {
        console.log('❌ Server is not running:', err.message);
        console.log('Please start the server first with: npm start');
    });

    req.end();
}

// Test authentication routes
function testAuthRoutes() {
    console.log('\n🧪 Testing Authentication Routes...\n');
    
    // Test registration
    testRegister();
}

function testRegister() {
    const postData = JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
    });

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    console.log('Testing user registration...');
    
    const req = http.request(options, (res) => {
        console.log(`Registration Status: ${res.statusCode}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                if (res.statusCode === 201) {
                    console.log('✅ Registration successful!');
                    console.log('User:', response.user.username);
                    console.log('Token received:', response.token ? 'Yes' : 'No');
                    
                    // Test login with the same credentials
                    testLogin('test@example.com', 'password123');
                } else {
                    console.log('❌ Registration failed:', response.message);
                }
            } catch (err) {
                console.log('❌ Invalid JSON response:', data);
            }
        });
    });

    req.on('error', (err) => {
        console.log('❌ Registration request failed:', err.message);
    });

    req.write(postData);
    req.end();
}

function testLogin(email, password) {
    const postData = JSON.stringify({
        email: email,
        password: password
    });

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    console.log('\nTesting user login...');
    
    const req = http.request(options, (res) => {
        console.log(`Login Status: ${res.statusCode}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                if (res.statusCode === 200) {
                    console.log('✅ Login successful!');
                    console.log('User:', response.user.username);
                    console.log('Token received:', response.token ? 'Yes' : 'No');
                    
                    // Test protected route
                    testProtectedRoute(response.token);
                } else {
                    console.log('❌ Login failed:', response.message);
                }
            } catch (err) {
                console.log('❌ Invalid JSON response:', data);
            }
        });
    });

    req.on('error', (err) => {
        console.log('❌ Login request failed:', err.message);
    });

    req.write(postData);
    req.end();
}

function testProtectedRoute(token) {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/me',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    console.log('\nTesting protected route (/api/auth/me)...');
    
    const req = http.request(options, (res) => {
        console.log(`Protected Route Status: ${res.statusCode}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                if (res.statusCode === 200) {
                    console.log('✅ Protected route working!');
                    console.log('User profile:', response.user.username);
                    console.log('\n🎉 All tests passed! Authentication system is working correctly.');
                } else {
                    console.log('❌ Protected route failed:', response.message);
                }
            } catch (err) {
                console.log('❌ Invalid JSON response:', data);
            }
        });
    });

    req.on('error', (err) => {
        console.log('❌ Protected route request failed:', err.message);
    });

    req.end();
}

// Start testing
console.log('🚀 Starting RELAY API Tests...\n');
testServerHealth();
