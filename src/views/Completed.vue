<script setup>
import todoStore from '../store/todoStore';
const todo = todoStore();

const formData = {
    completed:false
}
</script>

<template>
    <div class="min-h-screen w-screen bg-gradient-to-r from-red-300 to-sky-300 flex flex-col gap-2 p-10 items-center">
        <div class="max-w-4xl w-full bg-white p-2 raounded-sm shadow-lg">
            <table class="w-full table-fixed border-collapse border-slate-950 hover:border-blue-950">
                <thead>
                    <tr>
                        <th class="p-2 border border-slate-300">Completed ({{ todo.totalCompleted }})</th>
                        <th class="p-2 border border-slate-300">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="todo.totalCompleted == 0">
                        <td colspan="2">No Completed task available</td>
                    </tr>

                    <tr v-for="(completed,index) in todo.completed" :key="index">
                        <td class="p-2 border border-slate-300 line-through">
                        {{ completed.todo }}
                        </td>
                        <td class="p-2 border border-slate-300 flex gap-1 justify-end">
                            <form enctype="multipart/form-data">
                                <input @click.prevent="todo.action.update(completed.id, formData)" type="submit" name="submit" value="Undo" class="px-2 bg-gray-400 text-white rounded-md hover:bg-gray-600 font-semibold hover:cursor-pointer">
                            </form>
                            <form enctype="multipart/form-data">
                                <input  @click.prevent="todo.action.delete(completed.id)" type="submit" name="submit" value="Delete" class="px-2 bg-red-400 text-white rounded-md hover:bg-red-600 font-semibold hover:cursor-pointer">
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>