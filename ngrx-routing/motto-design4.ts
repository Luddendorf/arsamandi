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

 case
