<template>
  <div id="app">
    <nav class="blue-grey darken-4">
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo right">
          <i class="material-icons">local_gas_station</i>FuelApp</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li>
            <a class='dropdown-trigger blue-grey darken-4' href='javascript:;' data-target='dropdown1' v-on:click="addConsumo()">
              <i class="material-icons">add</i>
            </a>
          </li>
          <li>
            <a class='dropdown-trigger blue-grey darken-4' v-on:click="addConfig()" data-target='dropdown1'>
              <i class="material-icons">settings</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="main row">
      <div class="col s12">
        <h4>Consumo atual: {{ media_consumo_atual}}</h4>
        <ul class="collection" v-if="getKmInicial()">
          <li class="collection-item" v-for="item in lista_consumo">Km atual: {{ item.km_atual }}</li>
        </ul>
        <div class="card horizontal" v-else>
          <div class="card-stacked">
            <div class="card-content">
              <p>Nenhuma configuração identificada. Clique no link abaixo e adicione  as informações do seu veículo.</p>
            </div>
            <div class="card-action">
              <a v-on:click="addConfig()" class="modal-trigger">Configurar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row blue-grey darken-4">
      <div class="col s12">
        <p class="white-text footer">Controle de gastos com combustível</p>
      </div>
    </div>
    <!-- Modal Structure -->
    <div id="configModal" class="modal">
      <div class="modal-content">
        <h4>Configurações</h4>
        <label for="type">Kilometragem Inicial</label>
        <input type="text" id="type" v-model="km_inicial">
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat" v-on:click="saveConfig()">Salvar</a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      km_inicial: localStorage.getItem('km_inicial'),
      media_consumo_atual: 0
    }
  },
  created: function () {
    if (localStorage.getItem('lista_consumo') === null) {
      localStorage.setItem('lista_consumo', [])
    }
  },
  computed: {
    lista_consumo: function () {
      return JSON.parse(localStorage.getItem('lista_consumo'))
    }
  },
  methods: {
    addConfig: function () {
      $('#configModal').modal().modal('open')
    },
    saveConfig: function () {
      localStorage.setItem('km_inicial', this.km_inicial)
    },
    getKmInicial: function () {
      return localStorage.getItem('km_inicial')
    },
    addConsumo: function () {
      var lista = this.lista_consumo
      lista.push({km_atual: 5000})
      this.$forceUpdate()
      return localStorage.setItem('lista_consumo', JSON.stringify(lista))
    }
  }
}
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    padding: 0px;
  }

  #app {
    height: 100%;
  }
  @media screen and (max-width: 300px) {
    img.logo {
      width: 90%;
    }
  }

  @media screen and (miin-width: 600px) {
    img.logo {
      width: 30%;
    }
  }

  img.logo {
    margin: 0 auto;
  }

  div.main {
    width: 100%;
    height: 80%;
    background-color: #4ec283;
  }

  .logo {
    margin: 15px 0;
    align-items: center;
  }

  .footer {
    text-align: center;
  }

  .row {
    margin-bottom: 0
  }
</style>

