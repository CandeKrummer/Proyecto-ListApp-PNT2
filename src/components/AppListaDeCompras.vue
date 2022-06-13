<template>
  <div>
    <div class="display justify-content-center">
      <div class="p-3 mb-4">
        <div class="col text-center">
          <router-link to="/agregar-productos" class="mx-5 boton"
            >Agregar productos</router-link
          >
          <router-link to="/realizar-compra" class="mx-5 boton"
            >Realizar compra</router-link
          >
        </div>
      </div>
    </div>
    <AppLista :lista="listaDeCompras"></AppLista>
  </div>
</template>

<script>
import AppLista from "@/components/AppLista.vue";
import { useStore } from "../store/store.js";
export default {
  components: {
    AppLista,
  },
  data() {
    return {
      listaDeCompras: {},
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  created() {
    this.listaDeCompras = this.store.listaDeCompras;
  },
};
</script>

<style>
</style>