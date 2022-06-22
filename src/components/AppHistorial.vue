<template>
  <div class="container">
    <h1>Hola! Bienvenido a su historial</h1>
    <div class="row">
      <h3 class="m-2">Compras recientes</h3>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        class="bi bi-calendar-range"
        viewBox="0 0 16 16"
      >
        <path
          d="M9 7a1 1 0 0 1 1-1h5v2h-5a1 1 0 0 1-1-1zM1 9h4a1 1 0 0 1 0 2H1V9z"
        />
        <path
          d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
        />
      </svg>
    </div>
    <div v-for="lista in listasPasadas" :key="lista.id">
      <AppListaMinimizada :lista="lista" class="m-3" />
    </div>
  </div>
</template>

<script>
import AppListaMinimizada from "@/components/AppListaMinimizada.vue";
export default {
     components: {
         AppListaMinimizada,
     },
    data(){
        return{
            listasPasadas:[{
                shoppingListName: "Compra 05/04",
                products: [
                    {
                        id: 1,
                        name: "Pepitos",
                        brand: "Pepitos",
                        price: 240.65,
                        content: "400 gr",
                        category: "Alacena",
                        amount: 4
                    },
                    {
                        id: 2,
                        name: "Chocolinas",
                        brand: "Chocolinas",
                        price: 200.50,
                        content: "450 gr",
                        category: "Alacena",
                        amount: 2
                    },
                    {
                        id: 3,
                        name: "Sopa Quick Zapallo x5",
                        brand: "Quick",
                        price: 250.65,
                        content: "5 Sobres",
                        category: "Alacena",
                        amount: 2
                    },
                    {
                        id: 4,
                        name: "Sopa Quick Tomate x5",
                        brand: "Quick",
                        price: 250.65,
                        content: "5 Sobres",
                        category: "Alacena",
                        amount: 2
                    },
                    {
                        id: 5,
                        name: "Sopa Quick Choclo x5",
                        brand: "Quick",
                        price: 250.65,
                        content: "5 Sobres",
                        category: "Alacena",
                        amount: 2
                    },
                    {
                        id: 6,
                        name: "Sopa Quick Vegetales x5",
                        brand: "Quick",
                        price: 250.65,
                        content: "5 Sobres",
                        category: "Alacena",
                        amount: 1
                    },
                    {
                        id: 7,
                        name: "Sopa Quick Tomate x5",
                        brand: "Quick",
                        price: 250.65,
                        content: "5 Sobres",
                        category: "Alacena",
                        amount: 2
                    },
                    {
                        id: 8,
                        name: "Sopa Quick Choclo x5",
                        brand: "Quick",
                        price: 250.65,
                        content: "5 Sobres",
                        category: "Alacena",
                        amount: 2
                    },
                    {
                        id: 9,
                        name: "Sopa Quick Vegetales x5",
                        brand: "Quick",
                        price: 250.65,
                        content: "5 Sobres",
                        category: "Alacena",
                        amount: 1
                    },
                    {
                           id: 10,
                        name: "Sopa Quick Vegetales x5",
                        brand: "Quick",
                        price: 250.65,
                        content: "5 Sobres",
                        category: "Alacena",
                        amount: 1
                    },
                    
                    ]
            },
            {
                shoppingListName: "Compra 09/04",
                products: [
                    {
                        id: 1,
                        name: "Aceite",
                        brand: "Marolio",
                        price: 240.65,
                        content: "400 gr",
                        category: "Alacena",
                        amount: 4
                    },
                    {
                        id: 2,
                        name: "Acelga",
                        brand: "Día",
                        price: 200.50,
                        content: "450 gr",
                        category: "Alacena",
                        amount: 2
                    }]
            }] 
        }
    }    
}
</script>

<style>
</style>