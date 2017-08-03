import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Footer from './Footer.vue'
import UserModule from './Users/store/store.js'

// --- vuex setup (refactor into modules and remove dummy generation ---
Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        userModule : UserModule
    }
});

// --- end boilerplate / dummy store setup ---

Vue.component('app-main', App);
Vue.component('app-footer', Footer);
new Vue({
    el: '#app',
    store
    // render: h => h(App)
})
