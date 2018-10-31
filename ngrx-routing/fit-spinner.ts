<!-- toolbar.component.html -->
<div>
	<a routerLink="/">NG Fitness</a>
</div>


<!-- login.component.html -->
<button *ngIf="!isLoading"
        type="submit"
        mat-raised-button color="primary"
				[disabled]=""></button>

<mat-spinner *ngIf="isLoading"></mat-spinner>

<!-- signup.component.html -->


<button  *ngIf="!isLoading"
        type="submit" mat-raised-button
        color="primary"></button>
<mat-spinner *ngIf="isLoading"></mat-spinner>


// training.service.ts  ////////////////////////////
import { Subscription } from 'rxjs';

export class TrainingService {

  private firebaseSubs: Subscription[];

    fetchAvailableExers() {
    
    this.firebaseSubs.push(
      this.db.collection('availableExers')
        .snapshotChanges()
        .pipe(map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories
            };
          });
         }))
        );
    }
   
   fetchCompletedOrCancelledExers() {
   
    this.firebaseSubs.push(
     this.db.collection('finishedExers')
       .valueChanges()
       .subscribe((exers: Exercise[]) => {
         this.finishedExersChanged.next(exers);
       })                );
   }

   cancelSubscription() {
     this.firebaseSubs.forEach(sub => sub.unsubscribe());
   }
}

// auth.service.ts ////////////////////////////////////////
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';

export class AuthService {

  constructor(private trainService: TrainingService,
             private snackbar: MatSnackBar,
             private uiService: UIService) {}

  initAuthListener() {

    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.isAuthed = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.isAuthed = false;
        this.authChange.next(false);
        this.trainService.cancelSubscriptions();
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {

    this.uiService.loadingStateChanged.next(true);

    this.afAuth.auth
    .createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      
      this.uiService.loadingStateChanged.next(false);
    })
    .catch(error => {

      this.uiService.loadingStateChanged.next(false);

      this.snackbar.open(error.message, null, {
        duration: 3000
      });
    });
  }

  login(authData: AuthData) {

    this.uiService.loadingStateChanged.next(true);

    this.afAuth.auth
     .signInWithEmailAndPassword(authData.email, authData.password)
     .then(result => {
       
       this.uiService.loadingStateChanged.next(false);
     })
     .catch(error => {
       
       this.uiService.loadingStateChanged.next(false);

       this.snackbar.open(error.message, null, {
         duration: 3000
       });
     });
  }


  logout() {
    
    this.afAuth.auth.signOut();
  }
}

// app.component.ts ////////////////////////
import { AuthService } from './auth/auth.service';

export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initAuthListener();
  }
}

// material.module.ts ////////////////////////////////
import { MatSnackBarModule } from '@angular/material';

imports: [MatSnackBarModule],
exports: [MatSnackBarModule]


// shared/ui.service.ts ////////////////////////////////////
import { Subject } from 'rxjs';

export class UIService {
  
  loadingStateChanged = new Subject<boolean>();
}


// app.module.ts ////////////////////////////////////////
import { UIService } from './shared/ui.service';

providers: [UIService]

// login.component.ts ////////////////////////////////////
import { OnDestroy } from '@angular/core';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;

  private loadingSubs: Subscription;

  constructor(private uiService: UIService) {}
   
  ngOnInit(){

  this.loadingSubs = this.uiService.loadingStateChanged
    .subscribe(isLoading => {

      this.isLoading = isLoading;
    });
  

  this.loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', { validators: [Validators.required] })
  });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }
}

// signup.component.ts //////////////////////////////////
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UIService } from '../../shared/ui.service';

export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;

  private loadingSubs: Subscription;

  constructor(private uiService) {}

  ngOnInit() {

    this.loadingSubs = this.uiService.loadingStateChanged
       .subscribe(isLoading => {

         this.isLoading = isLoading;
       });
  }

  ngOnDestroy() {

    this.loadingSubs.unsubscribe();
  }
}
