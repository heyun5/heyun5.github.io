/**
 * 发表页面的数据库
 * pv:浏览次数
 * ref:文件来源
 * comments:评论计数器
 */
var mongoose=require("mongoose");
var postSchema=mongoose.Schema({
    title:String,
    content:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    pv:{
        type:Number,
        default:0
    },
    createdTime:{
        type:Date,
        default:Date.now()
    },
    comments:{
        type:Number,
        default:0
    }
})
exports.Post=mongoose.model("Post",postSchema)