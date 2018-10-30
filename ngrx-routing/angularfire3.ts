//  training.service.ts //////////////////////////
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TrainService {

exerChanged = new Subject<Exercise>();

exersChanged = new Subject<Exercise[]>();

finishedExersChanged = new Subject<Exercise[]>();

private availableExers: Exercise[] = [];
private runningExer: Exercise;
// private finishedExers: Exercise[] = [];

constructor(private myDB: AngularFirestore) {}

  fetchAvailableExers() {

    this.myDB.collection('availableExers')
      .snapshopChanges().pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories
            };
          });
        })
                         )
      .subscribe((exers: Exercise[]) => {

       this.availableExers = exers;

       this.exersChanged.next([...this.availableExers]);
      });
  }

  completeExer() {

    this.addDataToDatabase({
      ...this.runningExer,
      date:new Date(),
      state: 'completed'
    });

    this.runningExer = null;

    this.exerChanged.next(null);
  }

  cancelExer(progress: number) {
    
    this.addDataToDatabase({
      ...this.runningExer,
      duration: this.runningExer.duration * (progress / 100),
      calories: this.runningExer.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });

    this.runningExer = null;
    this.exerChanged.next(null);
  }

  getRunningExer() {
    return { ...this.runningExer };
  }

  fetchCompletedOrCancelledExers() {
    
    this.myDB.collection('finishedExers')
      .valueChanges().subscribe((exers: Exercise[]) => {
        
        this.finishedExersChanged.next(exers);
      });
  }

  private addDataToDatabase(exer: Exercise) {
  
    this.myDB.collection('finishedExers').add(exer);
  }

}

// new-train.component.ts /////////////////////////
export class NewTrainComponent implements OnInit {

  exers: Exercise[];

  exersSubscription: Subscription;

  constructor(private trainService: TrainingService) {}
   
  ngOnInit() {

  this.exersSubscription = 
      this.trainService.exersChanged.subscribe(exers => {
        this.exers = exers;
      });

  this.trainService.fetchAvailableExers();
  }

  ngOnDestroy() {
    this.exersSubscription.unsubscribe();
  }
}

// past-trains.component.ts ///////////////////////////////
import { AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class PastTrainsComponent implements OnInit, AfterViewInit,
   OnDestroy {
  
  displayedColumns = ['date', 'name', 'duration'];
  dataSource = new MatTableDataSource<Exercise>();
  private exersChangedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
   
   this.exersChangedSubscription = 
    this.trainService.finishedExersChanged.subscribe(
      (exers: Exercise[]) => {
        this.dataSource.data = exers;
      });

    this.trainService.fetchCompletedOrCancelledExers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    
    this.dataSource.filter = filterValue.trim().loLowerCase();
  }

  ngOnDestroy() {
    
    this.exersChangedSubscription.unsubscribe();
  }
}

// new-train.component.html /////////////////////////////////////////////////////
<mat-select>
	<mat-option *ngFor="let exer of exers"
	            [value]="exer.id">
	</mat-option>
</mat-select>


//////////////////  REPEAT ///////////////////////////////////////////
// training.service.ts //////////////////////////////////////

export class TrainingService {

  finishedExersChanged = new Subject<Exercise[]>();



  fetCompletedOrCancelledExers() {

    this.db.collection('finishedExers').valueChanges()
       .subscribe((exers: Exercise[]) => {
        
        this.finishedExersChanged.next(exers);
       });
  }

  startExer(selectedId: string) {

    /* this.myDB.doc('availableExers/' + selectedId).update({
       lastSelected: new Date()
    }); */

    this.runningExer = this.availableExers.find(
      exer => exer.id === selectedId
    );
    this.exerChanged.next({...this.runningExer});
  }


}

// past-trains.component.ts ///////////////////////////////////////
export class PastTrainsComponent {

  private exersChangedSubscription: Subscription;

  ngOnInit() {
   
   this.exersChangedSubscription = 
    this.trainService.finishedExersChanged
      .subscribe((exers: Exercise[]) => {

        this.dataSource.data = exers;
      });

    this.trainService.fetchCompletedOrCancelledExers()
  }

  ngOnDestroy() {
    this.exersChangedSubscription.unsubscribe();
  }
