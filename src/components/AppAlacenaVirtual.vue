<template>
  <div class="container">
    <h1>Alacena</h1>

    <!--     <div class="input-group">
      <input
        type="text"
        class="form-control rounded"
        placeholder="Burcar Producto"
        aria-label="Search"
        aria-describedby="search-addon"
      />
      <button type="button" class="btn btn-outline-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg>
      </button>
      <input
        type="text"
        class="form-control ml-3 w-25"
        v-model="filtro"
        placeholder="Buscar producto"
      />
      <button v-on:click="filterLists" class="btn boton-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg>
      </button>
    </div> -->
    <div class="row m-3">
      <div class="col-sm-4 mx-3" v-for="product in alacena" :key="product.id">
        <AppProductoEnAlacena
          @borrarDeAlacena="borrarProducto"
          @restarDeAlacena="restarProducto"
          :product="product"
        ></AppProductoEnAlacena>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../store/store.js";
import AppProductoEnAlacena from "@/components/AppProductoEnAlacena.vue";
export default {
  components: {
    AppProductoEnAlacena,
  },
  data() {
    return {
      alacena: [],
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  created() {
    this.alacena = this.store.alacenaVirtual;
  },
  methods: {
    restarProducto(producto, amount) {
      console.log(producto + amount);
    },
    borrarProducto(producto, amount) {
      console.log(producto + amount);
    },
  },
};
</script>

<style>
</style>