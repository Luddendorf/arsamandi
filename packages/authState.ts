// auth.reducers.ts ////////////////////

import { ActionReducerMap } from '@ngrx/store';

import * as fromShopList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
  shoppingList: fromShopList.shoppingListReducer,
  auth: fromAuth.authReducer
};

// header.component.ts //////////////////////////////////////////////
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromApp from '../../store/app.reducers';
import * as fromAth from '../../auth/store/auth.reducers';

export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) {}
  
  ngOnInit() {
    
    this.authState = this.store.select('auth');
  }
}


// header.components.ts //////////////////////////////////////////////////
<ng-template [ngIf]="!(authState | async).authenticated">

</ng-template>

<li *ngIf="(authState | async).authenticated"
></li>

<li *ngIf="(authState | async).authenticated"
></li>

// auth.service.ts ////////////////////////////////////////////////////////
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

export class AuthService {

 // token: string;
 
 constructor(private store: Store<fromApp.AppState>) {}
 
 signupUser(email: string, password: string) {
   firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        user => {
         
         this.store.dispatch(new AuthActions.Signup());
         firebase.auth().currentUser.getIdToken()
           .then(
             (token:string) => {
                this.store.dispatch(new AuthActions.SetToken(token));
             })
      })
      .catch(
        error => console.log(error)
      )
   }

 signinUser(email: string, password: string) {
   firebase.auth().signInWithEmailAndPassword(email, password) {
     .then(
       response => {
       
         this.store.dispatch(new AuthActions.Signin());
       
         this.router.navigate(['/']);
         firebase.auth().currentUser.getIdToken()
           .then(
             (token: string) => {
               this.store.dispatch(new AuthActions.SetToken(token));
             })
     })
     .catch(
        error => console.log(error)
     );
   }
   
   logout() {
     firebase.auth().signOut();
     
     this.store.dispatch(new AuthActions.Logout());
   }

// auth-guard.service.ts ////////////////////////////////////////////////////
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

export class AuthGuard implements CanActivate {
  
  constructor(private store: Store<fromApp.AppState>) {}
  
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    
    return this.store.select('auth')
      .map(
      (authState: fromAuth.State) => {
        
        return authState.authenticated;
      });
  }
}

// auth.interceptor.ts /////////////////////////////////////////////////
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{
    
    log('Intercepted!', req);
    
    return this.store.select('auth')
      .take(1)
      .switchMap(
        (authState: fromAuth.State) => {
        
        const copiedReq = req.clone({params: req.params
          .set('auth', authState.token)});
        
        return next.handle(copiedReq);
        })
    
    }
}

// auth.reducers.ts ////////////////////////////////////////////////////////

const initState: State = {
   token: null,
   authenticated: false
};

export function authReducer(state = initState,
     action: AuthActionsBundle.AuthActions) {
     
  switch(action.type) {
    case(AuthActions.SIGNUP):
    case(AuthActions.SIGNIN):
      return {
        ...state,
        authenticated: true
      };
    case(AuthActions.LOGOUT):
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case(AuthActions.SET_TOKEN):
      return {
        ...state,
        token: action.payload
      };
    default: 
      return state;
    }
     
     }

obs1.mergeMap(
   event1 => {
     return obs2.map(event2 => event1.target.value + ' ' + event2.target.value)
   ));







