import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy } from 'passport-http-bearer'

import log from './log'
import User from './models/User'
import AccessToken from './models/AccessToken'

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
  .then((user) => {
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

passport.use(new BearerStrategy((token, done) => {
  new AccessToken({ token })
  .fetch({ withRelated: 'gallery' })
  .then((accessToken) => {
    if (!accessToken) {
      return done(null, false, { message: '无效的token' })
    }
    if (!accessToken.get('valid')) {
      return done(null, false, { message: 'token已过期' })
    }
    done(null, accessToken.toJSON())
  })
  .catch((err) => {
    log.error(err)
    done(err)
  })
}))
