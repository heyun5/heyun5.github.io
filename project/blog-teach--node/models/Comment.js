// 评论的计数器
var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var commentSchema=Schema({
    postId:String,
    content:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    createTime:{
        type:Date,
        default:Date.now()
    }
})
exports.Comment=mongoose.model("Comment",commentSchema)