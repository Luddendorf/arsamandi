// auth.effects.ts /////////////////
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  
  @Effect() // dispatch: false
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .pipe(
      map((action: AuthActions.TrySignup) => {
        return action.payload;
      }),
      switchMap((authData: {username: string, password: string}) => {
        
        return fromPromise(firebase.auth()
.createUserWithEmailAndPassword(authData.username, authData.password))
      }),
      switchMap(() => {
      
        return fromPromise(firebase.auth()
.currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        return [
          { type: AuthActions.SIGNUP },
          { type: AuthActions.SET_TOKEN,
            paylood: token }
        ]
      })
    );
  
  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .pipe(
      map((action: AuthActions.TrypSignin) => {
        return action.payload;
      }),
      switchMap((authData: {username: string, password: string}) => {
        
        return fromPromise(firebase.auth()
 .signInWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        
        return fromPromise(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        
       this.router.navigate(['/']);
      
       return[{ type: AuthActions.SIGNIN },
              { type: AuthActions.SET_TOKEN,
                payload: token }];
      })
    );
  
  @Effect({dispatch: false})
  authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .tap(() => {
      this.router.navigate(['/']);
    });
  
  
  constructor(private actions$: Actions,
              private router: Router) {}
}

// auth.actions.ts //////////////////////
import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export class TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const SET_TOKEN = 'SET_TOKEN';

export class TrySignup implements Action {
  
  readonly type = TRY_SIGNUP;
  
  constructor(public payload: {username: string,
                               password: string}) {}
}

export class TrySignin implements Action {
  
  readonly type = TRY_SIGNIN;
  
  constructor(public payload: {username: string,
                               password: string}) {}
}

export type AuthActions = Signup | Signin | TrySignup | TrySignin;


// signin.component.ts //////////////////////////////////////////////
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

export class SigninComponent implements OnInit {
  
  constructor(private store: Store<fromApp.AppState>) {}
  
  ngOnInit() {}
  
  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignin({username: email,
                                                password: password}));
  }
}

// header.component.ts ////////////////////////////////////
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from './store/auth.actions';

export class HeaderComponent implements OnInit {
 
   onLogout() {
     this.store.dispatch(new AuthActions.Logout());
   }
}

// auth-guard.service.ts /////////////////////////////////////////////////
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from
   '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>) {}
  
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
  
   return this.store.select('auth')
     .pipe(
       take(1),
       map((authState: fromAuth.State) => {
         return authState.authenticated;
           })
    );
  }
}
































