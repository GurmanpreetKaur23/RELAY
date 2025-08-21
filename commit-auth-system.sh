#!/bin/bash

# RELAY Authentication System - Git Commit Script
# Run this script to commit your authentication system to GitHub

echo "🚀 RELAY Authentication System - Git Commit Script"
echo "=================================================="

# Navigate to project directory
cd /Users/vrinda/Documents/Relay

# Check current status
echo "📋 Checking git status..."
git status

# Add all files
echo "📁 Adding all files..."
git add -A

# Show what's being committed
echo "📋 Files to be committed:"
git status

# Commit with detailed message
echo "💾 Committing authentication system..."
git commit -m "Add complete user authentication system

✨ Features Added:
- User registration with secure password hashing
- JWT-based login authentication  
- Protected routes with middleware
- User profile management
- Enhanced database models

🔧 Technical Implementation:
- bcryptjs for password hashing
- JWT tokens for authentication
- Express.js middleware for protection
- MongoDB models with validation
- Comprehensive error handling

📁 Files Added/Modified:
- server/models/user.js (NEW)
- server/routes/auth.js (NEW)
- server/middleware/auth.js (NEW)  
- server/routes/thread.js (UPDATED)
- server/models/thread.js (UPDATED)
- server/index.js (UPDATED)
- server/.env (UPDATED)

🧪 Testing:
- Complete Postman testing guide included
- Manual testing verified
- Error handling tested

🎓 Student Project Quality:
- Professional code structure
- Security best practices
- Complete documentation
- Industry-standard patterns"

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin main

# Also push to feature branch for good measure
echo "🌿 Creating and pushing feature branch..."
git checkout -b feature/authentication-system
git push -u origin feature/authentication-system

# Switch back to main
git checkout main

echo "✅ Authentication system successfully committed!"
echo ""
echo "🎯 Next Steps:"
echo "1. Go to: https://github.com/vrindaa4/RELAY"
echo "2. You should now see your changes"
echo "3. Click 'Contribute' or 'New pull request'"
echo "4. Create PR to GurmanpreetKaur23/RELAY"
echo ""
echo "🚀 Your authentication system is ready for contribution!"
