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
        <AppProducto :product="product"></AppProducto>
      </div>
    </div>

    <div class="row mt-3">
      <h1 class="text-center mt-5">Ofertas</h1>
      <div class="col-sm-4 mt-4" v-for="product in ofertas" :key="product.id">
        <AppProducto :product="product"></AppProducto>
      </div>
    </div>

    <div class="row mx-0">
      <h1 class="text-center mt-5">Stock general</h1>
      <div
        class="col-sm-4 mt-4"
        v-for="product in stockGeneral"
        :key="product.id"
      >
        <AppProducto :product="product"></AppProducto>
      </div>
    </div>
  </div>
</template>

<script>
import AppProducto from "@/components/AppProducto.vue";
export default {
  components: {
    AppProducto,
  },
 
  data(){
    return{
    prod:{ id: 1,
    name: "Oreos pack x6",
    brand:"Arcor",
    price: 500.5,
    category:"Galletitas",
    amount: 3,},

    productosFav: [
  {
    id: 1,
    name: "Oreos",
    brand:"arcor",
    category:"Galletitas",
    price: 120.5,
    amount: 3,
  },
  {
    id: 2,
    name: "Chocolinas",
    brand:"arcor",
    category:"Galletitas",
    price: 100.99,
    amount: 3,
  },
  {
    id: 4,
    name: "Merengadas",
    brand:"arcor",
    category:"Galletitas",
    price: 115.0,
    amount: 3,
  },
   {
    id: 5,
    name: "Rumba",
    brand:"arcor",
    category:"Galletitas",
    price: 115.0,
    amount: 3,
  },
  ],
     ofertas: [
  {
    id: 1,
    name: "Aceite 1,5Lt",
    brand:"Marolio",
    category:"Alacena",
    price: 200,
  },
   {
    id: 2,
    name: "Vino Malbec 2,25Lt",
    brand:"Elvi nito",
    category:"Bebidas",
    price: 235,
  },
   {
    id: 3,
    name: "Arroz 3x2 1 kg",
    brand:"Lucchetti",
    category:"Alacena",
    price: 360,
  },
   {
    id: 4,
    name: "Aceite 1,5Lt",
    brand:"Marolio",
    category:"Alacena",
    price: 200,
  },
   {
    id: 5,
    name: "Puré de tomate 520Gr",
    brand:"Día",
    category:"Alacena",
    price: 59,
  },
  ],
    stockGeneral: [
  {
    id: 1,
    name: "Servilletas 70U",
    brand:"Día",
    category:"Higiene y limpieza",
    price: 126,
  },
   {
    id: 2,
    name: "Enjuage bucal Minty fresh(? 250Ml",
    brand:"Colgate",
    category:"Higiene y limpieza",
    price: 400.33,
   },
   {
    id: 3,
    name: "Cerveza Lager 500Ml x6",
    brand:"Starberg",
    category:"Bebidas",
    price: 1100,
  },
   {
    id: 4,
    name: "Salame Fetado Lario 150Gr",
    brand:"Milán",
    category:"Heladera",
    price: 200,
  },
   {
    id: 5,
    name: "Nuez pelada en cubeta 100gr",
    brand:"La Sanjuanita",
    category:"Dietética",
    price: 239.25
  },
  {
    id: 6,
    name: "Durazno en mitades 820Gr",
    brand:"Coto",
    category:"Almacen",
    price: 355
  },
  {
    id: 7,
    name: "Milanesa de soja calabaza x4",
    brand:"Granja del Sol",
    category:"Congelados",
    price: 359
  },
  {
    id: 8,
    name: "Palta x 1Un",
    brand:"Carrefour",
    category:"Frutas y verduras",
    price: 79.00,
  },
  ]
  }}
};
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