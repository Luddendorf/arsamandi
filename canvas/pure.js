function addScript(src) {
    var newScript = document.createElement('script');
    
    newScript.src = src;
    
    newScript.async = false;
    
    document.head.appendChild(script);
}

function addScript(src) {
    var newPiece = document.createElement('script');
    
    newPiece.src = src;
    
    newPiece.async = false;
    
    document.head.appendChild(newPiece);
}

// NB: ES5-shim


if(document.documentElement.firstElementChild === undefined) {
    
  Object.defineProperty(Element.prototype, 'firstElementChild', {
      get: function() {
          var el = this.firstChild;
          do {
              if(el.nodeType === 1) {
                  return el;
              }
              el = el.nextSibling;
          } while(el);
          
          return null;
      }
  });
}

(function() {
    
   if(!Element.prototype.matches) {
       
     Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector
   }
});

(function() {
  
  if(!Element.prototype.closest) {
      
    Element.prototype.closest = function(css) {
        var node = this;
        
      while(node) {
          if(node.matches(css)) return node;
          else node = node.parentElement;
      }
      return null;
    }
  }
})();

(function() {
    
    if(document.documentElement.textContent === undefinded) {
        
      Object.defineProperty(HTMLElement.prototype, "textContent", {
         get: function() {
             return this.innerText;
         },
         set: function(value) {
             this.innerText = value;
         }
      });
    }
})();


function makeArmy() {
    
  let shooters = [];
    
  for(let i = 0; i < 10; i++) {
      shooters.push(function() {
         alert(i); 
      });
  }
  
  return shooters;
}

var myNewArmy = makeArmy();

myNewArmy[0]();
myNewArmy[5]();


(function() {
  
   function lodash(value) {
    
  var message = 'Hello';
    
  function showMessage() {
      alert(message);
  }
    
  showMessage();
       
   }
    
 window._ = lodash;
}());

function randomItem(array) {
    const randomIndex = randomNumber({
        min: 0,
        max: array.length - 1,
        integer: true
    })
    return array[randomIndex]
}

const dragonArmy = {
    [Symbol.iterator]: () => {
        return {
          next: () => {
              const enoughDragons = Math.random() > 0.75
              
            if(!enoughDragons) return {value: makeDragon(),
                                       done: false}
            return { done: true}
          }
        }
    }
}
