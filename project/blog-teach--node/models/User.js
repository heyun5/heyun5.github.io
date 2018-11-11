var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:false
    },
    password:String,
    gender:String,
    profile:String,
    avatar:String
})
exports.User=mongoose.model("User",userSchema)
