<!-- meals.component.html -->
<div>
  {{ meals$ | async | json }}
</div>

<!-- workouts.component.html -->
<div>
	Workouts
</div>

<!-- schedule.component.html -->
<div>
	Schedule
</div>

///////////////////////////////////////////////////////////////////////
// health/meals/containers/meals/ meals.component.ts //////////////////
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';
import { MealsService, Meal } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'meals',
    styleUrls: ['meals.component.scss'],
    templateUrl: './meals.component.html'
})
export class MealsComponent implements OnInit, OnDestroy {
    
    meals$: Observable<Meal[]>;
    subscription: Subscription;
    
    constructor(private store: Store,
                private mealsService: MealsService) {}
    
    ngOnInit() {
      this.meals$ = this.store.select<Meal[]>('meals');
      this.subscription = this.mealsService.meals$.subscribe();
    }
    
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    
}

////////////////////////////////////////////////////////////
// health/meals/ meals.module.ts ///////////////////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

// containers
import { MealsComponent } from './containers/meals/meals.component';

export const ROUTES: Routes = [
  { path: '', component: MealsComponent }  
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ],
    declarations: [
        MealsComponent
    ]
})
export class MealsModule {}

// meals.component.scss //////////////////////////////////////

////////////////////////////////////////////////////////////
// health/ health.module.ts ////////////////////////////////////////
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { AuthGuard } from '../auth/shared/guards/auth.guard';

export const ROUTES: Routes = [
    { path: 'schedule', canActivate: [AuthGuard], loadChildren: './schedule/schedule.module#ScheduleModule' },
    { path: 'workouts', canActivate: [AuthGuard], loadChildren: './workouts/workouts.module#WorkoutsModule' },
    { path: 'meals', canActivate: [AuthGuard], loadChildren: './meals/meals.module#MealsModule' }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        SharedModule.forRoot()
    ]
})
export class HealthModule {}

////////////////////////////////////////////////////////////
// auth/shared/guards/ auth.guard.ts ///////////////////////
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(private router: Router,
               private authService: AuthService) {}
    
   canActivate() {
      return this.authService.authState.pipe(
        map((user) => {
          if(!user) {
             this.router.navigate(['/auth/signin']);
          }
          return !!user;
        });
      );
   }
}

//////////////////////////////////////////////////////////////
//  auth.service.ts ///////////////////////////////////////////
get authState() {
   return this.af.authState; 
}

////////////////////////////////////////////////////////////
// shared.module.ts //////////////////////////////////////
import { AuthGuard } from './guards/auth.guard';

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
           ngModule: SharedModule,
           providers: [
               AuthService,
               AuthGuardv // NB
           ]
        };
    }
}

////////////////////////////////////////////////////////////
// app.module.ts ///////////////////////////////////////////
import { AuthModule } from '';
import { HealthModule } from '../health/health.module';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'schedule' }  
];

@NgModule({
    imports: [
        HealthModule
    ]
})

////////////////////////////////////////////////////////////////////
// health/workouts/containers/workouts/ workouts.component.ts //////////
import { Component } from '@angular/core';

@Component({
    selector: 'workouts',
    styleUrls: ['workouts.component.scss'],
    templateUrl: './workouts.component.html'
})
export class WorkoutsComponent {
    constructor() {}
}


// health/workouts/containers/workouts/ workouts.component.scss /////////

////////////////////////////////////////////////////////////////////
// health/workouts/ workouts.module.ts /////////////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutsComponent } from './containers/workouts/workouts.component';

export const ROUTES: Routes = [
    { path: '', component: WorkoutsComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        WorkoutsComponent
    ]
})
export class WorkoutsModule {}

//////////////////////////////////////////////////////////////////
// health/schedule/containers/schedule/ schedule.component.ts ////
import { Component } from '@angular/core';

@Component({
    selector: 'schedule',
    styleUrls: ['schedule.component.scss'],
    templateUrl: './schedule.component.html'
})
export class ScheduleComponent {
    
}

//////////////////////////////////////////////////////////////////
// health/schedule/containers/schedule/ schedule.component.scss ////

//////////////////////////////////////////////////////////////////
// health/schedule/ schedule.module.ts //////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers:
import { ScheduleComponent } from './containers/schedule/schedule.component';

export const ROUTES: Routes = [
    { path: '', component: ScheduleComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        ScheduleComponent
    ]
})
export class ScheduleModule {}

// health/shared/ shared.module.ts ////////////////////////////////////
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MealsService } from './services/meals/meals.service';

@NgModule({
   imports: [
      CommonModule,
      RouterModule,
      AngularFireDatabaseModule
   ],
   declarations: []
})
export class SharedModule {
   static forRoot(): ModuleWithProviders {
       return {
           ngModule: SharedModule,
           providers: [
               MealsService
           ]
       };
   }
}

// health/shared/services/meals/  meals.service.ts //////////////////////
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store } from 'store';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Meal{
  name: string,
  ingreds: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {
    
meals$: Observable<Meal[]> = this.db.list(`meals/${this.uid}`).pipe(
 tap(next => this.store.set('meals', next));
    );
    
    constructor(private store: Store,
                private db: AngularFireDatabase,
                private authService: AuthService) {}
    
    get uid() {
        return this.authService.user.uid;
    }
}

// auth.service.ts ////////////////////////////////////////////////
get user() {
    return this.af.auth.currentUser;
}

// store.ts //////////////////////////////////////////////////////////
import { Meal } from './health/shared/services/meals/meals.service';

export interface State {
    user: User,
    meals: Meal[],
    [key: string]: any
}

const state: State = {
  user: undefined,
  meals: undefined
};
