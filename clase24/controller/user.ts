
export const login = (req,res) => {
    const {user, password } = req.body;

    if (user === 'ftoniolo' && password === '123') {
        req.session.user= "Franco";
        req.session.login= true;
        res.redirect('/chat');

    } else {
        console.log(req.session.user);
        res.render('user/login',{err: "Credenciales incorrectas"});
    }
}

export const logout = async (req, res) => {
    const userName= req.session.user;
    await req.session.destroy();
    res.render('user/logout',{user: userName || 'algo'});
}


