<script setup>
import {ref,reactive} from 'vue';
import Modal from '../components/Modal.vue';

import todoStore from '../store/todoStore';
const todo = todoStore();


// const modalOpen = ref(false)

const formData = reactive({
    todo:'',
    completed:false,
    userId:1
});

function add(){
    todo.action.add(formData);
    formData.todo = '';
}

const doneFormData = {
    completed:true
}

</script>

<template>
    <div class="min-h-screen w-screen bg-gradient-to-r from-red-300 to-sky-300 flex flex-col gap-2 p-10 items-center">
        <div class="max-w-2xl w-full bg-white p-2 rounded-sm shadow-lg">
            <form enctype="multipart/form-data" class="grid grid-cols-12 gap-2">
                <div class="col-span-9">
                    <input v-model="formData.todo" class="w-full p-2 border focus:outline-none focus:border-green-200 focus:shadow-lg" type="text" name="task" placeholder="Enter new Task Description">
                </div>
                <div class="col-span-3 flex items-center">
                    <input @click.prevent="add()" class="w-full px-5 py-2 bg-sky-400 text-white rounded-md font-semibold hover:bg-sky-500  hover:cursor-pointer" type="submit" name="submit" value="Add new Task">
                </div>
            </form>
        </div>

        <div class="max-w-2xl w-full bg-white p-2 raounded-sm shadow-lg">
            <table class="w-full table-fixed border-collapse border-slate-950 hover:border-blue-950">
                <thead>
                    <tr>
                        <th class="p-2 border border-slate-300">ToDo ({{ todo.totalPending }})</th>
                        <th class="p-2 border border-slate-300">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="todo.totalPending == 0">
                        <td colspan="2">No pending task available</td>
                    </tr>
                    <tr v-for="(pending, index) in todo.pending" :key="index">
                        <td class="p-2 border border-slate-300">
                        {{ pending.todo }}
                        </td>
                        <td class="p-2 border border-slate-300 flex gap-1 justify-end">
                            <form enctype="multipart/form-data">
                                <input @click.prevent="todo.action.update(pending.id, doneFormData)" type="submit" name="submit" value="Mark as Done" class="px-2 bg-sky-400 text-white rounded-md hover:bg-sky-600 font-semibold hover:cursor-pointer">
                            </form>

                            <form  enctype="multipart/form-data">
                                <input @click.prevent="todo.action.delete(pending.id)" type="submit" name="submit" value="Delete" class="px-2 bg-red-400 text-white rounded-md hover:bg-red-600 font-semibold hover:cursor-pointer">
                            </form>
                        </td>
                    </tr>                    
                </tbody>
            </table>
        </div>
    </div>

    <!-- <Modal v-if="modalOpen">
            <div class="mb-8">
                <input v-model="taskDetails.task"  class="w-full p-2 border focus:outline-none focus:border-green-200 focus:shadow-lg" type="text" name="task" placeholder="Enter new Task Description">
            </div>
            <div class="space-y-4">
            <button @click="update(taskDetails.id, position)" class="p-3 bg-black rounded-full text-white w-full font-semibold">Update Task</button>
            <button @click="modalOpen = false" class="p-3 bg-white border rounded-full w-full font-semibold">Cancel</button>
            </div>
    </Modal> -->
</template>