let rollOut = function (req, res, next){
    if(!req.session){
        next();
    }else if(!req.session.user){
        next();
    } else{
        req.app.locals.role = req.session.user.role;
    }
    next();
}
module.exports = rollOut;
