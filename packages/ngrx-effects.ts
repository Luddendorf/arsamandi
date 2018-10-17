// auth.effects.ts /////////////////
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .pipe(
      map(()
    );
    
  constructor(private actions$: Actions) {}
}








































