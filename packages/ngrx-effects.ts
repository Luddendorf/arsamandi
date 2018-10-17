// auth.effects.ts /////////////////
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .pipe(
      map((action: AuthActions.TrySignup) => {
        retirn action.payload;
      }),
      switchMap()
    );
    
  constructor(private actions$: Actions) {}
}








































