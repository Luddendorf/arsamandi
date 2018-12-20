// app/components/app-header/ app-header.component.scss //////////////////
.app-header {
  background: #fff;
  border-bottom: 1px solid #c1cedb;
  padding: 15px 0;
  text-align: center;
  img {
    display: inline-block;
  }
  &__user-info {
    position: absolute;
    top: 16px;
    right: 0;
    cursor: pointer;
  }
  span {
    background: url(/img/logout.svg) no-repeat;
    background-size: contain;
    width: 24px;
    height: 24px;
    display: block;
    opacity: 0.4;
    &:hover {
      opacity: 0.9;
    }
  }
}

.wrapper {
  max-width: 800px;
  width: 96%;
  margin: 0 auto;
  position: relative;
}

// app/components/app-nav/ app-nav.component.scss ///////////////////////////
:host {
  margin: -1px 0 0;
  display: block;
}
.app-nav {
  background: #8022b0;
  text-align: center;
  a {
    color: rgba(255,255,255,.6);
    padding: 15px 0;
    display: inline-block;
    min-width: 150px;
    font-weight: 500;
    font-size: 16px;
    text-transform: uppercase;
    border-bottom: 3px solid transparent;
    &:hover,
    &.active {
      color: #fff;
      border-bottom-color: #fff;
    }
  }
}
.wrapper {
  max-width: 800px;
  width: 96%;
  margin: 0 auto;
}


// app/components/app-header/ app-header.component.ts //////////////////
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { User } from '../../../auth/shared/services/auth/auth.service';

@Component({
    selector: 'app-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['app-header.component.scss'],
    templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
    
  @Input() user: User;
    
  @Output() logout = new EventEmitter<any>();
    
    constructor() {}
    
  logoutUser() {
    this.logout.emit();
  }
}

// app/components/app-nav/ app-nav.component.ts //////////////////
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['app-nav.component.scss'],
    templateUrl: './app-nav.component.html'
})
export class AppNavComponent {
    constructor() {}
}


// app.module.ts ///////////////////////

import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';

@NgModule({
    declarations: [
        AppHeaderComponent,
        AppNavComponent
    ]
})

// app.component.ts //////////////////////
import { Router } from '@angular/router';

export class AppComponent {

   constructor(private router: Router) {}

async onLogout() {
  await this.authService.logoutUser();
  
  this.router.navigate(['/auth/login']);
}
    
}

// auth.service.ts ////////////////
logoutUser() {
    return this.af.auth.signOut();
}

<!-- app.component.html -->
<div>
  <app-header [user]="user$ | async"
              (logout)="onLogout()">

  </app-header>
  <app-nav *ngIf="(user$ | async)?.authenticated">
  </app-nav>
  <div class="wrapper">
    <router-outlet></router-outlet>
  </div>
</div>

<!-- app-nav.component.html -->
<div class="app-nav">
  <div class="wrapper">
    <a routerLink="schedule"
       routerLinkActive="active">Schedule</a>
    <a routerLink="meals"
       routerLinkActive="active">Meals</a>
    <a routerLink="workouts"
       routerLinkActive="active">Workouts</a>
  </div>
</div>

<!-- app-header.component.html -->
<div class="app-header">
  <div class="wrapper">
    <img src="/img/logo.svg">
    <div *ngIf="user?.authenticated"
         class="app-header__user-info">
      <span (click)="logoutUser()"></span>
    </div>
  </div>
</div>
