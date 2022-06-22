<template>
  <div class="container">
    <h4>Compras favoritas</h4>

    <div class="row">
      <div class="col m-1 p-0" v-for="listaAct in listasFav" :key="listaAct.id">
        <div class="" v-if="listaAct.id > 0">
          <h6>{{ listaAct.shoppingListName }}</h6>
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
    <AppLista :lista="listaADetallar" />
  </div>
</template>

<script>
import AppLista from "@/components/AppLista.vue";
export default {
  components: {
    AppLista,
  },
  name:"AppComprasFavoritas",
  data(){
        return{
          idListaADetallar: 0,
          listasFav:[
            {
            id: 0,
            shoppingListName: "Compra",
                // fechaCreacion:"01/01/01",  
            products:[],
          }, 
          {      
            id: 1,
            shoppingListName: "Compra mes",
                // fechaCreacion:"01/01/01",  
            products:[{
                id: 6,
                name: "Aceite 1,5Lt",
                brand:"Marolio",
                category:"Alacena",
                discount: 10,
                amount: 2,
                price: 200,
               },
               {
                id: 9,
                name: "Aceite 1 Lt",
                brand:"Marolio",
                category:"Alacena",
                discount: 20,
                amount: 2,
                price: 150,
               },
                {
                id: 10,
                name: "Puré de tomate 520Gr",
                brand:"Día",
                category:"Alacena",
                discount: 15,
                amount: 2,
                price: 59,
                }],
          },
          {
            id: 2,
            shoppingListName: "Compra semana",
                // fechaCreacion:"01/01/01",  
             products:[{
                    id: 6,
                    name: "Aceite 1,5Lt",
                    brand:"Marolio",
                    category:"Alacena",
                    discount: 10,
                    amount: 3,
                    price: 200,
                },
                {
                    id: 9,
                    name: "Aceite 1 Lt",
                    brand:"Marolio",
                    category:"Alacena",
                    discount: 20,
                    amount: 3,
                    price: 150,
                },
                    {
                    id: 10,
                    name: "Puré de tomate 520Gr",
                    brand:"Día",
                    category:"Alacena",
                    discount: 15,
                    amount: 3,
                    price: 59,
                }]
            }],
           
        };
  },
  created(){
    console.log("Holaa")
    
    this.listaADetallar = this.listasFav[0];
    this.idListaADetallar = 0;
  },
  methods:{
    detallarLista(listaAct){
      this.idListaADetallar = listaAct.id
    }
  },
  computed:{
    listaADetallar: {
           get(){
             return (this.listasFav[this.idListaADetallar])
           },
           set(){
             return this.listaADetallar
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