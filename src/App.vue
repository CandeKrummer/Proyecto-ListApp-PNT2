<template>
  <div id="app">
    <div class="header container-fluid display">
      <router-link to="/"><img src="./assets/logoListApp.png" /></router-link>

      <router-link to="/config" class="text-end"
        ><img class="iconoBoton" src="./assets/engranaje.png"
      /></router-link>

      <router-link to="/login" class="text-end"
        ><img class="iconoBoton" src="./assets/user.png"
      /></router-link>
    </div>
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
.header {
  background-color: #ffeee4;
}

.iconoBoton {
  width: 50px;
  height: 100%;
  align-self: right;
}
</style>
