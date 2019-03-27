<!-- Team.vue -->
<template>
  <div class="team">
    <h1 class="subheading grey--text">Team</h1>

    <v-container class="my-5">
     <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="person in team"
        :key="person.name">
       <v-card flat class="text-xs-center ma-3">

        <v-responsive class="pt-4">
         <v-avatar size="100" class="grey lighten-2">
          <img :src="person.avatar">
         </v-avatar>
        </v-responsive>
        <v-card-text>
         <div class="subheading">{{ person.name }}</div>
         <div class="grey--text">{{ person.role }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="grey">
           <v-icon small left>message</v-icon>
           <span>Message</span>
          </v-btn>
        </v-card-actions>

       </v-card>
      </v-flex>
     </v-layout>
    </v-container>

  </div>
</template>

<!-- Navbar.vue -->

<v-snackbar v-model="snackbar" :timeout="4000"
  top
  color="success">
  <span>You added a new project!</span>
  <v-btn flat color="white"
    @click="snackbar = false">Close</v-btn>
</v-snackbar>

<v-toolbar flat app>
  <v-toolbar-side-icon class="grey--text"
    @click="drawer = !drawer"></v-toolbar-side-icon>
  <v-toolbar-title class="text-uppercase grey--text">
    <span class="font-weight-light">Riding</span>
    <span>Cowboy</span>
  </v-toolbar-title>
  <v-spacer></v-spacer>

  <Popup @projectAdded="snackbar = true" />

  <!-- dropdown menu -->
  <v-menu offset-y>
    <v-btn flat slot="activator" color="grey">
      <v-icon left>expand_more</v-icon>
      <span>Menu</span>
    </v-btn>

    <v-list>
      <v-list-tile v-for="link in links"
        :key="link.text"
         router :to="link.route">
       <v-list-tile-title>{{ link.text }}</v-list-tile-title> 
       
      </v-list-tile>
    </v-list>
  </v-menu>

  <v-btn flat color="grey">
    <span>Sign Out</span>
    <v-icon>exit_to_app</v-icon>
  </v-btn>


</v-toolbar>


<v-navigation-drawer app v-model="drawer" class="primary">
  <v-layout column align-center>
   <v-flex class="mt-5">
    <v-avatar size="100">
      <img src="/avatar-1.jpg">
    </v-avatar>
    <p class="white--text subheading mt-1">American Cowboy</p>
   </v-flex>
   <v-flex class="mt-4 mb-3">
    <Popup />
   </v-flex>
  </v-layout>
  <v-list>
   <v-list-tile v-for="link in links"
    :key="link.text" router :to="link.router">
    <v-list-tile-action>
      <v-icon class="white--text">{{ link.icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
     <v-list-tile-tittle class="white--text">{{ link.text }}</v-list-tile-title>
    </v-list-tile-content>
   </v-list-tile>
  </v-list>
</v-navigation-drawer>

<script>
  import Popup from './Popup.vue';

  export default {
    data() {
      return {
        snackbar: false
      }
    },
    components: { Popup }
  }
</script>

<!-- Projects.vue -->
<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>

    <v-container class="my-5">
     <v-expansion-panel>
       <v-expansion-panel-content v-for="project in projects
          :key="project.title"">
        <div slot="header">{{ project.title }}</div>
        <v-card>
          <v-card-text class="px-4 grey--text">
           <div class="font-weight-bold">Due by {{ project.due }}</div>
           <div>{{ project.content }}</div>
          </v-card-text>
        </v-card>
       </v-expansion-panel-content>
     </v-expansion-panel>
    </v-container>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        projects: [
         { title: 'Design a new website', person: 'The Ninja', due: '1st Jan 2019', status: 'ongoing', content: 'Long text' },
         { title: 'Code up the homepage', person: 'Thomas Jefferson', due: '10th Jan 2019', status: 'complete', content: 'Very long text' },
         { title: 'Design video thumbnails', person: 'Samuel Dowson', due: '20th Dec 2018', status: 'complete', content: 'Very, very long road' },
         { title: 'Create a community forum', person: 'Daniel Welsby', due: '21th Oct 2018', status: 'overdue', content: 'Some dummy letters' },
         ]
      }
    },
    computed: {
      myProjects() {
       return this.projects.filter(project => {
         return project.person === 'The Ninja'
       })
      }
    }
  }
</script>

<!-- Popup.vue -->
<template>
  <v-dialog max-width="600px"
    v-model="dialog">
    <v-btn flat
      slot="activator" class="success">Add new project</v-btn>
    <v-card>
     <v-card-title>
      <h2>Add a new project</h2>
     </v-card-title>

     <v-card-text>
      <v-form class="px-3" ref="myForm">
        <v-text-field label="Title"
          v-model="title"
          prepend-icon="folder"
          :rules="inputRules"></v-text-field>
        <v-textarea label="Information"
          v-model="content"
          prepend-icon="edit"
          :rules="inputRules"></v-textarea>

        <v-menu>
         <v-text-field 
            :value="formattedDate" 
            slot="activator"
            label="Due date"
            prepend-icon="date_range"
            :rules="inputRules"
             ></v-text-field>
         <v-date-picker v-model="due"></v-date-picker>
        </v-menu>

        <v-spacer></v-spacer>

        <v-btn flat class="success mx-0 mt-3"
          @click="submit"
          :loading="isLoading">Add project</v-btn>
      </v-form>
     </v-card-text>

    </v-card>
  </v-dialog>
</template>

<!-- npm install date-fns -->
<!-- npm install firebase --save -->

<script>
  import format form 'date-fns/format';
  import db from '@/firebase-main';

  export default {
    data() {
      return {
        title: '',
        content: '',
        due: null,
        inputRules: [
          v => v.length >= 3 || 'Minimum length is 3'
        ],
        isLoading: false,
        dialog: false
      }
    },
    methods: {
      submit() {
        if(this.$refs.myForm.validate()) {

          this.isLoading = true;

          const project = {
            title: this.title,
            content: this.content,
            due: format(this.due, 'Do MMM YYYY'),
            person: 'The American Cowboy',
            status: 'ongoing'
          }

         db.collection('project').add(project).then(() => {
           this.isLoading = false;
           this.dialog = false;
           this.$emit('projectAdded');
         });
        }
      }
    },
    computed: {
      formattedDate() {
        return this.due ? format(this.due, 'Do MMM YYYY') : ''
      }
    }
  }
</script>


computed: {
  formattedDate() {
    return this.due ? format(this.due, 'Do MMM YYYY') : ''
  }
}

// firebase-main.js /////////////////////////////////////////
import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
  apiKey: "afsfsadfas",
  authDomain: "main-cowboy.firebaseapp.com",
  databaseURL: "https://main-cowboy.firebaseio.com",
  projectId: "main-cowboy-c6182",
  storageBucket: "main-cowboy-c6182.appspot.com",
  messagingSenderId: "4353453453453"
};
firebase.initializeApp(config);

const db = firebase.firestore();

db.setting({ timestampsInSnapshots: true });

export default db;
