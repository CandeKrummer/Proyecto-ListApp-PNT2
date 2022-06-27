<template>
  <div class="container">
    <h1>Hola Admin!</h1>
    <div class="row">
      <div class="col-sm-4 mt-4" v-for="valor in valores" :key="valor.titulo">
        <AppCardAdmin :titulo="valor.titulo" :valor="valor.valor" />
      </div>
    </div>
    <div class="d-flex">
      <div class="col-md m-5 card-admin card">
        <div class="card-body text-center">
          <h4 class="card-title">Listas funcionando</h4>
          <h6 class="card-subtitle mb-2 text-muted"></h6>
          <h1>
            {{ lists }}
          </h1>
          <div class="row">
            <div class="col">
              Listas favoritas:
              <div class="6">{{ listasFavs }}</div>
            </div>
            <div class="col">
              Listas de compras:
              <div class="6">{{ families }}</div>
            </div>
            <div class="col">
              Alacenas:
              <div class="6">{{ families }}</div>
            </div>
            <div class="col">
              Listas productos favoritos:
              <div class="6">{{ families }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- </div> -->
  </div>
</template>

<script>
import AppCardAdmin from "@/components/AppCardAdmin.vue";
import { useStore } from "../store/store.js";
export default {
  components: {
    AppCardAdmin,
  },
  setup() {
      const store = useStore();
      return { store };
    },
    data(){
      return{
        families:0,
        lists:0,
        listasFavs:0,
        valores: [],
        products:[],
        lps:[],
        
      }
    },
  computed:{
    cantUsers(){
      return this.store.cantUsers
    },
     promedioXFamilia(){
      let total = 0
      let prod
      let lps = this.lps
      lps.forEach(lp => {
        prod = this.products.find(p => p.id == lp.IdProduct)
        total += prod.price * lp.amount
      });
      
     return total / this.families
    }
    
  },
  methods:{
    async calcularFamilias(){
      const response = await fetch(this.store.url + "/family");
      const results = await response.json();
      this.valores.push({
        titulo: "Familias registradas",
        valor: results.length  + ' Familias'
      })
      this.families = results.length
    },
    async calcularListas(){
      const response = await fetch(this.store.url + "/shoppingList");
      const results = await response.json();
      this.lists = results.length
      this.listasFavs = results.filter(list => list.category == "Compra favorita").length
    },
    async calcularProductos(){
      const response = await fetch(this.store.url + "/products");
      const results = await response.json();
      this.products = results
      this.valores.push({
        titulo: "Productos en Stock general",
        valor: results.length + ' Prods.'
      })
      
      
    },
    async getLPs(){
      const response = await fetch(this.store.url + "/listedProducts");
      const results = await response.json();
      this.lps = results
      this.valores.push({
        titulo: "Productos añadidos a listas",
        valor: results.length+' Prods'
      })
    },
    cargarPromedio(){
      this.valores.push({
        titulo: "Gastos promedio por familia",
        valor: '$'+this.promedioXFamilia
      })
    },
    cargarUsers(){
      this.valores.push({
        titulo: "Usuarios registrados",
        valor: this.cantUsers + ' users'
      })
    }
  },
  async created(){
    await this.calcularFamilias()
    await this.calcularListas()
    await this.calcularProductos()
    await this.getLPs()
    this.cargarPromedio()
    this.cargarUsers()

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