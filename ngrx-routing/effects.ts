// auth.reducer.ts ///////////////////////////////////////////
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
    case (AuthActions.SET_TOKEN):
      return {
        ...state,
        token: action.payload
      };
    default:
    return state;
  }
 }

// auth.actions.ts ////////////////////////////////////////////
export const TRY_SIGNUP = 'TRY_SIGNUP';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: {username: string, password: string}) {}
}

export type AuthActions = Signup | Signin | TrySignup;

// app.reducers.ts ////////////////////////
import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};

// app.module.ts //////////////////////////////////////////
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects])
  ],
  bootstrap: [AppComponent]
})


// header.component.ts //////////////////////////////////////////////
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

// auth.service.ts /////////////////////////////////////////////
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

export class AuthService {

  constructor(private store: Store<fromApp.AppState>) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.store.dispatch(new AuthActions.Signup());
          firebase.auth().currentUser.getToken()
          .then(
            (token: string) => {
             this.store.dispatch(new AuthActions.SetToken(token));
            }
          )
        }
      )
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.store.dispatch(new AuthActions.Signin());
          this.router.navigate(['/']);
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => {
               this.store.dispatch(new AuthActions.SetToken(token));
              }
            )
        }
      )
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
  }
}

// auth-guard.service.ts //////////////////////////////
import { CanActivate, ActivatedRouteSnapshot, RouterSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    return this.store.select('auth').map((authState: fromAuth.State) => {
      return authState.isAuthed;
    });
  }
}

// auth.interceptor.ts ////////////////////////////////////////////////
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap } 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injector()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    
    
    )});
    return this.store.select('auth')
    .take(1)
    .switchMap((authState: fromAuth.State) => {
      
      const copiedReq = const copiedReq = req.clone({params: req.params.set('auth',
        authState.token
      );
      return next.handle(copiedReq);
    })
    next.handle(copiedReq);
  }

}

npm install --save @ngrx/effects

// auth.effects.ts //////////////////////////////////////////////////////
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$
     .ofType(AuthActions.TRY_SIGNUP)
     .map((action: AuthActions.TrySignup) => {
       return action.payload;
     })
     .switchMap((authData: {username: string, password: string}) => {
       return from(firebase.auth().createUserWithEmailAndPassword(authData.username,
        authData.password));
     .switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
     })
     .mergeMap((token: string) => {
       return [
         { type: AuthActions.SIGNUP },
         { type: AuthActions.SET_TOKEN,
           payload: token }
       ];
     })
     });

  constructor(private actions$: Actions) {

  }
}

// signup.component.ts ////////////////////////
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

export class SignupComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {

  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new AuthActions.TrySignup({username: email, password: password}));
  }
}

// REPEAT:
// auth.effects.ts //////////////////
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { from } from 'rxjs';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$.ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return from(firebase.auth().createUser(authData.username,
        authData.password))
    .switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken())
    })
    .mergeMap((token: string) => {
      return [
        { type: AuthActions.SIGNUP },
        { type: AuthActions.SET_TOKEN,
          payload: token }
      ];
    })
    });

  constructor(private actions$: Actions) {}
}

// auth.effects.ts ////////////////////////
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Login } from './auth.actions';

@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  login$ = this.actions$.pipe(

    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => localStorage.setItem("user", JSON.stringify(action.user)))
  );

  logout$ = this.action$.pipe(

    ofType<Logout>(AuthAcitonTypes.LogoutAction),
    tap(() => {
      
      localStorage.removeItem("user");
      this.router.navigateByUrl('/login');
    })
  );

  constructor(private actions$: Action,
    private router: Router) {}
}
