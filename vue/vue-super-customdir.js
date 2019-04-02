<!-- App.vue -->
<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 v-myon:click="">Directives Exercise</h1>
         <button v-customOn:click="clicked"
                  class="btn btn-primary">Click me</button>
         <hr />
         <div style="width: 100px; height: 100px; background-color: lightgreen;"
           v-customOn:mouseenter="mouseEnter"
           v-customOn:mouseleave="mouseLeave"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    directives: {
      customOn: {
        bind(el, binding) {
         
         const type = binding.arg;

         const fn = binding.value;

         el.addEventListener(type, fn);
        }
      }
    },
    methods: {
      clicked() {
        alert('I was clicked!');
      },
      mouseEnter() {
        console.log('Mouse entered!');
      },
      mouseLeave() {
        console.log('Mouse left!');
      }
    }
  }
</script>


<!-- App.vue -->
<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1 v-myon:click="">Directives Exercise</h1>
         <button v-customOn:click="clicked"
                  class="btn btn-primary">Click me</button>
         <hr />
         <div style="width: 100px; height: 100px; background-color: lightgreen;"
           v-customOn:mouseenter="mouseEnter"
           v-customOn:mouseleave="mouseLeave"></div>
      </div>
    </div>

    <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
           <!-- make a filter -->
          <p>{{ 'Some Text' | reverse }}</p>
          <!-- GLOBAL FILTER: -->
          <p>{{ 'Interesting story' | calculateLength }}</p>

          <!-- MAKE FILTERING WITH COMPUTED PROPERTIES: -->
          <p>{{ reversed }}</p>
          <p>{{ lengthAware }}</p>
        </div>
    </div>

  </div>
</template>

<script>
  import { lengthAwareMixin } from './lengthAwareMixin';

  export default {
    mixins: [lengthAwareMixin],
    data() {
      return {
        firstText = 'for computed property',
        secondText = 'what is the length?'
      };
    },
    directives: {
      customOn: {
        bind(el, binding) {
         
         const type = binding.arg;

         const fn = binding.value;

         el.addEventListener(type, fn);
        }
      }
    },
    methods: {
      clicked() {
        alert('I was clicked!');
      },
      mouseEnter() {
        console.log('Mouse entered!');
      },
      mouseLeave() {
        console.log('Mouse left!');
      }
    },
    filters: { 
      reverse(value) {
        return value.split("").reverse().join("");
      }
    },
    computed: {
      reversed() {
        return this.firstText.split("").reverse().join("");
      },
      // lengthAware() {
      //   return this.secondText + ' (' + this.secondText.length + ')';
      // }
    }
  }
</script>

<!--        bind(el, binding) {
          el.onclick = function() {
            binding.value();
          }
        }-->
        
        
 // main.js ///////////////////////////////////////////////////////
import Vue from 'vue';
import App from './App.vue';

Vue.filter('calculateLength', (value) => {
    return value + ' (' + value.length + ')';
});

new Vue({
 el: '#app',
 render: h => h(App)
});


// lengthAwareMixin.js //////////////////////////////////////////////////
export const lengthAware = {
  computed: {
    lengthAware() {
     return this.secondText + ' (' + this.secondText.length + ')';
   }
  }
};
