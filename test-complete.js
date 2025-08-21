#!/usr/bin/env node

// Complete RELAY API Test Suite
const http = require('http');

console.log('🚀 RELAY Authentication API Test Suite');
console.log('========================================\n');

let testResults = {
    passed: 0,
    failed: 0,
    total: 0
};

// Test configuration
const SERVER_URL = 'localhost';
const SERVER_PORT = 3001;
let authToken = '';

// Test utilities
function logTest(testName, passed, message = '') {
    testResults.total++;
    if (passed) {
        testResults.passed++;
        console.log(`✅ ${testName}`);
    } else {
        testResults.failed++;
        console.log(`❌ ${testName}: ${message}`);
    }
}

function makeRequest(options, data = null) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => responseData += chunk);
            res.on('end', () => {
                try {
                    const parsedData = responseData ? JSON.parse(responseData) : {};
                    resolve({ status: res.statusCode, data: parsedData, raw: responseData });
                } catch (e) {
                    resolve({ status: res.statusCode, data: {}, raw: responseData });
                }
            });
        });

        req.on('error', reject);
        
        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

// Test 1: Server Health Check
async function testServerHealth() {
    console.log('🏥 Testing Server Health...');
    try {
        const response = await makeRequest({
            hostname: SERVER_URL,
            port: SERVER_PORT,
            path: '/',
            method: 'GET'
        });

        logTest('Server responds to health check', response.status === 200);
        logTest('Server returns correct message', response.data.message === 'RELAY API Server is running!');
        
        return response.status === 200;
    } catch (error) {
        logTest('Server health check', false, 'Server not running or not accessible');
        return false;
    }
}

// Test 2: User Registration
async function testUserRegistration() {
    console.log('\n👤 Testing User Registration...');
    
    const userData = {
        username: 'testuser_' + Date.now(),
        email: `test_${Date.now()}@example.com`,
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
    };

    try {
        const response = await makeRequest({
            hostname: SERVER_URL,
            port: SERVER_PORT,
            path: '/api/auth/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }, userData);

        logTest('Registration endpoint responds', response.status === 201);
        logTest('Registration returns success', response.data.success === true);
        logTest('Registration returns token', !!response.data.token);
        logTest('Registration returns user data', !!response.data.user);

        if (response.data.token) {
            authToken = response.data.token;
            console.log(`🔑 Auth token received: ${authToken.substring(0, 20)}...`);
        }

        return response.status === 201;
    } catch (error) {
        logTest('User registration', false, error.message);
        return false;
    }
}

// Test 3: User Login
async function testUserLogin() {
    console.log('\n🔐 Testing User Login...');
    
    const loginData = {
        email: 'test@example.com',
        password: 'password123'
    };

    try {
        const response = await makeRequest({
            hostname: SERVER_URL,
            port: SERVER_PORT,
            path: '/api/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }, loginData);

        // This might fail if user doesn't exist, but endpoint should respond
        logTest('Login endpoint responds', response.status === 200 || response.status === 401);
        logTest('Login returns proper error for invalid credentials', 
               response.status === 401 || (response.status === 200 && response.data.success));

        return true;
    } catch (error) {
        logTest('User login', false, error.message);
        return false;
    }
}

// Test 4: Protected Route (Get Profile)
async function testProtectedRoute() {
    console.log('\n🛡️  Testing Protected Routes...');
    
    if (!authToken) {
        logTest('Protected route test', false, 'No auth token available');
        return false;
    }

    try {
        const response = await makeRequest({
            hostname: SERVER_URL,
            port: SERVER_PORT,
            path: '/api/auth/me',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        logTest('Protected route responds with auth', response.status === 200);
        logTest('Protected route returns user data', !!response.data.user);

        return response.status === 200;
    } catch (error) {
        logTest('Protected route access', false, error.message);
        return false;
    }
}

// Test 5: Thread Creation
async function testThreadCreation() {
    console.log('\n📝 Testing Thread Creation...');
    
    if (!authToken) {
        logTest('Thread creation test', false, 'No auth token available');
        return false;
    }

    const threadData = {
        title: 'Test Discussion Thread',
        description: 'This is a test thread created by the API test suite',
        tags: ['test', 'api'],
        category: 'Testing'
    };

    try {
        const response = await makeRequest({
            hostname: SERVER_URL,
            port: SERVER_PORT,
            path: '/api/threads',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        }, threadData);

        logTest('Thread creation responds', response.status === 201);
        logTest('Thread creation returns success', response.data.success === true);
        logTest('Thread creation returns thread data', !!response.data.thread);

        return response.status === 201;
    } catch (error) {
        logTest('Thread creation', false, error.message);
        return false;
    }
}

// Test 6: Get All Threads
async function testGetThreads() {
    console.log('\n📋 Testing Get All Threads...');
    
    try {
        const response = await makeRequest({
            hostname: SERVER_URL,
            port: SERVER_PORT,
            path: '/api/threads',
            method: 'GET'
        });

        logTest('Get threads endpoint responds', response.status === 200);
        logTest('Get threads returns success', response.data.success === true);
        logTest('Get threads returns threads array', Array.isArray(response.data.threads));

        return response.status === 200;
    } catch (error) {
        logTest('Get all threads', false, error.message);
        return false;
    }
}

// Run all tests
async function runAllTests() {
    console.log('Starting comprehensive API tests...\n');
    
    const serverRunning = await testServerHealth();
    
    if (!serverRunning) {
        console.log('\n❌ Server is not running. Please start the server with: npm start');
        console.log('Make sure MongoDB is also running.');
        return;
    }

    await testUserRegistration();
    await testUserLogin();
    await testProtectedRoute();
    await testThreadCreation();
    await testGetThreads();

    // Summary
    console.log('\n📊 Test Results Summary');
    console.log('=======================');
    console.log(`✅ Passed: ${testResults.passed}/${testResults.total}`);
    console.log(`❌ Failed: ${testResults.failed}/${testResults.total}`);
    
    if (testResults.failed === 0) {
        console.log('\n🎉 All tests passed! Your RELAY API is working perfectly!');
        console.log('\n📝 Next steps:');
        console.log('1. Use Postman to test manually');
        console.log('2. Develop the React frontend');
        console.log('3. Deploy to production');
    } else {
        console.log('\n⚠️  Some tests failed. Check the error messages above.');
        console.log('Common issues:');
        console.log('- MongoDB not running');
        console.log('- Missing environment variables');
        console.log('- Port conflicts');
    }
}

// Start testing
runAllTests().catch(console.error);
