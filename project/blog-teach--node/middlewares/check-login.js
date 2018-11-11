/**
 * 检查账号是否已登录
 */

exports.checkLogin=function(req,res,next){
    if(!req.session.user){
        res.flash("error","未登录");
        return res.redirect("back")
    }
    next()
}
exports.chenkNotLogin=function(req,res,next){
    if(req.session.user){
        req.flash("error","已登录");
        return res.redirect("back")
    }
    next()
}