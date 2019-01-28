<!-- signin.component.html -->

<button *ngIf="!(isLoading$ | async)"></button>
<mat-spinner *ngIf="isLoading | async"></mat-spinner>

// npm install --save @ngrx/store

// app.reducer.ts ///////////////////////////
export interface State {
    isLoading: boolean;
}

const initialState: State = {
  isLoading: false  
};
// APP REDUCER //////////////////////////////////////
export function appReducer(state = initialState, action) {
   
    switch(action.type) {
        case 'START_LOADING':
          return {
              isLoading: true
          };  
        case 'STOP_LOADING':
          return {
              isLoading: false
          };
        
        default: return state;  
    }
}

// 2) refactored:
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';

export interface State {
  ui: fromUI.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer
};

export const getUiState = createFeatureSelector<fromUI.State>('ui');

export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);


// app.module.ts //////////////
import { StoreModule } from '@ngrx/store';
import { reducers } from '.app.reducer';

imports: [
    StoreModule.forRoot(reducers)
]

// auth.service.ts ////////////
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UIactions from '../shared/ui.actions';

@Injectable()
export class AuthService {
    
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
    
  constructor(private store: Store<fromRoot.State>) {}
    
   registerUser(authData: AuthData) {
      this.store.dispatch(new UIactions.StartLoading);
       
     this.afAuth.auth.createUserWithEmailAndPassword(auhtData.email, authData.password)
       .then(result => {
         
       this.store.dispatch(new UIactions.StopLoading);
     })
   }
    
  login(authData: AuthData) {
     
    this.store.dispatch(new UIaction.StartLoading);
    
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
    this.uiService.loadingStateChanged.next(false);
    this.store.dispatch(new UIactions.StopLoading);
    })
      .catch(error => {
    // this.uiService.loadingStateChanged.next(false);
    this.store.dispatch(new UIactions.StopLoading);
    this.uiService.showSnackbar(error.message, null, 3000);
    });
  }
}

// signin.component.ts ////////////////////////////////////
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

export class SigninComponent implements OnInit, OnDestroy {
  
  isLoading: Observable<boolean>;
    
  constructor(private store: Store<fromRoot.State>) {}
    
    
  ngOnInit() {
   
   //this.isLoading$ = this.store.map(state => state.ui.Loading);    
   this.isLoading$ = this.store.select(fromRoot.getIsLoading);
      
   this.store.subscribe(data => console.log(data));
  }
}

// shared / ui.reducer.ts ////////////////////////////
import { Action } from '@ngrx/store';

import { UIActions, START_LOADING, STOP_LOADING } from './ui.actions';

export interface State {
  isLoading: boolean;
};

const initialState: State = {
   isLoading: false
};

export function uiReducer(state = initialState, action: Action) {
  switch(action.type) {
      case START_LOADING:
       return {
        isLoading: true
       };
      case STOP_LOADING:
       return {
        isLoading: false
       };
      default: {
        return state;
      }
  }
}

export const getIsLoading = (state: STate) => state.isLoading;


// ui.actions.ts ///////////////////////////////
import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';


export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
    readonly type = STOP_LOADING;
}

export type UIActions  = StartLoading | StopLoading;


