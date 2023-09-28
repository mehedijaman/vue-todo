import {ref, reactive} from 'vue';
import { useRouter } from 'vue-router';
import {defineStore} from 'pinia';

const router = useRouter();


const authStore = defineStore('auth', () => {
    let isAuthenticated = localStorage.getItem('isAuthenticated');
    let user = JSON.parse(localStorage.getItem('user'));
    
    const login = (email, password) => {
        fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({            
            username: 'kminchelle',
            password: '0lelplR',
            // expiresInMins: 60, // optional
        })
        })  
        .then(res => res.json())
        .then((res) => {
            localStorage.setItem('isAuthenticated',1);
            isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(res));
            user = res;
            router.push('/');
        });
    };

    const register = (data) => {

    };

    const logout = () => {

    };

    return {isAuthenticated, register, login, logout};
});

export {authStore};