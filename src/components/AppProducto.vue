<template>
  <div class="container">
    <div class="d-flex"></div>

    <div class="card text-center" style="width: 20rem">
      <div class="card-body card-shadow" style="height: 510px">
        <div @click="changeFav" class="text-end">
          <img
            v-if="product.esFavorito"
            class="corazon"
            src="../assets/heart-full.png"
          />
          <img
            v-if="!product.esFavorito"
            class="corazon"
            src="../assets/heart-empty.png"
          />
        </div>
        <img :src="product.img" class="img" />
        <h4 class="card-title">
          {{ product.name }} - {{ product.brand }} {{ product.content }}
        </h4>
        <div class="row">
          <h5 class="">Precio: ${{ product.price }}</h5>
          <h6 v-if="product.discount != undefined">
            {{ product.discount }}% OFF
          </h6>
          <h6 v-if="product.discount != undefined">
            Precio de lista:
            <s>
              {{ product.price * (product.discount / 100) + product.price }}
            </s>
          </h6>
          <h6 class="col-sm">{{ product.category }}</h6>
        </div>
        <div class="row justify-content-center">
          <button
            class="boton col-1 p-1 my-1 h5"
            v-on:click="disminuirCantidad()"
          >
            -
          </button>
          <h5 class="col-4 mt-3 w-25">{{ amount }}</h5>
          <button
            class="boton col-1 px-0 my-1 h5"
            v-on:click="aumentarCantidad()"
          >
            +
          </button>
        </div>
        <div class="m-3">
          <h6 class="">Subtotal ${{ subtotal }}</h6>
          <button href="#" class="boton" v-on:click="agregarProducto()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-basket mb-1"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"
              />
            </svg>
            Agregar a la lista
          </button>
        </div>

        <p class="text-secondary" v-if="product.discount != undefined">
          <i>Ahorrás ${{ ahorro }}</i>
        </p>
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
      amount: 1,
      esFavorito: false,
      fav: "../assets/heart-full.png",
      notFav: "../assets/heart-empty.png",
    };
  },
  methods: {
    aumentarCantidad() {
      this.amount++;
    },
    disminuirCantidad() {
      if (this.amount > 0) {
        this.amount--;
      }
    },
    agregarProducto() {
      console.log("Agregar on Prod");
      this.$emit("agregado", { producto: this.product, amount: this.amount });
      this.amount = 1;
    },
    changeFav() {
      this.esFavorito = !this.esFavorito;
      this.product.esFavorito != this.product.esFavorito;
      this.$emit("clickCorazon", {
        producto: this.product,
        esFavorito: this.esFavorito,
      });
    },
  },
  computed: {
    subtotal: function () {
      return (this.amount * this.product.price).toFixed([2]);
    },
    ahorro: function () {
      return (this.subtotal * (this.product.discount / 100)).toFixed([2]);
    },
  },
  created() {
    console.log("Prod es fav: " + this.product.esFavorito);
    this.esFavorito = this.product.esFavorito;
  },
};
</script>

<style>
.img {
  width: 50%;
  height: 35%;
}
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
.corazon {
  width: 30px;
  height: 30px;
}
.card-shadow:hover {
  box-shadow: 0 0 11px rgba(255, 232, 216, 0.862);
}
</style>