import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

const notify = (message: string) => {
  toast(message, {
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
  });
};

const todoStore = defineStore("todo", () => {
  const baseUrl = "https://dummyjson.com/todos";

  const todos = reactive<TodoItem[]>([]);
  const pending = computed(() => {
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
        .then((res) => res.json())
        .then((res) => {
          Object.assign(todos, res.todos);
        });
    },
    add: (formData: { title: string }) => {
      fetch(`${baseUrl}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((res) => {
          todos.push(res);
        });

      notify("Task Added Successfully ");
    },
    update: (id: number, formData: { title: string }) => {
      fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((res) => {
          const index = todos.findIndex((item) => item.id == id);
          todos.splice(index, 1);
          todos.push(res);
        });

      notify("Task Updated ");
    },
    delete: (id: number) => {
      fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => {
          const index = todos.findIndex((element) => element.id == id);
          todos.splice(index, 1);
        });

      notify("Task Deleted Successfully ");
    },
  };

  return { todos, pending, completed, totalPending, totalCompleted, action };
});

export default todoStore;
