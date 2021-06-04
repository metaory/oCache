import Vue from 'vue'
import App from './App.vue'
import VueUi from '@vue/ui'
// import VueInput from '@vue/ui/src/components/VueInput.vue'
// import VueLoadingBar from '@vue/ui/src/components/VueLoadingBar'
// import VueLoadingIndicator from '@vue/ui/src/components/VueLoadingIndicator'
import '@vue/ui/dist/vue-ui.css'
// import '@vue/ui/src/style/imports.styl'
// import './styles/vars.styl'
// import './index.css'
import { name, version } from '../package.json'

import VueFuse from 'vue-fuse'

Vue.prototype.$appname = name
Vue.prototype.$appversion = version
Vue.prototype.$apig = 'https://hjut8n7lei.execute-api.ap-southeast-1.amazonaws.com'

Vue.config.productionTip = false

// https://github.com/vuejs/ui/issues/32 
Vue.config.warnHandler = (msg, vm, trace) => !msg.includes('native modifier') && console.warn(msg + trace, vm)

Vue.use(VueUi)

// Vue.component('VueInput'            , VueInput)
// Vue.component('VueLoadingBar'       , VueLoadingBar)
// Vue.component('VueLoadingIndicator' , VueLoadingIndicator)
Vue.component('VueFuse'             , VueFuse)

new Vue({ render: h => h(App) }).$mount('#app')



