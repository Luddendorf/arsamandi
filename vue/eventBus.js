// https://coub.com/view/1qamxt
// User.vue //////////////////////////////////////////////
export default {
    data: function() {
        return {
          name: 'Ben',
          age: 27
        };
    },
    methods: {
        resetName() {
            this.name = 'Benjamin';
        }
    }
}

// UserDetail.vue ////////////////////////////////////////
export default {
    props: {
        myName: {
            type: String
        },
        resetFn: Function,
        userAge: Number
    }
}

// UserEdit.vue ///////////////////////////////
export default {
    props: ['userAge']
    methods: {
        editAge() {
          this.userAge = 30;
          this.$emit('ageWasEdited', this.userAge);
        }
    }
}


// main.js //////////////////
import Vue from 'vue';
import App from './App.vue';

export const eventBus = new Vue({
    data: {
        
    },
    methods: {
        changeAge(age) {
            this.$emit('ageWasEdited', age);
        }
    }
});

new Vue({
    el: '#app',
    render: h => h(App)
});


<!-- User.vue -->
<template>
  <div>
    <p>Age is {{ age }}</p>
    <app-user-detail @nameWasReset="name = $event"
     :resetFn="resetName"
     :userAge="age"></app-user-detail>

    <app-user-edit :userAge="age"
                    @ageWasEdited="age = $event"></app-user-edit>

  </div>
</template>

export default {
  data: function() {
    return {
      name: 'Max',
      age: 27
    };
  },
  methods: {

  }
}


<!-- UserDetail.vue -->
<template>
  <div>
    <button @click="resetFn()">Reset Name</button>

    <p>User age: {{ userAge }}</p>

  </div>
</template>

import { eventBus } from '../main';

export default {
  props: {
    myName: String,
    resetFn: Function,
    userAge: Number
  },
  created() {
    eventBus.$on('ageWasEdited', (age) => {
      this.userAge = age;
    });
  }
}

<!-- UserEdit.vue -->
<template>
 <div>
   <p>Edit me</p>

   <p>User age in EditComponent {{ userAge }}</p>

   <button  @click="editAge">Edit Age</button>
 </div>
</template>

import { eventBus } from '../main';

export default {
  props: ['userAge'],
  methods: {
    editAge() {
      this.userAge = 30;
     <!-- this.$emit('ageWasEdited', this.userAge); -->
     <!-- eventBus.$emit('ageWasEdited', this.userAge); -->
     eventBus.changeAge(this.userAge);
    }
  }
}
