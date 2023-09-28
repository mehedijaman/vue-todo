<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>        
    <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <div class="relative">
                <div class="absolute">
                    <div class="">
                        <h1 class="my-2 text-gray-800 font-bold text-2xl">
                            Simple Vue Todo App Designed with the awesome Tailwind CSS
                        </h1>
                        <p class="mb-10 my-2 text-gray-800">Do you often forget what todo? Here is the solution. Keep track all of your todo list. </p>
                        <router-link to="/todo"  class="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 mt-10">Start using the app</router-link>
                    </div>
                </div>
                <div>
                    <!-- <img src="https://i.ibb.co/G9DC8S0/200-2.png" /> -->
                </div>
            </div>
        </div>
        <div>
            <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
    </div>
</template>
