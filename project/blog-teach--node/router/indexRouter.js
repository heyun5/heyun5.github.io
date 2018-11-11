/**
 * 主页面
 */

 var express=require("express")
 var router=express.Router();

 router.get("/",function(req,res){
    //  res.send("主页面");
     res.redirect("/posts")
 })
 module.exports=router