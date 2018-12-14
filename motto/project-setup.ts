npm install -g firebase-tools // NB
firebase login

// init firebase:
firebase init // after configuring and building run this:
firebase deploy

// store.ts /////////////////////////////////////////////
import { Observable, BehaviorSubject } from 'rxjs';

import { pluck, distinctUntilChanged } from 'rxjs/operators';

export interface State {
    [key: string]: any
}

const state: State = {};

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

// main.ts ///////////////////////////////////////
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

if(process.env.NODE_ENV === 'production') {
   enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);


// app.module.ts //////////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
    imports: [BrowserModule,
              RouterModule.forRoot(ROUTES)],
    declarations: [AppComponent],
    providers: [Store],
    bootstrap: [AppComponent]
})
export class AppModule {}

/* var config = {
  apiKey: "gsdgsdgs4sdgdfgdfgd",
  authDomain: "fitness-app-e668a.firebaseapp.com",
  databaseURL: "https://fitness-app-e668a.firebaseio.com",
  projectId: "fitness-app-e668a",
  storageBucket: "fitness-app-e668a.appspot.com",
  messagingSenderId: "24232135645254"
};
*/



// tsconfig.json ////////////////////////////////////////////
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
        "store": ["src/store.ts"]
    },
}

// firebase.json ///////////////////////////////////////////////////////
{
  "database": {
      "rules": "database.rules.json"
  },
  "hosting": {
      "public": "",
      "ignore": [
          "firebase.json",
          ".firebaserc",
          ".vscode"
      ],
      "rewrites": [{
          "source": "**",
          "destination": "/index.html"
      }]
  }
}

// database.rules.json ////////////////////////////////////////////////
{
  "rules": {
     "users": {
        "$uid": {
            ".read": "$uid === auth.uid",
            ".write": "$uid === auth.uid"
        }
     },
       "schedule": {
           "$uid": {
               ".read": "$uid === auth.uid",
               ".write": "$uid === auth.uid",
               ".indexOn": ["timestamp"]
           }
       }
  }
}

