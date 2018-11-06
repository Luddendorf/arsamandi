// store/actions

// store/reducers

// store/index.ts /////////////////////////////////////////////////////////

// actions/pizzas.action.ts /////////////////////////////////////////////
import { Action } 

// actions/pizzas.action.ts ///////////////////////////////////
import { Action } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

// load pizzas
export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';

export class LoadPizzas implements Action {
    readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail implements Action {
    readonly type = LOAD_PIZZAS_FAIL;
    constructor(public payload: any) {}
}

export class LoadPizzasSuccess implements Action {
    readonly type = LOAD_PIZZAS_SUCCESS;
    constructor(public payload: Pizza[]) {}
}

// action types:
export type PizzasAction = LoadPizzas | LoadPizzasFail | LoadPizzasSuccess;


// pizza.model.ts ////////////////////////////////////
import { Topping } from '../models/topping.model';

export interface Pizza {
    id?: number;
    name?: string;
    toppings?: Topping[];
}

// topping.model.ts ///////////////////////////////////
export interface Topping {
    id?: number;
    name?: string;
    [key: string]: any;
}

// reducers/pizzas.reducer.ts ///////////////////////////////////
import * as fromPizzasActions from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
    data: Pizza[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: PizzaState = {
    data: [],
    loaded: false,
    loading: false
};

export function reducer(state = initialState,
  action: fromPizzasActions.PizzasAction): PizzaState {
    
   switch(action.type) {
       case fromPizzasActions.LOAD_PIZZAS: {
         return {
           ...state,
           loading: true
         };
       }
       
       case fromPizzasActions.LOAD_PIZZAS_SUCCESS: {
         return {
           ...state,
           loading: false,
           loaded: true
         };
       }
     
       case fromPizzasActions.LOAD_PIZZAS_FAIL: {
           return {
              ...state,
              loading: false,
              loaded: false
           };
       }
           
   }
    
   return state;
}


// reducers/ index.ts ////////////////////////////////////////
import { ActionReducerMap } from '@ngrx/store';

import * as fromPizzasReducer from './pizzas.reducer';

exportt interface ProductsState {
    pizzas: fromPizzasReducer.PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
    pizzas: fromPizzasReducer.reducer,
};
