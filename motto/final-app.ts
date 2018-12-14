<!-- signin.component.html -->
<div>
  Signin
  <auth-form></auth-form>
</div>

<!-- signup.component.html -->
<div>
	Signup
  <auth-form></auth-form>
</div>

<!-- auth-form.component.html -->
<div>
  Auth Form
</div>

<!-- app.component.html -->
<div>
  Hello, friend!
  <div class="wrapper">
    <router-outlet></router-outlet>
  </div>
</div>

// auth/ auth.module.ts ////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [{
    path: 'auth', children: [
     { path: '', pathMatch: 'full', redirectTo: 'login' },
     { path: 'signin', loadChildren: './signin/signin.module#SigninModule' },
     { path: 'signup', loadChildren: './signup/signup.module#RegisterModule' },
    ]
}];

@NgModule({
    imports: [CommonModule,
              RouterModule.forChild(ROUTES)]
})
export class AuthModule {}




// app.module.ts //////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules
import { AuthModule } from '../auth/auth.module';

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
    imports: [BrowserModule,
              RouterModule.forRoot(ROUTES),
              AuthModule],
    declarations: [AppComponent],
    providers: [Store],
    bootstrap: [AppComponent]
})
export class AppModule {}

// auth/signin/ signin.module.ts ////////////////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './containers/signin/signin.component';

export const ROUTES: Routes = [{
    path: '', component: SigninComponent
}];

@NgModule({
    imports: [CommonModule,
              RouterModule.forChild(ROUTES),
              SharedModule],
    declarations: [SigninComponent]
})
export class SigninModule {}

// auth/signup/ signup.module.ts ///////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './containers/signup/signup.component';

export const ROUTES: Routes = [{
   path: '', component: SignupComponent 
}];

@NgModule({
    imports: [CommonModule,
              RouterModule.forChild(ROUTES),
              SharedModule],
    declarations: [SignupComponent]
})
export class SignupModule {}


// auth/shared/ shared.module.ts ///////////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthFormComponent } from './components/auth-form/auth-form.component';

@NgModule({
    imports: [CommonModule],
    declarations: [AuthFormComponent],
    exports: [AuthFormComponent]
})
export class SharedModule {}

// signin/containers/signin/  signin.component.ts ////////////////////////
import { Component } from '@angular/core';

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    
   constructor() {}
}

// signup/containers/signup/ signup.component.ts /////////////////////////
import { Component } from '@angular/core';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent {
    
   constructor() {}
}

// shared/components/auth-form/ auth-form.component.ts ///////////////////
import { Component } from '@angular/core';

@Component({
   selector: 'auth-form',
   styleUrls: ['auth-form.component.scss'],
   templateUrl: './auth-form.component.html'
})
export class AuthFormComponent {
   
  constructor() {}
}

// auth-form.component.scss /////////////////////////////////////////
:host ::ng-deep {
  .error {
    color: #a94442;
    background: #f2dede;
    border: 1px solid #e4b3b3;
    border-radius: 2px;
    padding: 8px;
    font-size: 14px;
    font-weight: 400;
    margin: 10px 0 0;
  }
  h1 {
    margin: 0 0 25px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
  button {
    cursor: pointer;
    outline: 0;
    width: 100%;
    border-radius: 2px;
    border: 1px solid #1c79b8;
    background: #39a1e7;
    color: #fff;
    padding: 10px;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: darken(#39a1e7, 5%);
      border-color: darken(#1c79b8, 5%);
    }
    &:disabled {
      opacity: .4;
      cursor: not-allowed;
    }
  }
  a {
    display: block;
    text-align: center;
    color: #5e7386;
    font-size: 14px;
  }
}

.auth-form {
  background: #fff;
  box-shadow: 0 3px 4px rgba(0,0,0,.1);
  border-radius: 3px;
  border: 1px solid #c1cedb;
  width: 400px;
  margin: 50px auto;
  padding: 30px;
  &__action {
    margin: 10px 0 30px;
  }
  &__toggle {
    border-radius: 0 0 3px 3px;
    border-top: 1px solid #c1cedb;
    background: #f8fafc;
    padding: 10px;
    margin: 0 -30px -30px;
  }
  label {
    display: block;
    margin: 0;
  }
  input {
    outline: 0;
    font-size: 16px;
    padding: 10px 15px;
    margin: 0;
    width: 100%;
    background: #fafcfd;
    color: #5777a8;
    border: 1px solid #d1deeb;
    text-align: center;
    &::-webkit-input-placeholder {
      color: #5777a8;
    }
    &[type=email] {
      border-radius: 3px 3px 0 0;
    }
    &[type=password] {
      border-radius: 0 0 3px 3px;
      margin: -1px 0 0;
    }
  }
}
