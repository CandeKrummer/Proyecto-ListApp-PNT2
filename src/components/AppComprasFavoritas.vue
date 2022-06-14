<template>
  <div class="container">
    <h4>Compras favoritas</h4>
    <div class="m-4" v-for="listaAct in listasFav" :key="listaAct.id">
      <div class="" v-if="listaAct.id > 0">
        <button class="boton" @click="detallarLista(listaAct)">
          {{ listaAct.shoppingListName }}
        </button>

        <AppLista :lista="listaAct"></AppLista>

        <!-- <router-link
        :to="{ path: `/lista/${listaa}`, params: { lista: listaa } }"
      >
        {{ listaa.shoppingListName }}</router-link
      > -->
      </div>
    </div>
    <div id="listaActual">
      <AppLista :lista="listaADetallar"></AppLista>
    </div>
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
      console.log(this.listaADetallar)
      console.log(this.idListaADetallar)
      this.idListaADetallar = listaAct.id;
      console.log(this.idListaADetallar)
      console.log(this.listaADetallar)

    }
  },
  computed:{
    listaADetallar: function(){
      return (this.listasFav[this.idListaADetallar]);
    }
  },

}
</script>

<style>
</style>