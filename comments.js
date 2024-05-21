// Create web server
// npm install express
// npm install body-parser
// npm install express-session

// 1. Load modules
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

// 2. Create express app
var app = express();

// 3. Set up view engine
app.set('view engine', 'ejs');

// 4. Set up middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

// 5. Set up routes
app.get('/', function(req, res) {
    res.render('index', {
        title: 'My app',
        comment: req.session.comment || ''
    });
});

app.post('/', function(req, res) {
    req.session.comment = req.body.comment;
    res.redirect('/');
});

// 6. Start server
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});