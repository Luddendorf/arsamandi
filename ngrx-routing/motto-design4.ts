// https://www.youtube.com/watch?v=pmhqghh4DnM
// pizzas.action.ts //////////////////

// create pizza:
export const CREATE_PIZZA = '[Products] Create Pizza';
export const CREATE_PIZZA_FAIL = '[Products] Create Pizza Fail';
export const CREATE_PIZZA_SUCCESS = '[Products] Create Pizza Success';

export class CreatePizza implements Action {
  readonly type = CREATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class CreatePizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class CreatePizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

// update pizza:
export const UPDATE_PIZZA = '[Products] Update Pizza';
export const UPDATE_PIZZA_FAIL = '[Products] Update Pizza Fail';
export const UPDATE_PIZZA_SUCCESS = '[Products] Update Pizza Success';

export class UpdatePizza implements Action {
  readonly type = UPDATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class UpdatePizzaFail implements Action {
  readonly type = UPDATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class UpdatePizzaSuccess implements Action {
  readonly type = UPDATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}



// action types:
export type PizzasAction = + CreatePizza | CreatePizzaFail
   | CreatePizzaSuccess | UpdatePizza | UpdatePizzaFail | 
   UpdatePizzaSuccess;


// product-item.component.ts /////////////////////////

onCreate(event: Pizza) {
  this.store.dispatch(new fromStore.CreatePizza(event));
}

onUpdate(event: Pizza) {
  this.store.dispatch(new fromStore.UpdatePizza(event));
}

// effects/pizzas.effect.ts //////////////////

@Effect()
createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA)
.pipe(
  map((action: pizzaActions.CreatePizza) => action.payload),
  switchMap(pizza => {
    
    return this.pizzaService.createPizza(pizza).pipe(
     map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
     catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
    )
  })
);

@Effect()
updatePizza$ = this.actions$.ofType(pizzaActoins.UPDATE_PIZZA)
  .pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap((pizza) => {
      return this.pizzaService.updatePizza(pizza).pipe(
        map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
        catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
      )
    })
  )

// pizzas.reducer.ts //////////////////////////////////
 case fromPizzas.CREATE_PIZZA_SUCCESS: {
   const pizza = action.payload;

   const entities = {
     ...state.entities,
     [pizza.id]: pizza
   };

   return {
     ...state,
     entities,
   };
 }

 ////////////////////////REPEAT//////////////////////////////

// https://www.youtube.com/watch?v=pmhqghh4DnM
// pizzas.action.ts //////////////////

// create pizza:
export const CREATE_PIZZA = '[Products] Create Pizza';
export const CREATE_PIZZA_FAIL = '[Products] Create Pizza Fail';
export const CREATE_PIZZA_SUCCESS = '[Products] Create Pizza Success';

export class CreatePizza implements Action {
  readonly type = CREATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class CreatePizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class CreatePizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

// update pizza:
export const UPDATE_PIZZA = '[Products] Update Pizza';
export const UPDATE_PIZZA_FAIL = '[Products] Update Pizza Fail';
export const UPDATE_PIZZA_SUCCESS = '[Products] Update Pizza Success';

export class UpdatePizza implements Action {
  readonly type = UPDATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class UpdatePizzaFail implements Action {
  readonly type = UPDATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class UpdatePizzaSuccess implements Action {
  readonly type = UPDATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

// delete pizza:
export const DELETE_PIZZA = '[Products] Delete Pizza';
export const DELETE_PIZZA_FAIL = '[Products] Delete Pizza Fail';
export const DELETE_PIZZA_SUCCESS = '[Products] Delete Pizza Success';

export class DeletePizza implements Action {
  readonly type = DELETE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class DeletePizzaFail implements Action {
  readonly type = DELETE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

export class DeletePizzaSuccess implements Action {
  readonly type = DELETE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

// action types:
export type PizzasAction = + CreatePizza | CreatePizzaFail
   | CreatePizzaSuccess | UpdatePizza | UpdatePizzaFail | 
   UpdatePizzaSuccess | DeletePizza | DeletePizzaFail | 
   DeletePizzaSuccess;


// product-item.component.ts /////////////////////////

onCreate(event: Pizza) {
  this.store.dispatch(new fromStore.CreatePizza(event));
}

onUpdate(event: Pizza) {
  this.store.dispatch(new fromStore.UpdatePizza(event));
}

onRemove(event: Pizza) {
  const remove = window.confirm('Are you sure?');
  if(remove) {
    this.store.dispatch(new fromStore.DeletePizza(event));
  }
}

// effects/pizzas.effect.ts //////////////////

@Effect()
createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA)
.pipe(
  map((action: pizzaActions.CreatePizza) => action.payload),
  switchMap(pizza => {
    
    return this.pizzaService.createPizza(pizza).pipe(
     map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
     catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
    )
  })
);

@Effect()
updatePizza$ = this.actions$.ofType(pizzaActoins.UPDATE_PIZZA)
  .pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap((pizza) => {
      return this.pizzaService.updatePizza(pizza).pipe(
        map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
        catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
      )
    })
  );

@Effect()
removePizza$ = this.actions$.ofType(pizzaActions.DELETE_PIZZA).pipe(
  map((action: pizzaActions.DeletePizza) => action.payload),
  switchMap(pizza => {
    return this.pizzaService.removePizza(pizza).pipe(
      map(() => new pizzaActions.DeletePizzaSuccess(pizza)),
      catchError(error => of(new pizzaActions.DeletePizzaFail(error)))
    )
  })
)

// pizzas.reducer.ts //////////////////////////////////

 case fromPizzas.CREATE_PIZZA_SUCCESS: 
 case fromPizzas.UPDATE_PIZZA_SUCCESS: {
   const pizza = action.payload;

   const entities = {
     ...state.entities,
     [pizza.id]: pizza
   };

   return {
     ...state,
     entities,
   };
 }

 case fromPizzas.DELETE_PIZZA_SUCCESS: {
   const pizza = action.payload;

   const { [pizza.id]: removed, ...entities } = state.entities;

   return {
     ...state,
     entities
   };
 }

 // store/actions/index.ts //////////////////////////////////////
 export * from './router.action';

 // store/index.ts ////////////////////////////////////
 export * from './reducers';
 export * from './actions';
 export * from './effects';

 // store/actions/router.action.ts /////////////////////////////
 import { Action } from '@ngrx/store';
 import { NavigationExtras } from '@angular/router';

 export const GO = '[Router] Go';
 export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export class Go implements Action {
  readonly type = GO;
  constructor(public payload: {
    path: any[];
    query?: object;
    extras?: NavigationExtras
  }) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export type Actions = Go | Back | Forward;


// store/effects/index.ts ///////////////////////////////////////
import { RouterEffects } from './router.effect';

export const effects: any[] = [RouterEffects];

export * from './router.effect';

// store/effects/router.effect.ts ///////////////////////////////
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions } from '@ngrx/effects';
import * as RouterActions from '../actions/router.action';

import { tap, map } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  
  constructor(private actions$: Actions,
             private router: Router,
             private location: Location) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(RouterActions.GO).pipe(

    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {

      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.ofType(RouterActions.BACK).pipe(
    
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.opType(RouterActions.FORWARD).pipe(
    
    tap(() => this.location.forward())
  );
}

// app.module.ts ////////////////////////
import { reducers, effects, CustomSerializer } from './store';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
  ]
})

