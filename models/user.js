var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: {type:String, default:"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"},
    firstName: String,
    lastName: String,
    email: String,
    isAdmin: {type:Boolean, default: false}
});

// add PLM package methods to userschema
UserSchema.plugin(passportLocalMongoose);

// compile a schema into a model
module.exports = mongoose.model("User", UserSchema);
