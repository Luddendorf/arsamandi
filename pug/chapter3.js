<template>
 <div>
   <app-header></app-header>
   <app-servers></app-servers>
   <app-server-details></app-server-details>
 </div>
</template>

<script>
  import Header from './Header.vue';
  import Servers from './Servers.vue';
  import ServerDetails from './ServerDetails.vue';

  export default {
    components: {
      'app-header': Header,
      'app-servers': Servers,
      'app-server-details': ServerDetails
    }
  }
</script>


// Servers.vue         //////////////////////////////////////
<template>
 <div>
   <ul>
     <app-server v-for="server in servers"
          :server="server.id"></app-server>
   </ul>
 </div>
</template>

<script>
  import Server from './Server.vue';

  export default {
    data() {
      return {
        servers: [
          { id: 1, status: 'Normal' },
          { id: 2, status: 'Critical' },
          { id: 3, status: 'Normal' }
        ]
      };
    },
    components: {
      'app-server': Server
    }
  }
</script>



// Server.vue ////////////////////////////////////////////////////
<template>
  <li @click="serverSelected"
   >Server {{ server.id }}</li>
</template>

<script>
   import { serverBus } from '../../main.js';

   export default {
     props: ['server'],
     methods: {
       serverSelected() {
         serverBus.$emit('serverSelected', this.server);
       }
     }
   }
</script>


// ServerDetails.vue ///////////////////////////
<template>
<div>
  <p v-if="!server">Please select a server</p>
  <p v-else>Server {{ server.id }}, Status: {{ server.status }} </p>

  <button @click="resetStatus">Change to Normal</button>
</div>
</template>

<script>
  import { serverBus } from '../../main';

  export default {
    data: function() {
      return {
        server: null
      };
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



// main.js ///////////////////

export const serverBus = new Vue();


// App.vue /////////////////////////////////////////////////////
<template>
<div>
  <button @click="selectedComponent = 'appBlue'">Load Blue</button>
  <button @click="selectedComponent = 'appGreen'">Load Green</button>
  <button @click="selectedComponent = 'appRed'">Load Red</button>
  <component :is="selectedComponent">
    <p>Interesting story from App.vue</p>
  </component>
  <!-- <app-blue>
    <p>Story from App.vue</p>
  </app-blue>
  <app-green>
    <p>Story from App.vue</p>
  </app-green>
  <app-red>
    <p>Interesting story from App.vue</p>
  </app-red> -->
</div>
</template>

<script>
  import Blue from './components/Blue.vue';
  import Green from './components/Green.vue';
  import Red from './components/Red.vue';

  export default {
    data() {
      return {
        selectedComponent: 'appBlue'
      };
    },
    components: {
      appBlue: Blue,
      appGreen: Green,
      appRed: Red
    }
  }
</script>



// FORMS.vue /////////////////
<script>
  import FullName from './FullName.vue';

 export default {
   data() {
     return {
       fullName: 'Max Jackson',
       email: '',
       password: '',
       storeData: 'Yes',
       isSubmitted: false
     };
   },
   components: {
     appFullName: FullName
   }
 }
</script>



// Full Name.vue /////////////////////////////
<template>
<div>
  <div>
    <label for="">First Name</label>
    <input type="text" :value="firstName"
          @input="nameChanged(first, $event)">
  </div>
  <div>
    <label for="">Last Name</label>
    <input type="text" :value="lastName"
           @input="nameChanged(last, $event)">
  </div>
  <button v-mycustom:click="clicked">Click me</button>
  <div v-mycustom:mouseenter="mouseEnterer"
       v-mycustom:mouseleave="leaver"></div>
</div>
</template>

<script>
  export default {
    props: ['value'],
    methods: {
      nameChanged(isFirst, event) {
        let name = '';
        if(isFirst == 'fist') {
          name = event.target.value + ' ' + this.lastName;
        } else {
          name = this.firstName + ' ' + event.target.value;
        }
        this.value = name;
        this.$emit('input', this.value);
      },
      clicked() {
        alert('I was clicked')
      },
      mouseenter() {
        console.log('Mouse entered!');
      },
      leaver() {
         console.log( 'Mouse left.');
      }
    },
    computed: {
      firstName() {
        return this.value.split(" ")[0];
      },
      lastName() {
        return this.value.split(" ")[1];
      }
    },
    directives: {
      mycustom: {
        bind(el, binding) {
          const type = binding.arg;
          const fn = binding.value;
          el.addEventListener(type, fn);
        }
      }
    }
  }
</script>


<form [formGroup]="myForm" novalidate (ngSubmit)="submit()">
  <div>
    <input class="form-control" name="name" formControlName="userName">
  </div>
</form>

<div>
  <button>Load Blue</button>
  <button>Load Green</button>
  <button>Load Red</button>

  <app-blue></app-blue>
  <app-green></app-green>
  <app-red></app-red>
</div>

// Red.vue //////////////////////////////////////
<template>
  <div>
    <slot></slot>
  </div>
</template>

// Blue.vue //////////////////////////////////////
<template>
  <div>
    <slot></slot>
  </div>
</template>

<div v-if="!isSubmitted">
<!-- <div>
  <label for="">First Name</label>
  <input type="text" v-model="firstName">
</div>
<div>
    <label for="">Last Name</label>
    <input type="text" v-model="secondName">
</div> -->
<app-full-name v-model="fullName"></app-full-name>
<div>
    <label for="">Mail</label>
    <input type="text" v-model="email">
</div>
<div>
    <label for="">Password</label>
    <input type="password" v-model="password">
</div>
<div>
  <label>
    <input type="radio" value="Yes" v-model="storeData"> Yes
  </label>
  <label>
    <input type="radio" value="No" v-model="storeData"> No
  </label>
</div>
<button type="submit"
        @click.prevent="isSubmitted = true">Submit the form</button>
</div>

<div class="output" v-if="isSubmitted">
  <p>Full Name: {{ fullName }}</p>
  <p>Mail: {{ email }}</p>
  <p>Password: {{ password }}</p>
  <p>Store in Database?: {{ storeData }}</p>
</div>

<!-- CUSTOM DIRECTIVES::: -->
<div>
  <h1 v-mycustom:click="">Custom directive</h1>
</div>


myForm: FormGroup = new FormGroup({
  "userName": new FormControl("Tom", Validators.required),
  "userEmail": new FormControl("", [
    Validators.required,
    Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")
  ])
})
