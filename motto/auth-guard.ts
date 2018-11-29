
// auth.module.ts ////////////////////////
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
    providers: [AuthService, AuthGuard]
})
export class AuthModule {}

// auth.service.ts //////////////

@Injectable()
export class AuthService {
  
  user = { isAdmin: true };
    
  checkPermissions() {
     return Observable.of(this.user.isAdmin);
  }
    
  isLoggedIn() {
    return Observable.of(true);
  }
}

// auth.guard.ts /////////////////////
import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad {
    
  constructor(private authService: AuthService) {}
    
  canLoad() {
    
    return this.authService.checkPermissons();
  }
}


// app.module.ts //////////////
import { AuthGuard } from './auth/auth.guard';

export const ROUTES: Routes = [
  { path: 'dash', canLoad: [AuthGuard],
    loadChildren: './dash/dash.module#DashboardModule'
  },
];

// CAN ACTIVATE:
// mail.module.ts ///////////
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/auth.guard';

export const ROUTES: Routes = [
  {
    path: 'mail',
    component: MailAppComponent,
    canActivate: [AuthGuard],
    children: []
  }
];

@NgModule({
  imports: [
    AuthModule,
  ]
})

// auth.guard.ts //////////////
import { CanLoad, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    
  constructor(private authService: AuthService) {}
    
 canLoad() {
   return this.authService.checkPermissions();
 }
    
 canActivate() {
   return this.authService.isLoggedIn();
 }
    
}
