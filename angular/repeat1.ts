@Component({
  
})

export class AuTabPanelComponent implements AfterContentInit {
  
  @ContentChildren(AuTabComponent) tabs: QueryList<AuTabComponent>;

  @ContentChild(DateViewComponent) dateView: DateViewerComponent;

  @Input() headerTemplate: TemplateRef<any>;

  ngAfterContentInit() {

    const selectdTab = this.tabs.find(tab => tab.selected);

    if(!selectedTab && this.tabs.first) {
      this.tabs.first.selected = true;
    }

    selectTab(tab: AuTabComponent) {

    this.tabs.forEach(tab => tab.selected = false);
    tab.selected = true;
    }

    get tabsContext() {
      return {
        tabs: this.tabs
      }  
    }

  }
}

/// au-modal-open-on-click.directive.ts ////////////////////

import { Directive } from '@angular/core';

@Directive({
  selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective {

  constructor() {}


}

// au-modal.module.ts ////////////////////////
import { AuModalOpenOnClickDirective } from './au-modal-open-on-click.directive';

@NgModule({
  declarations: [
    AuModalComponent,
    AuModalOpenOnClickDirective],
  imports: [

  ],
  exports: [
    AuModalComponent,
    AuModalOpenOnClickDirective
  ]
})
export class AuModalModule {}


// crib-card.component.ts /////////////////

export class CribCardComponent implements OnInit {

  @Input('crib') crib: any;

  constructor() {}

  ngOnInit() {

  }
}


// app.module.ts ////////////////////////////////////////////////////
import { PopupModule } from 'ng2-opd-popup';

@NgModule({
  imports: [
    PopupModule
  ],
  providers: [],
  bootstap: [AppComponent],
  entryComponents:[EmployeeComponent]
})


// app.component.ts /////////////////////
import { Popup } from 'ng2-opd-popup';

@Component({

})
export class AppComponent {

  constructor(private popup: Popup) {}

  clickButton() {
  
    this.popup.option = {
      color: "red"
    };
    this.popup.show();
  }
}

// material.module.ts ////////////////////////////////
@NgModule({
  imports: [MatDialogModule],
  exports: [MathDialogModule]
})
export class MaterialModule {}



// employee-list.component.ts //////////////////
import { MatDialog, MatDialogConfig } from '@angular/material';

export class EmployeeListComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'departmentName'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey: string;

  ngOnInit() {
    this.service.getEmployees().subscribe(

     list => {
       let array = list.map(item => {
         let departmentName = this.departmentService.getDepartmentName(item.payload.val()['departmentName']);
         return {
           $key: item.key,
           departmentName,
           ...item.payload.val()
         };
       });
     }
    );
  }
 
onSearchClear() {
  this.searchKey = "";
  this.applyFilter();
}

applyFilter() {
  this.listData.filter = this.searchKey.trim().toLowerCase();
}

onCreate() {
  this.service.initializeFormGroup();

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autofocus = true;
  dialogConfig.width = "60%";

  this.dialog.open(EmployeeComponent, dialogConfig);
}

onEdit(row) {
  
}

}

// employee.component.ts /////////////////////////////////////////
import { MatDialogRef } from '@angular/material';

export class EmployeeComponent {

  constructor(public dialogRef: MatDialogRef<EmployeeComponent>) {}

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if(this.service.form.valid) {
      this.service.insertEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitter successfully');
      this.onClose();
    }
  }


  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}



<!-- ул. Академика Королева № 11/1, двухкомнатная. -->

<div class="course-card" #container>

    <div class="course-title">
      {{ course.description }}
    </div>

    <ng-content select="course-image" *ngIf="course.iconUrl; else blankImage"></ng-content>
    <ng-content select=".course-description"></ng-content>

    <div class="course-category" [ngSwitch]="course.category">
      <div class="category" *ngSwitchCase="'BEGINNER'">Beginner</div>
      <div class="category" *ngSwitchCase="'MIDDLE'">Middle</div>
      <div class="category" *ngSwitchCase="'HIGH'">high</div>
    </div>


    <ng-template #blankImage>
      <p>No image yet.</p>
      <img src="/assets/empty.jpg">
    </ng-template>

    <ng-template #defaultTabsHeader let-tabs="tabs">

      <ul>
        <li [ngClass]="{selected: tab.selected}"
            (click)="selectTab(tab)"
             *ngFor="let tab of tabs">{{ tab.title }}</li>
      </ul>

    </ng-template>

    <ng-container *ngTemplateOutlet="defaultTabsHeader; context:tabsContext">
    </ng-container>

    <ng-content></ng-content>


    <!--Method 1-->
    <ng-template [ngIf]="home">Go Home!</ng-template>

    <!-- Method 2 -->
    <ng-template *ngIf="home then goHome"></ng-template>
    <ng-template #goHome>Go Home!</ng-template>

    <ng-container *ngFor="let item of items">
      <div *ngIf="item.id">{{ item.name }}</div>
    </ng-container>



</div>

<!-- project-content.html -->
<div class="heading">
  <h1>Welcome to content projection</h1>
</div>

<div class="body">'
  <div>Some content...</div>
</div>

<div class="footer">
  <ng-content></ng-content>
</div>


<project-content>
  <div>This is custom footer...</div>
</project-content>


<!-- project-content.html  REFACTORED -->
<div class="heading">
  <ng-content select="h1"></ng-content>
</div>
  
<div class="body">'
  <ng-content select="div"></ng-content>
</div>
  
<div class="footer">
    <ng-content></ng-content>
</div>

<!-- Calling of <project-content> component in parent component -->
<project-content>
  <h1>Header for first ng-content</h1>
  <div>Div for second ng-content</div>
  <span>Span for third ng-content</span>
</project-content>


<!-- *ngTemplateOutlet  -->
<div>
  <ng-container *ngTemplateOutlet="companyLogoTemplate"></ng-container>
  <h1>Company History</h1>
  <div>{{ companyHistory }}</div>
</div>

<form (ngSubmit)="onSubmit()">
  <ng-container *ngTemplateOutlet="companyLogTemplate"></ng-container>
  <h1>User info</h1>
  <label>Name:</label><input type="text" [(ngModel)]="userName"/>
  <label>Account ID:</label><input type="text" [(ngModel)]="accountId"/>
  <button>Submit</button>
</form>

<div class="footer">
  <ng-container *ngTemplateOutlet="companyLogoTemplate"></ng-container>
</div>

<ng-template #companyLogoTemplate>
  <div class="companyLogo">
    <img [src]="logoSourceUrl">
    <label>The company, {{ employeeCount }} people working for you!</label>
  </div>
</ng-template>


<!-- *ngTemplateOutlet Second use case -->

@Component({
  selector: 'project-content',
  templateUrl: './project-content.html',
  styleUrls: ['./project-content.scss']
})
export class AppComponent {

  @Input() headerTemplate: TemplateRef<any>;
  @Input() bodyTemplate: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;

  constructor() {}
}


<div class="heading">
  <ng-container *ngTemplateOutlet="headerTemplate ? headerTemplate : defaultHeader"></ng-container>
</div>
<div class="body">
    <ng-container *ngTemplateOutlet="bodyTemplate ? bodyTemplate : defaultBody"></ng-container>
</div>
<div class="footer">
    <ng-container *ngTemplateOutlet="footerTemplate ? footerTemplate : defaultFooter"></ng-container>
</div>

<ng-template #defaultHeader>Some header...</ng-template>
<ng-template #defaultBody>Some body...</ng-template>
<ng-template #defaultFooter>Some footer...</ng-template>



<!-- app.component.html -->

<div>
  
  <ng-template #headerButtons>
    <button (click)="tabPanel.selectTab(loginTab)">Login</button>
    <button (click)="tabPanel.selectTab(signupTab)">Sign up</button>
  </ng-template>

  <au-tab-panel #tabPanel [headerTeamplate]="headerButtons">

    <au-tab #loginTab>
    </au-tab>

    <au-tab #signupTab>

    </au-tab>

  </au-tab-panel>

</div>

<!-- au-tab-panel.html -->
<ng-template #defaultTabsHeader let-tabs="tabs">

  <ul>

  </ul>
</ng-template>

<ng-container *ngTemplateOutlet="headerTemplate ? headerTeamplate : defaultTabsHeader;"></ng-container>

<ng-content>></ng-content>









<!-- app.component.html -->

<div class="container">

  <h1>Modal Example</h1>

  <ng-template #authModalBody>

    <au-tab-panel>
    </au-tab-panel>

  </ng-template>

  <au-modal [body]="authModalBody" *auModalOpenOnClick="[loginButton, signupButton]">

  </au-modal>




  <div>
    
    <button #loginButton>Login</button>

    <button #signupButton>Sign Up</button>

  </div>

</div>

<!-- crib-listing.component.html -->
<div *ngFor="let crib of cribs">
  <app-crib-card class="col-sm-4" [crib]="crib"></app-crib-card>
</div>


<!-- crib-card.component.html -->
<div class="thumbnail">

  <img src="assets/images/{{ crib.image }}.jpg" alt="">

  <div class="caption">
    <div *ngIf="!crib.showDetails">
      <h4>
        <span class="label label-primary">
          {{ crib.type }}
        </span>
      </h4>
      <h3>
        <i class="glyphicon glyphicon-tag"></i>
        {{ crib.price | currency:'USD':true }}
      </h3>
    </div>
  </div>

</div>

<!-- app.component.html -->
<h1>{{ title }}</h1>

<popup>Wrong password.</popup>

<button (click)="clickButton()">Login</button>


<!-- employee-list.component.html -->

<div class="search-div">
  <button mat-raised-button
          (click)="onCreate()"></button>

</div>

<button (click)="onEdit(row)">launch</button>
