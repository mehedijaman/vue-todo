import {ref, reactive} from 'vue';
import router from '../router/index';
import {defineStore} from 'pinia';

import todoStore from './todoStore';


const authStore = defineStore('auth', () => {
    const isAuthenticated = ref(localStorage.getItem('isAuthenticated'));
    const user = ref({
        email:'mail4mjaman@gmail.com',
        password:'12345',
    });

    const login = (email, password) => {
        if(JSON.parse(localStorage.getItem('user')) != null)
            user.value = JSON.parse(localStorage.getItem('user'));

        if(user.value.email == email && user.value.password == password){
            localStorage.setItem('isAuthenticated',true);
            isAuthenticated.value = true;
            todoStore().action.fetch();
            router.push('/todo');
        }
        else{
            console.log('Username or Password is incorrect');
        }

        // fetch('https://dummyjson.com/auth/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({            
        //         username: 'kminchelle',
        //         password: '0lelplR',
        //     })
        // })  
        // .then(res => res.json())
        // .then((res) => {
        //     localStorage.setItem('isAuthenticated',true);
        //     isAuthenticated.value = true;
        //     localStorage.setItem('user', JSON.stringify(res));
        //     user.value = res;

        //     todoStore().action.fetch();
        //     router.push('/todo');
        // });
    };

    const register = (formData) => {
        if(localStorage.setItem('user', JSON.stringify(formData))){
            return formData;
        }

        return false;
    };

    const logout = () => {
        localStorage.setItem('isAuthenticated',false);
        isAuthenticated.value = false;
        localStorage.setItem('user', null);
        user.value = null;
        router.push('/login');
    };

    return {isAuthenticated,user, register, login, logout};
});

export default authStore;