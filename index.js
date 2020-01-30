var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router(require('./db.js')())
var middlewares = jsonServer.defaults()

// middleware for all incoming requests to handle CORS
server.use((req, resp, next) => {
    resp.set('Access-Control-Allow-Origin', '*');
    resp.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT');
    resp.set('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization');
    next();
});

// a handler function for POST requests for the url '/customers'
server.options('/*', (req, resp) => {
    resp.end();
});

server.get('/customers', (req, resp, next) => {
    let auth = req.headers.authorization;
    if (!auth) {
        resp.status(401).json('Authorization header is missing');
        return;
    }

    let [bearer, token] = auth.split(' ');
    if (bearer && bearer === 'Bearer') {
        try {
            let user = jwt.verify(token, SECRET_KEY);
            req.params.id = user.id;
            next()
        }
        catch (e) {
            console.log(e);
            resp.status(403).json('Authorization token is not valid');
        }
    }
    else {
        resp.status(403).json('Authorization token is not valid');
    }
});

server.use(middlewares)
server.use(router)
server.listen(3000, function () {
    console.log('JSON Server is running')
})