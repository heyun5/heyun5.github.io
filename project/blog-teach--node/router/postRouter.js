var express=require("express")
var router=express.Router();
var url=require("url");
var User=require("../models/User").User;
var Post=require("../models/Post").Post;
var Comment=require("../models/Comment").Comment;
var checkLogin=require("../middlewares/check-login").checkLogin;

// ================主页、作者页面
router.get("/",function(req,res){
    // res.send("get----postRouter")
    var author=url.parse(req.url,true).query.author;
    // console.log("author========",author)
    var whereStr
    if(author){
        // 文章详情
        whereStr={author:author}
    }else{
        // 所有文章
        whereStr={}
    }
    // 文章发布的时间倒序排列，（createTime===too）
    Post.find(whereStr).sort({_id:-1}).populate("author").exec(function(err,result){
        if(err){
            console.log("获取作者文章失败",err)
        }
        console.log("获取作者文章成功")
        // console.log("result=====",result)
        // 截取文章的部分内容作为===========预览页面
        result.forEach(element =>{
            element.content=element.content.substr(0,120)
        })
        res.render("post-list",{
            post:result
        })
    })
})


// =================发表文章页面
router.get("/create",function(req,res,next){
    if(!req.session.user){
        console.log("req.session.user====不存在")
        return res.redirect("/login")
    }
    console.log("req.session.user======存在")
    next()
},function(req,res){
    // 渲染
    res.render("create")
})

router.post("/create",function(req,res){
    // 接收参数
    console.log("post ----create",req.body)
    var title=req.body.title;
    var content=req.body.content;
    var author=req.session.user._id;   //补充作者验证功能
    // 校验参数
    try{
        if(!title){
            throw new Error("标题不能为空")
        }
        if(!content){
            throw new Error("内容不能为空")
        }
    }catch(e){
        req.flash("error",e.message);
        res.redirect("back");
        return
    }

    // 写入数据库
    Post.create({
        title:title,
        content:content,
        author:author
    },function(err,result){
        if(err){
            console.log("文章发表失败",err)
        }
            console.log("文章发表成功")
            req.flash("success","文章发表成功");
            console.log("result._id=====",result._id)
            res.redirect("/posts/"+result._id)   
            // 需要跳转至个人已发表主页=====个人主页记录已发表文章
        
    })
})


// ===============文件上传详情页面=====Post.js中查找
router.get("/:postId",function(req,res){
    var postId=req.params.postId;
    Post.findById(postId).populate("author").exec(function(err,result){
        console.log("result",result);    //====>
        if(err){
            console.log("查找文章失败",err)
        }
        console.log("查找文章成功")
        // pv===浏览次数=更新
        Post.findByIdAndUpdate(postId,{
            pv:result.pv+1
        },function(err1,result1){
                if(err){
                    console.log("pv更新失败",err1)
                }else{
                    console.log("pv更新成功")
                }
        })
       
        // 查找评论
        Comment.find({
            postId:req.params.postId
        }).populate("author").exec(function(err2,result2){
            // 渲染页面====发表文章页面
            res.render("post-detail",{
                post:result,
                comments:result2
            })
        })
    })
})







// ==========编辑========修改文章页面
router.get("/:postId/edit",function(req,res){
    var postId=req.params.postId
    Post.findById(postId,function(err,result){
        if(err){
            console.log("编辑文章失败",err)
        }else{
            res.render("edit",{
                post:result
            })
        }
    })
})

// =======get方式编辑文章
router.get("/:postId/edit",function(req,res){
    // console.log(req.params.postId)
    var postId=req.params.postId;
    var user=req.session.user;
    if(user){
        Post.findById(postId,function(err,result){
            // 作者相同时，否则没有权限
            if(result.author==user._id){
                res.render("edit",{
                    post:result
                })
            }else{
                req.flash("error","没有权限编辑文章")
                res.redirect("back")
            }
        })
    }else{
        req.flash("error","用户未登录,不能编辑文章，请先登录");
        res.redirect("/login")
    }
})

// post方式编辑文章
router.post("/:postId/edit",function(req,res){
    var postId=req.params.postId
    var title=req.body.title
    var content=req.body.content
    var user=req.session.user
    // 校验参数
    try{
        if(!title){
            throw new Error("标题不能为空")
        }
        if (!content) {
            throw new Error('内容不能为空')
        }
        if (!user) {
            throw new Error('未登录')
        }
    }catch(e){
        req.flash("error",e.message)
        res.redirect("back")
        return
    }

    Post.findById(postId).populate("author").exec(function(err,result){
        if(result.author._id==user._id){
            Post.findByIdAndUpdate(postId,{
                title:title,
                content:content
            },function(err1,result1){
                if(err1){
                    console.log("文章更新失败",err1)
                    req.flash("error","文章更新失败")
                    res.redirect("back")
                }
                req.flash("succes","文章更新成功")
                res.redirect("/posts/"+result1._id)
            })
        }else{
            req.flash("error","用户未登录，不能编辑文章，请先登录")
            res.redirect("back")
        }
    })
})



// // ===========删除==========文章的删除
router.get("/:postId/remove",function(req,res){
    var postId=req.params.postId;
    console.log(postId);
    Post.findById(postId,function(err,result){
        if(err){
            console.log("查找文章失败",err)
        }
        //判断权限===作者存在？   ====  相同？
        if(req.session.user){
            if (result.author == req.session.user._id) {
                // 删掉文章
                Post.findByIdAndRemove(postId, function(err1, result1) {
                    req.flash("success", '删除文章成功');
                    res.redirect('/posts');
                })
            } else {
                // 没权限
                req.flash("error", '没有权限删除文章');
                res.redirect('back');
            }
        }else{
            req.flash("error","用户未登录，请先登录");
            res.redirect("/login")
        }
    })
})


module.exports=router