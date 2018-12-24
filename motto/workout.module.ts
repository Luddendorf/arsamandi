<!-- meal.component.html -->
<div *ngIf="meal$ | async as meal; else loading;">
  <meal-form [meal]="meal"
             (create)="addMeal($event)"
             (update)="updateMeal($event)"
             (remove)="removeMeal($event)">
  </meal-form>
</div>

<ng-template #loading>
  <div class="message">
   <img src="/img/loading.svg"/>
     Fetching meal...
  </div>
</ng-template>

<!-- meal-form.component.html -->
<div class="meal-form__submit">
  <div>
    <button *ngIf="!exists"
           type="button"
           class="button"
            (click)="createMeal()"
    >Create meal</button>
    <button *ngIf="exists"
           type="button"
           class="button"
            (click)="updateMeal()"
    >Save</button>
    <a class="button button--cancel"
             [routerLink]="['../']"
             >Cancel</a>
  </div>

  <div class="meal-form__delete"
       *ngIf="exists"> 
    <div *ngIf="toggled">
       <p>Delete item?</p>
       <button class="confirm"
              type="button"
               (click)="removeMeal()">Yes</button>
       <button class="cancel"
              type="button"
               (click)="toggle">No</button>
    </div>

    <button class="button button--delete"
           type="button"
            (click)="toggle()">
      Delete
    </button>

  </div>

</div> 

<!-- workout.component.html -->
<div class="workout">
<div class="workout__title">
  <h1>
    <img src="/img/workout.svg"/>
    <span *ngIf="workout$ | async as workout; else title;">
      {{ workout.name ? 'Edit' : 'Create' }} workout
    </span>

    <ng-template #title>Loading...</ng-template>

  </h1>
</div>

 <div *ngIf="workout$ | async as workot; else loading;">
   <workout-form [workout]="workout"
                 (create)="addWorkout($event)"
                 (update)="updateWorkout($event)"
                 (remove)="removeWorkout($event)">
   </workout-form>
 </div>

 <ng-template #loading>
   <div class="message">
     <img src="/img/loading.svg">
     Fetching workout...
   </div>
 </ng-template>

</div>

<!-- workout-form.component.html -->
<div class="workout-form">

  <form [formGroup]="form">
    <div class="workout-form__name">
      <label>
        <h3>Workout name</h3>
        <input type="text"
              placeholder="">
      </label>
    </div>

   <div class="workout-form__submit">
   </div>


  </form>

</div>



// meal.component.ts ///////////////////////////////////////////
async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    this.backToMeals();
}

async updateMeal(event: Meal) {
  const key = this.route.snapshot.params.id;
    
  await this.mealsService.updateMeal(key, event);
  this.backToMeals();
}

removeMeal(event: Meal) {
   const key = this.route.snapshot.params.id;
    
   await this.mealsService.removeMeal(key);
   this.backToMeals();
}

// components/meal-form/ meal-form.component.ts /////////////////////////
import { Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

export class MealFormComponent implements OnChanges {
    
  toggled = false;
  exists = false;
    
  @Input() meal: Meal;
    
  @Output() create = new EventEmitter<Meal>();
  
  @Output() update = new EventEmitter<Meal>();
    
  @Output() remove = new EventEmitter<Meal>();
    
  constructor(private fb: FormBuilder) {}
    
  ngOnChanges(changes: SimpleChanges) {
    if(this.meal && this.meal.name) {
       this.exists = true;
       this.emptyIngreds();
       
       const value - this.meal;
        
       this.form.patchValue(value);
        
       if(value.ingreds) {
         for(const item of value.ingreds) {
           this.ingreds.push(new FormControl(item));
       }
    }
  }
  }

  
  // functions:
  createMeal() {
      if(this.form.valid) {
          this.create.emit(this.form.value);
      }
  }
    
 updateMeal() {
     if(this.form.valid) {
        this.update.emit(this.form.value); 
     }
 }
    
 removeMeal() {
   this.remove.emit(this.form.value);
 }
    
  toggle() {
    this.toggled = !this.toggled; 
  }
    
  emptyIngreds() {
   while(this.ingreds.controls.length) {
     this.ingreds.removeAt(0);
   } 
  }
    
  get required() {
      return (this.form.get('name').hasError('required') &&
              this.form.get('name').touched);
  }
    
  get ingreds() {
      return this.form.get('ingredients') as FormArray;
  }
    
  
}

// shared/services/meals/ meals.service.ts /////////////////////////
updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
}

// shared/services/workouts/ workouts.service.ts /////////////////////
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from 'store';

import { Observable, of } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Workout {
    name: string,
    type: string, // emdurance | strength
    strength: any,
    endurance: any,
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class WorkoutsService {
    
  workouts$: Observable<Workout[]> = this.db.list(`workouts/${this.uid}`).pipe(
   tap(next => this.store.set('workouts', next))
  );
    
 constructor(private store: Store,
             private db: AngularFireDatabase,
             private authService: AuthService) {}
    
 get uid() {
     return this.authService.user.uid;
 }
    
 getWorkout(key: string) {
     if(!key) return of({});
     
     return this.store.select<Workout[]>('workouts').pipe(
  filter(Boolean),
  map(workouts => workouts.find((workout: Workout) => workout.$key === key))
     );}
    
 addWorkout(workout: Workout) {
     return this.db.list(`workouts/${this.uid}`).push(workout);
 }
    
 updateWorkout(key: string, workout: Workout) {
     return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
 }
    
 removeWorkout(key: string) {
     return this.db.list(`workouts/${this.uid}`).remove(key);
 }   
 
}

// shared/ shared.module.ts ///////////////
import { WorkoutsService } from './services/workouts/workouts.service';

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [MealsService,
                        WorkoutsService]
        };
    }
}

// store.ts //////////////////////////////
import { Workout } from './health/shared/services/workouts/workouts.service';

export interface State {
    user: User,
    meals: Meal[],
    workouts: Workout[],
    [key: string]: any
}

const state: State = {
  user: undefined,
  meals: undefined,
  workouts: undefined
};

// meals.module.ts //////////////////////////////////////////////////

// workouts.module.ts ////////////////////////////////////////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { WorkoutFormComponent } from './components/workout-form/workout-form.component';

import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { WorkoutComponent } from './containers/workout/workout.component';

export const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent },
  { path: 'new', component: WorkoutComponent },
  { path: ':id', component: WorkoutComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ],
    declarations: [
        WorkoutsComponent,
        WorkoutComponent,
        WorkoutFormComponent
    ]
})
export class WorkoutsModule {}

// workouts/container/workout/ workout.component.ts ////////////////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { WorkoutsService, Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
    selector: 'workout',
    styleUrls: ['workout.component.scss'],
    templateUrl: './workout.component.html'
})
export class WorkoutComponent implements OnInit, OnDestroy {
    
    workout$: Observable<Workout>;
    subscription: Subscription;
    
    constructor(private workoutsService: WorkoutsService,
                private router: Router,
                private route: ActivatedRoute) {}
    
    
 ngOnInit() {
   this.subscription = this.workoutsService.workouts$.subscribe();
   this.workout$ = this.route.params.pipe(
     switchMap(param => this.workoutsService.getWorkout(param.id))
   );
 }
    
 ngOnDestroy() {
     this.subscription.unsubscribe();
 }
    
 async addWorkout(event: Workout) {
     await this.workoutsService.addWorkout(event);
     this.backToWorkouts();
 }
    
 async updateWorkout(event: Workout) {
    const key = this.route.snapshot.params.id;
     
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
 }
    
 async removeWorkout(event: Workout) {
     const key = this.route.snapshot.params.id;
     
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
 }
 
  backToWorkouts() {
      this.router.navigate(['workouts']);
  }
}

// workouts/container/workout/ workout.component.scss ////////////////////
:host {
  display: block;
  margin: 50px 0;
}
.workout {
  position: relative;
  background: #fff;
  box-shadow: 0 3px 4px rgba(0,0,0,.1);
  border: 1px solid #c1cedb;
  border-radius: 3px;
  overflow: hidden;
  h1 {
    flex-grow: 1;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    font-size: 24px;
    img {
      margin: 0 10px 0 0;
      width: 24px;
      height: 24px;
    }
  }
  &__title {
    display: flex;
    align-items: center;
    padding: 30px;
    background: #f6fafd;
    border-bottom: 1px solid #c1cedb;
  }
}
.message {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 30px;
  font-size: 22px;
  font-weight: 500;
  img {
    margin: 0 10px 0 0;
  }
}

// workouts/components/workout-form/ workout-form.component.ts ////////////
import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
    selector: 'workout-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['workout-form.component.scss'],
    templateUrl: './workout-form.component.html'
})

// workouts/components/workout-form/ workout-form.component.scss //////////
%button {
  outline: 0;
  cursor: pointer;
  border: 0;
  background: transparent;
}
.confirm,
.cancel {
  @extend %button;
  padding: 5px 10px;
  margin: 0 0 0 5px;
  font-size: 14px;
}
.error {
  color: #a94442;
  background: #f2dede;
  border: 1px solid #e4b3b3;
  border-radius: 2px;
  padding: 8px;
  font-size: 14px;
  font-weight: 400;
  margin: 10px 0 0;
}
.confirm {
  color: #fff;
  background: #d73a49;
  border-radius: 3px;
  transition: all .2s ease-in-out;
  &:hover {
    background: darken(#d73a49, 3%);
  }
}

.workout-form {
  &__name {
    padding: 30px;
    flex-direction: column;
    border-bottom: 1px solid #d1deeb;
  }
  &__details {
    padding: 30px;
    border-bottom: 1px solid #d1deeb;
  }
  &__subtitle {
    display: flex;
    align-items: center;
    h3 {
      margin: 20px 0;
      flex-grow: 1;
    }
  }
  &__delete {
    display: flex;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      p {
        margin: 0;
      }
    }
    .cancel {
      margin: 0 20px 0 0;
    }
  }
  &__submit {
    display: flex;
    justify-content: space-between;
    padding: 30px;
  }
  h1 {
    flex-grow: 1;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    font-size: 24px;
    img {
      margin: 0 10px 0 0;
    }
  }
  h3 {
    font-size: 18px;
    font-weight: 600;
  }
  label {
    position: relative;
    display: block;
    margin: 0 0 10px;
    span {
      color: #7a98b5;
      font-size: 12px;
    }
  }
  &__fields {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    label {
      flex: 1 0;
      margin: 0 10px 10px 0;
      &:last-child {
        margin: 0 0 10px;
      }
    }
  }
  input {
    outline: 0;
    font-size: 16px;
    padding: 10px 15px;
    margin: 0;
    width: 100%;
    background: #fff;
    color: #545e6f;
    flex-grow: 1;
    border: 1px solid #d1deeb;
    border-radius: 3px;
    transition: all 0.2s ease-in-out;
    &:focus {
      border-color: #a5b9ce;
    }
    &::-webkit-input-placeholder {
      color: #aaa;
    }
  }
  .button {
    cursor: pointer;
    outline: 0;
    border: 0;
    border-radius: 2px;
    background: #39a1e7;
    color: #fff;
    padding: 10px 18px;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    display: inline-block;
    &:hover {
      background: darken(#39a1e7, 5%);
    }
    &:disabled {
      opacity: .4;
      cursor: not-allowed;
    }
    &--cancel {
      background: #fff;
      color: #545e6f;
      &:hover {
        background: #fff;
      }
    }
    &--delete {
      background: #d73a49;
      align-self: flex-start;
      &:hover {
        background: darken(#d73a49, 5%);
      }
    }
  }
}
