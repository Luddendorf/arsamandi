
// mail-item.component.ts //////////////////////////////////////////////
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export class MailItemComponent {
    
  @Input() message: Mail;
    
  constructor(private router: Router) {}
    
  navigateToMessage() {
      
   this.router.navigate(
    ['', { outlets: { pane: ['message', this.message.id] } }]
   );
  }
}

// mail-item.component.ts /////////////////////////////////////////
import { Router } from '@angular/router';

export class MailItemComponent {
    
  @Input() message: Mail;
    
  this.router.navigate(['', { outlets: { pane: null } }]);
  
  constructor(private router: Router) {}
    
  navigateToMessage() {
   
   this.router.navigate(
    ['', { outlets: { pane: ['message', this.message.id] } }]
   );
  }

  navigateToMessage2() {
    
    this.router.navigate(
     ['', { outlets: { pane: null } }]
    );
  }
}

// mail.module.ts ////////////////////////////////////
import { MailViewResolve } from '';

export const ROUTES: Routes = [
  { path: 'folder/:name', component: MailFolderComponent,
    resolve: { messages: MailFolderResolve }},
  { path: 'message/:id', component: MailViewComponent,
    outlet: 'pane', resolve: { message: MailViewResolve }}
];

NgModule({
    providers: [
       MailService,
       MailFolderResolve,
       MailViewResolve
    ]
})

// mail-view.resolve.ts /////////////////////////////////////
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

// mail.service.ts ///////////////////////

@Injectable()
export class MailService {
   constructor(httpClient: HttpClient) {}
    
  getFolder(folder: string): Observable<Mail[]> {
     return this.httpClient.get(`/api/messages?folder=${folder}`).pipe(
       map(response => response.json());
     );
  }
    
  getMessage(id: string): Observable<Mail> {
   
    return this.httpClient.get(`/api/messages/${id}`).pipe(
      map(response => response.json());
    );
  }
}

// mail-view.component.ts //////////////////////////////
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Mail } from '../../models/mail.interface';

export class MailViewComponent {
    
  message: Observable<Mail> = this.route.data.pluck('message');
  
  constructor(private route: ActivatedRoute) {}
}

// REPEAT Auxiliary routes and resolving them:
// mail.module.ts //
export const ROUTES: Routes = [
  { path: 'message/:id', component: MailViewComponent,
    outlet: 'pane', resolve: { message: MailViewResolve }}  
];

// mail-view.resolve.ts ///////
import { Injectable } from '@angular/core';

@Injectable()
export class MailViewResolve implements Resolve<Mail> {
  
  resolve(route:  {
      
  }
      
  }
}

<!-- mail-item.component.html -->
<a class="mail-item"
   (click)="navigateToMessage()"
   [routerLink]="['', { outlets: { pane: ['message', message.id] } }]"
   routerLinkActive="active"
></a>

<!-- mail-item.component.html -->
<a class="mail-item"
   (click)="navigateToMessage()"></a>

<!-- app.component.html -->
<nav>
  <a [routerLink]="[{ outlets: { primary: 'folder/inbox', pane: null } }]"
  >Inbox</a>
  <a [routerLink]="[{ outlets: { primary: 'folder/trash', pane: null } }]"
  >Trash</a>
</nav>

<a [routerLink]="[{ outlets: { primary: 'folder/inbox', pane: null } }]"
   routerLinkActive="active"></a>

<!-- mail-view.component.html -->
<h2>{{ (message | async).from }}</h2>
<p>{{ (message | async).full }}</p>
