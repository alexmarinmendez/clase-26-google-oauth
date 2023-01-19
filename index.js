const express = require('express');
const path = require('path');
const passport = require('passport')
const authRoutes = require('./routes/auth')
const googleStrategy = require('./strategies/google')
const session = require('express-session')
const passportUtils = require('./passportUtils')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'c0d3r',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(googleStrategy)

app.use(express.static('public'));
app.use(express.static(path.join(__dirname + '/node_modules/bootstrap/dist')));

app.get('/', async (req, res) => {
    if (req.isAuthenticated()) return res.json(req.user)
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

app.get('/logout', function(req, res) {
    req.logout(function(err) {
      if (err) { return res.send('error de deslogueo'); }
      res.redirect('/');
    });
  });

app.use('/auth', authRoutes)

app.listen(8080, () => console.log('Server Up'));