<template>
  <div id="app">
    <nav class="navbar fixed-top" style="background-color: #ffeee4">
      <div class="container-fluid">
        <router-link class="navbar-brand" style="color: black" to="/">
          <img
            src="./assets/logoListApp.png"
            width="30"
            height="24"
            class="d-inline-block align-text-top"
          />
          ListApp</router-link
        >

        <router-link
          class="navbar-brand"
          style="color: black"
          to="/lista-de-compras"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="align-text-top"
            viewBox="0 0 16 16"
          >
            <path
              d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
            ></path>
            <path
              d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
            ></path>
          </svg>
          Lista de compras
        </router-link>

        <div class="d-flex">
          <router-link to="/config" class="navbar-brand"
            ><img src="./assets/engranaje.png" width="30"
          /></router-link>

          <router-link to="/login" class="navbar-brand"
            ><img src="./assets/user.png" width="30"
          /></router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { useStore } from "@/store/store.js";

export default {
  name: "App",
  setup() {
    const store = useStore();
    return { store };
  },
  created() {
    if (this.store.validarUsuario("a@a.com", "admin")) {
      this.store.cargarLista();
    }
  },
};
</script>

<style>
#app {
  padding-top: 4.5rem;
}

.header {
  background-color: #ffeee4;
}
</style>
