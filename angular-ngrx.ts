
<ng-template [ngIf]="!(authState | async).isAuthed">
</ng-template>

<li><a (click)="onLogout()"
       *ngIf="(aithState | async).isAuthed">Logout</a></li>

<li class="dropdown" *ngIf="(authState | async).isAuthed">
</li>

// shopping-list.component.ts ////////////////////////////
// import * as fromShoppingList from './store/shopping-list.reducers';
import * as slActions from './store/shopping-list.acitons';
import * as fromApp from '../store/app.reducers';

constructor(private store: Store<fromApp.AppState>) {}

onEditItem(index: number) {
  this.store.dispatch(new slActions.StartEdit(index));
}


// shopping-list.service.ts ///////////////////////////////////




// shopping-edit.component.ts //////////////////////////////////////
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';

@ViewChild('f') slForm: NgForm;
subscription: Subscription;
editMode = false;
editedItem: Ingredient;

constructor(private slService: ShoppingListService,
  private store: Store<fromApp.AppState>) {}

ngOnInit() {
  this.subscription = this.store.select('shoppingList').subscribe(
    data => {
      if(data.editedIngredIndex > -1) {
        this.editedItem = data.editedIngred;
        this.editMode = true;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }
    }
  );
}

onSubmit(form: NgForm) {
  const value = form.value;
  const newIngredient = new Ingredient(value.name, value.amount);
  if(this.editMode) {
    this.store.dispatch(new ShoppingListActions.UpdateIngredient());
  } else {
    this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
  }
  this.editMode = false;
  form.reset();
}

ngOnDestroy() {
  this.store.dispatch(new ShoppingListActions.StopEdit());
  this.subscription.unsubscribe();
}

// recipe-detail.component.ts //////////////////////////////////////
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';

constructor(private store: Store<fromApp.AppState>) {}



// store/ shopping-list.reducers.ts ///////////////////////////////

export interface AppState {
  shoppingList: State
}

export interface State {
  ingreds: Ingredient[];
  editedIngred: Ingredient;
  editedIngredIndex: number;
}

const initialState: State = {
  ingreds: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngred: null,
  editedIngredIndex: -1
};

  case slActions.UPDATE_INGRED:
    const ingred = state.ingreds[state.editedIngredIndex];
    const updatedIngred = {
      ...ingred,
      ...action.paylod.ingredient
    };
    const ingreds = [...state.ingreds];
    ingreds[state.editedIngredIndex] = updatedIngred;
    return {
      ...state,
      ingreds: ingreds,
      editedIngred: null,
      editedIngredIndex: -1
    };
  case slActions.DELETE_INGRED:
   const oldIngreds = [...state.ingreds];
   oldIngreds.splice(state.editedIngredIndex, 1);
   return {
     ...state,
     ingreds: oldIngreds,
     editedIngred: null,
     editedIngredIndex: -1
   };
  case slActions.START_EDIT:
   const editedIngred = {...state.ingreds[action.payload]};
   return {
     ...state,
     editedIngred: editedIngred,
     editedIngredIndex: action.paylod
   };
  case slActions.STOP_EDIT:
   return {
     ...state,
     editedIngred: null,
     editedIngredIndex: -1
   }

// store/ shopping-list.actions.ts ////////////////////////////////
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class UpdateIngred implements Action {
  readonly type = UPDATE_INGRED;

  constructor(public payload: {ingredient: Ingredient}) {}
}

export class DeleteIngred implements Action {
  readonly type = DELETE_INGRED;
}


export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions = DeleteInged | StartEdit | StopEdit;

/////////////////////////////////////////////////////////////////////
// auth/store/ auth.reducers.ts /////////////////////////////////////
import * as AuthActions from './auth.actions';

export interface State {
   token: string;
   isAuthed: boolean;
}

const initialState: State = {
  token: null,
  isAuthed: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {

  switch(action.type) {
    case (AuthActions.SIGNUP):
    case (AuthActions.SIGNIN):
     return {
       ...state,
       isAuthed: true
     };
    case (AuthActions.LOGOUT):
     return {
      ...state,
      token: null,
      isAuthed: false
     };
     default: 
      return state;
  }
}

// app/store/ app.reducer.ts ///////////////////////////////////////
import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.slReducer,
  auth: fromAuth.authReducer
};

// auth/store/ auth.actions.ts ///////////////////////////////////////
import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

export type AuthActions = Signup | Signin | Logout | SetToken;

// app.module.ts ///////////////////////////////////////////////////
import { reducers } from './store/app.reducers';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers)
  ]
})

// header.component.ts ////////////////////////////////////////
import { OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
   this.authState = this.store.select('auth'); 
  }
}
