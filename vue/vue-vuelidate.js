// main.js /////////////////////////
import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import Vuelidate from 'vuelidate';

import router form './router';
import store from './store';

Vue.use(Vuelidate);

axios.defaults.baseURL = 'https://vue-update.firebaseio.com';
axios.defaults.headers.get['Accepts'] = 'application/json';

const reqInterceptor = axios.interceptors.request.use(config => {
    console.log('Request interceptor', config);
    return config;
});

const resInterceptor = axios.interceptors.response.use(res => {
    console.log('Response interceptor', res);
    return res;
});

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
})

<!-- npm install vuelidate --save -->

<!-- Signup.vue -->
<template>
  <div class="input" :class="{invalid: $v.email.$error}">
    <label for="email">Mail</label>
    <input type="email"
       id="email"
       v-model="email"
       @blur="$v.email.$touch()"/>
    <p v-if="!$v.email.email">Please provide a valid email address</p>
    <p v-if="!$v.email.required">This field must not be empty</p>
  </div>


</template>

<script>
  import { required, email } from 'vuelidate/lib/validators';

  export default {
    data() {
      return {
       email: '',
       age: '',
       password: '',
       confirmPassword: '',
       country: 'usa',
       hobbyInputs: [],
       terms: false
      };
    },
    validations: {
     email: {
       required: required,
       email: email
     }
    },
    methods: {
      onSubmit() {
    const formData = {
      email: this.email,
      age: this.age,
      password: this.password,
      confirmPassword: this.confirmPassword,
      country: this.country,
      hobbies: this.hobbyInputs.map(hobby => hobby.value),
      terms: this.terms
    };

    this.$store.dispatch('signup', formData);
    }
    }
  }
</script>

<style scoped>
  .input.invalid label {
    color: red;
  }
  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }
</style>
