
function plus1(value) {
    return value + 1;
}

console.log(plus1(3));

console.log(plus1([3, 4]));


function plus1(value) {
  // Array.isArray:
  if(Array.isArray(value)) {
     var newArray = [];
     for(var i = 0; i < value.length; i++) {
         newArray[i] = value[i] + 1;
     }
      return newArray;
                          }
   // if value is a string: 
   if(typeof value === 'string') {
     var chars = value.split('');
     var newCharArray = [];
     for(var i=0; i < chars.length; i++) {
      newCharArray[i] = String.fromCharCode(
         char[i].charCodeAt(0) + 1);
     }
     return newCharArray.join('');
                                }
     return value + 1;
  }

// using functor:
function plus1(value) {
    return value + 1;
}

[3, 4].map(plus1) // = [4, 5]

// String functor:
function stringFunctor(value, fn) {
    var chars = value.split("");
    return chars.map(function(char) {
        return String.fromCharCode(fn(char.charCodeAt(0)))
    }).join("");
}

function plus1(value) {
    return value + 1;
}

function minus1(value) {
    return value - 1;
}

stringFunctor("ABC", plus1);
stringFunctor("XYZ", minus1);

const barker = (state) => ({
   bark: () => console.log('Woof, I am ' + state.name); 
});

const driver = (state) => ({
   drive: () => state.position = state.position + state.speed; 
});

barker({name: 'Karo'}).bark();

const murderRobotDog = (name) => {
    
  let state = {
      name,
      speed: 100,
      position: 0
  };
  return Object.assign(
   {},
   barker(state),
   driver(state),
   killer(state)
  );
}

murderRobotDog('Sniffles').bark();
