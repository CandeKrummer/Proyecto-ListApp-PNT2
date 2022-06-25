<template>
  <div class="container">
    <h4 class="mt-3">Compras favoritas</h4>
    <div class="row m-5">
      <div
        class="col-sm m-1 p-0"
        v-for="listaAct in listasFav"
        :key="listaAct.id"
      >
        <div v-if="listaAct.id == 0">
          <h6>Crear compra favorita</h6>
          <button
            class="btn"
            style="width: 10em; height: 10em"
            @click="crearLista = !crearLista"
          >
            <div class="card-body p-0">
              <img
                class="cart p-0"
                style="width: 8em; height: 8em"
                src="../assets/add-cart-icon-.png"
              />
            </div>
          </button>
        </div>

        <div class="" v-if="listaAct.id > 0">
          <h6>{{ listaAct.ShoppingListName }}</h6>
          <button
            class="btn"
            style="width: 10em; height: 10em"
            @click="detallarLista(listaAct)"
          >
            <div class="card-body p-0">
              <img
                v-if="listaAct.id % 2 == 1"
                class="cart p-0"
                style="width: 8em; height: 8em"
                src="../assets/cart-icon-1.png"
              />
              <img
                v-if="listaAct.id % 2 == 0"
                class="cart"
                style="width: 8em; height: 8em"
                src="../assets/cart-icon-2.png"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center mb-5">
      <div class="col-md-7 text-center" style="width: 350px">
        <div class="borde" v-if="crearLista">
          <div class="text-end">
            <button
              type="submit"
              class="btn position-relative"
              @click="crearLista = !crearLista"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-x-circle"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </div>
          <div id="error-on-create"></div>

          <form>
            <div class="mx-3 text-center">
              <label for="nombreLista" class="form-label"
                >¡Ingrese el nombre de su nueva lista!</label
              >
              <input
                type="text"
                class="form-control ml-3 w-100"
                v-model="nombreNuevaLista"
                placeholder="Nombre de la lista"
              />
              <div class="form-text">
                Recordá que no podés tener 2 listas con el mismo nombre.
              </div>
            </div>
            <div class="text-center">
              <button
                type="submit"
                class="boton m-3 w-25"
                @click="crearNuevaLista()"
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row text-end">
      <div class="col mt-3" @click="cambiarListaEnUso">
        <router-link to="/agregar-productos" class="mx-5 boton"
          >Agregar productos</router-link
        >
      </div>
      <button type="button" class="col-sm-2 boton m-3" @click="agregarALista()">
        Agregar a lista actual
      </button>
    </div>
    <AppLista :lista="listaADetallar" />
  </div>
</template>

<script>
import { useStore } from "../store/store.js";
import AppLista from "@/components/AppLista.vue";
export default {
  components: {
    AppLista,
  },
  name:"AppComprasFavoritas",
  data(){
        return{
          crearLista: false,
          nombreNuevaLista:'',
          loaded: false,
          idListaADetallar: 0,
          listasFavoritas:[],
          listasFav:[
            {
            id: 0,
            ShoppingListName: "Crear nueva compra",
            products:[],
          }, 
          // {      
          //   id: 1,
          //   shoppingListName: "Compra mes",
          //       // fechaCreacion:"01/01/01",  
          //   products:[{
          //       id: 6,
          //       name: "Aceite 1,5Lt",
          //       brand:"Marolio",
          //       category:"Alacena",
          //       discount: 10,
          //       amount: 2,
          //       price: 200,
          //      },
          //      {
          //       id: 9,
          //       name: "Aceite 1 Lt",
          //       brand:"Marolio",
          //       category:"Alacena",
          //       discount: 20,
          //       amount: 2,
          //       price: 150,
          //      },
          //       {
          //       id: 10,
          //       name: "Puré de tomate 520Gr",
          //       brand:"Día",
          //       category:"Alacena",
          //       discount: 15,
          //       amount: 2,
          //       price: 59,
          //       }],
          // },
          // {
          //   id: 2,
          //   shoppingListName: "Compra semana",
          //       // fechaCreacion:"01/01/01",  
          //    products:[{
          //           id: 24,
          //           name: "Acelga congelada 500gr",
          //           brand:"Granja del sol",
          //           category:"Congelados",
          //           discount: 10,
          //           amount: 3,
          //           price: 200,
          //       },
          //       {
          //           id: 25,
          //           name: "Yerba 1Kg",
          //           brand:"Dos rosas",
          //           category:"Alacena",
          //           discount: 20,
          //           amount: 3,
          //           price: 400,
          //       },
          //           {
          //           id: 26,
          //           name: "Halls menta x6",
          //           brand:"Halls",
          //           category:"Alacena",
          //           discount: 15,
          //           amount: 2,
          //           price: 70,
          //       }]
          //   }
          ],
           
        };
  },
  setup() {
     const store = useStore();
    return { store };
  },
   created(){

    this.listaADetallar = this.listasFav[0];
    this.idListaADetallar = 0;
    this.getFavLists() 
  },
  methods:{
    detallarLista(listaAct){
    this.idListaADetallar = this.listasFav.indexOf(listaAct)
   },
    crearNuevaLista(){
      if(this.nombreNuevaLista != ''){
          let exists = false;
          let i = 0;
          while(i < this.listasFav.length && !exists){
            if(this.listasFav[i].ShoppingListName == this.nombreNuevaLista){
              exists = true
            }
            i++
          }
          if(!exists && this.nombreNuevaLista != ''){
            fetch(this.store.url+"/shoppingList", {
              method: 'POST',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ShoppingListName: this.nombreNuevaLista, category: 'Compra favorita', IdFamily: this.store.idFamily})
            }).then(res => res.json())
              .then(res => this.listasFav.push(res))
              // let lista ={id: this.listasFavoritas.length, ShoppingListName: this.nombreNuevaLista ,products: []}
             
              this.nombreNuevaLista = ''
              this.crearLista = !this.crearList
          }else{
            document.getElementById('error-on-create').innerHTML = '';
            document.getElementById('error-on-create').insertAdjacentHTML("afterbegin",`
            <div class="col alert alert-danger tet-center">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-exclamation-diamond-fill mx-2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                />
              </svg>
              No podés tener dos listas con el mismo nombre!
            </div>`)
          }
      }else{
        document.getElementById('error-on-create').innerHTML = '';
            document.getElementById('error-on-create').insertAdjacentHTML("afterbegin",`
            <div class="col alert alert-danger tet-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-exclamation-diamond-fill mx-2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                />
              </svg>
             El nombre no puede estar vacío!
          </div>`)
      }
      
    },
    cambiarListaEnUso(){
       this.store.cambiarListaEnUso(this.listaADetallar.id)
    },
    agregarALista(){
      this.store.cambiarListaEnUso(this.store.listaDeCompras)
      this.listaADetallar.products.forEach(producto => {
        this.store.addProduct(producto, producto.amount);
      });
      
    },
    async getFavLists(){
      let list;
      let productos;
      let response = await fetch(this.store.url + "shoppingList?IdFamily=" + this.store.idFamily);
      let results = await response.json();
      results = results.filter(list => list.IdFamily === this.store.idFamily && list.category == "Compra favorita")
      for(let i = 0; i < results.length; i++){
        list = results[i]
          productos = await this.store.getProductsFromList(list.id)
          list.products = productos
          
          this.listasFav.push(list)
      }
    }
  },
  computed:{
    listaADetallar: {
           get(){
             return (this.listasFav[this.idListaADetallar])
           },
           set(){
            (this.listasFav[this.idListaADetallar])
           } 
    }
  },

}
</script>

<style>
.cart {
  width: 5em;
  height: 5em;
}
</style>