// npm install -g vue-cli
// vue init webpack-simple vue-cli
// npm install
// npm run dev

module.exports = {
  devServer: {
      open: 'Google Chrome',
      inline: true,
      hot: true
  }  
};

webpack-dev-server --open --inline --hot

npm run dev

npm run build



// main.js  ////////////////////////////////////////
import Vue from 'vue';
import App from './App.vue';

new Vue({
   el: '#app',
   render: h => h(App)
});

// some example //////////////////////
new Vue({
  el: '#app',
  data: {
      status: 'Critical'
  },
  template: '<p>Server status: {{ status }}</p>'
});

Vue.component('my-component', {
    data: function() {
      return { status: 'Critical' }
    },
    template: '<p>Friend</p>'
});


var data = { status: 'critical' };

Vue.component('my-component', {
    data: function() {
        return {
            status: 'critical'
        };
    },
    template: '<p>Tree (<button @click="changeStatus">Change</button>)</p>',
    methods: {
        changeStatus: function() {
          this.status = 'normal'
        }
    }
})

// var data = { status: 'critical' };

var cmp = {
   data: function() {
       return {
           status: 'critical'
       }
   },
   template: '<p>Server status: {{ status }} (<button @click="changeStatus">Change</button>)</p>',
   methods: {
      changeStatus: function() {
          this.status = 'normal';
      }
   }
};

new Vue({
  el: '#app',
    components: {
        'my-cmp': cmp
    }
});

new Vue({
  el: '#app2',
  
});

var cmpConfig = {
   data: function() {
       return { status: 'Critical' }
   },
   template: '<p>Baby</p>',
   methods: {}
};

new Vue({
    el: '#profile',
    components: {
        'my-cmp': cmpConfig
    }
});

new Vue({
   el: '#store',
    components: {
        'store-comp': storeCompConfig
    }
});

// main.js ////////////////////////////
import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';

Vue.component('app-servers', Home);


new Vue({
    el: '#app',
    render: h => h(App)
});


<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>vue-cli</title>
</head>

<body>

<div id="app"></div>
<script src="/dist/build.js"></script>
</body>
</html>



<template>
    <h1>Hello people!</h1>
</template>

<script>
  export default {
   
  }
</script>

<style>
  #app {

  }
</style>

<!-- different divs with the same class-->
<div id="app">
  <my-component></my-component>
  <hr />
  <my-component></my-component>
</div>

<div id="app2">
	<my-component></my-component>
	<hr />
	<my-component></my-component>
</div>

<div id="profile">
  <local-info></local-info>
  <local-info></local-info>
</div>

<template>
 <p>Now we are: {{ status }}</p>
</template>

<script>
  export default {
    data: function() {
      return { status: 'Critical' }
    }
  }
</script>

<style>
</style>




// Home.vue ////////////////////////////////////////////////////////
<template>
  <div>
  <p>Server status {{ status }}</p>
  <hr />
  <button @click="changeStatus">Change Status</button>
  </div>
</template>

<script>
  export default {
    data: function() {
     return {
       status: 'Critical'
     }
    },
    methods: {
      changeStatus() {
        this.status = 'Normal';
      }
    }
  }
</script>

<style>
</style>


// ServerStatus.vue //////////////////////////////////////////////
<template>
  <div>
    <p>Server Status: {{ status }}</p>
    <hr />
    <button @click="changeStatus">Change Status</button>
  </div>
</template>

<script>
  export default {
    data: function() {
      return { status: 'Critical' }
    },
    methods: {
      changeStatus() {
        this.status = 'Normal';
      }
    }
  }
</script>

// App.vue ////////////////////////////////////////
<template>
  <app-servers></app-servers>
</template>

<script>
</script>

<style>
</style>


// Home.vue /////////////////////////////////////////////////
<template>
  <div>
   <app-server-status v-for="server in 5"></app-server-status>
  </div>
</template>

<script>
  import ServerStatus from './ServerStatus.vue';
  export default {
    components: {
      'app-server-status': ServerStatus
    }
  }
</script>
