<template>
  <div class="container-fluid">
    <div class="borde row">
      <div class="col">
        <h6 class="text-center my-3">{{ lista.shoppingListName }}</h6>

        <div class="m-3 text-center">
          <div class="boton text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-bag-check"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
              />
              <path
                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
              />
            </svg>
            <h6 class="text-center p-2">${{ total }}</h6>
          </div>
        </div>
      </div>
      <div class="borde-azul col-md-9 m-2">
        <div class="row">
          <div
            class="col m-1 p-0"
            v-for="product in lista.products"
            :key="product.id"
          >
            <div class="card" style="width: 8em; height: 9em">
              <div class="card-body card-shadow">
                <h6 class="card-title">{{ product.name }}</h6>
                <p>
                  <small class="card-text"
                    >cantidad: {{ product.amount }}</small
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 props: {
    lista: Object,
  },
  name: "AppListaMinimizada",
  computed:{
      total(){
        let suma = 0
        this.lista.products.forEach(p => {
          suma += p.price * p.amount
         
        })
        return suma.toFixed(2)
      }
  }
}
</script>

<style>
.borde {
  border: black;
  border: 5px solid #ffeee4;
  border-radius: 0.5rem;
}
.borde-azul {
  border: black;
  border: 5px dotted #eaf7f9;
  border-radius: 0.5rem;
}
</style>