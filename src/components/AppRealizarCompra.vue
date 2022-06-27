<template>
  <div>
    <div class="display justify-content-center">
      <div v-if="compraRealizada == false" class="p-3 mb-4">
        <div
          class="col text-center mx-3 btn btn-success"
          @click="guardarProductosEnAlacena()"
        >
          Confirmar
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
      <div v-if="compraRealizada == true" class="p-3 mb-4">
        <h5 class="col mt-3 mx-1">
          Los productos se agregaron a la Alacena Virtual exitosamente
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../store/store.js";

export default {
  data() {
    return {
      compraRealizada: false,
      productos: [],
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  created() {
    this.compraRealizada = false;
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
      this.compraRealizada = true;
      this.store.moverProductosAlacena();
    },
  },
};
</script>

<style>
</style>