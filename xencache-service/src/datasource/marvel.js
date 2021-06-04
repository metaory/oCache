const querystring = require('querystring')
const crypto = require('crypto')
const axios = require('axios')

const PUB = process.env.DS_MARVEL_PUB // XXX secretsmanager.getSecretValue({SecretId: 'marvel_pub'})
const PRI = process.env.DS_MARVEL_PRI // XXX secretsmanager.getSecretValue({SecretId: 'marvel_pri'})
const DS_MARVEL_MAX_LIMIT = process.env.DS_MARVEL_MAX_LIMIT

const authHash = () => {
  const ts = Date.now()
  const hash = crypto
    .createHash('md5')
    .update(ts + PRI + PUB)
    .digest('hex')
  return {ts, hash}
}

// ///////////////////////////////////////

const marvelApi = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  timeout: 9000
})

marvelApi.interceptors.request.use(config => {
  const {url, offset = 0, limit = DS_MARVEL_MAX_LIMIT} = config
  return {
    ...config,
    url: url + '?' + querystring.stringify({
      ...authHash(),
      apikey: PUB,
      offset,
      limit
    })
  }
}, err => Promise.reject(err))

marvelApi.interceptors.response.use(
  ({data: {data} = {}}) => data,
  err => Promise.reject(err))

// ///////////////////////////////////////

module.exports.getCharacter = characterId => 
  marvelApi.get(`/characters/${characterId}`)

// ///////////////////////////////////////

const getCharacters = async (offset = 0, acc = []) => {
  const res = await marvelApi.get('/characters', {offset})

  return res.count === 0 ? acc :
    getCharacters(offset + res.count, [...acc, ...res.results])
}

module.exports.getCharacters = () => getCharacters()

