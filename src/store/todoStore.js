import {ref, reactive, computed} from 'vue';
import {defineStore} from 'pinia';

const todoStore = defineStore('todo', () =>{
    const baseUrl = 'https://dummyjson.com/todos';

    const todos = reactive([]);
    const pending = computed(() =>{
        return todos.filter((todo) => !todo.completed).reverse();
    });
    const completed = computed(() => {
        return todos.filter((todo) => todo.completed).reverse();
    });

    const totalPending = computed(() => pending.value.length);
    const totalCompleted = computed(() => completed.value.length);

    const action = {
        fetch: () => {
            fetch(baseUrl)
            .then(res => res.json())
            .then((res) => {
                Object.assign(todos, res.todos)
            });          
        },
        add: (formData) => {
            fetch(`${baseUrl}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then((res) => {
                todos.push(res);
            });
        },
        update: (id, formData) => {
            fetch(`${baseUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then((res) => {
                const index = todos.findIndex(item => item.id == id)
                todos.splice(index, 1)
                todos.push(res)
            });
        },
        delete: (id) =>{
            fetch(`${baseUrl}/${id}`, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then((res) => {
                const index = todos.findIndex(element => element.id == id)
                todos.splice(index, 1)
            }); 
        }
    }

    return {todos,pending,completed,totalPending,totalCompleted,action};
});

export default todoStore;