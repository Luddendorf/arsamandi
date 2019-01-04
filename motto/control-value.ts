<!-- workouts.component.html -->
<div class="workouts">
 <div class="workouts__title">
   <h1>
     <img src="/img/workout.svg">Your workouts
   </h1>
   <a class="btn__add"
      [routerLink]="['../workouts/new']">
      <img src="/img/add-white.svg">New workout
   </a>
 </div>
 
 <div *ngIf="workouts$ | async as workouts; else loading;">
   <div class="message"
        *ngIf="!workouts.length">
     <img src="/img/face.svg">
     No workouts, add a new one to start
   </div>
   <list-item *ngFor="let workout of workouts"
              [item]="workout"
              (remove)="removeWorkout($event)">
   </list-item>
 </div>

 <ng-template #loading>
   <div class="message">
     <img src="/img/loading.svg">Fetching workouts...
   </div>
 </ng-template>

</div>

<!-- workout-form.component.html -->
<div class="workout-form__name">
  <label>
    <h3>Workout name</h3>
    <input type="text"
           placeholder="e.g. Push-ups"
           formControlName="name">
    <div class="error"
         *ngIf="required">
         Workout name is required
    </div>
  </label>

  <label>
    <h3>Type</h3>
    <workout-type formControlName="type">
    </workout-type>
  </label>

</div>

<div class="workout-form__submit">
  <div>
  </div>
</div>

<!-- workout-type.component.html -->
<div class="workout-type">
  <div class="workout-type__pane"
      *ngIf="let selector of selectors"
      [class.active]="selector === value"
      (click)="setSelected(selector)">
    <img src="/img/{{ selector }}.svg">
    <p>{{ selector }}</p>
  </div>
</div>

<!-- garage.component.html -->
<div class="form-group">
  <label for="car-one">Car #1<span class="text-danger">*</span></label>
  <app-car id="car-one"
          formControlName="carOne"></app-car>

  <p class="text-danger"
     *ngIf="form.get('carOne').dirty && form.get('carOne').hasError('required')"
     >Car #1 is required</p>
</div>

<!-- car.component.html -->
<input type="text"
       [value]="value"
       class="form-control" />
       
       
       
       // workouts/containers/workouts/ workouts.component.ts ///////////////////
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';

@Component({
    selector: 'workouts',
    styleUrls: ['workouts.component.scss'],
    templateUrl: './workouts.component.html'
})

export class WorkoutsComponent implements OnInit, OnDestroy {
    
  workouts$: Observable<Workout[]>;
  subscription: Subscription;
    
  constructor(private store: Store,
              private workoutsService: WorkoutsService) {}
  
  ngOnInit() {
    this.workouts$ = this.store.select<Workout[]>('workouts');
    this.subscription = this.workoutsService.workouts$.subscribe();
  }
    
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
    
  removeWorkout(event: Workout) {
    this.workoutsService.removeWorkout(event.$key);
  }
}

// src/health/workouts/containers/workouts/workouts.component.scss ///////
:host {
  display: block;
  margin: 50px 0;
}
.workouts {
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
.btn__add {
  display: flex;
  align-items: center;
  color: #fff;
  background: #97c747;
  border-radius: 50px;
  padding: 6px 20px 6px 15px;
  text-transform: uppercase;
  font: {
    weight: 600;
    size: 13px;
  }
  img {
    width: 20px;
    margin: 0 6px 0 0;
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

// workout-form.component.ts //////////////////////////////////
workoutForm = this.fb.group({
    name: ['', Validators.required],
    type: 'strength', 
})


// workouts/components/workout-type/ workout-type.component.ts ////////////
import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TYPE_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WorkoutTypeComponent),
    multi: true
};

@Component({
    selector: 'workout-type',
    providers: [TYPE_CONTROL_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['workout-type.component.scss'],
    templateUrl: './workout-type.component.html'
})
export class WorkoutTypeComponent implements ControlValueAccessor {
    
  selectors = ['strength', 'endurance'];
    
  value: string;
    
  private onTouch: Function;
  private onModelChange: Function;
  
    
  registerOnTouched(fn: Function) {
   this.onTouch = fn; 
  }
    
  registerOnChange(fn: Function) {
      this.onModelChange = fn;
  }
    
  writeValue(value: string) {
   this.value = value;   
  }
}


// workouts/components/workout-type/ workout-type.component.scss //////////
.workout-type {
  display: flex;
  &__pane {
    flex: 0 0 30%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    margin: 0 15px 0 0;
    background: #f5f9fd;
    border: 1px solid #d1deeb;
    border-radius: 3px;
    transition: all .2s ease-in-out;
    &:hover {
      background: darken(#f5f9fd, 3%);
    }
    &.active {
      background: darken(#f5f9fd, 3%);
      img, p {
        opacity: 1;
      }
    }
    img {
      opacity: .6;
      margin: 0 25px 0 0;
      width: 35px;
    }
    p {
      opacity: .6;
      margin: 0;
      font-size: 15px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 3px;
    }
  }
}

// workouts.module.ts ////////////////////
import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';

@NgModule({
    declarations: [
        WorkoutTypeComponent
    ]
})
export class WorkoutsModule {}

// car.component.ts ///////////////////////////
import { forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-car',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CarComponent),
        multi: true
    }]
})

export class CarComponent implements ControlValueAccessor {
    
 value: string;
    
 writeValue(obj: any) {
     
 }
 
 registerOnChange(fn: ) {
     
 }
 
 registerOnTouched(fn: ) {
     
 }
    
 setDisabledState?(isDisabled: boolean) {
     
 }
   
  constructor() {}
}
