<script setup>
import {ref,reactive, onMounted, nextTick} from 'vue'

const baseUrl = 'http://localhost:8000/api/todo'
let todos = reactive({})
let totalPending = ref('')
let totalCompleted = ref('')

const formData = {}
const taskDetails = ref({})

function calculateTotal(){
    totalPending.value = todos.pending.length
    totalCompleted.value = todos.completed.length
}

async function getAll(){
    const res = await fetch(baseUrl)
    const data = await res.json()
    Object.assign(todos,data)  //new
    calculateTotal()
}

async function store(){
    const response = await fetch(`${baseUrl}/store`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    todos.pending.push(formData)
    formData.task = ''
    calculateTotal()
}

async function complete(id){
    const response = await fetch(`${baseUrl}/done/${id}`,{
        method: 'POST',
    })
    const data = await response.json()

    const index = todos.pending.findIndex(x=>x.id === id)
    todos.completed.push(todos.pending[index])
    todos.pending.splice(index,1)
    calculateTotal()
}

async function undo(id){
    const response = await fetch(`${baseUrl}/undo/${id}`,{
        method: 'POST',
    })
    const data = await response.json()

    const index = todos.completed.findIndex(x=>x.id === id)
    todos.pending.push(todos.completed[index])
    todos.completed.splice(index,1)
    calculateTotal()
}

async function destroy(id, position){
    const response = await fetch(`${baseUrl}/destroy/${id}`,{
        method: 'DELETE',
    })

    const data = await response.json()

    const index = todos[position].findIndex(x=>x.id === id)
    todos[position].splice(index,1)
    calculateTotal()
}

async function edit(id){
    const response = await fetch(`${baseUrl}/edit/${id}`,{
        method: 'GET',
    })
    taskDetails.value = await response.json()

    modalOpen.value = true
}

async function update(id){
    const response = await fetch(`${baseUrl}/update/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskDetails.value)
    })

    nextTick(() => {
        getAll()
    })

    modalOpen.value = false
}

onMounted(() => {
    getAll()
})

const modalOpen = ref(false)

</script>

<template>    
   <div class="min-h-screen w-screen bg-gradient-to-r from-red-300 to-sky-300 flex flex-col gap-2 p-10 items-center">
        <h1 class="text-xl text-red-900 font-bold">Simple Todo App</h1>
        
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
                        <td colspan="2" class="py-1 font-bold text-center"><p class="p-2 bg-red-400 text-white">Pending</p></td>
                    </tr>
                    <tr>
                        <th class="p-2 border border-slate-300">Todo Task Description</th>
                        <th class="p-2 border border-slate-300">Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr v-if="totalPending == 0">
                        <td colspan="2" class="text-center">No pending task available</td>
                    </tr>
                    <tr v-for="(pending, index) in todos.pending" :key="index">
                        <td class="p-2 border border-slate-300">
                          {{ pending.task }}
                        </td>
                        <td class="p-2 border border-slate-300 flex gap-1 justify-end">
                            <form enctype="multipart/form-data">
                                <input @click.prevent="complete(pending.id)" type="submit" name="submit" value="Mark as Done" class="px-2 bg-sky-400 text-white rounded-md hover:bg-sky-600 font-semibold hover:cursor-pointer">
                            </form>

                            <form enctype="multipart/form-data">
                                <input @click.prevent="edit(pending.id)" type="submit" name="submit" value="Edit" class="px-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-600 font-semibold hover:cursor-pointer">
                            </form>

                            <form  enctype="multipart/form-data">
                                <input @click.prevent="destroy(pending.id, 'pending')" type="submit" name="submit" value="Delete" class="px-2 bg-red-400 text-white rounded-md hover:bg-red-600 font-semibold hover:cursor-pointer">
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="py-1 font-bold text-center"><p class="bg-sky-500 p-2">Completed</p></td>
                    </tr>
                    <tr>
                        <th class="p-2 border border-slate-300">Todo Task Description</th>
                        <th class="p-2 border border-slate-300">Action</th>
                    </tr>
                    <tr v-if="totalCompleted == 0">
                        <td colspan="2" class="text-center">No Completed task available</td>
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
                                <input @click.prevent="edit(completed.id)"  type="submit" name="submit" value="Edit" class="px-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-600 font-semibold hover:cursor-pointer">
                            </form>
                            <form enctype="multipart/form-data">
                                <input  @click.prevent="destroy(completed.id, 'completed')" type="submit" name="submit" value="Delete" class="px-2 bg-red-400 text-white rounded-md hover:bg-red-600 font-semibold hover:cursor-pointer">
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
   </div>

    <div v-if="modalOpen" class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
        <div class="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div class="w-full">
            <div class="m-8 my-20 max-w-[400px] mx-auto">
                <div class="mb-8">
                    <input v-model="taskDetails.task"  class="w-full p-2 border focus:outline-none focus:border-green-200 focus:shadow-lg" type="text" name="task" placeholder="Enter new Task Description">
                </div>
                <div class="space-y-4">
                <button @click.prevent="update(taskDetails.id)" class="p-3 bg-black rounded-full text-white w-full font-semibold">Update Task</button>
                <button @click="modalOpen = false" class="p-3 bg-white border rounded-full w-full font-semibold">Cancel</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>