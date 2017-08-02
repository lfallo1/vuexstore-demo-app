import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Footer from './Footer.vue'

// --- vuex setup (refactor into modules and remove dummy generation ---
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        users: []
    },
    getters:{
        getLastId: state => {
            return state.users.sort((a,b)=> a.id < b.id ? 1 : a.id > b.id ? -1 : 0)[0].id + 1;
        }
    },
    mutations: {
        addUser(state, user) {
            state.users.push(user);
        },
        removeUser(state, id) {
            for (let i = 0; i < state.users.length; i++) {
                if (state.users[i].id == id) {
                    state.users.splice(i, 1);
                    break;
                }
            }
        }
    }
});

store.commit('addUser', {id: 1, name: "Lance", age: 30})
store.commit('addUser', {id: 2, name: "Kara", age: 20})
store.commit('addUser', {id: 3, name: "Sara", age: 24})
store.commit('addUser', {id: 4, name: "Tom", age: 39})

// --- end boilerplate / dummy store setup ---

Vue.component('app-main', App);
Vue.component('app-footer', Footer);
new Vue({
    el: '#app',
    store
    // render: h => h(App)
})
