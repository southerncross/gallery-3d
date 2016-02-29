import qiniu from 'qiniu'

qiniu.conf.ACCESS_KEY = 'S8nv08l-SfPpmxm_ZBtss2oAcI9gYovLghE45fQK'
qiniu.conf.SECRET_KEY = 'LFxD04qdQ1ZQ_b6zcDrQPG0bTGTzWUmLHwN69hAy'

function __generateUpToken(bucketName) {
  const putPolicy = new qiniu.rs.PutPolicy(bucketName)
  // putPolicy.callbackUrl = callbackUrl;
  // putPolicy.callbackBody = callbackBody;
  // putPolicy.returnUrl = returnUrl;
  // putPolicy.returnBody = returnBody;
  // putPolicy.asyncOps = asyncOps;
  // putPolicy.expires = expires;

  return putPolicy.token()
}

function getUptokenAPI(req, res) {
  const uptoken = __generateUpToken('gallery-3d')
  res.status(200).json({ uptoken })
}

export default {
  getUptokenAPI
}
