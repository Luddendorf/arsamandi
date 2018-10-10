
// auth.service.ts /////////////////////////////////////////////////
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  token: string;
  
  constructor(private router: Router) {}
  
  signupUser(email: string, password: string) {
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
       .catch(
         error => console.log(error)
       )
  }
  
  signinUser(email: string, password: string) {
    
    firebase.auth().signInWithEmailAndPassword(email, password)
       .then(
         response => {
           
           this.router.navigate(['/']);
           
           firebase.auth().currentUser.getToken()
             .then(
               (token: string) => this.token = token
             )
         }
       ).catch(
         error => console.log(error)
       );
  }
  
  getToken() {
    
     firebase.auth().currentUser.getToken()
      .then(
       (token: string) => this.token = token
      );
    
     return this.token; 
  }
  
  isAuthenticated() {
    return this.token != null;
  }
  
  logout() {
    
    firebase.auth().signOut();
    
    this.token = null;
  }
  
}

// data-storage.service.ts /////////////////////////////////////////////////
export class DataStorageService {
  
  constructor(private authService: AuthService) {}
  
  storeRecipes() {
   
    const token = this.authService.getToken();
    
    return this.http.put('https://firebase.com/.json?auth=' + token,
        this.recipeService.getRecipes());
    
  }
  
  getRecipes() {
   
   const token = this.authService.getToken();
     
   this.http.get('https://firebase.com/.json?auth=' + token)
    .map(
        )
  }

}



// app.module.ts ////////////////////////////////////////////////////
 providers: [AuthService, AuthGuard]
 
 
 // signup.component.ts //////////////////////////////////////////
 import { AuthService } from '../auth.service';
 
 export class SignupComponent implements OnInit {
 
   constructor(private authService: AuthService) {}
   
   ngOnInit() {}
   
   onSignup(form: NgForm) {
     
     const email = form.value.email;
     const password = form.value.password;
     
     this.authService.signupUser(email, password);
   }
   
 }
 
 // signin.component.html //////////////////////////////////////////////////
 <form (ngSubmit)="onSignin(signinForm)"
       #signinForm="ngForm">
   <input type="email"
          id="email"
          name="email"
          ngModel >
          
   <input type="password"
          id="password"
          name="password"
          ngModel >
          
 <button type="submit"
         [disabled]="!signinForm.valid">Sign In</button>      
       
 </form>
 
  // signin.component.ts //////////////////////////////////////////////////
 import { Component, OnInit } from '@angular/core';
 import { NgForm } from '@angular/forms';
 
 import { AuthService } from '../auth.service';
 
 @Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
 })
 export class SigninComponent implements OnInit {
  
  constructor(private authService: AuthService) {}
  
  ngOnInit() {}
  
  onSignin(form: NgForm) {
   
    const email = form.value.email;
    
    const password = form.value.password;
  
    this.authService.signinUser(email, password);
  }
  
 }
 
 // app-routing.module.ts //////////////////////////////////////////////////
 import { SigninComponent } from './auth/signin/signin.component';
 import { AuthGuard } from './auth/auth-guard.service';
 
 { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
 { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] },
 { path: 'signin', component: SigninComponent },
 
 // header.component.html ///////////////////////////////////////////////////
 
  <ng-template [ngIf]="!authService.isAuthenticated()">
    <li routerLink="/signup">Sign un</li>
    <li routerLink="/signin">Sign in</li>
  </ng-template>

<li><a style="cursor: pointer;"
       (click)="onLogout()"
       *ngIf="authservice.isAuthenticated()"
>Logout</a></li>
<li *ngIf="authService.isAuthenticated()">
</li>
 
 {
   "rules": {
     ".read": "auth != null"
     ".write": "auth != null"
   }
 }
 
// header.component.ts ///////////////////////////////////////////////////
 
 export class HeaderComponent {
   
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {}
   
   onLogout() {
      this.authService.logout();
   }
   
 }
 
// auth-guard.service.ts ////////////////////////////////////////////////
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService) {}
  
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    
    return this.authService.isAuthenticated();
  }
  
}
 
 
 
 
