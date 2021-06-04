xencache
======

:poop: Cache as a Service :clown_face:
======================================

## [xencache](https://github.com/metaory/xencache) is a Generic Cache Service for REST APIs

### effortlessly cache expensive, non-critical API calls

***

# axios-xencache-plugin

Axios xencache plugin, effortlessly cache expensive, non-critical API calls

## Installation

```bash
npm install axios-xencache-adapter -S
```

## Usage

```js
import axios from 'axios';
import { setupCache } from 'axios-xencache-adapter'

// Create `axios-cache-adapter` instance
const cache = setupCache({
  store: 'memory', // s3, redis, memory
  xenKey: 'your Xencache API key',
  maxAge: 15 * 60 * 1000
})

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter
})

// Send a GET request to some REST api
api({
  url: 'http://some-rest.api/url',
  method: 'get'
}).then(async (response) => {
  // Do something fantastic with response.data \o/
  console.log('Request response:', response)

  // Interacting with the store, see `localForage` API.
  const length = await cache.store.length()

  console.log('Cache store length:', length)
})
```

***

# xencache-koa-middleware

koa xencache middleware, effortlessly set cache expensive, non-critical internal API calls

## Installation

```bash
npm install koa-xencache-middleware -S
```

## Usage

```js
const Koa = require('koa');
const Router = require('@koa/router');

const Xencache = require('koa-xencache-middleware');

const app = new Koa()
const router = new Router()
const xen = new Xencache({ accountId })

router.get('/frequent', (ctx, next) => {
  const data = await api.get('https://external.com/slow')
  ctx.body = data
})

app
  .use(xencache())
  .use(router.routes())
  .use(router.allowedMethods())

```
## Options
middleware options // TODO

***

xencache-sdk-js Examples
========================
- Repo https://github.com/metaory/xencache
- OpenAPI https://metaory.github.io/xencache/swagger
- WebApp https://metaory.github.io/xencache
- [ ] Koa https://github.com/metaory/xencache/tree/master/koa-example

Project Roadmap
===============
- [X] dynamic query support 
- [X] pagination support
- [ ] cache store plugin support
- [ ] data source configuration template support
- [ ] data source parameter mapping support
- [ ] invalidation route
- [ ] CICD
