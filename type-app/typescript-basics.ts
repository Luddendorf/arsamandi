// BUCHHALTER
// Angular ngrx store masterclass - cover Angular 4
function Greeter(greeting: string) {
  this.greeting = greeting;
}

Greeter.prototype.greet = function() {
  return "Hello, " + this.greeting;
}

let myGreeter = new Greeter("man");

let button = document.createElement('button');
button.textContent = 'Say congrats';
button.onClick = function() {
  alert(myGreeter.greet());
};

document.body.appendChild(button);



// npm install -g typescript
// tsc main.ts
// npm init 
// npm install lite-server

// tsc --init 

// package.json
// "devDependencies": {
//   "lite-server": "^2.2.2"
// }
// "scripts": {
//   "test": "echo \"Error: no test specified\" && exit 1",
//   "start": "lite-server"
// }

// tsconfig.json
// {
//   "compilerOptions": {
//     "module": "commonjs",
//     "target": "es5",
//     "noImplicitAny": false,
//     "sourceMap": false
//   },
//   "exclude": [
//     "node_modules"
//   ]
// }
// string
let hero: string = 'Max';

// hero = 28;
let myAge: number = 27.6;
// myAge = 'Max';

// boolean
let hasHobbies: boolean = false;
hasHobbies = 1;

// assign types
let myMagicNumber: number;
myMagicNumber = 27;
myMagicNumber = '27';

// array
let hobbies = ["Cooking", "Sports"];
console.log(hobbies[0]);

console.log(typeof hobbies);

hobbies = [100];


// TUPLES
let address: [string, number] = ["Superstreet", 99];

// ENUM
enum Color {
  Gray,
  Green = 100,
  Blue = 2
}

let currentColor: Color = Color.Green;
console.log(currentColor);

// ANY:
let car: any = "BMW";
console.log(car);

car = { brand: "BMW", series: 3 };
console.log(car);

// FUNCTIONS:
function returnMyName(): string {
  return myName;
}

console.log(returnMyName());

// VOID: // no return statement: 
function sayHello(): void {
  console.log("Good evening");
  return myName;
}

// argument types:
function multiply(val1: number, val2: number): number {
  return  val1 * val2;
}

console.log(multiply(2, 'Max')); // error

console.log(multiply(2, 10));


// FUNCTION TYPES:
let myMultiply;
myMultiply = sayHello;
myMultiply();
myMuliply = multiply;
myMultiply();

console.log(myMultiply(5, 2));

// better do this:
// DEFINE THE TYPE FOR FUNCTION:
let myMultiply: (val1: number, val2: number) => number;


// OBJECTS: 
let userData: { name: string, coins: number } = {
  name: "Bob",
  coins: 54
};

userData = {
  a: "Den",
  b: 34
};

// COMPLEXT OBJECT:
let complex: { data: number[],
              output: (all: boolean) => number[] } = {

  data: [100, 3.55, 10],

  output: function(all: boolean): number[] {
    return this.data;
  }
  };

let complex: { data: number[],
              worker: (all: boolean) => number[] } = {
   data: [1, 2, 3],
   worker: function(all: boolean): number[] {
     return this.data;
   }
};

complex = {};

let complex2: { data: number[],
               worker: (all: boolean) => number[] } = {
  data: [5, 6, 7],
  worker: function(all: boolean): number[] {
    return this.data;
  }
};


// TYPE ALIAS:

type Complex = { data: number[],
                output: (all: boolean) => number[] };


let complex3: Complex = {
  data: [5, 8, 9],
  output: function(all: boolean): number[] {
    return this.data;
  }
}

// STRING LITERAL
type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if(easing === "ease-in") {

    } else if (easing === "ease-out") {

    } else if (easing === "ease-in-out") {

    } else {

    }
  }
}

let button = bew UIElement();

button.animate(0, 0, "ease-in");

button.animate(0, 0, "uneasy");

// UNION TYPES
let duration: number | string = 27;

duration = '27';


// CHECK TYPES:
let finalValue = "Interesting string";

if(typeof finalValue == "string") {
  console.log("Final value is a number");
}

//NEVER
function neverReturns(): never {
  throw new Error('An error');
}
