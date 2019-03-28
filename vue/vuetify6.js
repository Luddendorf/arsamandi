// main.js ////////////////////////

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import { routes } from './routes';
import store from './store/store';

Vue.use(VueRouter);

const router new VueRouter({
   mode: 'history',
   routes: routes
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
})

// .babelrc /////////////////////////////
{
    "presets": [
        ["es2015", { "modules": false }],
        ["stage-2"]
    ]
}

// routes.js //////////////////////////////
import Home from './components/Home.vue';
import Portfolio from  './components/portfolio/Portfolio.vue';
import Stocks from './components/stocks/Stocks.vue';

export const routes = [
  { path: '/', component: Home },
  { path: '/portfolio', component: Portfolio },
  { path: '/stocks', component: Stocks }
];

// store/ store.js ////////////////////
import Vue from 'vue';
import Vuex from 'vuex';

import stocks from './modules/stocks';

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
       stocks
   }
});


// store/modules/ stocks.js  ////////////////////////
import stocks from '../../data/stocks';

const state = {
  stocks: []  
};

const mutations = {
  'SET_STOCKS' (state, stocks) {
      state.stocks = stocks;
  },
   'RND_STOCKS' (state) {
       
   }
};

const actions = {
  buyStock: ({ commit }, order) => {
    commit(); 
   },
  initStocks: ({ commit }) => {
    commit('SET_STOCKS', stocks);
  },
  randomizeStocks: ({ commit }) => {
      commit('RND_STOCKS');
  }
};

const getters = {
  stocks: state => {
      return state.stocks;
  }  
};

export default {
    state,
    mutations,
    getters,
    actions
}
      
      

// data/ stocks.js //////////////////////////////////////////
export default [
          { id: 1, name: 'BMW', price: 110 },
          { id: 2, name: 'Google', price: 230 },
          { id: 3, name: 'Apple', price: 240 },
          { id: 4, name: 'Twitter', price: 80 }
    
];


<!-- npm install --save-dev babel-preset-stage-2 -->
<!-- npm  install vue-router-->
<!-- npm install vuex -->

<!-- App.vue -->
<template>
  <app-header></app-header>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12>
       <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Header from './components/Header.vue';

  export default {
    components: {
    appHeader: Header
    }
  }
</script>

<style>
  body {
    padding: 30px;
  }
</style>

<!-- components Home.vue -->
<template>
  <h1>Home Component</h1>
</template>

<!-- components Header.vue -->
<template>
    <v-card
    color="grey lighten-4"
    flat
    height="200px"
  >
    <v-toolbar color="grey darken-1" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
       <router-link to="/">Stock Trader</router-link>


      <v-spacer></v-spacer>


      <ul>
      <router-link to="/portfolio"
        activeClass="active"
         tag="li"><a>Portfolio</a></router-link>
      <router-link to="/stocks"
        activeClass="active"
        tag="li"><a>Stocks</a></router-link>

      <li><a>End Day</a></li>
      </ul>

      <v-menu :nudge-width="100">
          <template v-slot:activator="{ on }">
            <v-toolbar-title v-on="on">
              <span>Save and Load</span>
              <v-icon dark>arrow_drop_down</v-icon>
            </v-toolbar-title>
          </template>
  
          <v-list>
            <v-list-tile>
              <v-list-tile-title v-text="Save Data"
                 router to=""></v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title v-text="Load Data"
                 router to=""></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>    
</template>

<!-- components/portfolio Portfolio.vue -->
<template>
    <h1>Portfolio Component</h1>
  </template>

<!-- components/portfolio Stock.vue -->
<template>
    <h1>Portfolio/ Stock Component</h1>
  </template>


<!-- components/stocks Stocks.vue -->
<template>
    <v-container fluid grid-list-lg>
     <v-layout row wrap>
      <v-flex>
       <app-stock v-for="stock in stocks"
         :stock="stock"></app-stock>
      </v-flex>
     </v-layout>
    </v-container>
  </template>

  <script>
    import Stock from './Stock.vue';

    export default {
      data() {
       return {
         stocks: [
          { id: 1, name: 'BMW', price: 110 },
          { id: 2, name: 'Google', price: 230 },
          { id: 3, name: 'Apple', price: 240 },
          { id: 4, name: 'Twitter', price: 80 }
          ];
        }
      },
      components: {
        appStock: Stock
      }
    }
  </script>

<!-- components/stocks Stock.vue -->
<template>
    <v-hover>
    <v-card>
    <v-container>
      <v-layout sm6 md4>
       <v-card-title class="green">{{ stock.name }}
        <v-btn flat disabled depressed small>Price: {{ stock.price }}</v-btn>
       </v-card-title>
       <v-card-text>
       </v-card-text>
       <v-card-actions>
        <v-layout justify-space-between>
        <v-flex xs12 sm6 md3>
          <v-text-field labe="Regular"
             placeholder="Qunatity"
              v-model="quantity">
          </v-text-field>
          <v-btn color="success"
                @click="buyStock"
                :disabled="quantity <= 0 || !Number.isInteger(quantity)"
                  >Buy</v-btn>
        </v-flex>
        </v-layout>
       </v-card-actions>
      </v-layout>
    </v-container>
    </v-card>
    </v-hover>
  </template>

  <script>
    export default {
      data() {
        return {
          quantity: 0
        }
      },
      methods: {
        buyStock() {
          const order = {
            stockId: this.stock.id,
            stockPrice: this.stock.price,
            quantity: this.quantity
          };
        console.log(order);
        this.quantity = 0;
        }
      },
      props: ['stock']
    }
  </script>


<!-- store/ store.js -->
