
export const login = (req,res) => {
    const {user, password } = req.body;

    if ((user === 'ftoniolo' && password === '123') || (user === 'gonzalo' && password === '123') ) {
        req.session.user= user;
        req.session.login= true;
        res.redirect('/chat');

    } else {
        res.render('user/login',{err: "Credenciales incorrectas"});
    }
}

export const logout = async (req, res) => {
    const userName= req.session.user;
    await req.session.destroy();
    res.render('user/logout',{user: userName || 'algo'});
}


