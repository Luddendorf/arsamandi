<!-- mail.item.component.html -->
<a class="mail-item"
   [routerLink]="['/mail', { outlets: { pane: ['message', message.id] } }]">
   </a>

<!-- app.component.html -->
<a [routerLink]="['/mail', { outlets: { primary: 'folder/trash', pane: null } }]"
></a>

<a [routerLink]="['/dashboard']"></a>

<router-outlet></router-outlet>

// app.module.ts //////////////////
import { MailModule } from './mail/mail.module';
// import { DashboardModule } from './dashboard/dashboard.module';

export const ROUTES: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: '**', redirectTo: 'mail/folder/inbox' }  
];

@NgModule({
    imports: [
      MailModule,
     //  DashboardModule // WE DELETE THIS import
    ]
})

// mail.module.ts //////////////
export const ROUTES: Routes = [
 { path: 'mail', component: MailAppComponent, children: [
    { path: 'folder/:name', component: MailFolderComponent, resolve: {} }, 
    { path: 'message/:id', component: MailViewComponent, resolve: {}, outler: 'pane' }
 ] }  
    
];
// dashboard.module

path: '', // make path empty!


