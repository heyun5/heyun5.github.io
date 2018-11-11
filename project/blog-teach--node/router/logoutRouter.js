var express=require("express")
var router=express.Router();
var User=require("../models/User").User
router.get("/",function(req,res){
    // res.send("get ----logout")
    
    // 清除session中的user，若无user则没有登录
    req.session.user=null;
    res.redirect("login")
})
module.exports=router