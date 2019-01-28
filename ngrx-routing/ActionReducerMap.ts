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
import * as fromAuth from './auth/auth.reducer';

export interface State {
  ui: fromUI.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
};

// UI state slice:
export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);

// auth state slice:
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

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
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthService {
    
  // authChange = new Subject<boolean>();
  // private isAuthenticated = false;
    
  constructor(private store: Store<fromRoot.State>) {}
    
   initAuthListener() {
     this.afAuth.authState.subscribe(user => {
      if(user) {
        this.store.dispatch(new AuthActions.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new AuthActions.SetUnauthenticated());
        this.router.navigate(['/signin']);
      }
     });
   }
    
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


// auth.reducer.ts /////////////////////////////////
import { Action } from '@ngrx/store';

import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';

export interface State {
   isAuthenticated: boolean; 
}

const initialState: State = {
   isAuthenticatd: false
};

export function authReducer(state = initialState, action: AuthActions) {
   switch(action.type) {
       case SET_AUTHENTICATED:
           return {
               isAuthenticated: true
           };
       case SET_UNAUTHENTICATED:
           return {
               isAuthenticated: false
           };
       default: { return false }
   }
}

export const getIsAuth = (state: State) => state.isAuthenticated;


// auth.actions.ts //////////////////////////////////
import { Action } from '@ngrx/store';
    
export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
    
export class SetAuthenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}
    
export class SetUnauthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}
    
export type AuthActions = SetAuthenticated | SetUnauthenticated;

