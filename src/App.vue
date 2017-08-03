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
            <!--<button @click="replaceLast">Replace Last</button>-->

            <br><br>

            <input v-model="searchParam" type="number" placeholder="enter user id" />
            <button :disabled="!searchParam" @click="find">Find</button>
            <small v-if="user">Name: {{user.name.toUpperCase()}} Age: {{user.age}}</small>

            <div>
                <input type="text" v-model="newUser.name" />
                <input type="number" v-model="newUser.age" />
                <button @click="add(newUser)">Add</button>
            </div>
        </ul>
    </div>
</template>

<script>

    import { mapState } from 'vuex';
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    import {USERMODULE_ADD_USER, USERMODULE_REMOVE_USER, USERMODULE_REPLACE_LAST_USER} from './Users/store/mutation-types.js'

    export default {
        data(){
            return {
                searchParam: null,
                user: null,
                newUser: {
                    name: "",
                    age: 0
                }
            }
        },
        name: 'app',
        methods:{
            find(){
                this.user = this.getById(this.searchParam);
            },
            remove(id){
                //actions return a promise
                this.removeUser(id).then((res)=>{
                    console.log("resolve body: " + res);
                });
            },
            add(user){
                if(!user.name || user.age < 1){
                    user = this.createDummyUser();
                }
                user.id = this.getLastId;
                this.addUser(user);
                this.newUser ={name: "", age: 0};
            },
//            replaceLast(){
//              this.replaceLastUser(this.createDummyUser()).then((res)=>{
//                  console.log(res);
//              });
//            },
            createDummyUser(){
                return {name: 'New User', age: Math.floor(Math.random()*40 + 18)}
            },
            ...mapActions('userModule', {
                addUser: 'addUser',
                removeUser: 'removeUser',
                replaceLastUser: 'replaceLastUser'
            })
        },
        computed: {
            dummyValue(){
                return 17;
            },
            ...mapState('userModule', {
                 users: 'users'
             }),
            ...mapGetters('userModule', {
                getLastId: 'getLastId',
                getById: 'getById'
            })
        }
    }
</script>

<style>
</style>
