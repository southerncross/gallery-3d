import passport from 'passport'

import log from '../log'

const login = (req, res, next) => {
  passport.authenticate('local', {
    badRequestMessage: '请填写邮箱/密码'
  }, (err, user, info) => {
    if (err) {
      log.error(err)
      return next(err)
    }
    if (!user || user.deactivated) {
      return res.render('login-app', info)
    }
    req.login(user, (error) => {
      if (error) {
        return next(error)
      }
      res.redirect('/')
    })
  })(req, res, next)
}

const logout = (req, res) => {
  req.logout()
  res.clearCookie('user_email')
  res.redirect('/login')
}

export default {
  login,
  logout
}
