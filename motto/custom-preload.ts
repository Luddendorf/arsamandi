// mail.module.ts ///////////////////////////
export const ROUTES: Routes = [
  {
    path: 'message/:id',
    component: MailViewComponent,
    outlet: 'pane',
    resolve: {
      message: MailViewResolve
    }
  }  
];

providers: [
    MailViewResolve
]

// mail-view.resolve.ts //////////////////
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { MailService } from '../../mail.service';
import { Mail } from '../../models/mail.interface';

@Injectable()
export class MailViewResolve implements Resolve<Mail> {
    
  constructor(private mailService: MailService) {}
    
  resolve(route: ActivatedRouteSnapshot) {
    
    return this.mailService.getMessage(route.params.id);
  }
}

// mail.service.ts //////////////////////////
@Injectable()
export class MailService {
  
  constructor(private httpClient: HttpClient) {}
    
  getMessage(id: string): Observable<Mail> {
    return this.httpClient.get(`/api/messages/${id}`).pipe(
      map(response => response.json())
    );
    
  }
}

// mail-view.component.ts /////////////
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Mail } from '../../models/mail.interface';

export class MailViewComponent {
    
 message: Observable<Mail> = this.route.data.pluck('message');
  
  constructor(private route: ActivatedRoute) {}
}

// mail.module.ts //////////////////
export const ROUTES: Routes = [
  {
    path: 'mail',
    component: MailAppComponent,
    children: [
     {
       path: 'folder/mail',
       component: MailFolderComponent,
       resolve: {
           messages: MailFolderResolve
       }
     },
     
    ]
  }
];

// dashboard.module.ts /////////////////////
export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent
  }  
];

// app.module.ts /////////////////
import { RouterModule, Route, Routes, PreloadAllModules } from '@angular/router';
import { PreloadingStrategy } from '@angular/router';

import { Observable, of } from 'rxjs';


export class CustomPreload implements PreloadingStarategy {
    
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
   return route.data && route.data.preload ? fn(): Observable.of(null);
  }
}

export ROUTES: Routes = [
  { path: 'dashboard', data: { preload: true },
    loadChildren: './dashboard/dashboard.module#DashboardModule'},
  { path: '**', redirectTo: 'mail/folder/inbox'}
];

@NgModule({
    imports: [
       MailModule,
       RouterModule.forRoot(ROUTES, { preloadingStrategy: CustomPreload })
    ],
    providers: [CustomPreload]
})

// REPEAT :///////////
import { RouterModule, Route, Routes, PreloadingStrategy } from '@angular/router';

import { Observable, of } from 'rxjs';

export class MyCustomPreload implements PreloadingStategy {
    
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return route.data && route.data.preload ? fn() : Observable.of(null);
  }
}


export const ROUTES: Routes = [
  { path: 'dashboard', data: { preload: true }
    loadChildren: './dash/dash.module#DashboardModule' },
  { path: '**', redirectTo: 'mail/folder/inbox' }
];

@NgModule({
    providers: [CustomPreload],
    imports: [
      MailModule,
      RouterModule.forRoot(ROUTES, { preloadingStategy: MyCustomPreload })
    ]
})

<!-- mail-view.component.html -->
<h2>{{ (message | async).from }}</h2>
<p>{{ (message | async).full }}</p>

<!-- app.component,html -->
<a [routerLink]="['/mail', { outlets: { primary: 'folder/inbox', pane: null } }]"></a>

<a [routerLink]="['/dashboard']"
></a>
<router-outlet></router-outlet>

let i = [1, 2, 3, 4];

let iterator = i[Symbol.iterator]();

iterator.next();

function *generator() {
  
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}

let myIter = generator();

console.log(iterator.next());

function *infiniteMaker() {

  let i=0;

  while(true) {
    
    yield i;
    i++;
  }
}

let myStarter = infiniteMaker();

myStarter.next();
myStarter.next();
myStarter.next();

function *generator() {

  yield 1;
  yield* anotherGenerator();
  yield 3;
};

function *anotherGenerator() {
  yield 2;
};  

function request(url) {
  return new Promise(function(resolve, reject) {
    makeAjaxCall(url, function(err, text) {
      if(err) reject(err);
      else resolve(text);
    });
  });
};

function *generator() {

  yield request('url1');
  yield request('url2');
}



