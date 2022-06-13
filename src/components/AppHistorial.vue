<template>
  <div class="container">
    <h1>Historial</h1>
    <h4>Compras favoritas</h4>
    <div class="" v-for="lista in listasFav" :key="lista.id">
      <router-link :to="{ name: 'listaDeCompras', params: { lista: lista } }">{{
        lista.name
      }}</router-link>
    </div>
    <h4>Compras recientes</h4>
  </div>
</template>

<script>
export default {
    /*Reutlizar ListaDeCompras o crear un lista favorita detallada
        +Tienen los mismos botones
        

    */
     name:"AppHistorial",
     data(){
        return{
            listasFav:[{
                id: 1,
                name: "Compra mes",
                 fechaCreacion:"01/01/01",  
                 productos:[{
                id: 6,
                name: "Aceite 1,5Lt",
                brand:"Marolio",
                category:"Alacena",
                discount: 10,
                price: 200,
               },
               {
                id: 9,
                name: "Aceite 1 Lt",
                brand:"Marolio",
                category:"Alacena",
                discount: 20,
                price: 150,
               },
                {
                id: 10,
                name: "Puré de tomate 520Gr",
                brand:"Día",
                category:"Alacena",
                discount: 15,
                price: 59,
                }]
            },
            {
                id:2,
                name: "Compra semana",
                fechaCreacion:"01/01/01",  
                productos:[{
                    id: 6,
                    name: "Aceite 1,5Lt",
                    brand:"Marolio",
                    category:"Alacena",
                    discount: 10,
                    price: 200,
                },
                {
                    id: 9,
                    name: "Aceite 1 Lt",
                    brand:"Marolio",
                    category:"Alacena",
                    discount: 20,
                    price: 150,
                },
                    {
                    id: 10,
                    name: "Puré de tomate 520Gr",
                    brand:"Día",
                    category:"Alacena",
                    discount: 15,
                    price: 59,
                }]
            }]
        }
     },

}
</script>

<style>
</style>