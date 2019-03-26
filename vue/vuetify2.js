<template>
  <v-btn class="hidden-md-and-down">Click here</v-btn>
  <v-btn class="hidden-md-and-up"></v-btn>
  <v-btn class="hidden-sm-only"></v-btn>
</template>

<!-- Navbar.vue -->
<template>
 <nav>
   <v-toolbar flat app>

    <v-toolbar-side-icon class="grey--text"
      @click="drawer = !drawer"></v-toolbar-side-icon>

    <v-toolbar-title class="text-uppercase grey--text">
     <span class="font-weight-light">Work</span>
     <span>Sleep</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn flat color="grey">
      <span>Sign Out</span><v-icon>exit_to_app</v-icon>
    </v-btn>
   </v-toolbar>

   <v-navigation-drawer app class="indigo"
     v-model="drawer">
    <v-list>
      <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
        <v-list-tile-action>
         <v-icon class="white--text">{{ link.icon }}</v-icon>
        </v-list-tile-action>
       <v-list-tile-content>
        <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
       </v-list-tile-content>
      </v-list-tile>
    </v-list>
   </v-navigation-drawer>

 </nav>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        links: [
         { icon: 'dashboard', text: 'Dashboard', route: '/' },
         { icon: 'folder', text: 'My Projects', route: '/projects' },
         { icon: 'person', text: 'Team', route: '/team' }
       ]
      }
    }
  }
</script>


<!-- App.vue -->
<template>
  <v-app class="grey lighten-4">

   <Navbar />

   <v-content class="mx-4 mb-4">
     <router-view></router-view>
   </v-content>

  </v-app>
</template>

<script>
 import Navbar from '@/components/Navbar';

 export default {
   name: 'App',
   data() {
     return {

     }
   },
   components: { Navbar }
 }

</script>

<!-- views -->
<!-- Dashboard.vue -->
<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>

    <v-container class="my-5">

     <v-layout row class="mb-3">
       <v-tooltip top>
         <v-btn small flat color="grey"
           @click="sortBy('title')"
            slot="activator">
           <v-icon left small>folder</v-icon>
           <span class="caption text-lowercase">By project name</span>
         </v-btn>
         <span>Sort projects by project name</span>
       </v-tooltip>
       <v-tooltip top>
        <v-btn small flat color="grey"
           @click="sortBy('person')"
            slot="activator">
           <v-icon left small>person</v-icon>
           <span class="caption text-lowercase">By person</span>
        </v-btn>
        <span>Sort projects by person</span>
       </v-tooltip>
     </v-layout>

     <v-card flat v-for="project in projects" :key="project.title">
       <v-layout row wrap :class="`pa-3 project ${project.status}`">
         <v-flex xs12 md6>
           <div class="caption grey--text">Project title</div>
           <div>{{ project.title }}</div>
         </v-flex>

         <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Person</div>
          <div>{{ project.person }}</div>
         </v-flex>

         <v-flex xs6 sm4 md2>
           <div class="caption grey--text">Due by</div>
           <div>{{ project.due }}</div>
         </v-flex>

         <v-flex xs2 sm4 md2>
            <div class="right">
             <v-chip small :class="`${project.status} white--text caption my-2`">{{ project.status }}</v-chip>
            </div>
          </v-flex>

       </v-layout>
       <v-divider></v-divider>
     </v-card>

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
     methods: {
       sortBy(prop) {
        this.projects.sort((a, b) => {
          a[prop] < b[prop] ? -1 : 1;
        })
       }
     }
   }
</script>

<style>
  .project.complete {
    border-left: 4px solid #3cd1c2;
  }
  .project.ongoing {
    border-left: 4px solid orange;
  }
  .project.overdue {
    border-left: 4px solid tomato;
  }
  .v-chip.complete {
    background: #2cd1c2;
  }
  .v-chip.ongoing {
    background: #ffaa2c;
  }
  .v-chip.overdue {
    background: #f83e70;
  }
</style>

<!-- Projects.vue -->
<template>
    <div class="projects">
      <h1 class="subheading grey--text">Projects</h1>

      <v-container class='my-5'>
        Dummy text Projects
      </v-container>
  
    </div>
  </template>
  
  <script>
     export default {
     }
  </script>

  <!-- Team.vue -->
<template>
    <div class="team">
      <h1 class='subheading grey--text'>Team</h1>

      <v-container class="my-5">
        <p>Some long text</p>
        <p>Some long text</p>
      </v-container>
  
    </div>
  </template>
  
  <script>
     export default {
     }
  </script>


<!--      <v-layout row wrap>
       <v-flex xs12 md6>
         <v-btn outline block class="primary">1</v-btn>
       </v-flex>
       <v-flex xs4 md2>
         <v-btn outline block class="primary">2</v-btn>
       </v-flex>

       <v-flex xs4 md2>
         <v-btn outline block class="primary">3</v-btn>
       </v-flex>
       <v-flex xs4 md2>
         <v-btn outline block class="primary">4</v-btn>
       </v-flex>

      </v-layout>

      <v-layout row wrap justify-space-around>
        <v-flex xs4 md3>
          <v-btn outline block class="success">1</v-btn>
        </v-flex>
        <v-flex xs4 md3>
          <v-btn outline block class="success">2</v-btn>
        </v-flex>
      </v-layout>-->
