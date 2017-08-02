<template>
    <div id="app">
        <h3>Dummy value {{dummyValue}}</h3>
        <ul>
            <li v-for="user in users">
                <small>{{user.id}}</small>
                {{user.name}} - {{user.age}}
                <button @click="remove(user.id)">remove</button>
            </li>
            <button @click="add">Add</button>
        </ul>
    </div>
</template>

<script>

    import { mapState } from 'vuex';
    import { mapGetters } from 'vuex';

    export default {
        name: 'app',
        methods:{
            remove(id){
                this.$store.commit('removeUser', id);
            },
            add(){
                this.$store.commit('addUser', {id: this.getLastId, name: 'New User', age: Math.floor(Math.random()*40 + 18)});
            }
        },
        computed: {
            dummyValue(){
                return 17;
            },
            ...mapState({
                 users: 'users'
             }),
            ...mapGetters([
                'getLastId'
            ])
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
