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
