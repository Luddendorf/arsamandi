
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

// app/components/app-header/ app-header.component.ts //////////////

// app/components/app-nav/ app-nav.component.ts ///////////////////
import { Component } from '@angular/core';

@Component({
    selector: 'app-nav',
    styleUrls: ['app-nav.component.scss'],
    templateUrl: './app-nav.component.html'
    `<div class="app-nav">
      <div class="wrapper">
        <a routerLink="schedule" routerLinkActive="active">Schedule</a>
      </div>
     </div>`
    
})
export class AppNavComponent {
    
  constructor() {}
}



// app/components/app-nav/ app-nav.component.scss   ///////////////
:host {
  margin: -1px 0 0;
  display: block;
}
.app-nav {
  background: #8022b0;
  text-align: center;
  a {
    color: rgba(255,255,255,.6);
    padding: 15px 0;
    display: inline-block;
    min-width: 150px;
    font-weight: 500;
    font-size: 16px;
    text-transform: uppercase;
    border-bottom: 3px solid transparent;
    &:hover,
    &.active {
      color: #fff;
      border-bottom-color: #fff;
    }
  }
}
.wrapper {
  max-width: 800px;
  width: 96%;
  margin: 0 auto;
}

// app/components/app-header/ app-header.component.scss   /////////
.app-header {
  background: #fff;
  border-bottom: 1px solid #c1cedb;
  padding: 15px 0;
  text-align: center;
  img {
    display: inline-block;
  }
  &__user-info {
    position: absolute;
    top: 16px;
    right: 0;
    cursor: pointer;
  }
  span {
    background: url(/img/logout.svg) no-repeat;
    background-size: contain;
    width: 24px;
    height: 24px;
    display: block;
    opacity: 0.4;
    &:hover {
      opacity: 0.9;
    }
  }
}

.wrapper {
  max-width: 800px;
  width: 96%;
  margin: 0 auto;
  position: relative;
}

// app.module.ts /////////////////////////////////
// components ////////
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';

@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        AppNavComponent
    ]
})














// WE DON'T call forRoot on SharedModule

// CONFIGURABLE MODULES: 
let firstObject = { greeting: 'Good day' };
let secondObject = { greeting: 'Good night' }

providers: [{
    provide: 'MyService',
    useFactory: () => {
        if(...) return firstObject
         else return secondObject
    }
}]
    
 // and in the component:
 @Component({})
 export class NewSuperComponent {
   constructor(@Inject('MyService') myService) {
       console.log(myService.greeting);
   }
}

import { InjectionToken } from '@angular/core';

import { MyInterface } from '...';

// This will be our token:
const NewSuperToken = new InjectionToken<MyInterface>("NEWTOKEN (description)");

// Our service
import { MySuperService } from '...';

// Our interface for the config object: 
interface MySuperConfigInterface {
    spaceId: string;
    accessToken: string;
}

// Our injectionToken:
const MySuperServiceConfig = new InjectionToken<MySuperConfigInterface>("config goes here");

@NgModule()
export class MySuperModule {
    
  static forRoot(config: MySuperConfigInterface): ModuleWithProviders {
      return {
          ngModule: MySuperModule,
          providers: [
              MySuperService,
              {
                  provide: MySuperServiceConfig,
                  useValue: config
              }
          ]
      }
  }
}


<!-- app.component.html -->
<div>
  <app-header>
  </app-header>
  <app-nav>
  </app-nav>
  <div class="wrapper">
    <router-outlet></router-outlet>
  </div>
</div>

<!-- <h1>{{ user$ | async | json }}</h1> -->
