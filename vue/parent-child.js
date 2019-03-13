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

// App.vue ///////////////////////////////////////////
<template>
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <app-servers></app-servers>
      <app-server-details></app-server-details>
    </div>
    <hr />
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from './components/Shared/Header.vue';
  import Footer from './components/Shared/Footer.vue';
  import Servers from './components/Server/Servers.vue';
  import ServerDetails from './components/Server/ServerDetails.vue';

   export default {
     components: {
       'app-header': Header,
       'app-servers': Servers,
       'app-server-details': ServerDetails,
       'app-footer': Footer
     }
   }
</script>

// ServerDetails.vue ///////////////////////////

<style scoped>
  div {
    border: 1px solid red;
  }
</style>

// Servers.vue ///////////////////////////////////////
<style scoped>
  div {
    border: 1px solid blue;
  }
</style>




// App.vue /////////////////////////////////
<template>
 <div class="container">
   <div class="row">
    <div class="col-xs-12">
      <app-user></app-user>
    </div>
   </div> 
 </div>
</template>

<script>
  import User from './components/User.vue';
  export default {
    components: {
      appUser: User
    }
  }
</script>

<style>
  div.component {
    border: 1px solid black;
    padding: 30px;
  }
</style>

// User.vue ////////////////////////////////////
<template>
  <div class="component">
    <h1>The User Component</h1>
    <p>I am your user!</p>

    <button @click="changeName">Change my name</button>

    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <app-user-detail :name="name"></app-user-detail>
      </div>
      <div class="col-xs-12 col-sm-6">
        <app-user-edit></app-user-edit>
      </div>
    </div>
  </div>
</template>

<script>
  import UserDetail from './UserDetail.vue';
  import UserEdit from './UserEdit.vue';

  export default {
    data: function() {
      return {
        name: 'Max'
      };
    },
    methods: {
      changeName() {
        this.name = 'Bob';
      }
    }
    components: {
      appUserDetail: UserDetail,
      appUserEdit: UserEdit
    }
  }
</script>

<style scoped>
  div {
    background-color: lightblue;
  }
</style>

// UserDetail.vue //////////////////////////////
<template>
  <div class="component">
    <h3>You may view user details here</h3>
    <p>Many Details</p>
    <p>User name: {{ name }}</p>
  </div>
</template>

<script>
  export default {
    props: ['name']
  }
</script>

<style scoped>
  div {
    background-color: lightcoral;
  }
</style>


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


// components
