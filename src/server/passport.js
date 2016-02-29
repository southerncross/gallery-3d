import passport from 'passport'
import LocalStrategy from 'passport-local'

import User from './modal/User'

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  new User({ email })
  .fetch()
  .then(function(user) {
    console.log('boring', user)
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' })
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' })
    }
    return done(null, user)
  })
  .catch(done)
}))
