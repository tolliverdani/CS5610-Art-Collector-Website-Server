const SessionController = (app) => {
    app.get('/api/session/set/:name/:value', setSession);
    app.get('/api/session/get/:name', getSession);
    app.get('/api/session/get', getSessionAll);
    app.get('/api/session/reset', resetSession);
}

const setSession = (req, res) => {
    const name = req.params['name'];
    req.session[name] = req.params['value'];
    res.send(req.session);
}

const getSession = (req, res) => {
    const name = req.params['name'];
    const value = req.session[name];
    res.send(value);
}

const getSessionAll = (req, res) => {
    res.send(req.session);
}

const resetSession = (req, res) => {
    req.session.destroy();
    res.send(200);
}

export default SessionController;