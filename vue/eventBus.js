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


// DYNAMIC COMPONENTS AND SLOTS //////////////////////////////////////
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


<!-- App.vue -->
<template>
  <div>

    <button @click="selectedComponent = 'appQuote'">Quote</button>
    <button @click="selectedComponent = 'appAuthor'">Author</button>
    <button @click="selectedComponent = 'appNew'">New</button>

    <p>{{ selectedComponent }}</p>
    <keep-alive>
       <component :is="selectedComponent">
        <p>Default content</p>
       </component>
    </keep-alive>
    <!-- <app-quote>
	   <h2 slot="title">{{ quoteTitle }}</h2>
	   <p slot="content">Once upon a time</p>
    </app-quote> -->
    <component :is="selectedComponent">
      <p>Default content</p>
    </component>
    
  </div>
</template>

<script>
  import Quote from './components/Quote.vue';
  import Author from './components/Author.vue';
  import New from './components/New.vue';

  export default {
    data: function() {
      return {
        quoteTitle: 'January',
        selectedComponent: 'appQuote'
      };
    },
    component: {
      appQuote: Quote,
      appAuthor: Author,
      appNew: New
    }
  }
</script>


<style scoped>

</style>

<!-- Quote.vue -->
<template>
	<div>
   <div class="title">
     <slot name="title"></slot>

     <span style="color: #ccc">
       <slot name="subtitle">The subtitle</slot>
     </span>
   </div>
   
   <div>
     <slot name="content"></slot>
   </div>

	</div>
</template>

<script>
	export default {
    // props: ['quote']
  }

</script>


<style scoped>
  div {
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    padding: 30px;
    margin: auto;
    text-align: center;
  }

	h2 { color: red; }

  .title {
    font-style: italic;
  }
</style>


<!-- Author.vue -->
<template>
	<div>
	 <h3>The Author</h3>
	</div>
</template>

<script>
	export default {
  }
</script>

<!-- New.vue -->
<template>
	<div>
    <h3>New Quote</h3>
    <button @click="counter++">Increase</button>
    <p>{{ counter }}</p>
	</div>
</template>

<script>
	export default {
    data: function() {
     return {
       counter: 0
     };
    },
    deactivated() {
      console.log('Deactivated!');
    },
    activated() {
     console.log('Activated!');
    },
    destroyed() {
      console.log('Destroyed!');
    }
  }
</script>


<!-- Dynamic Components -->
<div>
  <form-one></form-one>
  <form-two></form-two>

  <component :is="selectedComponent"></component>
  <button @click="selectedComponent = 'form-one'">Show tab 1</button>
  <button @click="selectedComponent = 'form-two'">Show tab 2</button>
</div>

export default {
  data() {
    return {
      selectedComponent: 'form-one'
    };
  }
}
