<!-- Popup.vue -->
<template>

 <v-dialog max-width="600px" v-model="dialog">
   <v-btn flat slot="activator" class="success">Add new project</v-btn>
 </v-dialog>


 <v-spacer></v-spacer>

 <v-btn flat class="success mx-0 mt-3"
   @click="submit"
   :loading="isLoading">Add project</v-btn>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: false,
        dialog: false
      }
    },
    methods: {
      submit() {
        if(this.$refs.form.validate()) {
          this.loading = true;

          const project = {
            title: this.title,
            content: this.content,
            due: format(this.due, 'Do MMM YYYY'),
            person: 'The Ninja',
            status: 'ongoing'
          }

        db.collection('projects').add(project).then(() => {
          console.log('Added to db');
          this.loading = false;
          this.dialog = false;
          this.$emit('projectAdded')
        })
        }
      }
    }
  }
</script>

<!-- Navbar.vue -->

<nav>

 <v-snackbar v-model="snackbar" :timeout="4000"
   top color="success">
  <span>Good! You added a new project</span>
  <v-btn flat color="white"
    @click="snackbar = false">Close</v-btn>
 </v-snackbar>

  <v-flex class="mt-4 mb-3">
   <Popup @projectAdded="snackbar = true" />
  </v-flex>

</nav>

<script>
  data() {
    return {
      snackbar: false
    }
  }
</script>


<!-- Dashboard.vue -->

<script>
  import db from '@/firebase-main';
  export default {
    data() {
      return {
        projects: []
      }
    }
    created() {
      db.collection('projects').onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if(change.type === 'added') {
           this.projects.push({
             ...change.doc.data(),
             id: change.doc.id
           })
          }
        })
      })
    }
  }
</script>

<!-- Projects.vue-->
<script>
  import db from '@/firebase-main';

  created() {
    db.collection('projects').onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if(change.type === 'added') {
          this.projects.push({
            ...change.doc.data(),
             id: change.doc.id
          })
        }
      })
    })
  }
</script>
