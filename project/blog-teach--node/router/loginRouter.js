/**
 * 登录页面
 */
var express=require("express")
var router=express.Router()
var User = require("../models/User").User

router.get("/",function(req,res){
    // res.send("get----登录页面")
    // 渲染登录页面，login.ejs
    res.render("login")
})
router.post("/",function(req,res){
    // 校验参数
    var username = req.body.username;
    var password = req.body.password;
    try{
        if (!username) {
            throw new Error('用户名不能为空')
        }
        if (!password) {
            throw new Error('密码不能为空')
        }
    }catch(e){
        req.flash("error",e.message);
        res.redirect("back");
        // 校验错误时结束执行代码
        return
    }
    // 数据库查找
    User.findOne({
        username:username
    },function(err,result){
        if(err){
            console.log("查找用户失败",err)
        }
        if(!result){
            req.flash("error","用户不存在")
            return res.redirect("back")
        }
        if(result.password!=password){
            req.flash("error","密码错误");
            res.redirect("back")
        }else{
            // 将当前用户写入session中
            req.session.user=result
            console.log("req.session.user", req.session.user)
            req.flash("success","登录成功");
            res.redirect("posts")
            // 登录成功后跳转至个人主页=====已发表的文章
            // res.redirect("/")
        }
    })
    // res.send("post----登录页面")
})
module.exports=router