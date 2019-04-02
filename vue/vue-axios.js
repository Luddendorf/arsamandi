// main.js //////////////////////////
import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

import router from './router';
import store from './store';

axios.defaults.baseURL = 'https://vue.firebase.com';

axios.defaults.headers.common['Authorization'] = 'sdfsdasdasdfsd';
axios.defaults.headers.get['Accepts'] = 'application/json';



const requestInterceptor = axios.interceptors.request.use(config => {
 
 console.log('Request interceptor', config);
 consfig.headers['Something'];
 
 
 return config;
});

const responseInterceptor = axios.interceptors.response.use(response => {
 console.log('Response interceptor', response);
 
 return response;
});

axios.interceptors.request.eject(requestInterceptor);
axios.interceptors.response.eject(responseInterceptor);

new Vue({
   el: '#app',
   router: router,
   store: store,
   render: h => h(App)
});


// axios-auth.js /////////////////////////////////////////////////////////////
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://vue-update.firebase.com'
});

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default instance;


<!-- npm install --save axios -->
 <!-- Signup.vue -->


<script>
  // import axios from 'axios';
  import axios from '../../axios.auth';

  export default {
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

        axios.post('/users.json', formData)
           .then(response => console.log(response))
           .catch(error => console.log(error));
      }
    }
  }
</script>

<!-- Dashboard.vue -->
<template>
  <div>
    <p>Your email address: {{ email }}</p>
  </div>
</template>

<script>
  import axios from 'axios';

   export default {
     data() {
      return {
        email: ''
      }
     },
     created() {
      
      axios.get('/users.json')
        .then(response => {

         const data = response.data;
         const users = [];
         for(let key in data) {
           const user = data[key];
           user.id = key;
           users.push(user);
         }

        this.email = users[0].email;
        })
        .catch(error => console.log(error));
     }
   }
</script>

