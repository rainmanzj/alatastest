
//检查是否已经登陆
exports.checkin = function (req, res, next) {
    var user = req.session.user;
    if (user == null) {
        return res.redirect("/manager/login/");
    }
    next();
}
