import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    AngularFirestoreModule
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { environment } from '../environments/environment';
import { UIService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    TrainingModule,
    AuthModule
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }



// app.module.ts ///////////////////////////////////////
import { AuthModule } from './auth/auth.module';

imports: [
  BrowserModule,
  BrowserAnimationModule,
  MaterialModule,
  AppRoutingModule,
  FlexLayoutModule,
  AngularFireModule.initializeApp(environment.firebase),
  TrainingModule,
  AuthModule]
  // FormsModule,
  // ReactiveFormsModule
  // AngularFireAuthModule

// auth.module.ts ///////////////////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
   declarations:[SignupComponent, LoginComponent],
   imports: [
     CommonModule,
     FormModule,
     ReactiveFormsModule,
     MaterialModule,
     FlexLayoutModule,
     AngularFireAuthModule
   ],
   exports: []
})
export class AuthModule {

}

// signup.component.ts ///////////////////////////
ngOnDestroy() {
 
  if(this.loadingSubs) {
    this.loadingSubs.unsubscribe();
  }
}

// login.component.ts /////////////////////////////////
ngOnDestroy() {

  if(this.loadingSubs) {
    this.loadingSubs.unsubscribe();
  }
}

// new-train.component.ts ///////////////////////////////
ngOnDestroy() {
  
  if(this.exerSubscription) {
    this.exerSubscription.unsubscribe();
  }

  if(this.loadingSubscription) {
    this.loadingSubscription.unsubscribe();
  }
}

// past-trains.component.ts ///////////////////////////////
ngOnDestroy() {
  if(this.exChangedSubscription) {
    this.exChangedSubscription.unsubscribe();
  }
}

// training.component.ts ///////////////////////////////////
export class TrainingComponent implements OnInit, OnDestroy {

  ngOnDestroy() {

    if(this.exerSubscription) {
      this.exerSubscription.unsubscribe();
    }
  }
}


<mat-form-field *ngIf="!isLoading && exers">
</mat-form-field>

<button *ngIf="!exers"
        mat-button
        type="button"
				 (click)="fetchExers()">Fetch Again</button>
         
         

