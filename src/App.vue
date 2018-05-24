<template>
  <div id="app">
    <nav class="blue-grey darken-4">
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo right">
          <i class="material-icons">local_gas_station</i>FuelApp</a>
        <ul id="nav-mobile" class="left">
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
        <div class="col s12">
          <div class="card horizontal">
            <div class="card-stacked">
              <div class="card-content">
                <h4>Média Geral: {{ media_consumo_total }} KM/L</h4>
              </div>
            </div>
          </div>
        </div>
        <table class="highlight responsive" v-if="getKmInicial()">
          <tr>
            <th><span>Km atual</span></th>
            <th><span>Quantidade Abastecida (L)</span></th>
            <th><span>Consumo (KM/L)</span></th>
            <th></th>
          </tr>
          <tr v-for="item in lista_consumo" track-by="$index">
            <td>{{ item.km_atual }}</td>
            <td>{{ item.qtd_abastecida }}</td>
            <td>{{ item.media_consumo }}</td>
            <td>
              <a class="right remove-item" href="javascript:;" v-on:click="removeConsumo($index)"><i class="material-icons">delete</i></a>
            </td>
          </tr>
        </table>
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
        <input type="number" id="type" v-model="km_inicial">
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat" v-on:click="saveConfig()">Salvar</a>
      </div>
    </div>

    <div id="consumoModal" class="modal">
      <div class="modal-content">
        <h4>Consumo</h4>
        <div class="col s6">
          <label for="km_atual">Kilometragem Atual</label>
          <input type="number" id="km_atual" v-model="km_atual">
        </div>
        <div class="col s6">
          <label for="qtd_abastecida">Quantidade abastecida</label>
          <input type="number" id="qtd_abastecida" v-model="qtd_abastecida">
        </div>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat" v-on:click="saveConsumo()">Salvar</a>
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
      km_inicial: '',
      km_atual: '',
      qtd_abastecida: ''
    }
  },
  created: function () {
    if (localStorage.getItem('lista_consumo') === null) {
      localStorage.setItem('lista_consumo', [])
    }
  },
  ready: function () {
    this.$forceUpdate()
  },
  computed: {
    lista_consumo: function () {
      var lista = localStorage.getItem('lista_consumo')
      if (lista) {
        return JSON.parse(lista)
      }
      return []
    },
    media_consumo_total: function () {
      return this.lista_consumo.reduce(function (total, item) {
        return total + parseFloat(item.media_consumo)
      }, 0)
    }
  },
  methods: {
    addConfig: function () {
      $('#configModal').modal().modal('open')
    },
    saveConfig: function () {
      localStorage.setItem('km_inicial', this.km_inicial)
      this.$forceUpdate()
    },
    getKmInicial: function () {
      return localStorage.getItem('km_inicial')
    },
    addConsumo: function () {
      $('#consumoModal').modal().modal('open')
      this.resetFields()
    },
    saveConsumo: function () {
      var lista = this.lista_consumo
      var kmInicial

      if (lista.length === 0) {
        kmInicial = this.getKmInicial()
      } else {
        kmInicial = lista.slice(-1)[0].km_atual
      }

      lista.push({
        km_atual: this.km_atual,
        qtd_abastecida: this.qtd_abastecida,
        media_consumo: this.mediaConsumo(this.km_atual, kmInicial, this.qtd_abastecida)
      })

      this.$forceUpdate()
      return localStorage.setItem('lista_consumo', JSON.stringify(lista))
    },
    removeConsumo: function (index) {
      var lista = this.lista_consumo
      lista.splice(index, 1)
      this.$forceUpdate()
      return localStorage.setItem('lista_consumo', JSON.stringify(lista))
    },
    mediaConsumo: function (kmAtual, kmInicial, qtdAbastecida) {
      return parseFloat((kmAtual - kmInicial) / qtdAbastecida).toFixed(2)
    },
    resetFields: function () {
      this.km_atual = ''
      this.qtd_abastecida = ''
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

  table {
    background-color: white
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

  .remove-item {
    color: indianred;
  }
</style>

