<template>
  <div class="">
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
              id="valorFiltro"
              placeholder="Buscar producto"
            />
            <button class="btn boton-1">
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
            <router-link to="/historial" class="mx-5 btn"
              ><button class="boton">Ver historial</button></router-link
            >
          </form>
        </div>
      </div>
    </div>
    <div class="row mx-0">
      <h1 class="text-center mt-5">Productos Favoritos</h1>
      <div
        class="col-sm-4 mt-4"
        v-for="product in productosFav"
        :key="product.id"
      >
        <AppProducto @agregado="onAgregado" :product="product"></AppProducto>
      </div>
    </div>

    <div class="row mt-3">
      <h1 class="text-center mt-5">Ofertas</h1>
      <div class="col-sm-4 mt-4" v-for="product in ofertas" :key="product.id">
        <AppProducto
          @agregado="onAgregado"
          hasDiscount
          :product="product"
        ></AppProducto>
      </div>
    </div>

    <div class="row mx-0">
      <h1 class="text-center mt-5">Stock general</h1>
      <div
        class="col-sm-4 mt-4"
        v-for="product in stockGeneral"
        :key="product.id"
      >
        <AppProducto @agregado="onAgregado" :product="product"></AppProducto>
      </div>
      <router-link to="/lista-de-compras" class="boton"
        >Volver a Mi Lista</router-link
      >
    </div>
  </div>
</template>

<script>
import { useStore } from "../store/store.js";
import AppProducto from "@/components/AppProducto.vue";
export default {
  components: {
    AppProducto,
  },
 
  data(){
    return{
    productosFav: [{
        id: 1,
        name: "Pepitos",
        brand: "Pepitos",
        price: 240.65,
        content: "400 gr",
        category: "Alacena",
                            
    },
    {
        id: 2,
        name: "Chocolinas",
        brand: "Chocolinas",
        price: 200.50,
        content: "450 gr",
        category: "Alacena",
                            
    },
    {
        id: 3,
        name: "Dulce de leche",
        brand: "La Serenisima",
        price: 323.15,
        content: "300 gr",
        category: "Heladera",
                              
    },
    {
        id: 4,
        name: "Queso crema",
        brand: "Cassancrem",
        price: 540.50,
        content: "600 gr",
        category: "Heladera",
                            
    },
    {
        d: 5,
        name: "Jugo de naranja",
        brand: "Cepita",
        price: 240.65,
        content: "200 ml",
        category: "Alacena",
    },
  ],
     ofertas: [
  {
    id: 6,
    name: "Aceite 1,5Lt",
    brand:"Marolio",
    category:"Alacena",
    discount: 10,
    price: 200,
  },
   {
    id: 7,
    name: "Vino Malbec 2,25Lt",
    brand:"Elvi nito",
    category:"Bebidas",
    discount: 20,
    price: 235,
  },
   {
    id: 8,
    name: "Arroz 3x2 1 kg",
    brand:"Lucchetti",
    category:"Alacena",
    discount: 33,
    price: 360,
  },
   {
    id: 9,
    name: "Aceite 1,5Lt",
    brand:"Marolio",
    category:"Alacena",
    discount: 25,
    price: 200,
  },
   {
    id: 10,
    name: "Puré de tomate 520Gr",
    brand:"Día",
    category:"Alacena",
    discount: 15,
    price: 59,
  },
  ],
    stockGeneral: [
  {
    id: 11,
    name: "Servilletas 70U",
    brand:"Día",
    category:"Higiene y limpieza",
    price: 126,
  },
   {
    id: 12,
    name: "Enjuage bucal Minty fresh(? 250Ml",
    brand:"Colgate",
    category:"Higiene y limpieza",
    price: 400.33,
   },
   {
    id: 13,
    name: "Cerveza Lager 500Ml x6",
    brand:"Starberg",
    category:"Bebidas",
    price: 1100,
  },
   {
    id: 14,
    name: "Salame Fetado Lario 150Gr",
    brand:"Milán",
    category:"Heladera",
    price: 200,
  },
   {
    id: 15,
    name: "Nuez pelada en cubeta 100gr",
    brand:"La Sanjuanita",
    category:"Dietética",
    price: 239.25
  },
  {
    id: 16,
    name: "Durazno en mitades 820Gr",
    brand:"Coto",
    category:"Almacen",
    price: 355
  },
  {
    id: 17,
    name: "Milanesa de soja calabaza x4",
    brand:"Granja del Sol",
    category:"Congelados",
    price: 359
  },
  {
    id: 18,
    name: "Palta x 1Un",
    brand:"Carrefour",
    category:"Frutas y verduras",
    price: 79.00,
  },
  ]
  }
  
  },
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    onAgregado (items) {
      console.log(items)
      //this.store.add(items.product.id, items.cantidad );
      this.store.addProduct(items.producto, items.amount );
    },
}}
</script>


<style>
.boton-1 {
  border: 2px solid #ffeee4;
  background-color: #f9f4ff;
  color: #9763b4;
}

.boton-1:hover {
  border: 2px solid #d5bfbd;
  background-color: #a383c1;
}
</style>