(function() {

var el = document.getElementById('box');

el.onclick = function() {
  
  this.style.backgroundColor = 'yellow';
};

var buttons = document.getElementsByTagName('button');

for(var i = 0, len = buttons.length; i < len; i++) {
   
   buttons[i].onclick = function() {
     
      if(this.id === 'day') {
         document.body.className = 'day';
      } else if (this.id === 'night'){
        document.body.className = 'night';
      }
   };
   
   
};

})();


.night {
  color: white;
  backgroundd-color: black;
}

.day {
  color: black;
  backgroundd-color: white;
}
