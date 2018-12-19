Прекрасное далеко
Напрасно и далеко,
Бессмысленно жестоко,
Дорогу забудь.

Без выхода и входа
К прекрасному далеко,
Напрасное далеко,
Ты не пройдешь свой путь...


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

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  
  constructor(private af: AngularFireAuth) {}
    
    
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


<!-- auth-form.component.html -->

<!-- signup.component.html -->
<div>
  <auth-form (submitted)="signupUser($event)">
    <h1>Signup</h1>
    <a routerLink="/auth/signin">Already have an account?</a>
    <button type="submit">Create account</button>

    <div class="error" *ngIf="error">
      {{ error }}
    </div>

  </auth-form>
</div>

<!-- signin.component.html -->
<div>
  <auth-form (submitted)="signinUser($event)">
    <h1>Signin</h1>
    <a routerLink="/auth/signup">Not signed up?</a>
    <button>Sign in</button>

    <div class="error" *ngIf="error">
      {{ error }}
    </div>

  </auth-form>
</div>






















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
