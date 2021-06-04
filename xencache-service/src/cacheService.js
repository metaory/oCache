const AWS = require('aws-sdk')
const Bucket = process.env.CACHE_BUCKET
const ext = '.json'

module.exports = class {
  constructor(resource) { 
    this.s3 = new AWS.S3() 
    this.resource = resource
  }

  has() {
    return this.s3
      .headObject({Bucket, Key: this.resource + ext})
      .promise()
      .then(() => Promise.resolve(true))
      .catch(() => Promise.resolve(false))
  }

  match() {
    return this.s3
      .getObject({Bucket, Key: this.resource + ext})
      .promise()
      .then(({Body}) => Promise.resolve(JSON.parse(Buffer.from(Body, 'utf8'))
      ))
      .catch(() => Promise.resolve([]))
  }

  put(data, opt = {}) {
    return this.s3
      .putObject({Bucket, Key: this.resource + ext, Body: JSON.stringify(data), ACL: 'private', ...opt})
      .promise()
  }
}
