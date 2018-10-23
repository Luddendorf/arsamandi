// npm install -g @angular/cli
// ng new fit-app cd fit-app
// npm install --save @angular/material @angular/cdk
// npm install --save @angular/animations
// npm install --save hammerjs
// npm install --save @angular/flex-layout

// app.module.ts /////////////////////////////////////////////////////
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule
  ]
})

// main.js ///////////////////////////////////////////////////////////
import 'hammerjs';

// index.html ///////////////////////////////////////////////////////
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

// material.module.ts ///////////////////////////////////////////////
import { NgModule } from '@angular/core';

@NgModule({

})

export class MaterialModule {}




<button mat-button>Click me</button>

<button mat-raised-button
        color="accent"
        >Click me</button>

<button mat-icon-button color="accent">
   <mat-icon></mat-icon>     
</button>
ng generate component auth/signup --module app.module
ng generate component auth/login --module app.module

ng generate component training --module app.module
ng generate component training/current-train --module app.module
ng generate component training/new-train --module app.module
ng generate component training/past-trains --module app.module

ng generate component welcome --module app.module
<!-- app.component.html  --------------------------------->
<router-outlet></router-outlet>


<!-- signup.component.html  --------------------------------->
<section class="signup-form">
  <form #myForm="ngForm"
        (ngSubmit)="onSubmit(myForm)"
        fxLayout="column"
        fxLayoutAlign="center center"
        >
    <mat-form-field>
    <input ngModel
           name="email"
           type="email" matInput
           placeholder="Your email"
           email required
           #emailInput="ngModel">
    <mat-error *ngIf="emailInput.hasError('required')"
               >Field must not be emply.</mat-error>
    <mat-error *ngIf="!emailInput.hasError('required')"
               >Email is invalid.</mat-error>
    <mat-form-field>
      
    <mat-form-field hintLabel="6 letters minimum.">
    <input ngModel
           name="password"
           type="password" matInput
           placeholder="Your password"
           required minlength="6"
           #pwInput="ngModel">
    <mat-hint align="end">{{ pwInput.value?.length }} / 6</mat-hint>
    <mat-error>Should be 6 letters minimum.</mat-error>
    <mat-form-field>
    
    <button mat-raised-button
            color="primary"
            type="submit">Submit</button>  
      
  </form>
</section>

<section id="container">
  <div id="child1" class="child"></div>
  <div id="child2" class="child"></div>
  <div id="child3" class="child"></div>
</section>


mat-form-field {
  width: 300px;
}

import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatFormFieldModule,
  MatInputModule } from '@angular/material';

@NgModule({
   imports: [MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule],
   exports: [MatButtonModule,
   MatIconModule, MatFormFieldModule, MatInputModule]
})

export class MaterialModule {}

/* style.css 
@import "~angular/material/prebuilt-themes/indigo-pink.css"; */

// app.routing.module.ts ///////////////////////////
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'training', component: TrainingComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}


// signup.component.ts /////////////////////////////////////////
import { NgForm } from '@angular/forms';

export class SignupComponent implements OnInit {

  onSubmit(form: NgForm) {
   
   console.log(form);
  }
}
