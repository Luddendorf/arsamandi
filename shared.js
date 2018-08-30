var backdrop = document.querySelector('.backdrop');

var modal = document.querySelector('.modal');

var modalNoButton = document.querySelector(".modal__action--negative");

var selectPlanButtons = document.querySelectorAll('.plan button');

var toggleButton = document.querySelector('.toggle-button');

var mobileNav = document.querySelector('.mobile-nav');

var ctaButton = document.querySelector('main-nav__item--cta');
//console.dir(backdrop.style.backgroundImage);

//console.dir(backdrop.style['background-image']);

//backdrop.style.display = 'block';
for (var i = 0; i < selectPlanButtons.length; i++) {
  selectPlanButtons[i].addEventListener('click', function() {
    //modal.style.display = 'block';
    //backdrop.style.display = 'block';
    // modal.className = 'open';
    modal.classList.add('open');
    backdrop.style.display = 'block';
    setTimeout(function() {
      backdrop.classList.add('open');
    }, 10);
  });
}

// console.dir(backdrop);

backdrop.addEventListener('click', function() {
	//mobileNav.style.display = 'none';
	mobileNav.classList.remove('open');
	closeModal();
});



if(modalNoButton) {
 modalNoButton.addEventListener('click', closeModal);
} 

function closeModal() {
	//backdrop.style.display = "none";
	//modal.style.display = "none";
if(modal) {
  modal.classList.remove('open');
          }
  backdrop.classList.remove('open');
  setTimeout(function() {
     backdrop.style.display = 'none';
  }, 1000);
}

toggleButton.addEventListener('click', function() {
   //mobileNav.style.display = 'block';
   //backdrop.style.display = 'block';
   mobileNav.classList.add('open');
   backdrop.style.display = 'block';
   setTimeout(function() {
      backdrop.classList.add('open');
   }, 10);
});

/*
ctaButton.addEventListener('animationstart', function(event) {
   console.log('Animations started', event);
}); 
  animationiteration animationend
*/

var d = document.getElementsByTagName('div')[0];

d.classList;

Object.getPrototypeOf(Object.getPrototypeOf(d.classList));

d.classList.contains('red');

d.classList.contains('green');

d.classList.toggle('red');

d.classList.add('roundBorder');

d.classList.toggle('roundBorder');

d.classList.length;  // 3

d.classList.remove('red');

d.classList.add('green');

table.onclick = function(event) {
	
 if(target.tagName != 'TD') return;
	
hightlight(target); // set highlight to TD
	
};

function hightlight(node) {
   if (selectedTd) {
	selectedTd.classList.remove('highlight');
   }
  selectedTd = node;
  selectedTd.classList.add('highlight');
}


table.onclick = function(event) {
  var target = event.target;
 
  while(target != table) {
    if(target.tagName == 'TD') {
      // we found what we were searching for!
      highlight(target);
      return;
    }
   target = target.parentNode;
  }
}

d.classList[0];


const titre = document.querySelector("h1");

const liens = document.querySelectorAll("a");

lien[0].addEventListener("click", function() {
  
   console.log(titre.classList);
});

document.addEventListener('DOMContentLoaded', function() {

   let paras = document.querySelectorAll('p');
	for(let p in paras) {
	 paras[p].addEventListener('click', clicked);
	 paras[p].addEventListener('mouseover', addA);
	 paras[p].addEventListener('mouseout', removeA);
	}
  
});

function clicked(ev) {
  let p = ev.currentTarget; // our p that was clicked
  p.classList.toggle('b');
}

function addA(ev) {
  let p = ev.currentTarget; // p that was mouse over
}

function removeA(ev) {
  let p = ev.currentTarget; // p that was mouse of
}

(function() {
	
  var myDiv = document.getElementsByClassName('test');
  
   style = div[0].style;
	
   style.color = 'red';
   style.backgroundColor = 'black';
   
   style.border = '1px solid black';
   style.padding = '3px';
	
  console.log(myDiv);
	
})();

(function() {
	
 var myDiv = document.getElementById('test');
  
  style = myDiv.style;
 
  myDiv.className = ' css-class css-class-new';
  
  myDiv.className = "";
  
  myDiv.className = myDiv.className.replace(' css-class ', '');
	
  div.classList.add('css-class');
  div.classList.add('css-class-new');
	
  div.classList.remove('css-class');
	
  div.classList.toggle('css-class');
	
})();

(function() {
	
var delay = 10,
    i = 0,
    startTimer = function(pixels) {
    
     var elem = document.getElementById('circle');
	    
       bottom = elem.offsetTop;
       side = elem.offsetLeft;

       console.log(bottom);
	    
	if(( pixels > 0 && bottom > 250) || (pixels < 0 && bottom < 50)) {
	 
	  clearInterval(timer);
		
	timer = setInterval(function() {
	  startTimer(pixels * -1);
	}, delay);
	} 
	  elem.style.top = bottom + pixels + 'px';
	  i++;
  
        if(i < 10) {
	   setTimeout(startTimer, 3000); 
		 
	elem.style.top = bottom + pixels + 'px';
	 } else {
       clearInterval(timer);  
}
	    i++;
   
  console.log('startTimer started to run');
 };

 var timer = setTimeout(startTimer, 3000);
	
 alert('Hello');
	
 clearTimeout(timer);
	
})();

/*
 some css:
   #circle {
     background-color: pink;
     height: 100px;
     left: 50px;
     position: absolute;
     top: 50px;
     width: 100px;
     border-radius: 50%;
   }
*/

var elem = document.getElementById('circle');

 bottom = elem.offsetTop;
 side = elem.offsetLeft;

elem.style.top = bottom + 20 + px;
 

var timer2 = setInterval(function() {
   startTimer(20);
}, delay);

jsfiddle.net/uakj0tv0/




