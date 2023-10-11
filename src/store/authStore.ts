import { ref, reactive } from "vue";
import router from "../router/index";
import { defineStore } from "pinia";

import todoStore from "./todoStore";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  username: string;
  password: string;
  gender: string;
  image: string;
}

const notify = (message: string) => {
  toast(message, {
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
  });
};

const authStore = defineStore("auth", () => {
  const isAuthenticated = ref(true);
  const user: Partial<User> = reactive({});

  isAuthenticated.value = Boolean(localStorage.getItem("isAuthenticated"));
  const localUser = localStorage.getItem("localUser");

  if (localUser != null) {
    Object.assign(user, JSON.parse(localUser));
  }

  const login = (email: string, password: string) => {
    if (user.email === email && user.password === password) {
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      isAuthenticated.value = true;
      todoStore().action.fetch();
      router.push("/todo");
    } else if ("mail4mjaman@gmail.com" == email && "123" == password) {
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      isAuthenticated.value = true;

      Object.assign(user, {
        firstName: "Mehedi",
        lastName: "Jaman",
        email: "mail4mjaman@gmail.com",
        role: "Admin",
        username: "mehedijaman",
        password: "123",
        gender: "Male",
        image:
          "https://secure.gravatar.com/avatar/007ffebe54eb25dcf712490b27a60e87?s=64&d=mm&r=g",
      });

      todoStore().action.fetch();
      router.push("/todo");
    } else {
      notify("Username or Password is incorrect");
    }
  };

  const register = (formData: User) => {
    localStorage.setItem("localUser", JSON.stringify(formData));
    Object.assign(user, formData);
    notify("User Registration Successful");
  };

  const logout = () => {
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
    isAuthenticated.value = false;
    //user.value = null;
    router.push("/login");
  };

  return { isAuthenticated, user, register, login, logout };
});

export default authStore;
