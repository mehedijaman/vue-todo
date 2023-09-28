<script setup>
import {ref, reactive} from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { authStore } from '../store/authStore';

const auth = authStore();
const router = useRouter();

const email = ref('kminchelle');
const password = ref('0lelplR');

const redirect = () => {
    router.push({path:'/'});
};


</script>
<template>    
    <div class="bg-[#F9FAFB] h-screen w-screen flex items-center">
        <div class="h-max mx-auto flex flex-col items-center">
            <div class="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm">
                <div>
                    <label class="text-gray-600 font-bold inline-block pb-2" for="email">Email</label>
                    <input v-model="email"  class="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" type="email" name="email" placeholder="mehedi@jaman.com">
                </div>
                <div>
                    <label class="text-gray-600 font-bold inline-block pb-2" for="password">Password</label>
                    <input v-model="password" class="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" type="password" name="password" placeholder="******">
                </div>
                <div>
                    <input @click="auth.login(email,password)"  class="bg-[#4F46E5] w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]" type="submit" value="Login" >
                </div>
                <div>
                    <p class="text-center">Don't have an account? <span class="font-bold text-[#4F46E5]"><router-link to="/register">Register now</router-link></span></p>
                </div>
            </div>
        </div>
    </div>
</template>