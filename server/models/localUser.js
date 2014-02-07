var mongoose = require('mongoose');

// Create a basic local user schema
var localUserSchema = mongoose.Schema({
    email               : String,
    password            : String,
    active              : {type: Boolean, default: false},
    activationKey       : String,
    passwordResetKey    : String
});

// Create a model using the schema
var LocalUser = mongoose.model('User', localUserSchema);

// Export the model
module.exports = LocalUser;