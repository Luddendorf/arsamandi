<template>
 <div>
   <p>{{ name }} {{ age }}</p>
   <p>{{ age * 3 }}</p>

   <p>{{ randomNumberGenerator() }}</p>

   <div><img :src="imageLink"></div>

   <input type="text" :value="name">


   <button v-on:click="alertMe">Show alert</button>
   <!-- Listen to event and store data in the data property -->
   <input type="text" v-on:keydown="value = $event.target.value">
   <p>{{ value }}</p>

   <!-- Update the example only if ENTER key is used -->
   <input type="text" v-on:keydown.enter="value = $event.target.value">
   <p>{{ value }}</p>
   
 </div>
</template>

<script>
new Vue({
  el: "#exercise",
  data() {
    return {
      name: 'Bob',
      age: 27,
      imageLink: "http://www.google.com",
      value: ''
    }
  },
  methods: {
    randomNumberGenerator: function() {
      return Math.random();
    },
    alertMe: function() {
      alert('Alert!');
    }
  } 
})
</script>

<style>
</style>


<template>
 <div>
   <div id="effect" v-bind:class="effectClasses"></div>
 </div>

 <div v-bind:class="[float, 'blue', 'text-color']">I got no class</div>

 <div>
    <button v-on:click="startProgress">Start Progress</button>
    <div v-bind:class="['progress-bar']" v-bind:style="progressBarStyle">

    </div>
  </div>

</template>


<script>
 new Vue({
   el: "#exercise",
   data: function() {
     return {
       value: 0,
       effectClasses: {
          highlight: false,
          shrink: true
        },
       float: 'float',
       userClass: '',
       isVisible: true,
       mySuperStyle: {
         width: '100px',
         height: '150px',
         backgroundColor: 'gray'
       },
       progressBarStyle: {
         width: '0px',
         backgroundColor: 'red'
       }
     }
   },
   methods: {
     startEffect: function() {
       var vm = this;
       setInterval(function() {
         vm.effectClasses.highlight = !vm.effectClasses.hightlight;
         vm.effectClasses.shrink = !vm.effectClasses.shrink;
       }, 1000);
     },
     startProgress: function() {
       var vm = this;
       var currentWidth = 0;
       setInterval(function() {
         width = currentWidth + 10;
         vm.progressBarStyle.width = width + 'px';
       },500);
     }
   },
   computed: {
     result: function() {
       return this.value == 37 ? 'done' : 'not there yet';
     }
   },
   watch: {
     result: function() {
       var vm = this;
       setTimeout(function() {
         vm.value = 0;
       },5000);
     }
   }
 })
</script>

<style>
</style>

<template>
<div>

  <div>
    <button @click="isShown = !isShown">Toggler</button>
    <p v-if="isShown">Paragraph 1</p>
    <p v-else>Paragraph 2</p>

    <p v-show="isShown">Story 1</p>
    <p v-show="!isShown">Story 2</p>
  </div>

  <ul>
    <li v-for="(element, index) in array">{{ index }} {{ element }}</li>
  </ul>

  <ul>
    <li v-for="(value, keyName, index) in mySuperObject">{{ index }} - {{ keyName }} - {{ value }}</li>
  </ul>

  <ul>
    <li v-for="value in myNestedObject">
      {{ value }}
      <template v-if="Array.isArray(value)">
       <div v-for="element in value">{{ element }}</div>
      </template>
      <template v-else>
        {{ value }}
      </template>
      </li>
  </ul>

</div>
</template>

<script>
new Vue({
  el: "#exer",
  data() {
    return {
      isShown: true,
      array: ['Bob', 'Den', 'Max'],
      mySuperObject: {
        title: "Lord",
        author: "Jack Daniels",
        books: 3
      },
     myNestedObject: {
       name: 'Den',
       id: 10,
       data: [2, 4, 6, 1.5, 5.3]
     }
     }
    },
    components: {
      'app-header': Header,
      'app-servers': Servers,
      'app-server-details': ServerDetails,
      'app-footer': Footer
    }
  }
})
</script>


<div>
  <p>Current value: {{ value }}</p>
  <button @click="value += 5">Add 5</button>
  <button @click="value += 1">Add 1</button>
  <p>{{ result }}</p>

  <div>
    <input type="text">
    <p>{{ value }}</p>
  </div>

  <button @click="startEffect">Start Effect</button>
  <div id="effectContainer"></div>

  <div>I have no classes!</div>

  <!-- User can attach some classes -->
  <div>
    <input type="text" v-model="userClass">
    <div v-bind:class="[{visible: true}, userClass]"></div>
  </div>

  <div>
    <input type="text" v-model="userClass">
    <input type="text" v-model="isVisible">
    <div v-bind:class="[{visible: isVisible}, userClass]"></div>
  </div>

  <div>
    <input type="text" v-model="mySuperStyle.backgroundColor">
    <div v-bind:style="mySuperStyle"></div>
  </div>

  <div>
    <button>Start Progress</button>
    <div></div>
  </div>


  <div>
    <button>Toggler</button>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </div>

  <ul>
    <li v-for=""></li>
  </ul>

</div>


//- head
//-   title Parcel Sandbox
//-   meta(charset='UTF-8')
//- #app
//- script(src='src/index.js')

//- npm install pug-cli 
//- pug -w ./ -o ./html -P
//- pug -w ./ -o ./html -P
//- 

doctype html
html
  head
  body
    h1 Welcome home!
    p.
      The story has become a legend
      and this is the second part of the story
    ul
      li This is item #1
      li Dog
      li Cat

doctype html
html
  head
  body
    h1#pageTitle The Shop of cosmetics
    p.big-paragraph.
      Here is some text for the paragraph
    p.big-paradigm.
      We go here. Here we go.
    .display-panel
    #header__container

    input(type="password" name="userPassword" data-js=`${ 5 > 2 ? "OK" : "NOT OK" }`)

    - const myClasses = ["u-red", "u-blue", "u-padding-medium"];
    div(class=myClasses)
    div.my-super__class(class=myClasses)

    - const basicStyles = {"color": "red", "background-color": "blue"};
    div(style=basicStyles)
      
    - const myAttrs = {"src": "myPhoto.png", "alt": "My Photo"};
    img&attributes(myAttrs)


    input(type="text" disabled)

doctype html
html
  head
    link(rel="stylesheet" href="style.css")
    style.
      p {
        color: red;
        text-decoration: underline;
      }
  body
    p(style="color: orange;") This is our text
