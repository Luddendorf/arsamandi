
// auth.module.ts ///////////////////////////////

// third-party modules: //////
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// shared modules: //////
import { SharedModule } from './shared/shared.module';

export const firebaseConfig: FirebaseAppConfig = {
    apiKey: "dfsgrgregasgfdgfdsgsdfgdsfgds",
    authDomain: "fitness-app-e676.firebaseapp.com",
    databaseURL: "https://fitness-app-e676.firebaseio.com",
    projectId: "fitness-app-e676",
    storageBucket: "fitness-app-e668a.appspot.com",
    messagingSenderId: "21345623463412"
};

@NgModule({
    imports: [
       AngularFireModule,
       AngularFireAuthModule.initializeApp(firebaseConfig),
       AngularFireDatabaseModule,
       SharedModule.forRoot()
    ]
})
export class AuthModule {}


// shared/services/auth / auth.service.ts ///////////////////////
import { Injectable } from '@angular/core';

import { Store } from 'store';

import { tap } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';

export interface User {
    email: string,
    uid: string,
    authenticated: boolean
}

@Injectable()
export class AuthService {
    
  auth$ = this.af.authState.pipe(
    tap(next => {
      if(!next) {
        this.store.set('user', null);
        return;
      }
        
     const user: User = {
       email: next.email,
       uid: next.uid,
       authenticated: true
     };
        
     this.store.set('user', user);
    })
  );
  
  constructor(private store: Store,
              private af: AngularFireAuth) {}
    
    
  createUser(email: string, password: string) {
    
    return this.af.auth
      .createUserWithEmailAndPassword(email, password);
  }
    
  signinUser(email: string, password: string) {
    
    return this.af.auth
      .signInWithEmailAndPassword(email, password);
  }
}


// shared/ shared.module.ts ///////////////////////////////
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthService } from './services/auth/auth.service';

export class SharedModule {
   
  static forRoot(): ModuleWithProviders {
      
    return {
        ngModule: SharedModule,
        providers: [
          AuthService
        ]
    }
  }
}

// signup.component.ts /////////////////////////////////////////////
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

export class SignupComponent {
    
  error: string;
    
  constructor(private authService: AuthService,
              private router: Router) {}
    
  async signupUser(event: FormGroup) {
      
    const { email, password } = event.value;
    
    try{
     await this.authService.createUser(email, password);
        
     this.router.navigate(['/']);
    } catch (error) {
      this.error = error.message; 
    }
    // done
  }
}

// signin.component.ts /////////////////////////////////////////////
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';

export class SigninComponent {
    
   error: string; 
    
   constructor(private authService: AuthService,
               private router: Router) {}
    
   async singinUser(event: FormGroup) {
       
     const { email, password } = event.value;
       
     try{
       await this.authService.signinUser(email, password);
         
       this.router.navigate(['/']);
     } catch (error) {
         this.error = error.message;
     }
   }
}


// store.ts /////////////////////////////////////////////
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { pluck, distinctUntilChanged } from 'rxjs/operators';

import { User } from './auth/shared/services/auth/auth.service';

export interface State {
    user: User,
    [key: string]: any
}

const state: State = {
    user: undefined
};

export class Store {
    
   private subject = new BehaviorSubject<State>(state);
   private store = this.subject.asObservable().distinctUntilChanged();
    
  get value() {
     return this.subject.value;
  }
    
  select<T>(name: string): Observable<T> {
      return this.store.pluck(name);
  }
   
  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
    
}

// app.component.ts /////////////////////////////////////
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';

import { AuthService, User } from '../../../auth/shared/services/auth/auth.service';

export class AppComponent implements OnInit, OnDestroy {
    
   user$: Observable<User>;
   subscription: Subscription;
    
   constructor(private store: Store,
               private authService: AuthService) {}
    
   ngOnInit() {
     this.subscription = this.authService.auth$.subscribe();
       
     this.user$ = this.store.select<User>('user');
   }
    
   ngOnDestroy() {
     this.subscription.unsubscribe();
   }
}


<!-- app.component.html -->
<div>
  <h1>{{ user$ | async | json }}</h1>
  <div class="wrapper">
    <router-outlet></router-outlet>
  </div>
</div>
