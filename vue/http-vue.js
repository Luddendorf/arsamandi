<div class="row">

  <transition name="flip">
    <component :is="mode"
    @answered="answered($event)"
    @confirmed="mode = 'app-question'">
    </component>
  </transition>

  <slot></slot>
  <div class="title">
    <slot name="title"></slot>
  </div>
  <div class="content">
    <slot name="content"></slot>
  </div>
</div>

<!-- PARENT COMPONENT -->
<div>
  <h2 slot="title">Happy Story</h2>
  <p slot="content">Once upon a time...</p>
</div>

<style>
  .flip-enter {
    
  }
  .flip-enter-active {
    animation: flip-in 0.5s ease-out forwards;
  }
  .flip-leave {
    transform: rotateY(0deg);
  }
  .flip-leave-active {
    animation: flip-out 0.5s ease-out forwards;
  }

  @keyframes flip-out {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(90deg);
    }
  }

  @keyframes flip-in {
    from {
     transform: rotateY(90deg);
    }
    to {
     transform: rotateY(0deg);
    }
  }
</style>

<!-- VUE-RESOURCE -->
<template>

  <div>
    <form @submit.prevent="savePost()">
      <input type="text" v-model="post.title">
      <textarea v-model="post.body"></textarea>
      <button>Publish</button>
    </form>
  </div>

  <div class="container">
  <div class="form-group">
    <label>Username</label>
    <input class="form-control" type="text"
     v-model="user.username" />
  </div>

  <div class="form-group">
    <label>Mail</label>
    <input class="form-control" type="text"
     v-model="user.email" />
  </div>

  <button class="btn btn-primary"
  @click="submit">Submit</button>
  <hr />
  <button class="btn btn-primary"
  @click="fetchData">Get Data</button>
   <ul class="list-group">
     <li class="list-group-item"
         v-for="u in users">{{ u.username }} - {{ u.email }}</li>
   </ul>
  </div>
</template>

<script>
  export default {
     data() {
       return {
         user: {
           username: '',
           email: ''
         },
         users: []
       };
     },
     computed: {
      resource: function() {
        return this.$resource('https//json.com/posts{/id}')
      }
     },
     methods: {
      savePost: function() {
       this.resource.save(this.post)
      },
      submit() {
         this.$http.post('https://vuejs-http.firebaseio.com/data.json',
         this.user).then(response => {
           console.log(response);
         }, error => {
          console.log(response);
         });
       },
       getSinglePost: function() {
         
        var resource = this.$resource('http://jsonplace.com/posts{/id}');

        resource.get({ id: 1 }).then(function(response) {
          this.post = response.data
        })
       },
       fetchData() {

          var options = {
              params: {
                _start: 10,
                _limit: 5
              },
              headers: {
                'Content-Type': 'application/json'
              }
          };

         this.$http.get('https://vuejs-http.firebaseio.com/data.json')
          .then(response => {
             return response.json();
          })
          .then(data => {
            const resultArray = [];
            for(let key in data) {
              resultArray.push(data[key]);
            }
            this.users = resultArray;
          });
       }
     }
  }
</script>


<!-- REPEAT VueResource -->
<div>
  <div class="form-group">
    <label>Username</label>
    <input class="form-control" type="text"
    v-model="user.username" />
  </div>

  <div class="form-group">
    <label>Mail</label>
    <input class="form-control" type="text"
    v-model="user.email" />
  </div>

  <button @click="submit">Submit</button>

</div>

<script>
  export default {
    data() {
      return {
        user: {
          username: '',
          email: ''
        }
      };
    },
    methods: {
      submit() {
       this.$http.post('https://vuejs-http.com/data.json', this.user)
         .then(response => {
           console.log(response);
         }, error => {
           console.log(error);
         })
      }
    }
  }
</script>

npm install vue-resource --save

<template>
  <div>
    <button v-on:click.prevent="post">Add Blog</button>
  </div>
</template>


<script>
  export default {
    data() {
      return {
       
      };
    },
    methods: {
      post: function() {
        this.$http.post('http://jsonplaceholder.com/posts', {
          title: this.blog.title,
          body: this.blog.content,
          userId: 1
        }).then(function(data) {

        });
      },
    submit() {
      this.$http.post('', this.user)
        .then(response => {
          log(response);
        }, error => {
          log(error);
        });
    },
    fetchData() {
      this.$http.get('')
        .then(response => {
          return response.json();
        })
        .then(data => {

        });
    }
    }
  }
</script>

<script>
  export default {
    data() {
      return {
        resource: {}
      };
    },
    methods: {
     submit() {
      this.resource.save({}, this.user);
     },

     fetchData() {
       this.$http.get('data.json')
         .then(response => {
           return response.json();
         })
         .then(data => {
            
         });
     }
    },
    created() {
      this.resource = this.$resource('data.json');
    }
  }
</script>

<script>
  data() {
    resource: {}
  },
  methods: {
   submit() {

  //   this.resource.save({}, this.user);
    this.resource.saveAlt(this.user);
   }
  },
  created() {
    const customActions() {
      saveAlt: {methods: 'POST', url: 'alternative.json'}
    };

    this.resource = this.$resource('https://vue.com/data.json', {}, customActions);
  }
</script>
