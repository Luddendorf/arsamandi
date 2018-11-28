<!-- mail-app.component.html -->
<div class="mail">
 <router-outlet name="pane"></router-outlet>
</div>

<!-- mail-view.component.html -->
<div class="mail-view">
  I am a message!
</div>

<!-- mail-item.component.html -->
<a class="mail-item"
   [routerLink]="['', { outlets: { pane: ['message', message.id] } }]"
   routerLinkActive="active">
  <h3>{{ message.from }}
   <span>{{ message.timestamp | date:'shortTime' }}</span>
  </h3>
  <p>{{ message.summary }}</p>
</a>


// mail.module.ts ////////////
export const ROUTES: Routes = [
    { path: 'folder/:name', component: MailFolderComponent,
      resolve: { messages: MailFolderResolve }},
    { path: 'message/:id', component: MailViewComponent,
      outlet: 'pane'}
];

// mail.item.component.ts //////////////////////
export class MailItemComponent {
  @Input() message: Mail;
}

// REPEAT:
export const ROUTES: Routes = [
  { path: 'folder/:name', component: MailFolderComponent,
    resolve: { messages: MailFolderResolve }},
  { path: 'message/:id', component: MailViewComponent,
    outlet: 'pane'}
];
