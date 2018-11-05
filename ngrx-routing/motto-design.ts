
function reducer(state, action) {
  switch(action.type) {
    case 'ADD_DATA': {
      const mydata = action.payload;
      const mydatas = [...state.mydatas, mydata];
      return {mydatas};
    }
  }

  return state;
}

const state = {
  dishes: [
    {label: 'Eat pizza', complete: false}
  ]
};

// immutability ///////////
const character = {name:'Bob'};

Object.assign({}, character, {role: 'captain'});

const updatedCharacter = {...character, role: 'captain'};

console.log(character); // {name: 'Bob'};

console.log(updatedCharacter); // {name:'Bob', role: 'captain'};

const names = ['Bob', 'Den'];

const newNames = [...names, 'Sam'];

console.log(names); ['Bob', 'Den'];

console.log(newNames); ['Bob', 'Den', 'Sam'];





// app.ts ////////////////////////////////////////////////
import * as fromStore from './store';

import { renderTodos } from './utils';

 const input = document.querySelector('input') as HTMLInputElement;
 const button = document.querySelector('button') as HTMLButtonElement;
 const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
 const todoList = document.querySelector('.todos') as HTMLLIElement;

 const reducers = {
    todos: fromStore.reducer
 };

 const store = new fromStore.Store(reducers);



   button.addEventListener(
     'click',
     () => {
       if(!input.value.trim()) return;

       const payload = {label: input.value, complete: false};

       store.dispatch({
         type: 'ADD_TODO',
        payload
       });

       console.log(store.value);

       input.value = '';
     }, false);

     todoList.addEventListener('click', function(event) {

       const target = event.target as HTMLButtonElement;
       if(target.nodeName.toLowerCase() === 'button') {

         console.log(target);
       }
     });


// utils.js ////////////////////////////////////////
const span = document.querySelector('span') as HTMLSpanElement;

const todoList = document.querySelector('.todos') as HTMLLIElement;

 export function renderTodos(collection) {

   span.innerHTML = collection.length;
   todoList.innerHTML = '';

   for(const item of collection) {
     todoList.innerHTML += `
       <li>
        ${item.label}
          <button type="button" data-todo='${JSON.stringify(item)}'>
           Delete
         </button>
      </li>`;
   }
 }


 // store.ts /////////////////////////////////////

 export class Store {

   private subscribers: Function[];

   private reducers: { [key: string]: Function };
   
   private state: { [key: string]: any };


   constructor(reducer = {}, initialState = {}) {

     this.reducers = reducers;

     this.state = this.reduce(initialState, {});
   }

   get value() {
     return this.state;
   }

   dispatch(action) {
     
     this.state = this.reduce(this.state, action);
   }

   private reduce(state, action) {
     
     const newState = {};

     for(const prop in this.reducers) {
       newState[prop] = this.reducers[prop](state[prop], action);
     }

     return newState;
   }

 }
 /*  this.state = {
       ,,,this.state,
       todos: [...this.state.todos, action.payload]
     };
     console.log(this.state); */

// index.ts /////////////////
export * from './store';
export * from './reducers';



// reducers.ts ///////////////////////////////////////

export const initialState  {
  loaded: false,
  loading: false,
  data: [{ label: 'Eat pizza', complete: false}]
};

export function reducer(state = initialState,
                      action: {type:string; payload: any}) {

   switch(action.type){
     case 'ADD_TODO': {
       const todo = action.payload;
       const data = [...state.data, todo];

       return {
         ...state,
         data: data
       };
     }
   }

  return state;
}
