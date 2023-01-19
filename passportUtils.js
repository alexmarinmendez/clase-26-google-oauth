const passport = require('passport')

passport.serializeUser((user, done) => {
    console.log('serialize ' + user)
    done(null, user)
})

passport.deserializeUser((user, done) => {
    console.log('deserialize ' + user)
    done(null, user)
})