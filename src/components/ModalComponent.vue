<script setup>
</script>
<template>
<!-- component -->
<div class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
  <div class="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
    <div class="w-full">
      <div class="m-8 my-20 max-w-[400px] mx-auto">
        <slot></slot>
      </div>
    </div>
  </div>
</div>
</template>