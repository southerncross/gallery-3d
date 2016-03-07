import qiniu from 'qiniu'

import configs from '../configs'

qiniu.conf.ACCESS_KEY = configs.qiniu.accessKey
qiniu.conf.SECRET_KEY = configs.qiniu.secretKey

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
  const uptoken = __generateUpToken(configs.qiniu.bucket)
  res.status(200).json({ uptoken })
}

export default {
  getUptokenAPI
}
