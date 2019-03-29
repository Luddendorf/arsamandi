// store.js //////////////////
import Vue from 'vue';
import Vuex from 'vuex';

import stocks form './modules/stocks';
import portfolio from './modules/portfolio';

import * as globalActions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
   actions: globalActions,
   modules: {
     stocks,
     portfolio
   }
});

// store/modules/  stocks.js /////////////////////////////
const mutations = {
  'SET_STOCKS' (state, stocks) {
    state.stocks = stocks;
  },
  'RND_STOCKS' (state) {
    state.stocks.forEach(stock => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
    });
  }
}

const actions = {
  buyStock: ({ commit }, order) => {
    commit('BUY_STOCK', order);
  },
  initStocks: ({ commit }) => {
    commit('SET_STOCKS', stocks);
  },
  randomizeStocks: ({ commit }) => {
    commit('RND_STOCKS');
  }
};

// main.js //////////////////////////////
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.options.root = 'https://vuejs-stick-trader.firebase.com/';

Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString();
});

/* CONSOLE Create a project ]

  Rules: 
  {
    "rules": {
      ".read": "true",
      ".write": "true"
    }
  }
  2) Use Database address: https://vuejs-stock-trader.firebase.com/
*/

// store/ actions.js //////////////////////////////////////////////////
import Vue from 'vue';

export const loadData = ({ commit }) => {
  Vue.http.get('data.json')
   .then(response => response.json())
   .then(extractedData => {
     if(extractedData) {
       const stocks = extractedData.stocks;
       const funds = extractedData.funds;
       const stockPortfolio = extractedData.stockPortfolio;

       const portfolio = {
          stockPortfolio,
          funds
       };

       commit('SET_STOCKS', stocks);
       commit('SET_PORTFOLIO', portfolio);
   });
};

// store/modules/ portfolio.js /////////////////////////////////
const mutations = {
   'BUY_STOCK'(state, {stockId, stockPrice, quantity}) {
     const record = state.stocks.find(element => element.id == stockId);

     if(record) {
       record.quantity += quantity;
     } else {
       state.stocks.push({
         id: stockId,
         quantity: quantity
       });
      }
    state.funds -= stockPrice * quantity;
   },
   'SET_PORTFOLIO'(state, portfolio) {
     state.funds = portfolio.funds;
     state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
   }
};

<!-- npm install --save vue-resource -->

<!-- stocks/ Stock.vue -->
<template>
    <v-card>

        <v-layout column align-space-between>
        <v-card-title class="title success">
          (Price: {{ stock.price }} | Quantity: {{ stock.quantity }})
        </v-card-title>
  
        <v-layout row justify-space-between>
          <v-text-field placeholder="Quantity"
            v-model="quantity"
            :class="{ danger: insufficientFunds }">
          </v-text-field>

          <v-btn class="success"
          @click="buyStock"
          :disabled="insufficientFunds || quantity <= 0 || !Number.isInteger(quantity)"
          >{{ insufficientFunds ? 'Insufficient Funds' : 'Buy' }}
          </v-btn>

        </v-layout>
  
        </v-layout>
  
       </v-card>


</template>

<script>
  export default {
    props: ['stock'],
    data() {
      return {
        quantity: 0
      }
    },
    computed: {
      funds() {
        return this.$store.getters.funds;
      },
      insufficientFunds() {
        return this.quantity * this.stock.price > this.funds;
      }
    }
    methods: {
      buyStock() {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity
        };

        this.$store.dispatch('buyStock', order);
        this.quantity = 0;
      }
    }
  }
</script>

<style scoped>
  .danger {
    border: 1px solid red;
  }
</style>

<!-- portfolio/ Stock.vue -->
<template>
  <v-container>
   <v-layout align-start justify-space-between row fill-height>
    <v-flex xs12 md4 lg3>
     <v-card>

      <v-layout column align-space-between>
      <v-card-title class="title success">
        (Price: {{ stock.price }} | Quantity: {{ stock.quantity }})
      </v-card-title>

      <v-layout row justify-space-between>
        <v-text-field placeholder="Quantity"
          v-model="quantity"
           :class="{danger: insufficientQuantity}">
        </v-text-field>
        <v-btn color="success"
          @click="sellStock"
          :disabled="insufficientQuantity || quantity <= 0 || !Number.isInteger(quantity)">
        {{ insufficientQuantity ? 'Not enough Stocks' : 'Sell' }}</v-btn>
      </v-layout>

      </v-layout>

     </v-card>
    </v-flex>
   </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    props: ['stock'],
    data() {
      return {
        quantity: 0
      }
    },
    computed: {
      insufficientQuantity() {
       return this.quantity > this.stock.quantity;
      }
    },
    methods: {
      ...mapActions({
         placeSellOrder: 'sellStock'
      }),
      sellStock() {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity
        };
      this.placeSellOrder(order);
      this.quantity = 0;
      }
    }
  }
</script>

<style scoped>
  .danger {
    border: 1px solid red;
  }
</style>

<!-- portfolio/ Portfolio.vue -->
<template>
  <v-container>
   <v-layout row justify-space-between>
     <v-flex v-for="stock in stocks"
       :stock="stock">
       <app-stock></app-stock>
     </v-flex>
   </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Stock from './Stock.vue';

  export default {
    computed: {
      ...mapGetters([
        'stockPortfolio'
      ])
    },
    components: {
      appStock: Stock
    }
  }
</script>

<!-- Stock Home.vue -->
<template>
  <v-container>
   <v-layout column class="px-2">
     <h1>Trade or View your Portfolio</h1>
     <h6>You may Save & Load your Data</h6>
     <h6>Click on 'End Day' to begin a New Day</h6>
     <p class="mt-5">Your Funds: {{ funds | currency }}</p>
   </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      funds() {
        return this.$store.getters.funds;
      }
    }
  }
</script>

<!-- Header.vue ///////////////////////////////////////// -->
<template>
  <router-link to="/portfolio"
    activeClass="active" tag="li"><a>Protfolio</a></router-link>
  <router-link to="/stocks"
    activeClass="active" tag="li"><a>Stocks</a></router-link>
 
  <v-layout>
    <v-flex>
     <h1 class="headline font-weight-bold">Funds: {{ funds | currency }}</h1>
    </v-flex>

    <v-btn @click="endDay">End Day</v-btn>
  </v-layout>

  <v-menu v-on="isDropdownOpen"
          @click="isDropdownOpen = !isDropdownOpen"> <!--:class="{open: isDropdownOpen}" -->
    <template slot="activator">
      <v-btn color="primary">Save & Load</v-btn>
    </template>
    <v-list>
     <v-list-tile router to=""
       @click="saveData">
       <v-list-tile-title>Save Data</v-list-tile-title>
     </v-list-tile>
     <v-list-tile router to=""
       >
       <v-list-tile-title
        @click="loadData">Load Data</v-list-tile-title>
     </v-list-tile>
    </v-list>
  </v-menu>


</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    data() {
      return {
        isDropdownOpen: false
      }
    }
    computed: {
      funds() {
        return this.$store.getters.funds;
      }
    },
    methods: {
       ...mapActions({
          randomizeStocks: 'randomizeStocks',
          fetchData: 'loadData'
       }),
      endDay() {
       this.randomizeStocks();
      },
      saveData() {
       const data = {
         funds: this.$store.getters.funds,
         stockPortfolio: this.$store.getters.stockPortfolio,
         stocks: this.$store.getters.stocks
       };

       this.$http.put('data.json', data);
      },
      loadData() {
         this.fetchData();
      }
    }
  }
</script>

<!-- STOCKS App.vue -->
<template>
  <v-container>
    <app-header></app-header>
    <v-layout row>
     <v-flex xs12>
      <transition name="slide" mode="out-in">
      <router-view></router-view>
      </transiton>
     </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Header from './components/Header.vue';
  export default {
    components: {
      appHeader: Header
    },
    created() {
      this.$store.dispatch('initStocks');
    }
  }
</script>

<style>
  body {
    padding: 30px;
  }

  .slide-enter-active {
     animation: slide-in 500ms ease-out forwards;
  }

  .slide-leave-active {
     animation: slide-out 500ms ease-out forwards;
  }

  @keyframes slide-in {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
</style>
