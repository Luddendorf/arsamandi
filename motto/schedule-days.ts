// schedule.module.ts ////////////////////////////
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls';

@NgModule({
    
})

// schedule/components/ schedule-calendar.component.ts ////////////////////
import { Input, Output, EventEmitter, OnChanges } from '@angular/core';

export class ScheduleCalendarComponent implements OnChanges {
  
  selectedDayIndex: number;
  selectedDay: Date;
  selectedWeek: Date;
    
  @Input() set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }
    
  @Output() change = new EventEmitter<Date>();
    
  constructor() {}
  
  // update day:
  selectDay(index: number) {
      
    const selectedDay = new Date(this.selectedWeek);
      
    selectedDay.setDate(selectedDay.getDate() + index);
      
    this.change.emit(selectedDay);
  }
    
  onChange(weekOffset: number) {
    
    const startOfWeek = this.getStartOfWeek(new Date());
      
    const startDate = (
      new Date(startOfWeek.getFullYear(),
               startOfWeek.getMonth(),
               startOfWeek.getDate())
    );
      
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
      
    this.change.emit(startDate);
  }
    
  private getStartOfWeek(date: Date) {
    
   const date = date.getDay();
      
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
    
  // lifecycle hooks:
  ngOnChanges() {
    
    this.selectedDayIndex = this.getToday(this.selectedDay);
        
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }
  
}

// schedule/components/ schedule-days.component.ts /////////////////////
import { Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

export class ScheduleDaysComponent {
    
  days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  
  @Input() selected: number;
    
  @Output() select = new EventEmitter<number>();
    
  selectDay(index: number) {
    
    this.select.emit(index);
  }
}

// schedule/components/ schedule-controls.component.ts ////////////////
import { Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export class ScheduleControlsComponent {
    
  offset = 0;
  
  @Input() selected: Date;
  
  @Output() move = new EventEmitter<number>();
    
  moveDate(offset: number) {
   
   this.offset = offset;
      
   this.move.emit(offset);
  }
}

// schedule.component.ts //////////////////////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from 'store';
import { Subscription } from 'rxjs';
import { ScheduleService } from '../../../shared/services/schedule/schedule.service';

export class ScheduleComponent implements OnInit, OnDestroy {
   
  date$: Observable<Date>;
    
  subscriptions: Subscription[] = [];
    
  constructor(private scheduleService: ScheduleService,
              private store: Store) {}
    
  // updating date:
  changeDate(date: Date) {
    
    this.scheduleService.updateDate(date);
  }
    
  ngOnInit() {
    
   this.date$ = this.store.select('date');
   
   this.subscriptions = [
       this.scheduleService.schedule$.subscribe();
   ];
  }
    
  ngOnDestroy() {
    
   this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

// schedule.service.ts /////////////////////
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
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


<!-- schedule-controls.component.html -->
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

<!-- schedule-days.component.html -->
<div class="days">
  <button class="day"
         type="button"
         *ngFor="let day of days; index as i;"
         (click)="selectDay(i)">
    <span [class.active]="i === selected">
      {{ day }}</span>
  </button>
</div>

<!-- schedule-calendar.component.html -->
<div class="calendar">
  
  <schedule-controls [selected]="selectedDay"
                     (move)="onChange($event)">
  </schedule-controls>

  <schedule-days [selected]="selectedDayIndex"
                 (select)="selectDay($event)">
  </schedule-days>

</div>

<!-- schedule.component.html -->
<div class="schedule">

  <schedule-calendar [date]="date$ | async"
                     (change)="changeDate($event)">
  </schedule-calendar>

</div>
