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
    <div class="">
      <h1 class="">Prods favs</h1>
    </div>
    <div class="">
      <h3 class="">Ofertas</h3>
    </div>
    <div class="">
      <h1 class="">lista ofertas</h1>
    </div>
    <div class="">
      <h3 class="">Stock y precios</h3>
      <h1 class="">Stock general</h1>
    </div>
  </div>
</template>

<script>
export default {
  components: { 
  },
 
  data(){
    return{
    productos: [
  {
    id: 1,
    name: "Oreos",
    brand:"arcor",
    price: 120.5,
    amount: 3,
  },
  {
    id: 2,
    name: "Chocolinas",
    brand:"arcor",
    price: 100.99,
    amount: 3,
  },
  {
    id: 3,
    name: "Pepitos",
    brand:"arcor",
    price: 115.0,
    amount: 3,
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