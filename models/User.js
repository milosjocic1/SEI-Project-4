const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        minlength: [3],
        maxlength: [99],
        required: true
    },
    lastName: {
        type: String,
        minlength: [3],
        maxlength: [99],
        required: true
    },
    emailAddress: {
        type: String,
        minlength: [10],
        maxlength: [99],
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlenth:[6],
        maxlength: [20],
        required: true,
    },
    profilePhoto: String,
    shippingAddress: {
        addressLine1: {
            type: String,
            minlength: [4],
            maxlength: [99],
            required: true
        },
        addressLine2: {
            type: String,
            minlength: [4],
            maxlength: [99],
        },
        city: {
            type: String,
            minlength: [4],
            maxlength: [99],
            required: true
        },
        county: {
            type: String,
            minlength: [4],
            maxlength: [99],
            required: true
        },
        postCode: {
            type: String,
            minlength: [4],
            maxlength: [6],
            required: true
        }
    },
    billingAddress: {
        addressLine1: {
            type: String,
            minlength: [4],
            maxlength: [99],
            required: true
        },
        addressLine2: {
            type: String,
            minlength: [4],
            maxlength: [99],
        },
        city: {
            type: String,
            minlength: [4],
            maxlength: [99],
            required: true
        },
        county: {
            type: String,
            minlength: [4],
            maxlength: [99],
            required: true
        },
        postCode: {
            type: String,
            minlength: [4],
            maxlength: [6],
            required: true
        }
    },
    phoneNumber: {
        type: Number,
        minlength: [11],
        maxlength: [16]
    },
    userRole: String,
    favourite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favourite'
    }],  
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],  
    transaction: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
},
{
    timestamps: true   
});

const User = mongoose.model('User', userSchema);

module.exports = {User};