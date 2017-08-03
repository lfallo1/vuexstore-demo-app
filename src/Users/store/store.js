import {USERMODULE_ADD_USER, USERMODULE_REMOVE_USER} from './mutation-types.js'

export default{
    namespaced: true,
    state: {
        users: [{id: 1, name: "Lance", age: 30},
            {id: 2, name: "Kara", age: 20},
            {id: 3, name: "Sara", age: 24},
            {id: 4, name: "Tom", age: 39}]
    },
    getters:{
        getLastId: state => {
            return state.users.sort((a,b)=> a.id < b.id ? 1 : a.id > b.id ? -1 : 0)[0].id + 1;
        },
        getById: (state) => (id) =>{
            console.log(id);
            return state.users.filter(u=>u.id == id)[0]
        }
    },
    mutations: {
        [USERMODULE_ADD_USER](state, user) {
            state.users.push(user);
        },
        [USERMODULE_REMOVE_USER](state, id) {
            for (let i = 0; i < state.users.length; i++) {
                if (state.users[i].id == id) {
                    state.users.splice(i, 1);
                    break;
                }
            }
        }
    },
    actions: {
        addUser({commit}, user){
            commit(USERMODULE_ADD_USER, user);
        },
        removeUser({commit}, id){
            commit(USERMODULE_REMOVE_USER, id);
        },
        replaceLastUser({dispatch, getters}, user){
            return dispatch('userModule/removeUser', getters.getLastId-1).then((id)=>{
                console.log('##replaceLastUser - removed user id', id)
                return new Promise((res, rej)=>{
                    dispatch('userModule/addUser', user)
                        .then(()=>res({status:'SUCCESS', info: 'Inserted user id ' + user.id}))
                        .catch(err=>rej());
                });
            });
        }
    }
};