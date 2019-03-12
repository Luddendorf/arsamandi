var vm1 = new Vue({
    el: '#app1',
    data: {
        title: 'The Christmas Story',
        showParagraph: false
    },
    methods: {
        show: function() {
            this.showParagraph = true;
            this.updateTitle('This Christmas Story (Updated)')
        },
        updateTitle: function(title) {
            this.title = title;
        }
    },
    computed: {
        lowercaseTitle: function() {
           return this.title.toLowerCase();
        }
    },
    watch: {
        title: function(value) {
           alert('Title changed, new value ' + value); 
        }
    }
});

vm1.newProp = 'New!';

console.log(vm1);

setTimeout(function() {
    vm1.title = 'Changed by Timer';
}, 3000);

var vm2 = new Vue({
   el: '#app2',
   data: {
       title: 'The second Instance'
   },
   methods: {
       onChange: function() {
         vm1.title = 'Changed!';
       }
   }
});

// repeat ///////////////////////////////////////////////////////////////////
var vm2 = new Vue({
    el: '#app2',
    data: {
       title: 'Autumn story' 
    },
    methods: {
        onChange: function() {
          vm1.title = 'Changed!';
        }
    }
});

setTimeout(function() {
    vm1.title = 'Changed by timer';
    vm1.show();
}, 3000);

var data = {
    title: 'Spring story',
    showParagraph: false
};

console.log(vm1.$data === data);


$el: div#app1
$data: Object - 
$refs: Object

var vm1 = new Vue({
   el: '#app1',
   methods: {
       show: function() {
         console.log(this.$refs.myButton);
         this.$refs.myButton.innerText = 'Test';
       }
   }
    
    
});

vm1.$refs.heading.innerText = 'Something else';
