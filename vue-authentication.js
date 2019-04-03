// axios-auth.js ////////////////////////
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://vue-update.firebaseio.com/relyingparty'
});

instance.defaults.headers.common['SMTH'] = 'something';

export default instance;

// main.js /////////////////////////
import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

import router form './router';
import store from './store';

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


// store.js //////////////////////////////////////
import Vue from 'vue';
import Vuex from 'vuex';
import axios from './axios-auth';
import globalAxios from 'axios';

import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
       idToken: null,
       userId: null,
       user: null
    },
    mutations: {
      authUser(state, userData) {
        state.idToken = userData.token;
        state.userId = userData.userId;
      },
      saveUser(state, user) {
        state.user = user;
      },
      clearAuthData(state) {
        state.idToken = null;
        state.userId = null;
      }
    },
actions: {
   setLogoutTimer({ commit }, expirationTime) {
     setTimeout(() => {
         commit('clearAuthData')
     }, expirationTime * 1000);
   },
   // SIGNUP ////////////////////////////////////////////////////////
   signup({ commit, dispatch }, authData) {
       axios.post('/signupNewUser?key=dfgeg34reterdfgdfgds', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
                })
    .then(res => {
       console.log(res);
       commit('authUser', {
           token: res.data.idToken,
           userId: res.data.localId
       });
       // STAYING LOGGED IN EVEN AFTER RELOAD: //////////////////////
      const now = new Data();
      const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);
      localStorage.setItem('expirationDate', expirationDate);
         
           
       dispatch('storeUser', authData);
       dispatch('setLogoutTimer', res.data.expiresIn);
       })
    .catch(error => console.log(error));
      },
   // TRY AUTOLOGIN /////////////////////////////////////////////////
    tryAutoLogin({ commit }) {
     const token = localStorage.getItem('token');
       if(!token) {
         return;
       }
      const expirationDate = localStorage.getItem('expirationDate');
      const now = new Date();
      if(now >= expirationDate) {
          return;
      }
      const userId = localStorage.getItem('userId');
      commit('authUser', {
          token: token,
          userId: userId
      });
    },
    // LOGOUT ////////////////////////////////////////////////////
   logout({ commit }) {
      commit('clearAuthData');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      router.replace('/signin');
   },
   // SIGNIN //////////////////////////////////////////////////////
   signin({ commit, dispatch }, authData) {
        axios.post('/verifyPassword?key=dfgeg34reterdfgdfgds', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
               })
          .then(res => {
            console.log(res);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('expirationDate', expirationDate);
            commit('authUser', {
                token: res.data.idToken,
                userId: res.data.localId
            });
            dispatch('setLogoutTimer', res.data.expiresIn);
        })
          .catch(error => console.log(error));
        },
   // STORE USER ////////////////////////////////////////////////////
    storeUser({ commit, state }, userData) {
       
      if(!state.idToken) {
        return;
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
         .then(res => console.log(res))
         .catch(error => console.log(error));
    },
  // FETCH USER /////////////////////////////////////////////////////////////
    fetchUser({ commit, state }) {
        
       if(!state.idToken) {
          return;
       }
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res);
          
        const data = res.data;
        const users = [];
        for(let key in data) {
           const user = data[key];
           user.id = key;
           users.push(user);
        }
          
        commit('saveUser', users[0]);
      })
       .catch(error => console.log(error));
    }
        
    },
    getters: {
       user(state) {
         return state.user;
       },
      isAuthenticated(state) {
          return state.idToken !== null;
      }
    }
});

// router.js ////////////////////////////////////////
import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store';

import WelcomePage from './components/welcome/welcome.vue';
import DashboardPage from './components/dashboard/dashboard.vue';
import Signup from './components/auth/signup.vue';
import Signin from './components/auth/signin.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  { path: '/dashboard', component: DashboardPage, beforeEnter(to, from, next) {
    if(store.state.idToken) {
        next();
    }  else {
        next('/signin');
    }
  } },
];

export default new VueRouter({mode: 'history', routes});

<!-- Signup.vue -->
<script>
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
</script>

<!--{email: formData.email,
     password: formData.password}-->

<!-- Singin.vue -->
<script>
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      };

     this.$store.dispatch('signin', {email: formData.email,
                                     password: formData.password});
    }
  }
</script>


<!-- Dashboard.vue -->
<template>
  <div id="dashboard">
    <p v-if="email">Your email address: {{ email }}</p>
  </div>
</template>

<script>
  export default {
    computed: {
     email() {
       return !this.$store.getters.user ? false : this.$store.getters.user.email;
     } 
    },
    created() {
      this.$store.dispatch('fetchUser');
    }
  }
</script>

<!-- header.vue -->
<template>
<div id="header">
  <div>
    <router-link to="/">Main Page</router-link>
  </div>

  <nav>
    <ul>
      <li v-if="!isAuthed"><router-link to="/signup">Sign up</router-link></li>
      <li v-if="!isAuthed"><router-link to="/signin">Sign in</router-link></li>
      <li v-if="isAuthed"><router-link to="/dashboard">Dashboard</router-link></li>
      <li v-if="isAuthed"><button class="logout"
         @click="onLogout">Logout</button></li>
    </ul>
  </nav>
</div>
</template>

<script>
  export default {
    computed: {
      isAuthed() {
        return this.$store.getters.isAuthenticated;
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout');
      }
    }
  }
</script>

<style scoped>
  .logout {
    backgroud-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
  }
</style>

<!-- App.vue -->
<script>
  import Header from './components/header/header.vue';
  export default {
    name: 'app',
    components: {
      'app-header': Header
    },
    created() {
      this.$store.dispatch('tryAutoLogin');
    }
  }
</script>


