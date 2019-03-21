<!-- UserStart.vue -->

<ul>
  <router-link tag="li" to="/user/1">User 1</router-link>
  <router-link tag="li" to="/user/2">User 2</router-link>
  <router-link tag="li" to="/user/3">User 3</router-link>
</ul>

<!-- UserDetail.vue -->
<template>
  <div>
   <h3>Some user details</h3>
   <p>User loaded has ID: {{ $route.params.id }}</p>
   <router-link tag="button"
                :to="'/user/' + $route.params.id + '/edit'"
                :to="{ name: 'userEdit', params: { id: $route.params.id } }"
                class="btn btn-primary"
   >Edit User</router-link>
   
   
   <router-link tag="button"
   :to="'/user' + $route.params.id + '/edit'">Edit new user</router-link>
   <router-link tag="button"
       :to="{ name: 'userEdit', params: { id: $route.params.id }, query: { locale: 'en', q: 100 } }"
   ></router-link>
  </div>
</template>





<!-- UserStart.vue -->
<ul>
  <router-link tag="li" to="{ name: 'userDetail', params: { id: $route.params.id } }">User1</router-link>
  <router-link tag="li" to="{ name: 'userDetail', params: { id: $route.params.id } }">User2</router-link>
  <router-link tag="li" to="{ name: 'userDetail', params: { id: $route.params.id } }">User3</router-link>
  
  <router-link to="{ name: 'userDetail', params: { id: $route.params.id }, query: { locale: 'en', q: 100 } }"></router-link>
</ul>


<!-- UserEdit.vue -->
<template>
  <div>
   <h3>Edit the User</h3>
   <p>Locale: {{ $route.query.locale }}</p>
   <p>Analytics: {{ $route.query.q }}</p>
  </div>
</template>


<!-- App.vue -->
<div>
 <router-view name="header-top"></router-view>
 <router-view></router-view>
 <router-view name="header-bottom"></router-view>
</div>

<div>
<router-view name="sidebarLeft"></router-view>

<transition name="slide" mode="out-in">
<router-view ></router-view>
</transition>

<router-view name="sidebarRight"></router-view>
</div>


<style>
  .slide-enter {
   
  }
  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
  }
  .slide-leave {
    opacity: 1;
    transform: translateX(0);
  }
  .slide-leave-active {
    transition: opacity 1s ease;
    opacity: 0;
    animation: slide-out 1s ease-out forwards;
  }
</style>

// main.js
import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
   routes,
   mode: 'history'
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});


// routes.js ///////////////////////////////
import User from './components/user/User.vue';
import UserStart from './components/user/UserStart.vue';
import UserDetail from './components/user/UserDetail.vue';
import UserEdit from './components/user/UserEdit.vue';
import Home from './components/Home.vue';


export const routes = [
   { path: '', name: 'home', components: {
       default: Home,
       'header-top': Header,
       'header-bottom': 
   } },
   { path: '/user', components: {
    default: User,
    'header-bottom': Header
   }, children: [
       { path: '', component: UserStart },
       { path: ':id', component: UserDetail, name: 'userDetail' },
       { path: ':id/edit', component: UserEdit, name: 'userEdit' }
   ] },
   { path: '/redirect-me', redirect: '/user' },
   { path: '*', redirect: '/' }
];


// User.vue /////////////////////////////////////////////////////////
<template>
    <button @click="navigateToHome">Go to home</button>/
    <router-view></router-view>
</template>/

export default {
    methods: {
      navigateToHome() {
         this.$router.push({ name: 'home' });
      }
    }
}



<router-link to="/user/2" tag="li" active-class="active"><a>USer 2</a></router-link>














