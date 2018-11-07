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

// app/store/reducers/index.ts ///////////////////////////////////
import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
      >('routerReducer');


// custom serializer ///////////////
export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
   
 serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        
   const { url } = routerState;
     
   const { queryParams } = routerState.root;
     
   let state: ActivatedRouteSnapshot = routerState.root;
   
   while(state.firstChild) {
      state = state.firstChild;
   } 
   
   const {params} = state.params;  
     
   return { url, queryParams, params };
 }
}




// app/store/index.ts //////////////////////////////////////////
export * from './reducers';


// app.module.ts ///////////////////////////////////////////
import { StoreRouterConnectingModule,
  RouterStateSerializer } from '@ngrx/router-store';

import { reducers, CustomSerializer } from './store';


@NgModule({
    imports: [
       StoreModule.forRoot(reducers, { metaReducers }),
       StoreRouterConnectingModule,
       
    ],
    providers: [{provide: RouterStateSerialize,
               useClass: CustomSerializer}],
})
