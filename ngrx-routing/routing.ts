npm install --save @ngrx/router-store

npm install --save @ngrx/store-devtools

// app.module.ts //////////////////////////////////////////////
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

imports: [
  StoreRouterConnectingModule,
  !environment.production ? StoreDetoolsModule.instrument() : []
]

// environments/environment.ts ///////////////////////////////////
 
 export const environment = {
   production: false
 };


// app-routing.module.ts /////////////////////////////////////////////////
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// app.reducers.ts //////////////////////////////
import { ActionReducerMap } from '@ngrx/store';

import * as fromShopList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
   shopList: fromShopList.State,
   auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
  shopList: fromShopList.shopListReducer,
  auth: fromAuth.authReducer
};

// recipes/store/recipe.reducers.ts ///////////////////////////////////////
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';

export interface FeatureState {
   recipes: State
}

export interface State {
  recipes: Recipe[]
}

const initialState: State = {
  recipes: [
    new Recipe('Good hot-dog', 'Hot-dog with a ketchup',
     'http://sfsdfsdfsdf', [new Ingredient('Meat', 2),
                            new Ingredient('Tomato', 3)]),
    new Recipe('Potato', 'Smashed potato with salt',
     'http://fsfsdfasdfs', [new Ingredient('Potato', 6),
                            new Ingredient('Salt', 1)])
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
   
  switch(action.type) {
    case (RecipeActions.SET_RECIPES):
      return {
       ...state,
        recipes: [...action.payload]
      };
    case(RecipeActions.ADD_RECIPE):
      return {
        ..state,
        recipes: [...state.recipes, action.payload]
      };
    case(RecipeActions.UPDATE_RECIPE):
      
      const recipe = state.recipes[action.payload.index];
      
      const updatedRecipe = {
          ...recipe,
          ...action.payload.updatedRecipe
        };
      const recipes = [...state.recipes];
      
      recipes[action.payload.index] = updatedRecipe;
      
      return {
        ...state,
        recipes: recipes
      };
      
      case(RecipeActions.DELETE_RECIPE):
       const oldRecipes = [...state.recipes];
      
       oldRecipes.splice(action.payload, 1);
      
      return {...state, recipes: oldRecipes};
       
  };   
  default:
  return state;
}

// recipes.module.ts ///////////////////////////////////////////////////
import { StoreModule }  from '@ngrx/store';
import { recipeReducer } from './store/recipe.reducers';
 
imports: [
  RecipesRoutingModule,
  SharedModule,
  StoreModule.forFeature('recipes', recipeReducer)
]


// recipe.actions.ts ///////////////////////////////////////////////////////
import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  
  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  
  constructor(public payload: {index: number, updatedRecipe: Recipe}) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  
  constructor(public payload: number) {}
}

export type RecipeActions = SetRecipes | AddRecipe |
  UpdateRecipe | DeleteRecipe;





