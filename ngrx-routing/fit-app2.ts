// past-trains.component.ts //////////////////////////////
import { ViewChild, AfterViewInit } from '@angular/core';

import { MatTableDataSource, MatSort } from '@angular/material';

export class PastTrainsComponent implements OnInit, AfterViewInit {

  displayedColumns = ['date', 'name', 'duration', 'calories',
     'state'];
  
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainService: TrainingService) {}

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) myPaginator: MatPaginator;

  ngOnInit() {

    this.dataSource.data = this.trainService.getCompletedOrCancelled
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.myPaginator;
  }

  doFilter(filterValue: string) {
   
   this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


// material.module.ts //////////////
import { MatSortModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [MatSortModule, MatPaginatorModule],
  exports: [MatSortModule, MatPaginatorModule]
})





<div fxLayoutAlign="center center">
<mat-form-field fxFlex="40%">
	<input matInput type="text"
	      (keyup)="doFilter($event.target.value)"
				placeholder="Search...">
</mat-form-field>
</div>

<mat-table [dataSource]="dataSource"
           matSort>
  <ng-container matColumnDef="date">
		<mat-header-cell *matHeaderCellDef
		   mat-sort-header>Date</mat-header-cell>
		<mat-cell *matCellDef="let element">{{ element.date | date }}</mat-cell>
  </ng-container>

	<ng-container matColumnDef="name">
		<mat-header-cell *matHeaderCellDef
		 mat-sort-header>Name</mat-header-cell>
		<mat-cell *matCellDef="let element">{{ element.name }}</mat-cell>
	</ng-container>

	<ng-container matColumnDef="calories">
		<mat-header-cell *matHeaderCellDef
		 mat-sort-header>Calories</mat-header-cell>
		<mat-cell *matCellDef="let element">{{ element.calories | number }}</mat-cell>
	</ng-container>

  <ng-container matColumnDef="duration">
		<mat-header-cell *matHeaderCellDef
		 mat-sort-header>Duration</mat-header-cell>
		<mat-cell *matCellDef="let element">{{ element.duration | number }}</mat-cell>
  </ng-container>

	<ng-container matColumnDef="state">
		<mat-header-cell *matHeaderCellDef
		  mat-sort-header>State</mat-header-cell>
		<mat-cell>{{ element.state }}</mat-cell>
	</ng-container>

	<mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
  <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
</mat-table>

<mat-paginator [pageSize]="1"
               [pageSizeOptions]="[5, 10, 20]">
</mat-paginator>
