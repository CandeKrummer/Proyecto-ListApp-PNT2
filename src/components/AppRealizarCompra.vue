<template>
  <div>
    <div class="display justify-content-center">
      <div class="p-3 mb-4">
        <div class="col text-center" @click="guardarProductosEnAlacena()">
          <router-link to="/lista-de-compras" class="mx-3 btn btn-success"
            >Confirmar</router-link
          >
        </div>
        <h5 class="col mt-3 mx-1">Precio total: $ {{ precioTotal() }}</h5>
        <h5 class="col mt-3 mx-1">
          Se agregarán estos productos a la Alacena virtual
        </h5>
        <div
          class="producto row px-1 m-0"
          v-for="prod in productos"
          :key="prod.id"
        >
          <div class="col-4 align-items-center">
            {{ prod.name }}
          </div>
          <div class="col-4 align-items-center">
            {{ (prod.price * prod.amount).toFixed([2]) }}
          </div>
          <div class="col-4 align-items-center">
            {{ prod.amount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../store/store.js";

export default {
  data() {
    return {
      productos: [],
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  created() {
    this.productos = this.store.listaDeCompras.products;
  },
  methods: {
    precioTotal() {
      let precio = 0;
      for (let i = 0; i < this.productos.length; i++) {
        precio += this.productos[i].price * this.productos[i].amount;
      }
      return precio.toFixed([2]);
    },
    guardarProductosEnAlacena() {
      this.store.moverProductosAlacena();
    },
  },
};
</script>

<style>
</style>