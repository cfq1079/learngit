import Vue from 'vue'
import App from './App'
import Global from 'mycomponents/global.vue'
Vue.prototype.Global = Global

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
