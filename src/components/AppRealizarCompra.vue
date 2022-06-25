<template>
  <div>
    <div class="display justify-content-center">
      <div class="p-3 mb-4">
        <div class="col text-center">
          <router-link to="/alacena-virtual" class="mx-5 btn btn-success"
            >Guardar en Alacena Virtual</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../store/store.js";

export default {
  /* props: {
    listaProductos: [],
  }, */
  data() {
    return {
      //productos: [],
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  created() {
    //this.productos = this.listaProductos.products;
  },
};
</script>

<style>
</style>