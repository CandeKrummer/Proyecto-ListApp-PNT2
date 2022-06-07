<template>
  <div class="container">
    <div class="card text-center" style="width: 25rem">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <div class="row">
          <h6 class="col-sm">Categoria: {{ product.category }}</h6>
          <h6 class="col-sm">Marca: {{ product.brand }}</h6>
          <h6 class="">Precio: ${{ product.price }}</h6>
        </div>
        <p class="card-text"></p>
        <a href="#" class="btn boton">Agregar a la lista</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"AppProducto",
    props: {
        product: Object,
    },
    data() {
        return {
        
        };
    },
}
</script>

<style>
.boton {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #000000;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 5px solid #ede3fc;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;

  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>