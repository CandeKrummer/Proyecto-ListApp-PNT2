<template>
  <div class="container">
    <div class="d-flex"></div>

    <div class="card text-center" style="width: 25rem">
      <div class="card-body card-shadow">
        <h4 class="card-title">{{ product.name }} - {{ product.brand }}</h4>
        <div class="row">
          <h6 class="col-sm">{{ product.category }}</h6>
        </div>
        <div class="row justify-content-center">
          <button
            class="boton col-1 p-1 m-1 h4"
            v-on:click="disminuirCantidad()"
          >
            -
          </button>
          <h5 class="col-1 mt-3 mx-1">{{ amount }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppProducto",
  props: {
    product: Object,
  },
  data() {
    return {
      amount: 0,
    };
  },
  methods: {
    disminuirCantidad() {
      if (this.amount > 1) {
        this.amount--;
      } else if (this.amount <= 1) {
        this.amount = 0;
        this.$emit("borrarDeAlacena", { producto: this.product });
      }
    },
  },
};
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
.card-shadow:hover {
  box-shadow: 0 0 11px rgba(255, 232, 216, 0.862);
}
</style>