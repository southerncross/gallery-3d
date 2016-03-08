import log from './log'

// default environment to `development`
const env = process.env.NODE_ENV || 'development'

log.info(`Using ${env} environment...`)

let configs = {}

if (env === 'development') {
  configs = {
    env: 'development',
    port: 4000,
    psql: {
      host: 'localhost',
      db: 'gallery-dev',
      user: 'lishunyang',
      password: ''
    },
    qiniu: {
      accessKey: 'S8nv08l-SfPpmxm_ZBtss2oAcI9gYovLghE45fQK',
      secretKey: 'LFxD04qdQ1ZQ_b6zcDrQPG0bTGTzWUmLHwN69hAy',
      bucket: 'gallery-3d'
    }
  }
} else if (env === 'production') {
  configs = {
    env: 'production',
    port: process.env.PORT,
    psql: {
      host: process.env.SQL_HOST,
      db: process.env.SQL_DB,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD
    },
    qiniu: {
      accessKey: process.env.QINIU_ACCESS_KEY,
      secretKey: process.env.QINIU_SECRET_KEY,
      bucket: process.env.QINIU_BUCKET
    }
  }
}

export default configs
