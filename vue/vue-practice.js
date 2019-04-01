<template>
<div>
  <button @click="startEffect">Start Effect</button>
  <div id="effect" v-bind:class="effectClasses"></div>

  <div v-bind:class="[float, 'blue', 'text-color']">I got no class</div>

  <!-- User can attach classes: -->
  <div><input type="text" v-model="userClass">
    <div v-bind:class="[{visible: true}, userClass]"></div>
  </div>

  <!-- User can switch classes: -->
  <div>
    <input type="text" v-model="userClass">
    <input type="text" v-model="isVisible">
    <div v-bind:class="[{visible: isVisible}, userClass]"></div>
  </div>

  <div>
    <input type="text" v-model="myStyle.backgroundColor">
    <div v-bind:style="myStyle"></div>
  </div>
  <!-- PROGRESS BAR -->
  <div>
    <button v-on:click="startProgress">Start Progress</button>
    <div v-bind:class="['progress-bar']"
         v-bind:style="progressBarStyle">
    </div>
  </div>
  <!-- v-if, v-else and v-show -->
  <div>
    <button @click="isShown = !isShown">Toggle</button>
    <p v-if="isShown">Your either see me...</p>
    <p v-else>...or me</p>

    <p v-show="isShown">v-show directive</p>
    <p v-show="!isShown">2nd variant</p>
  </div>
  <!-- v-for -->
  <ul>
    <li v-for="(element, index) in arrayNames">{{ element }} - {{ index }}</li>
  </ul>

  <ul>
    <li v-for="(value, keyName, i) in objectBook">{{ value }} - {{ keyName }} - {{ i }}</li>
  </ul>

  <ul>
    <li v-for="value in complexObject">
      {{ value }}
      <template v-if="Array.isArray(value)">
      <div v-for="element in value">{{ element }}</div>
      </template>
      <template v-else>
        {{ value }}
      </template>
    </li>
  </ul>

</div>
</template>

<script>
  data() {
    return {
      effectClasses: {
        highlight: false,
        shrink: true
      },
      float: 'float',
      userClass: '',
      isVisible: true,
      myStyle: {
        width: '100px',
        height: '150px',
        backgroundColor: 'gray'
      },
      progressBarStyle: {
        width: '0px',
        backgroundColor: 'red'
      },
      isShown: true,
      arrayNames: ['Bob', 'Max', 'Den'],
      objectBook: {
        title: 'Geography of Europe',
        author: 'Jorge Michael',
        books: '3'
      },
      complexObject: {
        name: 'Danial',
        id: 10,
        info: [1.54, 1.34, 0.34, 2.12]
      }
    }
  },
  methods: {
    startEffect: function() {
      var vm = this;
      setInterval(function() {
        vm.effectClasses.hightlight = !vm.effectClasses.hightlight;
        vm.effectClasses.shrink = !vm.effectClasses.shrink;
      }, 1000);
    },
    startProgress: function() {
      var vm = this;
      var currentWidth = 0;
      setInterval(function() {
        currentWidth = currentWidth + 10;
        vm.progressBarStyle.width = currentWidth + 'px';
      }, 1000);
    }
  }
</script>

<style scoped>
  .progress-bar {
    width: 200px;
    height: 20px;
    border: 1px solid black;
  }
</style>

<!-- App.vue -->
<template>
  <div class="container">
    <app-header></app-header>
    <hr />
    <div class="row">
     <app-servers></app-servers>
     <app-server-details></app-server-details>
   </div>
   <hr />
   <app-footer></app-footer>
  </div>
</template>

<script>
   import Header from './Header.vue';
   import Footer from './Footer.vue';
   import Servers from './Servers.vue';
   import ServerDetails from './ServerDetails.vue';

   export default {
     components: {
       'app-header': Header,
       'app-servers': Servers,
       'app-server-details': ServerDetails,
       'app-footer': Footer
     }
   }
</script>

<!-- Header.vue -->
<template>
  <div class="row">
    <div class="col-xs-12">
      <header>
        <h1>Server Status</h1>
      </header>
    </div>
  </div>
</template>

<!-- Footer.vue -->
<template>
  <div class="row">
    <div class="col-xs-12">
      <footer>
        <p>All Servers are managed here</p>
      </footer>
    </div>
  </div>
</template>

<!-- Servers.vue -->
<template>
  <div class="col-xs-12 col-sm-6">
    <ul class="list-group">
      <app-server v-for="server in servers"
                 :server="server"></app-server>
    </ul>
  </div>
</template>

<script>
  import Server from './Server.vue';

  export default {
    data: function() {
      return {
        servers: [
          { id: 1, status: 'Normal' },
          { id: 2, status: 'Critical' },
          { id: 3, status: 'Unknown' },
          { id: 4, status: 'Normal' }
        ]
      };
    },
    components: {
      'app-server': Server
    }
  }
</script>

<!-- Server.vue -->
<template>
    <li class="list-group-item"
        style="cursor: pointer"
         @click="serverSelected">
       Server #{{ server.id }}
    </li>
</template>

<script>
  import { serverBus } from '../../main';

  export default {
    props: ['server'],
    methods: {
     serverSelected() {
       serverBus.$emit('serverSelected', this.server);
     }
    }
  }
</script>

<!-- ServerDetails.vue -->
<template>
  <div class="col-xs-12 col-sm-6">
    <p v-if="!server">Please select some server to see info.</p>
    <p v-else>Server #{{ server.id }} selected, Status: {{ server.status }}</p>
    <hr />
    <button @click="resetStatus">Change to normal</button>
  </div>
</template>

<script>
  import { serverBus } from '../../main';

  export default {
    data: function() {
      return {
        server: null
      }
    },
    methods: {
      resetStatus() {
        this.server.status = 'Normal';
      }
    },
    created() {
      serverBus.$on('serverSelected', (server) => {
        this.server = server;
      });
    }
  }
</script>

<!-- Blue.vue -->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
</script>

<style scoped>
  div {
    border: 1px solid blue;
    background-color: lightblue;
    padding: 30px;
    margin: 20px auto;
    text-align: center;
  }
</style>

<!-- Red.vue -->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<!-- Green.vue -->
<template>
  <div>
   <slot></slot> 
  </div>
</template>

<!-- New App.vue -->
<template>
  <div>
    <button @click="selectedComponent = 'app-blue'">Load Blue</button>
    <button @click="selectedComponent = 'app-green'">Load Green</button>
    <button @click="selectedComponent = 'app-red'">Load Red</button>
    <hr />
    <component :is="selectedComponent">
      <p>The content from parent</p>
    </component>
    <!-- <app-blue>
      <p>This is the content</p>
    </app-blue>
    <app-green>
      <p>This is the content</p>
    </app-green>
    <app-red>
      <p>This is the content</p>
    </app-red> -->
  </div>
</template>

<script>
  import Blue from './components/Blue.vue';
  import Green from './components/Green.vue';
  import Red from './components/Red.vue';

  export default {
    data: function() {
      return {
        selectedComponent: 'app-blue'
      }
    },
    components: {
      'app-blue': Blue,
      'app-green': Green,
      'app-red': Red
    }
  }

</script>

<!-- FORMS EXERCISE -->
<!-- App.vue -->
<template>
  <div class="container">
    <!-- SIGN UP FORM -->
    <form v-if="!isSubmitted">

    <div class="form-group">
        <label>Mail</label>
        <input type="text" class="form-control"
               v-model="email" />
    </div>
    <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control"
               v-model="password" />
    </div>
    <div class="form-group">
      <label>
        <input type="radio" value="Yes"
              v-model="storeData">Yes
      </label>
      <label>
        <input type="radio" value="No"
              v-model="storeData">No
      </label>
    </div>
    <button type="submit"
            @click.prevent="isSubmitted = true">Submit info</button>
    </form>
    
    <div class="row" v-if="isSubmitted">
    <div class="panel panel-default">
      <h4>Your Data</h4>
    </div>
    <div class="panel-body">
      <p>Full Name: {{ firstName }} {{ lastName }}</p>
      <p>Mail: {{ email }}</p>
      <p>Password: {{ password }}</p>
      <p>Store in Database?: {{ storeData }}</p>
    </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
       firstName: '',
       lastName: '',
       email: '',
       password: '',
       storeData: Yes,
       isSubmitted: false
      };
    }
  }
</script>

<!-- FullName.vue-->
<template>
  <div>
      <div class="form-group">
          <label>First Name</label>
          <input type="text" class="form-control"
                 v-model="firstName"/>
        </div>
        <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control"
                   v-model="lastName" />
        </div>
  </div>
</template>

<script>
  export default {
    props: ['value'],
    methods: {

    },
    computed: {
      firstName() {
        return this.value.split(" ")[0];
      },
      lastName() {
        return this.value.split(" ")[1];
      }
    }
  }
</script>

// main.js ///////////////////////////////
import Vue from 'vue';
import App from './App.vue';

export const serverBus = new Vue();

new Vue({
    el: '#app',
    render: h => h(App)
});

// REPEAT  Servers.vue /////////////////////////////////////////
import Server from './Server.vue';

export default {
    data: function() {
        return {
            servers: [{}, {}, {}, {}]
        };
    },
    components: {
        app-server: Server
    }
}

// REPEAT main.js /////////////////////////////////////////
export const serverBus = new Vue();
