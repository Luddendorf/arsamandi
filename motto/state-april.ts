// npm install --save @ngrx/store

// shopping-list shopping-list.reducers.ts  //////////////////////
// import { Action } from '@ngrx/store';
import * as slActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';


const initialState = {
  ingreds: [
    new Ingred('Apples', 5),
    new Ingred('Tomato', 10)
  ]
};

export function slReducer(state = initialState, action: slActions.ShoppingListActions) {

  switch(action.type) {
    case ShoppingListActions.ADD_INGRED:
      return {
        ...state,
        ingreds: [...state.ingreds, action.payload]
      };
    case ShoppingListActions.ADD_INGREDS:
      return {
        ...state,
        ingreds: [...state.ingreds, ...action.payload]
      }
    default:
      return state;
  } 

  return state;
}

// shopping-list shopping-list.actions.ts ///////////////////
import { Action } from '@ngrx/store';
import { Ingred } from '../../shared/ingredient.model';

export const ADD_INGRED = 'ADD_INGRED';
export const ADD_INGREDS = 'ADD_INGREDS';

export class AddIngred implements Action {

  readonly type = ADD_INGRED;

  constructor(public payload: Ingred) {}
}

export class AddIngreds implements Action {
  
  readonly type = ADD_INGREDS;

  constructor(public payload: Ingred[]) {}
}

export type ShoppingListActions = AddIngred | AddIngreds;


// app.module.ts 
import { StoreModule } from '@ngrx/store';
import { slReducer } from './shopping-list/store/shopping-list.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoreModule.forRoot({shoppingList: slReducer})
  ]
})


// shopping-list.component.ts ///////////////////////
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

export class ShoppingListComponent implements OnInit /*, OnDestroy */ {

  slState: Observable<{ingreds: Ingred[]}>;
 // private subscription: Subscription;

  constructor(private slService: ShoppingListService,
             private store: Store<{shoppingList: {ingreds: Ingred[]}}>) {}

  ngOnInit() {
    this.slState = this.store.select('shoppingList');
  }
}

// shopping-edit.components.ts ////////////////////
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';

export class ShoppingEditComponent implements OnInit {
@ViewChild('f') slForm: NgForm;

editMode = false;



onSubmit(form: NgForm) {
  const value = form.value;

  const newIngred = new Ingred(value.name, value.amount);

  constructor(private store: Store<{shoppingList: {ingreds: Ingred[]}}>) {}

  if(this.editMode) {

  } else {
    this.store.dispatch(new ShoppingListActions.AddIngred(newIngred));
  }
  this.editMode = false;
  form.reset();
}

}

<a *ngFor="let ingred of (slState | async); let i = index"
   (click)="onEditItem(i)">
 {{ ingred.name }} ({{ ingred.amount }})  
</a>
