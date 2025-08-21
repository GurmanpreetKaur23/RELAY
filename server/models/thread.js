const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title must be less than 200 characters']
    },
    description: { 
        type: String, 
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [2000, 'Description must be less than 2000 characters']
    },
    tags: {
        type: [String],
        default: [],
        validate: {
            validator: function(tags) {
                return tags.length <= 10;
            },
            message: 'Cannot have more than 10 tags'
        }
    },
    category: {
        type: String,
        trim: true,
        maxlength: [50, 'Category must be less than 50 characters']
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator is required']
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    replies: [{
        content: {
            type: String,
            required: [true, 'Reply content is required'],
            trim: true,
            maxlength: [1000, 'Reply must be less than 1000 characters']
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }],
    votes: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        type: {
            type: String,
            enum: ['upvote', 'downvote'],
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
});

// Virtual for vote count
threadSchema.virtual('voteCount').get(function() {
    const upvotes = this.votes.filter(vote => vote.type === 'upvote').length;
    const downvotes = this.votes.filter(vote => vote.type === 'downvote').length;
    return upvotes - downvotes;
});

// Virtual for reply count
threadSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

// Ensure virtual fields are serialized
threadSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Thread', threadSchema);
