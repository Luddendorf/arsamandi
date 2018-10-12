npm install --save @ngrx/store

// store/shopping-list.reducers.ts ////////////////////////////////////////////
import * ShoppingListActions from './shopping-list.actions';
import { Ingred } from '../shared/ingred.model';

const initialState = {
   ingreds: [
     new Ingred('Apples', 5),
     new Ingred('Tomatoes', 10)
   ]
};

export function shoppingListReducer(state = initialState,
    action: ShoppingListActions.ShoppingListActions) {
  
  switch(action.type) {
    case ShoppingListActions.ADD_INGRED:
      return {
       ...state, ingreds: [...state.ingreds, action.payload]
      }
     default:
      return state;
  }
  
  return state;
}

// store/shopping-list.actions.ts /////////////////////////////////////////
import { Action } from '@ngrx/store';

import { Ingred } from '../../shared/ingred.model';

export const ADD_INGRED = 'ADD_INGRED';

export class AddIngred implements Action {
  
  readonly type = ADD_INGRED;
  
  payload: Ingred;
}

export type ShoppingListActions = AddIngred;










// REPEAT shopping-list.reducers.ts //////////////////
import { Action } from '@ngrx/store';

import { Ingred } from '../shared/ingred.model';

export const ADD_INGRED = 'ADD_INGRED';

 const initialState = {
   ingreds: [
     new Ingred('Apple', 5),
     new Ingred('Tomato', 10)
   ]
 };

export function slReducer(state = initialState, action: Action) {
  
  switch(action.type) {
   case ADD_INGRED:
     return {
       ...state, ingreds: [...state.ingreds, action.]
     }
  
  }
  
  return state;
}














