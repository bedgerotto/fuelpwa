<template>
  <div id="app">
    <main>
      <img class="logo" align="center" src="./assets/logo.png" alt="FuelPwa">
    </main>
    <footer>
      <h6>Controle de gastos com combustível</h6>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @media screen and (max-width: 300px) {
    .logo {
      width: 90%;
    }
  }

  @media screen and (miin-width: 600px) {
    img.logo {
      width: 30%;
    }
  }


  h6 {
    text-align: center;
  }

  .logo {
    margin: 15px 0;
    align-items: center;
  }
</style>

