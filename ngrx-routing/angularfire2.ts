https://coub.com/view/1gzjel

npm install angularfire2 firebase --save

// environment.ts /////////////////////////////////

export const environment = {


};

<!-- new-train.component.html -->
<mat-option *ngFor="let exer of exers | async"
            [value]="exer.name"
>{{ exer.name }}</mat-option>



// material.module.ts //////////////
import { MatSortModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [MatSortModule, MatPaginatorModule],
  exports: [MatSortModule, MatPaginatorModule]
})

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB9M61I2CJkheBe7hk3QISMIjh3vLbDRpI',
    authDomain: 'kt-trial.firebaseapp.com',
    databaseURL: 'https://kt-trial.firebaseio.com',
    projectId: 'kt-trial',
    storageBucket: 'kt-trial.appspot.com',
    messagingSenderId: '34848650800'
  }
}

// app.module.ts /////////////////////////////////////
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';

imports: [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule
]

// new-train.component.ts /////////////////////////////////
 import { AngularFireStore } from 'angularfire2/firestore';

 import { Observable } from 'rxjs';


 export class NewTrainComponent {

   exers: Observable<any>;

   constructor(private myDB: AngularFirestore) {}


   ngOnInit() {

     this.myDB.collection('availableExers').valueChanges();
   }

 }
 
 
 
 
 
 
 
