
// auth.service.ts /////////////////////////////////////////////////
import * as firebase from 'firebase';

export class AuthService {

  token: string;
  
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
  
}

// data-storage.service.ts /////////////////////////////////////////////////
export class DataStorageService {
  
  constructor(private authService: AuthService) {}
  
  getRecipes() {
   
   const token = this.authService.getToken();
     
   this.http.get('https://firebase.com/.json?auth=' + token)
    .map(
        
  }

}



// app.module.ts ////////////////////////////////////////////////////
 providers: [AuthService]
 
 
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
 
 { path: 'signin', component: SigninComponent },
 
 // header.component.html ///////////////////////////////////////////////////
 
 <li routerLink="/signin"
 >Sign in</li>
 
 {
   "rules": {
     ".read": "auth != null"
     ".write": "auth != null"
   }
 }
 
 
 
 
 
 
 
 
 
