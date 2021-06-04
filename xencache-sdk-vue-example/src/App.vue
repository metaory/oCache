<template>
  <div id="app" class="vue-ui-empty">
    <div class="vue-ui-dark">
      <h2 class="banner">xencache-sdk-js Vue Example<h6>Generic Lazy API Caching</h6> </h2>
      <a class="github" target="__blank" href="https://github.com/metaory/xencache"><img height="32" src="./assets/github-logo.png" title="GitHub"/></a>
      <a class="swagger" href="https://metaory.github.io/xencache/swagger"><img height="32" src="./assets/swagger-logo.png" title="Swagger"/></a>

    <VueFormField class="search">
      <VueInput ref="search" v-model.lazy="search" class="big accent" placeholder="start typing···" status="primary"/>
      <h4 slot="title">
        <span>search from <b class="vue-ui-text primary">{{ characters.length }}</b> characters</span>
      </h4>
      <h4 slot="subtitle">
        <span> <small>matching</small> <b class="vue-ui-text accent">{{ this.results.length }}</b> </span>
      </h4>
    </VueFormField>

    <VueFuse
      :list="characters"
      :fuse-opts="fuseOptions"
      :search="search"
      :default-all="false"
      v-show="false"
      @fuse-results="handleResults"/>

    <br> <br>

      <div class="list">
        <div v-for="(res, i) in results" :key="i" class="item">
          <span class="item-score">{{ res.score }}</span>
          <span class="item-name">{{ res.item }}</span>
          <VueLoadingBar 
            :unkown="!search"
            :value="res.score"
            class="primary" />
        </div>
      </div>

      <VueLoadingIndicator
        v-if="loading"
        class="overlay fixed primary big"/>

      <h6 class="appinfo">{{ $appname }} <small class="vue-ui-text primary">v{{ $appversion}}</small></h6> 
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import faker from 'faker'

export default {
  name: 'App',
  methods: {
    handleResults (r) { 
      this.results = Object.freeze(
        Array.from(r).map(x => ({ ...x, score: x.score ? Number(((1 - (x.score || 1)).toFixed(2))) : 0 }))
      )
    }
  },
  computed: { },
  created () {
    this.loading = true
    axios.get(`${this.$apig}/characters?fields=name`)
      .then(({data}) => this.characters = data)
      .catch((err) => { 
        console.error(err) 
        this.characters = []
      })
      .finally(() => this.loading = false)
  },
  mounted () { 
    this.search=faker.name.firstName()
    this.$refs.search.focus()
  },
  data () {
    return {
      loading: false,
      fuseOptions: {
        /* keys: [ 'name' ], */
        includeScore: true,
        includeMatches: false,
        findAllMatches: false
      },
      search: '',
      results: [],
      characters: [],
    }
  }
}
</script>

<style lang="stylus">
.vue-ui-button.big
  font-size 28px !important

.search
  display grid
  grid-template-columns max-content
  justify-content center

.list
  display grid
  grid-template-columns repeat(auto-fit, minmax(340px, 1fr))
  grid-gap 1em 4em

.item
  width 100%
  user-select none
  text-align left
  &:hover
    color #a44cf6

.item-name
  font-size: larger

.item-score
  padding-right 16px
  opacity 0.5
  font-weight bolder

.vue-ui-loading-bar
  opacity 0.4

.github, .swagger
  position absolute
  opacity 0.4
  top 1em
  &:hover
    opacity 0.8
  &.github
    right 1em 
    filter invert(1)
  &.swagger
    right 4em

.appinfo
  filter brightness(0.5)

.banner
  margin 0.5em 0 !important

</style>
