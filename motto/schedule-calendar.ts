// schedule.module.ts //////////////////////////////////

import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';

@NgModule({
   declarations: [
       ScheduleComponent,
       ScheduleCalendarComponent,
       ScheduleDaysComponent,
       ScheduleControlsComponent
   ]
})
export class ScheduleModule {}

// health/schedule/containers/schedule/ schedule.component.ts /////
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Store } from 'store';

import { ScheduleService } from '../../../shared/services/schedule/schedule.service';

@Component({
    selector: '',
    styleUrls: ['schedule.component.scss'],
    templateUrl: './schedule.component.html'
})
export class ScheduleComponent {
    
  date$: Observable<Date>;
  
  subscriptions: Subscription[] = [];
    
  constructor(private scheduleService: ScheduleService,
              private store: Store) {}
    
  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }
    
  ngOnInit() {
    
    this.date$ = this.store.select('date');+
    
    this.subscriptions = [
      this.scheduleService.scheudle$.subscribe()
    ];
  }
    
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
// health/schedule/containers/schedule/ schedule.component.scss /////
.schedule {
    position: relative;
    margin: 50px 0;
}

// health/schedule/components/schedule-calendar/ schedule-calendar.component.ts ///////////
import { Component, Input, Output, EventEmitter,
        OnChanges } from '@angular/core';

@Component({
    selector: 'schedule-calendar',
    styleUrls: ['schedule-calendar.component.scss'],
    templateUrl: './schedule-calendar.component.html'
})
export class ScheduleCalendarComponent implements OnChanges {
  
  selectedDayIndex: number;
    
  selectedDay: Date;
    
  selectedWeek: Date;
    
  @Input() set date(date: Date) {
      this.selectedDay = new Date(date.getTime());
  }
    
  @Output() change = new EventEmitter<Date>();
  
  constructor() {}
    
  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    
    const startDate = (new Date(startOfWeek.getFullYear(),
                                startOfWeek.getMonth(),
                                startOfWeek.getDate()));
      
   startDate.setDate(startDate.getDate() + (weekOffset * 7));
      
   this.change.emit(startDate);
  }
    
  private getStartOfWeek(date: Date) {
    
   const day = date.getDay();
      
   const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      
   return new Date(date.setDate(diff));
  }
    
  
  private getToday(date: Date) {
    let today = date.getDay() - 1;
    if(today < 0) {
        today = 6;
    }
    return today;
  }
  
 selectDay(index: number) {
   const selectedDay = new Date(this.selectedWeek);
    
   selectedDay.setDate(selectedDay.getDate() + index);
    
   this.change.emit(selectedDay);
 }
    
    
  ngOnChanges() {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }
}

// health/schedule/components/schedule-calendar/ schedule-calendar.component.scss ///////////
:host {
    display: block;
}
.calendar {
    background: #fff;
    box-shadow: 0 3px 4px rgba(0,0,0, 0.1);
    border: 1px solid #c1cedb;
    border-radius: 3px;
    overflow: hidden;
}

// health/schedule/components/schedule-days/ schedule-days.component.ts ////////
import { Component, Input, Output, EventEmitter,
       ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'schedule-days',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['schedule-days.component.scss'],
    templateUrl: './schedule-days.component.html'
})
export class ScheduleDaysComponent {
  
 days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    
 @Input() selected: number;
 
 @Output() select = new EventEmitter<number>();
   
 selectDay(index: number) {
    this.select.emit(index);
 }
}

// health/schedule/components/schedule-days/ schedule-days.component.scsss ////////


// health/schedule/components/schedule-controls/ schedule-controls.component.ts //////////////////
import { Component, Input, Output, EventEmitter,
       ChangeDetectionStrategy } from '@angular/core';
/*
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';
import { ScheduleService } from '../../../shared/services/schedule/schedule.service'; */

@Component({
    selector: 'schedule-controls',
    changeDetection: ChangeDetectionStategy.OnPush,
    styleUrls: ['schedule-controls.component.scss'],
    templateUrl: './schedule-controls.component.html'
})
export class ScheduleControlsComponent implements OnInit, OnDestroy {
    
  offset = 0;
   
  @Input() selected: Date;
  @Output() move = new EventEmitter<number>();
    
  moveDate(offset: number) {
   this.offset = offset;
   this.move.emit(offset);
  }
}
// health/schedule/components/schedule-controls/ schedule-controls.component.scss //////////////////




// shared/services/schedule/ schedule.service.ts //////////////
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { Store } from 'store';

@Injectable()
export class ScheduleService {
    
  private date$ = new BehaviorSubject(new Date());
    
  schedule$: Observable<any[]> = this.date$.pipe(
    tap((next: any) => this.store.set('date', next));
  );
    
  constructor(private store: Store) {}
    
  updateDate(date: Date) {
    this.date$.next(date);
  }
}

// shared/ shared.module.ts /////////////////////
import { ScheduleService } from './services/schedule/schedule.service';

export class SharedModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [MealsService,
                    WorkoutSerivce,
                    ScheduleService]
      };
    }
}

// store.ts ///////////////////////

export interface State {
    user: User,
    meals: Meal[],
    date: Date,
    workouts: Workout[],
    [key: string]: any
}

const state: State = {
    user: undefined,
    meals: undefined,
    date: undefined,
    workouts: undefined
}



<!-- // health/schedule/components/schedule-controls/
schedule-controls.component.html -->
<div class="controls">

 <button type="button"
         (click)="moveDate(offset - 1)">
  <img src="img/chevron-left.svg">
 </button>
 <p>{{ selected | date:'yMMMMd' }}</p>
 <button type="button"
         (click)="moveDate(offset + 1)">
  <img src="img/chevron-right.svg">
 </button>

</div>

<!-- // health/schedule/components/schedule-days/
schedule-days.component.html -->
<div class="days">
  <button type="button"
          class="day"
          *ngFor="let day of days; index as i;"
          (click)="selectDay(i)">
    <span [class.active]="i === selected"
    >{{ day }}</span>
  </button>
</div>

<!-- // health/schedule/components/schedule-calendar/
  schedule-calendar.component.ts -->
<div class="calendar">
  <schedule-controls [selected]="selectedDay"
                     (move)="onChange($event)">
  </schedule-controls>

  <schedule-days [selected]="selectedDayIndex"
                 (select)="selectDay($event)">
  </schedule-days>

</div>

<!-- // health/schedule/containers/schedule/ schedule.component.ts -->
<div class="schedule">
  <schedule-calendar [date]="date$ | async"
                     (change)="changeDate($event)">
  </schedule-calendar>
</div>
