const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [20, 'Username must be less than 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        maxlength: [50, 'First name must be less than 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        maxlength: [50, 'Last name must be less than 50 characters']
    },
    profilePicture: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        maxlength: [500, 'Bio must be less than 500 characters'],
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    
    try {
        // Hash password with cost of 12
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to get user's full name
userSchema.methods.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
};

// Method to get public profile (exclude sensitive information)
userSchema.methods.getPublicProfile = function() {
    return {
        id: this._id,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        fullName: this.getFullName(),
        profilePicture: this.profilePicture,
        bio: this.bio,
        createdAt: this.createdAt
    };
};

module.exports = mongoose.model('User', userSchema);
