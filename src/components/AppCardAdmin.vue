<template>
  <div class="card-admin borde" style="width: 18rem">
    <div class="card-body text-center">
      <h5 class="card-title">{{ titulo }}</h5>
      <h6 class="card-subtitle mb-2 text-muted"></h6>
      <h1 class="m-4">{{ valor }}</h1>
    </div>
  </div>
</template>

<script>
export default {
    name:"AppCardAdmin",
    props:{
        titulo:String,
        valor:String
    }
}
</script>

<style>
</style>