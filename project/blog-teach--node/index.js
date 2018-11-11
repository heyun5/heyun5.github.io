 /**
  * 主项目页面
 */
var express=require("express");
var app=express()
var bodyParser=require("body-parser")
// 导入数据
var db=require("./lib/mongoose").db;   
var session=require("express-session")
var MongoStore=require("connect-mongo")(session)
var flash=require("connect-flash")

// 模板引擎
app.set("views","./views");
app.set("view engine","ejs")

// 静态文件的托管===使得public中的文件对外开放
app.use(express.static("public"))

// 中间件使用
app.use(bodyParser.urlencoded({
    extended:false
}))

//设置session
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        },
        store: new MongoStore({
            mongooseConnection: db
        })
    })
);
app.use(flash())

// flash的响应请求----req.flash默认为数组形式，需要转换为string时进行判断
app.use(function(req,res,next){
    // 设置其值
    res.locals.user=req.session.user
    res.locals.success=req.flash("success").toString()
    res.locals.error=req.flash("error").toString()
    next()
})



// 路由文件的使用
app.use("/",require("./router/indexRouter"))
app.use("/login",require("./router/loginRouter"))
app.use("/logout",require("./router/logoutRouter"))
app.use("/register",require("./router/registerRouter"))
app.use("/posts",require("./router/postRouter"))
app.use('/comments', require('./router/commentsRouter'));

app.listen(8080,function(){
    console.log("主页面 监听成功")
})


