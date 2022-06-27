<template>
  <!-- <div class="row flex-nowrap">
    <div class="col-sm">
      <AppSideBar />
    </div> -->
  <div class="">
    <div class="col-py-3">
      <div class="row justify-content-center">
        <div class="p-3 mb-4">
          <div class="text-center">
            <form
              class="d-flex align-items-sm-center justify-content-center mt-2"
            >
              <label for="valorFiltro" class="form-label"></label>
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
              <router-link to="/compras-favoritas" class="mx-5 btn"
                ><button class="boton">Compras favoritas</button></router-link
              >
              <router-link to="/historial" class="mx-5 btn"
                ><button class="boton">Historial</button></router-link
              >
            </form>
          </div>
        </div>
      </div>
      <div class="row mx-0">
        <h1 class="text-center mt-5">Productos Favoritos</h1>
        <div
          class="col-sm-4 mt-4"
          v-for="product in productosFavoritos"
          :key="product.id"
        >
          <AppProducto
            @agregado="onAgregado"
            @clickCorazon="cambiarFavorito"
            isFav
            :product="product"
          ></AppProducto>
        </div>
      </div>
      <div id="Stock" class="row mx-0">
        <h1 class="text-center mt-5">Stock general</h1>
        <div class="col-sm-3 mt-5" v-for="product in Stock" :key="product.id">
          <AppProducto
            @agregado="onAgregado"
            @clickCorazon="cambiarFavorito"
            :product="product"
          ></AppProducto>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { useStore } from "../store/store.js";
import AppProducto from "@/components/AppProducto.vue";
export default {
  components: {
    AppProducto,
  },
  name: "AppAgregarProducto",
  data() {
    return {
      filtro: "",
      precioMin: 0,
      precioMax: 0,

      prodsFavoritos: {},
      productosFavoritos: [],
      ofertitas: {},
      Stock: [],
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  created() {
    console.log("ID lista en uso: " + this.store.idLista);
    this.Stock = this.store.stock;
    this.cargarProdsFav();
  },
  methods: {
    async cargarProdsFav() {
      let response = await fetch(
        this.store.url + "shoppingList?IdFamily=" + this.store.idFamily
      );
      let results = await response.json();
      this.prodsFavoritos = results.find(
        (list) =>
          list.IdFamily === this.store.idFamily &&
          list.category == "Productos favoritos"
      );
      console.log(this.prodsFavoritos);
      this.productosFavoritos = await this.store.getProductsFromList(
        this.prodsFavoritos.id
      );

      console.log(this.prodsFavoritos);
    },

    onAgregado(items) {
      console.log("OnAgregado: AP");
      if (items.amount > 0) {
        this.store.addProduct(items.producto, items.amount);
      }
    },
    async cambiarFavorito(items) {
      console.log("hola?");
      if (items.esFavorito) {
        console.log("hola? 2");
        fetch(this.store.url + "/listedProducts", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            IdList: this.prodsFavoritos.id,
            IdProduct: items.producto.id,
          }),
        })
          .then((res) => res.json())
          .then((res) => this.productosFavoritos.push(res));
      } else {
        let lp = await this.store.isProductOnList(
          this.prodsFavoritos.id,
          items.producto.id
        );
        fetch(
          this.store.url + "/listedProducts/" + lp.id,
          {
            method: "DELETE",
          })
          this.productosFavoritos = this.productosFavoritos.filter(function (val) {
          return val != items.producto;
          }
        );
      }
      this.cargarProdsFav();
    },
    async filterLists() {
      this.Stock = await this.filtrarLista();
      document.getElementById("Stock").focus();
    },
    async filtrarLista() {
      let listaFiltrada = await fetch(
        this.store.url + "products?filter=" + this.filtro
      );
      listaFiltrada = await listaFiltrada.json();
      return listaFiltrada;
    },
  },
};
</script>


<style>
.boton-1 {
  border: 2px solid #ffeee4;
  background-color: #f9f4ff;
  color: #9763b4;
}

.boton-1:hover {
  background-color: #ede3fc;
}
</style>