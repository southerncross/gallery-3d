import passport from 'passport'
import LocalStrategy from 'passport-local'

import log from './log'
import User from './models/User'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  new User({ id }).fetch()
  .then((user) => {
    if (!user) {
      done(null, false)
    } else {
      done(null, user.serialize())
    }
  })
  .catch((err) => {
    log.error(err)
    done(err)
  })
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  new User({ email })
  .fetch()
  .then(function(user) {
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' })
    }
    if (!User.validPassword(email, password)) {
      return done(null, false, { message: 'Incorrect password.' })
    }
    return done(null, user.serialize())
  })
  .catch(done)
}))
