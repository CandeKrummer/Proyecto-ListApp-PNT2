<template>
  <div class="mx-auto" style="width: 500px">
    <div class="m-5 borde" style="width: 400px" v-if="!logged">
      <form class="m-3">
        <div v-if="incorrecto" class="col alert alert-danger text-center m-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-exclamation-diamond-fill mx-2"
            viewBox="0 0 16 16"
          >
            <path
              d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            />
          </svg>
          Los datos ingresados son incorrectos
        </div>
        `
        <h1 class="text-center m-0">Iniciar sesión</h1>
        <div class="m-3">
          <div class="mb-3">
            <label for="mail" class="form-label">Email</label>
            <input
              v-model="mail"
              type="email"
              class="form-control"
              id="mail"
              placeholder="Ingrese su email"
            />
            <div id="emailHelp" class="form-text"></div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div class="text-center">
            <button
              v-on:click="validarLogin"
              type="submit"
              class="boton my-3 w-50"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </form>
    </div>
    <div v-if="logged">
      <div class="text-center">
        <h1 class="my-5">Hola {{ name }}!</h1>
        <button v-on:click="cerrarSesion" type="submit" class="boton my-3 w-50">
          Cerrar Sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../store/store.js";

export default {
  name: "AppLogin",
  data() {
    return {
      mail: null,
      password: null,
      incorrecto: false,
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    validarLogin() {
      if (this.store.validarUsuario(this.mail, this.password)) {
        this.logged = true;
        if (!this.store.isAdmin) {
          this.store.reset();
          this.store.inicio();
        }
        this.$router.push({ path: "/" });
      } else {
        this.incorrecto = true;
    }
    },
    cerrarSesion(){
      this.store.cerrarSesion()
    }
  
},
  computed:{
    logged:{
        get(){
             return this.store.estaAutenticado
        },
        set(){

        }
    },
    name(){
        return this.store.userName
  }
    
  }
};
</script>

<style>
</style>