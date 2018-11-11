var express = require("express")
var router = express.Router()
var path = require("path")
var fs = require("fs")
var User = require("../models/User").User
var multer = require("multer")

// 文件的上传
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, req.body.username + '-' + Date.now() + path.extname(file.originalname))

    }
})

var upload = multer({
    storage: storage
})

//get 注册
router.get("/", function (req, res) {
    res.render("register")
})
// post 注册  头像上传
router.post("/", upload.single("avatar"), function (req, res) {
    // res.send("post----register")
    // console.log("req.body",req.body)
    // console.log("req.file",req.file)
    // 接收参数
    var username = req.body.username;
    var password = req.body.password;
    var gender = req.body.gender;
    var profile = req.body.profile;
    var avatar = req.file;
    // 校验参数
    try {
        // if ((username.length < 3) || (username.length > 10)) {
        //     throw new Error('请输入用户名3-10')
        // }
        // if (!password) {
        //     throw new Error('请输入密码')
        // }
        // if (!profile) {
        //     throw new Error('请输入个人简介')
        // }
        // if (!avatar) {
        //     throw new Error('请选择头像')
        // }
        if (!username) {
            throw new Error('用户名不能为空')
        }
        if (!password) {
            throw new Error('密码不能为空')
        }
        if (!profile) {
            throw new Error('简介不能为空')
        }
        // 对应avatar.filename,否则会报错
        if(!avatar){
            throw new Error("头像不能为空")
        }
    } catch (e) {
        // 注册失败，异步删除上传的头像
        if (avatar) {
            fs.unlink(avatar.path, function(err) {
                if (err) {
                    console.log('删除头像失败', err)
                } else {
                    console.log("删除头像成功")
                }
            })
        }
        req.flash('error', e.message)
        res.redirect('back');
        return
    }
    // 写入数据库
    User.create({
        username: username,
        password: password,
        gender: gender,
        profile: profile,
        avatar: avatar.filename
    }, function (err, result) {

                if (err) {
                    console.log("注册失败", err)
                    req.flash("error","用户名已存在")
                    res.redirect("/login")
                } else {


                    // 注册成功后，用户自动登录
                    req.session.user=result
                    console.log("注册成功")
                    req.flash("success","注册成功")   
                    res.redirect("/login")
                }
    })

})
module.exports = router

