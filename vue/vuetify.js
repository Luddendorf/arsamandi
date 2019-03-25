<!-- App.vue ////////////////////////////////////////////////  -->
<template>
 <div class="container">
   <router-view></router-view>
 </div>
   <!-- <v-toolbar app height="150" class="indigo" dark>
     <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">MY DESIGN</span>
     </v-toolbar-title>
      <v-spacer></v-spacer>
    <v-btn flat href="htttp://com/latest" target="_blank">
         <span class="mr-2">Latest Release</span>
    </v-btn>
  </v-toolbar>  
    <p class="red white--text">Long text long long long.</p>
  <p class="pink white--text lighten-4 text--darken-4">Sometimes in life you feel like you lose control</p>
  <h1 class="display-4">Massive Letters</h1>
  <h4 class="display-1">Small letters</h4>
  <p class="headline">This is a headline</p>
  <p class="subheading font-weight-bold">This is a subheading</p>
  <p class="caption">This is a caption</p>
  
   <v-btn class="pink white--text">click me</v-btn>
   <v-btn color="pink" depressed>second way</v-btn>
   <v-btn color="pink" flat>third way</v-btn>
   
   <v-btn depressed class="pink white--text">
     <v-icon left>email</v-icon>
     <span>email me</span>
   </v-btn>
   
   <v-btn depressed small class="pink white--text">
     <v-icon left small>email</v-icon>
     <span>email me</span>
   </v-btn>
   
   <v-btn depressed large class="pink white--text">
    <span>Send me a letter</span>
    <v-icon right large>email</v-icon>
   </v-btn>
   
   <v-btn fab depressed small dark color="purple">
     <v-icon>favorite</v-icon>
   </v-btn>
   
   <v-btn class="hidden-md-and-down">Click it</v-btn>
   
   <v-btn class="hidden-md-and-up">For small devices</v-btn>
   
   <v-btn class="hidden-sm-only">For tablets - hidden</v-btn>
   
  -->
  <v-app class="grey lighten-4">
  <Navbar />
  
  
  <v-content>
   <router-view></router-view>
  </v-content>
  
 </v-app>
</template>



<!-- Home.vue //////////////////////////////// -->
<template>
 <div class="home">
  <h1>Home Component</h1>
   
  
   
 </div>
</template>

<!--  Navbar.vue //////////////////////////////////-->
<template>
  <nav>
   <v-toolbar flat app>
    <v-toolbar-side-icon class="grey--text" 
        @click="draw = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="text--uppercase grey--text">
      <span class="font-weight-light">Do smth</span>
      <span>My friend</span>
    </v-toolbar-title>
    
    <v-spacer></v-spacer>
    
    <v-btn flat color="grey">
      <span>Sign Out</span>
      <v-icon right>exit_to_app</v-icon>
    </v-btn>
    
   </v-toolbar>
   
   <v-navigation-drawer app class="primary"
     v-model="drawer">
     <v-list>
       <v-list-tile v-for="link in links" :key="link.text"
          router :to="link.route">
       
         <v-list-tile-action>
           <v-icon class="white--text">{{ link.icon }}</v-icon>
         </v-list-tile-action>
       
         <v-list-tile-content>
          <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>
     </v-list>
   </v-navigation-drawer>
   
  </nav>
</template>

<script>
  export default {
     data() {
       return {
         drawer: false,
         links: [
          { icon: 'dashboard', text: 'Dashboard', route: '/' },
          { icon: 'folder', text: 'My Projects', route: '/projects' },
          { icon: 'person', text: 'Team', route: '/team' }
         ]
       }
     }
  }
</script>

<!-- About.vue //////////////////////////////// -->
<template>
 <div class="about">
  <h1>About Component</h1>
 </div>
</template>

<!-- Header.vue //////////////////////////////// -->
<template>
 <div class="container">
  <h1>Header Component</h1>
 </div>
</template>


<!-- Stocks.vue //////////////////////////////// -->
<template>
 <div class="container">
  <h1>Stocks Component</h1>
 </div>
</template>


<!--/stocks/ Stock.vue //////////////////////////////// -->
<template>
 <div class="container">
  <h1>Stocks - Stock Component</h1>
 </div>
</template>

<!-- Portfolio.vue //////////////////////////////// -->
<template>
 <div class="container">
  <h1>Portfolio Component</h1>
 </div>
</template>


<!--/portfolio/ Stock.vue //////////////////////////////// -->
<template>
 <div class="container">
  <h1>Portfolio - Stock Component</h1>
 </div>
</template>


// npm install --save-dev babel-preset-stage-2
// npm install --save vue-router

vue add vuetify

// .babelrc
{
    "presets": {
        ["es2015", { "modules": false }],
        ["stage-2"]
    }
}

// App.vue ///////////////////////////
import Navbar from '@/components/Navbar';

export default {
   name: 'App',
   components: {
      Navbar
   },
   data() {
      return {
          
      }
   }
  
}


// main.js //////////////////////
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';

import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(VueRouter);

Vue.use(Vuetify, {
    iconfont: 'md',
    theme: {
        primary: "#9652ff",
        success: "#3cd1c2",
        info: "ffaa2c",
        error: "#f83e70"
    }
});

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})

// routes.js /////////////////////////////////////////////////////////////
import Home from './components/Home.vue';
import Portfolio from './components/portfolio/Portfolio.vue';
import Stocks from './components/stocks/Stocks.vue';

export const routes = {
  { path: '/', name: 'home', component: Home },
  { path: '/portfolio', component: Portfolio },
  { path: '/stocks', component: Stocks },
  { path: '/about', name: 'about', component: () => import(  './views/About.vue') }
};




// components ////////////////////////////////////////////////////////////
// Home.vue /////////////////////////////////////////////////////////////
export default {
    
}


// Header.vue ///////////////////////////////////////////////



// components/portfolio //////////////////////////////////////////////
// Portfolio.vue ///////////////////////////////////////////////////////



// Stock.vue ///////////////////////////////////////////////////////////


// components/stocks ///////////////////////////////////////////////////////////
// Stock.vue //////////////////////////////////////////////////////////////////


// Stocks.vue ////////////////////////////////////////////////////////////////
