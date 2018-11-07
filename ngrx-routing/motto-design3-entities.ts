// products.component.ts /////////////////////////

export class ProductsComponent implements OnInit {
    
    pizzas$: Observable<Pizza[]>;
    
  constructor(private store: Store<fromStore.ProductsState>) {}
    
  ngOnInit() {
    this.pizzas$ = this.store.select(fromStore.getAllPizzas);
      
    this.store.dispatch(new fromStore.LoadPizzas());
  }
}

// actions/index.ts ////////////////////////////////////////////////
export * from './pizzas.action';

// store/index.ts ////////////////////////////////////////////////
export * from './reducers';
export * from './actions';
export * from './effects';


// store/effects/pizzas.effect.ts ////////////////////////////////
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
   
   
 constructor(private actions$: Actions,
   private pizzaService: fromServices.PizzasService) {}
   
 @Effect() // {dispatch: false}
 loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        
        return this.pizzaService.getPizzas().pipe(
          map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
          catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
        )
      })
    );
}

// effects/index.ts ////////////////////////////////////////////
import { PizzasEffects } from './pizzas.effect';

export const effects: any[] = [PizzasEffects];

export * from './pizzas.effect';

// products.module.ts /////////////////////////////////////////////
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(ROUTES),
        StoreModule.forFeature('products', reducers),
        EffectsModule.forFeature(effects)
    ]
})


// pizzas.reducer.ts ////////////////////////////////////////
export interface PizzaState {
    entities: { [id: number] : Pizza };
    loaded: boolean;
    loading: boolean;
}

export const initialState: PizzaState = {
    entities: {},
    loaded: false,
    loading: false
};

case fromPizzas.LOAD_PIZZAS_SUCCESS: {
   const pizzas = action.payload;
    
    const entities = pizzas.reduce((entities: { [id: number] : Pizza }, pizza: Pizza) => {
        return {
           ...entities,
          [pizza.id]: pizza
        };
    }, {
        ...state.entities
    })

    return {
      ...state,
      loading: false,
      loaded: true,
      entities
    };
}


export const getPizzasEntities = (state: PizzaState) => state.entities;

// reducers/index.ts /////////////////////////////////////////////
export const getPizzaState = creataSelector(
   getProductsState,
   (state: ProductsState) => state.pizzas
);


export const getPizzasEntities = createSelector(getPizzaState,
   fromPizzas.getPizzasEntities);

export const getAllPizzas = createSelector(
   getPizzasEntities,
   (entities) => {
       return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
   }
);

