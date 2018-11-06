
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

// reducers.ts ///////////////////////////////////////
export const initialState = {
    loaded: false,
    loading: false,
    data: [{label: 'Eat', complete: false}]
};



export function reducer(state = initialState,
                        action: {type: string; payload: any}) {
    switch(action.type) {
      case 'START_WORK': {
       const newData = action.payload;
       
       const updatedData  = [...state, newData];
       return {
           ...state,
           data: upDatedData
       };
      }
    }
    return state;
}


// app.ts ///////////////////////
const reducers  = {
  todos: fromStore.reducer
};

const store = new fromStore.Store(reducer);

myFunction() {
    
  const payload = {labe: input.value, complete: false};
    
    store.dispatch({
        type: 'START_WORK',
        payload
    });
}

// index.js ////////////////////////////////////////
export * from './store';
export * from './reducers';

// reducers.ts /////////////////////////////////////////
import * as fromActions from './actions';

export const initialState = {
    loaded: false,
    loading: false,
    data: [{label: 'Eat pizza', complete: false}]
};

export function reducer(state = initialState,
                        action: {type: string, payload: any}) {
   switch(action.type) {
       case fromActions.ADD_INGREDIENTS: {
         const todo = action.payload;
         const newData = [...state.data, todo];
         return {
             ...state,
             data: newData
         };
       }
           
       case fromActions.DELETE_INGREDIENTS: {
          const data = state.data.filter(
   todo => todo.label !== action.payload.label);
           
           return {
           ...state,
           data
         };
       }
   }
    
    return state;
}





//  app.ts ////////////////////////////////////////////
import * as fromStore from './store';

import { renderTodos } from './utils';

const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;

const reducers = {
   todos: fromStore.reducer;
 };

const store = new fromStore.Store(reducers);

button.addEventListener( 
  'click',
  () => {
      if(!input.value.trim()) return;

  const myNewData = { label: input.value, complete: false };
    
   store.dispatch(new fromStore.AddIngredients(myNewData));
      
   input.value = '';
}, false
);

 const unsubscribe = store.subscribe(state => {
    
    renderTodos(state.todos.data);
 });

 destroy.addEventListener('click', unsubscribe, false);
 
 todoList.addEventListener('click', function(event) {
   const target = event.target as HTMLButtonElement;
     
   if(target.nodeName.toLowerCase() === 'button') {
       
       const todo = JSON.parse(target.getAttribute('data-todo') as any);
       store.dispatch(new fromStore.DeleteIngredients(todo));
   }
 });

 store.subscribe(state => console.log('STATE:::', state));


// store.ts ///////////////////////////////////////////
export class Store {
    private subscribers: Function[];
    private reducers: { [key: string]: Function };
    private state: { [key: string]: any }
    
  constructor(reducers = {}, initialState = {}) {
     
     this.subscribers = [];
     this.reducers = reducers;
     this.state = this.reduce(initialState, {});
  }
    
  get value() {
      return this.state;
  }
    
  subscribe(fn) {
     this.subscribers = [...this.subscribers, fn];
     
     this.notify();
      
     return () => {
       this.subscribers = this.subscribers.filter(sub => sub !== fn)
     }
  }
    
  dispatch(action) {
      this.state = this.reduce(this.state, action);
      
      this.notify();
  }
    
  private notify() {
      this.subscribers.forEach(fn => fn(this.value));
  }
    
    
  private reduce(state, action) {
    
    const newState = {};
      
    for(const prop in this.reducers) {
       newState[prop] = this.reducers[prop](state[prop], action);
    }
      
    return newState;
  }
}

// utils.ts ///////////////////////////////

const span = document.querySelector('span') as HTMLSpanElement;
const todoList = document.querySelector('.todos') as HTMLElement;

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
          </li>
`
    }
}


// actions.ts //////////////////////////////////////
// action constants
export const ADD_INGREDIENTS = '[General] Add Ingredients';
export const DELETE_INGREDIENTS = '[General] Delete Ingredients';

// action creators
export class AddIngredients {
    readonly type = ADD_INGREDIENTS;
    
    constructor(private payload: any) {}
}

export class DeleteIngredients {
    readonly type = DELETE_INGREDIENTS;
    
    constructor(private payload: any) {}
}



// index.ts //////////////////
export * from './store';
export * from './reducers';
export * from './actions';
