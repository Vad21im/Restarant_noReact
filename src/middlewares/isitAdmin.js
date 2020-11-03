function testAdmin(req, res, next) {
    if(!req.session.user){
        return res.redirect('/user/login');
    } else if (req.session.user.role !== 'admin-site'){
        return res.redirect('/user/login');
    }
    console.log('test прошел', req.session.user.role )
    return next()
}

module.exports = testAdmin;
