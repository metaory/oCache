const CacheService = require('../cacheService')
const marvel = require('../datasource/marvel')

module.exports.findCharacters = async event => {
  const {queryStringParameters} = event
  const cache = new CacheService('marvel/characters')

  const {fields, limit} = queryStringParameters || {}
  const keys = (fields || 'id').split(',')
  const hasCache = await cache.has()

  if (hasCache === false) {
    console.time('MARVEL_LIVE_FETCH')
    const liveData = await marvel.getCharacters()
    await cache.put(liveData)
    console.timeEnd('MARVEL_LIVE_FETCH')
  }

  const cacheData = await cache.match()

  const list = cacheData
    .slice(0, limit || cacheData.length)
    .reduce((acc, cur) => {
      const row = {}
      for (const key of keys) { 
        if (key in cur) { // Object has property
          row[key] = cur[key] 
        }
      }

      if (Object.keys(row).length === 1) { // Only One property match
        return [...acc, ...Object.values(row)]
      }

      return [...acc, row]
    }, [])

  return {
    'statusCode': 200,
    'headers': {'Content-Type': 'application/json'},
    'body': JSON.stringify(list)
  }
}

module.exports.getCharacterById = async ({pathParameters: {character_id} = {}}) => ({
  statusCode: 200,
  body: JSON.stringify(await marvel.getCharacter(character_id))
})

