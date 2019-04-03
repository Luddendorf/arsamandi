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

<!-- npm install --save vuelidate -->

<template>
	<form @submit.prevent="onSubmit">
	<div class="input" :class="{invalid: $v.email.$error}">
		<label for="email">Mail</label>
		<input type="email"
		       id="email"
		       @blur="$v.email.$touch()"
		       v-model="email">
   <p v-if="!$v.email.email">Please provide a valid email address.</p>
   <p v-if="!$v.email.required">This field is required.</p>
	</div>
	<div class="input" :class="{invalid: $v.age.$error}">
		<label for="age">Your Age</label>
		<input type="number"
		       id="age"
		       @blue="$v.age.$touch()"
		       v-model.number="age">
		<p v-if="!$v.age.minVal">You have to be at least {{ $v.age.$params.minVal.min }}</p>
	</div>
	<div class="input" :class="{invalid: $v.password.$error}">
		<label for="password">Password</label>
		<input type="password"
		       id="password"
		       @blur="$v.password.$touch()"
		       v-model="password">
	</div>
	<div class="input" :class="{invalid: $v.password.$error}">
		<label for="confirm-password">Confirm Password</label>
		<input type="password"
		       id="confirm-password"
		       @blur="$v.confirmPassword.$touch()"
		       v-model="confirmPassword">
	</div>
  </form>
</template>

<script>
  import { required, email, numeric, minValue, minLength,
   sameAs } from 'vuelidate/lib/validators';

	export default {
		data() {
			return {
        email: '',
        age: null,
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
     },
     age: {
     	required: required,
      numeric: numeric,
      minVal: minValue(18)
     },
     password: {
     	required: required,
     	minLen: minLength(6)
     },
     confirmPassword: {
      sameAs: sameAs('password')
      sameAs: sameAs(vm => {
      	return vm.password + 'b';
      })
     }
		},
		methods: {

		}
	}
</script>

<style>
	.input.invalid input {
		border: 1px solid red;
		background-color: #ffc9aa;
	}

	.input.invalid label {
		color: red;
	}
</style>
