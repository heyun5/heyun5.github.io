// 建立数据库
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/node-blog",function(err){
    if(err){
        cosnoel,log("数据库连接失败")
    }else{
        console.log("数据库连接成功")
    }
})
exports.db=mongoose.connection
