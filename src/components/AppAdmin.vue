<template>
  <div class="container">
    <h1>Hola admin!</h1>
    <div class="row">
      <!-- <div class="card-deck"> -->
      <div class="col-sm-4 mt-4 card-admin" style="width: 18rem">
        <div class="card-body text-center">
          <h5 class="card-title">Cantidad de usuarios registrados</h5>
          <h6 class="card-subtitle mb-2 text-muted"></h6>
          <h1>
            {{ cantUsers }}
          </h1>
        </div>
      </div>
      <div class="col-sm-4 mt-4 card-admin" style="width: 18rem">
        <div class="card-body text-center">
          <h5 class="card-title">Cantidad de Familias</h5>
          <h6 class="card-subtitle mb-2 text-muted"></h6>
          <h1>
            {{ families }}
          </h1>
        </div>
      </div>
      <div class="col-sm-4 mt-4 card-admin" style="width: 18rem">
        <div class="card-body text-center">
          <h5 class="card-title">Listas funcionando</h5>
          <h6 class="card-subtitle mb-2 text-muted"></h6>
          <h1>
            {{ lists }}
            {{ listasFavs }}
            {{ listasDeCompra }}
            {{ alacenasVirtuales }}
          </h1>
        </div>
      </div>
      <div class="col-sm-4 mt-4 card-admin" style="width: 18rem">
        <div class="card-body text-center">
          <h5 class="card-title">Productos a la venta</h5>
          <h6 class="card-subtitle mb-2 text-muted"></h6>
          <h1>
            {{ products }}
          </h1>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { useStore } from "../store/store.js";
export default {
  setup() {
      const store = useStore();
      return { store };
    },
    data(){
      return{
        families:0,
        lists:0,
        products: 0,
        listasFavs:0,
        listasDeCompra:0,
        alacenasVirtuales: 0,
      }
    },
  computed:{
    cantUsers(){
      return this.store.cantUsers
    },
    
  },
  methods:{
    async calcularFamilias(){
      const response = await fetch(this.store.url + "/family");
      const results = await response.json();
      this.families = results.length
    },
    async calcularListas(){
      const response = await fetch(this.store.url + "/shoppingList");
      const results = await response.json();
      this.lists = results.length
      this.listasFavs = results.filter(list => list.category == "Compra favorita").length
      this.listasDeCompra = results.filter(list => list.category == "Lista de compras").length
      this.alacenasVirtuales = results.filter(list => list.category == "Alacena virtual").length
    },
    async calcularProductos(){
      const response = await fetch(this.store.url + "/products");
      const results = await response.json();
      this.products = results.length
      
    }
  },
  async created(){
    this.calcularFamilias()
    this.calcularListas()
    this.calcularProductos()

  }
}
</script>

<style>
.card-admin {
  width: 18rem;
  height: 10rem;
  margin: 20px;
}
</style>