const express = require('express')
const passport = require('passport')
const authRouter = express.Router()

// /auth/google
authRouter.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))

authRouter.get('/google/callback', passport.authenticate('google', {failureRedirect: '/failure', successRedirect: '/'}), 
function(req, res) {
    res.redirect('/') //se logueó en forma satisfactoria, mostrar la ruta raiz
})

module.exports = authRouter