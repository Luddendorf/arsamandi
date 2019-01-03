// meals.service.ts //////////////////
@Injectable()
export class MealsService {
    
   meals
}

// services/workouts/ workouts.service.ts ////////////////////////

export interface Workout {
    name: string,
    type: string,
    strength: any,
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class WorkoutsService {
    
  workouts$: Observable<Workout[]> = this.db.list(`workouts/${this.uid}`).pipe(
    tap(next => this.store.set('workouts', next));
  );
    
  constructor(private store: Store,
              private db: AngularFireDatabase,
              private authService: AuthService) {}
  
  get uid() {
      return this.authService.user.uid;
  }
    
  getWorkout(key: string) {
    if(!key) return Observable.of({});
    
    return this.store.select<Workout[]>('workouts').pipe(
      filter(Boolean),
      map(workouts => workouts.find((workout: Workout) => workout.$key === key));
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

// shared/ shared.module.ts /////////////////////////////////////////

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

// store.ts ////////////////////////////////////////////////////////
import { Workout } from './health/shared/services/workouts/workouts.service';

export interface State {
    user: User,
    meals: Meal,
    workouts: Workout[],
    [key: string]: any
}

const state: State =  {
    user: undefined,
    meals: undefined,
    workouts: undefined
}

// workouts/ workouts.module.ts ///////////////////////////////////////
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

// workouts/containers/workout/ workout.component.ts //////////////////////
import { WorkoutService, Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
    selector: 'workout',
    styleUrls: ['workout.component.scss'],
    templateUrl: './workout.component.html'
})
export class WorkoutComponent implements OnInit, OnDestroy {
    
  workout$: Observable<Workout>;
  subscription: Subscription;
    
  constructor(private workoutsService: WorkoutService,
              private router: Router,
              private route: ActivatedRoute) {}
    
  ngOnInit() {
      this.subscription = this.workoutsService.workouts$.subscribe();
      
      this.workout$ = this.route.params.pipe(
        switchMap(param => this.workoutsService.getWorkout(param.id));
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
    
  backToWorkout() {
      this.router.navigate(['workouts']);
  }
}

// workouts/containers/workout/ workout.component.scss  //////////////////

// workouts/components/workout-form/ workout-form.component.scss ////////////

// workouts/components/workout-form/ workout-form.component.ts ///////////////
import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from  '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
    selector: 'workout-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['workout-form.component.scss'],
    templateUrl: './workout-form.component.html'
})
export class WorkoutFormComponent implements OnChanges {
   
   toggled = false;
   exists = false;
    
   @Input() workout: Workout;
    
   @Output() create = new EventEmitter<Workout>();
    
   @Output() update = new EventEmitter<Workout>();
    
   @Output() remove = new EventEmitter<Workout>();
    
   myForm = this.fb.group({
       name: ['', Validators.required]
   });
    
   constructor(private fb: FormBuilder) {}
   
  ngOnChanges(changes: SimpleChanges) {
/*    if(this.workout && this.workout.name) {
       this.exists = true;
       this.emptyIngreds();
        
      const value = this.workout;
       this.myForm.patchValue(value);
        
      if(value.ingredients) {
        for(const item of value.ingredients) {
            this.ingredients.push(new FormControl(item));
        }
      }
        
    } */
  }
    
/*  emptyIngreds() {
      while(this.ingreds.controls.length) {
          this.ingreds.removeAt(0);
      }
  } */
  /*
 getIngreds() {
     return this.myForm.get('ingreds') as FormArray;
 }
    
 addIngred() {
     this.ingreds.push(new FormControl(''));
 }
    
 removeIngred(index: number) {
     this.ingreds.removeAt(index);
 } */
 createWorkout() {
     if(this.myForm.valid) {
         this.create.emit(this.myForm.value);
     }    
 }
    
 updateWorkout() {
     if(this.myForm.valid) {
         this.update.emit(this.myForm.value);
     }
 }
    
 removeWorkout() {
       this.remove.emit(this.myForm.value);
 }
    
 toggle() {
     
 }
    
}

<!-- workout.component.html -->

<div class="workout">
  <div class="workout__title">
    <h1>
      <img src="/img/workout.svg">
      <span *ngIf="workout$ | async as workout; else title;">
        {{ workout.name ? 'Edit' : 'Create' }} workout
      </span>

      <ng-template #title>
        Loading...
      </ng-template>

    </h1>
  </div>

  <div *ngIf="workout$ | async as workout; else loading;">
    <meal-form [workout]="workout"
               (create)="addWorkout($event)"
               (update)="updateWorkout($event)"
               (remove)="removeWorkout($event)"
    ></meal-form>
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
  <form [formGroup]="myForm">
	  <div class="workout-form__name">
      <label>
        <h3>Workout name</h3>
        <input type="text"
               placeholder="e.g. English Breakfast"
               formControlName="name">

        <div class="error"
             *ngIf="required">
             Workout name is required
        </div>
      </label>
	  </div>

    <div class="workout-form__submit">
      <div>
        <button type="button"
                class="button"
                *ngIf="!exists"
                (click)="createWorkout()">Create workout
        </button>
        <button type="button"
               class="button"
               *ngIf="exists"
               (click)="updateWorkout()">Save
        </button>
        <a class="button button--cancel"
           [routerLink]="['../']">Cancel
        </a>
      </div>

      <div class="workout-form__delete"
           *ngIf="exists">
        <div *ngIf="toggled">
          <p>Delete item?</p>
          <button class="confirm"
                 type="button"
                  (click)="removeWorkout()">Yes
          </button>
          <button class="cancel"
                  type="button"
                  (click)="toggle()">No
          </button>
        </div>
      </div>
    </div>

  </form>
</div>
