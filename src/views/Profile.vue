<script setup>
    import authStore from '../store/authStore';
    const auth = authStore();
</script>
<template>
    <div class="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
        <div class="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
            <img class="w-32 mx-auto rounded-full -mt-20 border-8 border-white" :src="auth.user.image" alt="">
            <div class="text-center mt-2 text-3xl font-medium">{{ auth.user.firstName + ' ' + auth.user.lastName}} </div>
            <div class="text-center mt-2 font-light text-sm">@{{ auth.user.username }}</div>
            <!-- <div class="text-center font-normal text-lg">Kerala</div> -->
            <div class="px-6 text-center mt-2 font-light text-sm">
            <p>
                {{ auth.user.email }}
            </p>
            </div>
            <hr class="mt-8">
            <div class="flex p-4">
            <div class="w-1/2 text-center">
                <span class="font-bold">{{ auth.user.gender }}</span>
            </div>
            <div class="w-0 border border-gray-300">
                
            </div>
            <div class="w-1/2 text-center">
                <span class="font-bold">@{{ auth.user.username }}</span>
            </div>
            </div>
        </div>
    </div>
</template>