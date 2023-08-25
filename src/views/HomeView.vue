<script setup>
import {ref, reactive, onMounted, onUpdated, nextTick} from 'vue'
const baseUrl = 'http://localhost:8000/api/todo'

let todos = ref('')
let totalPending = ref('')
let totalCompleted = ref('')
let alertMsg = ref('')

const formData = reactive({})

onMounted(() =>{
    getAll()
})

async function getAll(){
    const response = await fetch(baseUrl)
    todos.value = await response.json()
    totalPending.value = todos.value.pending.length
    totalCompleted.value = todos.value.completed.length
}

async function store(){
    const response = await fetch(`${baseUrl}/store`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    nextTick(() => {
        getAll()
    })
}

async function complete(id){
    const response = await fetch(`${baseUrl}/done/${id}`, {
        method: 'POST'
    })

    nextTick(() => {
        getAll()
    })
}
 async function undo(id){
    const response = await fetch(`${baseUrl}/undo/${id}`, {
        method: 'POST'
    })

    nextTick(() => {
        getAll()
    })
 }

 async function destroy(id){
    const response = await fetch(`${baseUrl}/destroy/${id}`, {
        method: 'DELETE'
    })

    nextTick(() => {
        getAll()
    })
 }

 async function edit(id){
    const response = await fetch(`${baseUrl}/edit/${id}`, {
        method: 'GET'
    })

    nextTick(() => {
        getAll()
    })
 }

</script>

<template>    
   <div class="h-full w-screen bg-gradient-to-r from-red-300 to-sky-300 flex flex-col gap-2 p-10 items-center">
        <h1 class="text-xl text-red-900 font-bold">Simple Todo App</h1>
        {{ alertMsg }}
        {{ formData }}
        <div class="max-w-4xl w-full bg-white p-2 rounded-sm shadow-lg">
            <form enctype="multipart/form-data" class="grid grid-cols-12 gap-2">
                <div class="col-span-9">
                    <input v-model="formData.task" class="w-full p-2 border focus:outline-none focus:border-green-200 focus:shadow-lg" type="text" name="task" placeholder="Enter new Task Description">
                </div>
                <div class="col-span-3 flex items-center">
                    <input @click.prevent="store()" class="w-full px-5 py-2 bg-sky-400 text-white rounded-md font-semibold hover:bg-sky-500  hover:cursor-pointer" type="submit" name="submit" value="Add new Task">
                </div>
            </form>
        </div>

        <div class="max-w-4xl w-full bg-white p-2 raounded-sm shadow-lg">
            <table class="w-full table-fixed border-collapse border-slate-950 hover:border-blue-950">
                <thead>
                    <tr>
                        <th class="p-2 border border-slate-300">Todo Task Description</th>
                        <th class="p-2 border border-slate-300">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2" class="font-bold text-center bg-red-400 text-white">Pending</td>
                    </tr>
                    <tr v-if="totalPending == 0">
                        <td colspan="2">No pending task available</td>
                    </tr>
                    <tr v-for="(pending,index) in todos.pending" :key="index" >
                        <td class="p-2 border border-slate-300">
                          {{ pending.task }}
                        </td>
                        <td class="p-2 border border-slate-300 flex gap-1 justify-end">
                            <form enctype="multipart/form-data">
                                <input @click.prevent="complete(pending.id)" type="submit" name="submit" value="Mark as Done" class="px-2 bg-sky-400 text-white rounded-md hover:bg-sky-600 font-semibold hover:cursor-pointer">
                            </form>

                            <form @click.prevent="edit(pending.id)" method="POST" enctype="multipart/form-data">
                                <input type="submit" name="submit" value="Edit" class="px-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-600 font-semibold hover:cursor-pointer">
                            </form>

                            <form  enctype="multipart/form-data">
                                <input @click.prevent="destroy(pending.id)" type="submit" name="submit" value="Delete" class="px-2 bg-red-400 text-white rounded-md hover:bg-red-600 font-semibold hover:cursor-pointer">
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="font-bold bg-green-800 text-white text-center">Completed</td>
                    </tr>
                    <tr v-if="totalCompleted == 0">
                        <td colspan="2">No Completed task available</td>
                    </tr>

                    <tr v-for="(completed,index) in todos.completed" :key="index">
                        <td class="p-2 border border-slate-300 line-through">
                         {{ completed.task }}
                        </td>
                        <td class="p-2 border border-slate-300 flex gap-1 justify-end">
                            <form enctype="multipart/form-data">
                                <input @click.prevent="undo(completed.id)" type="submit" name="submit" value="Undo" class="px-2 bg-gray-400 text-white rounded-md hover:bg-gray-600 font-semibold hover:cursor-pointer">
                            </form>
                            <form enctype="multipart/form-data">
                                <input @click.prevent="edit(completed.id)" type="submit" name="submit" value="Edit" class="px-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-600 font-semibold hover:cursor-pointer">
                            </form>
                            <form enctype="multipart/form-data">
                                <input @click.prevent="destroy(completed.id)" type="submit" name="submit" value="Delete" class="px-2 bg-red-400 text-white rounded-md hover:bg-red-600 font-semibold hover:cursor-pointer">
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
   </div>
</template>
