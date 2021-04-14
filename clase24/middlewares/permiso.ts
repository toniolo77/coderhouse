export const middlewares = {

    isLogin : function (req, res, next) {
        if (req.session.user) return next();
        else 
        res.redirect('/user/login');
    }
};