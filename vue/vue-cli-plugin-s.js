
<!-- vue create -->
<!-- Use preset or Custom Config and Add Plugins -->
<!-- npm install -g @vue/cli

vue create magic-path

.vuerc 

// cd magic-path

npm run serve -->

<!-- vue-cli-plugin-vuetify

vue add vuetify

npm install --save axios 

npm install --save sass-loader node-sass

npm run build:development


npm install -g @vue/cli-service-global
-->

<style scoped lang="scss">
  footer {
    small {
      color: red;
    }
  }
</style>


<!-- Home.vue -->
<template>
  <h1>{{ url }}</h1>
</template>


<script>
  export default {
    data() {
      return {
        url: process.env.VUE_APP_URL
      };
    }
  }
</script>

<!-- INSTANT PROTOTYPING -->

<!-- Hello.vue -->
<template>
  <h1>Hello</h1>
</template>

<!-- NB vue serve Hello.vue  -->



// store.js ///////////////////////////
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        
    },
    mutations: {
        
    },
    actions: {
        
    }
})

// .env ////////////////////////////////////////////////////////////
VUE_APP_URL=https://api.com

// .env.development /////////////////////////////////////////
VUE_APP_URL=https://dev.api.com
// ONLY START WITH VUE_APP - 

// .env.production //////////////////////////////////////////
VUE_APP_URL=https://prod.api.com

// .env.test ////////////////////////////////////////////////////////
VUE_APP_URL=https://test.api.com

// .env.staging ////////////////////////////////////////////////////////
VUE_APP_PATH=https://staging.api.com


package.json ///////////////////////
"scripts": {
    "serve": "vue-cli-service serve",
    "build:development": "vue-cli-service build --mode development"
    "build:stage": "vue-clie-service build --mode stage"
}
