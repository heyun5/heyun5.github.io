var express=require("express")
var router=express.Router();
var url=require("url");
var User=require("../models/User").User;
var Post=require("../models/Post").Post;
var Comment=require("../models/Comment").Comment;

router.get("/",function(req,res){
    // res.send("get----commentsRouter")
})


// ======================发表留言
router.post("/:postId",function(req,res,next){
    // 判断登录的条件，Session中的user
    if(!req.session.user){
        req.flash("error","发表留言需要登录");
        return res.redirect("/login")
    }
    next()
},function(req,res){
    var author=req.session.user._id
    var content=req.body.content
    var postId=req.params.postId
    //校验参数
    try{
        if(!content){
            throw new Error("留言不能为空")
        }
    }catch(e){
        req.flash("error",e.message);
        res.redirect("back");
        return
    }
    Comment.create({
        postId:postId,
        content:content,
        author:author
    },function(err,result){
        if(err){
            console.log("发表留言失败",err)
        }
        console.log("发表留言成功111")
        req.flash("success","发表留言成功")
        res.redirect("back")
        // 留言数的更新
        Post.findById(postId,function(err1,result1){
            Post.findByIdAndUpdate(postId,{
                comments:result1.comments + 1
            },function(err2,result2){
                console.log("result2",result2)
            })
        })
    })
})




// ===============删除评论/留言
router.get("/:commentId/remove",function(req,res){
    // res.send("删除留言")
    var commentId=req.params.commentId;
    Comment.findById(commentId,function(err,result){
        if(err){
            console.log("查找留言失败",err)
        }
        console.log("查找留言成功")
        // 判断用户与留言者是否相同，相同即可删除留言
        if(req.session.user){
            if(result.author==req.session.user._id){
                // 删除
                Comment.findByIdAndRemove(commentId,function(err1,result1){
                    console.log("删除留言成功")
                    req.flash("success","删除留言成功")
                    res.redirect("back")

                    Post.findById(result1.postId,function(err2,result2){
                        // 留言数更新
                        Post.findByIdAndUpdate(result1.postId,{
                            comments:result2.commments - 1
                        },function(err3,result3){
                            console.log("更新留言数成功")
                        })
                    })
                })
            }else{
                // 作者不同时，没有权限
                req.flash("error","没有权限删除留言")
                res.redirect("back")
            }
        }else{
            // 用户不存在时，请先登录
            console.log("没有权限删除留言")
            req.flash("error","用户未登录，不能删除留言，请先登录")
            res.redirect("/login")
        }
      
    })
})
module.exports = router