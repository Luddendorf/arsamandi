// auth.service.ts ///////////////////////////////////////////////////////

export class AuthService {

 
}

auth.effect.ts //////////////////////////////////////////////////////////
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP);
  
  constructor(private actions$: Actions) {}
}


// app.module.ts //////////////////////////////////////////////////////////
import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from './auth/store/auth.effects';

imports: [
  StoreModule.forRoot(reducers),
  EffectsModule.forRoot()
]


// auth.actions.ts /////////////////////////////
import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';

export class TrySignup implements Action {
  
  readonly type = TRY_SIGNUP;
  
  constructor(public payload: {username: string, password: string}) {}
}

export type AuthActions = Signup | Signin | Logout
    | SetToken | TrySignup;



// signup.component.ts /////////////////////////////////////////////////////
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
    this.store.dispatch(new AuthActions
        .TrySignup({username: email, password: password}));
  }
  
  
}







npm install --save @ngrx/effects -----------------------
