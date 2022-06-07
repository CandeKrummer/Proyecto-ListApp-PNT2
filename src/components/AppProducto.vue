<template>
  <div class="container">
    <div class="card text-center" style="width: 25rem">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <div class="row">
          <h4 class="">Precio: ${{ product.price }}</h4>
          <h6 v-if="hasDiscount">{{ product.discount }}% OFF</h6>
          <h6 v-if="hasDiscount">
            Precio de lista:
            <s>
              {{ product.price * (product.discount / 100) + product.price }}
            </s>
          </h6>
          <h6 class="col-sm">{{ product.category }}</h6>
          <h6 class="col-sm">Marca: {{ product.brand }}</h6>
        </div>
        <div class="row justify-content-center">
          <button class="boton col-1 p-1" v-on:click="aumentarCantidad()">
            +
          </button>
          <h5 class="col-1 mt-3 mx-1">{{ amount }}</h5>
          <button class="boton col-1 p-1" v-on:click="disminuirCantidad()">
            -
          </button>
        </div>
        <p class="card-text"></p>
        <a href="#" class="boton" v-on:click="agregarProducto()"
          >Agregar a la lista</a
        >
        <h6 class="">Subtotal ${{ subtotal }}</h6>
        <h6 v-if="hasDiscount">
          <i>Ahorrás ${{ ahorro }}</i>
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"AppProducto",
    props: {
      product: Object,
      hasDiscount: {
        type: Boolean,
        default: false,
      }
   },
    data() {
        return {
          //Poner 1 para que muestre el ahorro o 0?
          amount: 0,
        };
    },
    methods: {
      aumentarCantidad(){
        this.amount ++;
      },
      disminuirCantidad(){
        if(this.amount > 0){
          this.amount --;
        }
      },
      agregarProducto(){
        this.$emit('agregado', {producto: this.product
        , amount: this.amount})
      }
    },
    computed:{
      subtotal: function(){
        return (this.amount * this.product.price).toFixed([2]);
      },
      ahorro: function(){
        return (this.subtotal * (this.product.discount / 100)).toFixed([2])
      }
    }
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