var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

var options = {
 errorMessages: {
    IncorrectUsernameError: 'Username is incorrect',
    IncorrectPasswordError: 'Password is incorrect'
 }
};

// add PLM package methods to userschema
UserSchema.plugin(passportLocalMongoose, options);

// compile a schema into a model
module.exports = mongoose.model("User", UserSchema);

