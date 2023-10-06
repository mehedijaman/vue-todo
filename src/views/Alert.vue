<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import Swal from 'sweetalert2'

const showAlert = (type, message) => {
  Swal.fire({
    title: type,
    text: message,
    icon: type,
    confirmButtonText: 'Cool'
  })  
} 

const notify = (message) => {
  toast(message, {
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
  });
}
</script>

<template>
  <button @click="notify('Toast Message using vue3-toastify package')" class="bg-[#4F46E5] py-2 mx-5 my-5 px-4 text-white font-bold cursor-pointer hover:bg-[#181196]">Show Toast Message</button>
  <button @click="showAlert('error', 'Something went wrong')" class="bg-[#4F46E5]  py-2 mx-5 my-5 px-4 text-white font-bold cursor-pointer hover:bg-[#181196]">Show Success Alert</button>
  <button @click="showAlert('success', 'Successfully Done')" class="bg-[#4F46E5]  py-2 mx-5 my-5 px-4 text-white font-bold cursor-pointer hover:bg-[#181196]">Show Success Alert</button>
</template>