// signup.component.html ///////////////////////////////////////////
https://coub.com/view/1gsicg

<form fxLayout="column"
      fxLayoutAlign="center center"
			fxLayoutGap="10px">

<mat-form-field>
  <input type="email"
	       matInput
				 placeholder="Your email"
				 ngModel
				 name="email"
				 required
				 #emailInput="ngModel">
	<mat-error *ngIf="emailInput.hasError('required')"
	>Field must not be empty.</mat-error>
	<mat-error *ngIf="!emailInput.hasError('required')"
	>Error is invalid.</mat-error>
</mat-form-field>

<mat-form-field hintLabel="Should have at least 6 letters">
	<input type="password"
	       matInput
				 placeholder="Your password"
				 ngModel
				 name="password"
				 required minlength="6"
				  #pwInput="ngModel">
  <mat-hint align="end">{{ pwInput.value?.length }} / 6</mat-hint>
</mat-form-field>

<mat-form-field>
	<input matIput
	       placeholder="Your birthday"
				  [matDatepicker]="picker"
				  [max]="maxDate"
				 ngModel
				 name="birthdate"
				 required>
	<mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
	<mat-datepicker #picker></mat-datepicker>
</mat-form-field>

<mat-checkbox labelPosition="before"
             ngModel
						 name="agree"
						 color="primary"
						 required
>Agree to terms and conditions.</mat-checkbox>

<button type="submit"
      mat-raised-button
			color="primary"
			[disabled]="myForm.invalid">Submit</button>

<!--  app.component.html -->
<mat-sidenav-container>
<mat-sidenav #sidenav
            role="navigation">
  <mat-nav-list>
		<a mat-list-item routerLink="/signup"
		   (click)="sidenav.close()">
		  <mat-icon>face</mat-icon>
			<span class="nav-caption">Signup</span>
		</a>
		<a mat-list-item routerLink="/login"
		 (click)="sidenav.close()">
		 <mat-icon>input</mat-icon>
		 <span class="nav-caption">Login</span>
		</a>
		<a mat-list-item routerLink="/training"
		 (click)="sidenav.close()">
		 <mat-icon>fitness_center</mat-icon>
		 <span class="nav-caption">Training</span>
		</a>
		<mat-list-item>
		 <button mat-icon-button (click)="sidenav.close()">
			 <mat-icon>eject</mat-icon>
		   <span class="nav-caption">Logout</span>
		 </button>
		</mat-list-item>
	</mat-nav-list>
</mat-sidenav>

<mat-sidenav-content>
	
 <mat-toolbar color="primary">
	 <div fxHide.gt-xs>
		 <button mat-icon-button
		         (click)="sidenav.toggle()">
			<mat-icon>menu</mat-icon>
			</button>
	 </div>
	 <div><a routerLink="/">LOGO</a></div>
	 <div fxFlex fxLayout fxLayoutAlign="flex-end"
	     fxHide.xs>
		 <ul fxLayout fxLayoutGap="10px"
		    class="navigation-items">
			<li><a routerLink="/signup">Signup</a></li>
			<li><a routerLink="/login">Login</a></li>
			<li><a routerLink="training">Training</a></li>
			<li><a routerLink="training">Logout</a></li>
		</ul>

	 </div>
 </mat-toolbar>
   <main>
		<router-outlet></router-outlet>
	 </main>
</mat-sidenav-content> 
</mat-sidenav-container>

<!--  index.html -->
<link href="https://fonts.googleapis.com/css?family=Roboto"
  rel="stylesheet">

<!--  styles.css -->
html, body {
	font-family: 'Roboto', sans-serif;
	 height: 100%;
}

body {margin:0;
      }

<!-- app.component.css -->

mat-sidenav-container, mat-sidenav-content,
mat-sidenav {
	height: 100%;
}

mat-sidenav {
	width: 250px;
}

a {
	text-decoration: none;
	color: white;
}

a:hover, a:active {
	color: lightgray;
}

.navigation-items {
	list-style: none;
	padding: 0;
	margin: 0;
}

.nav-caption {
	display: inline-block;
	padding-left: 6px;
}

<!-- <button (click)="sidenav.toggle()">Show sidenav</button> -->




// material.module.ts ///////////////////////////////////

import { MatDatepickerModule, MatNativeDateModule,
  MatCheckboxModule, MatSidenavModule, MatToolbarModule,
  MatListModule } from '@angular/material';

imports: [MatDatepickerModule, MatNativeDateModule,
 MatCheckboxModule, MatSidenavModule, MatToolbarModule,
  MatListModule],
exports: [MatDatepickerModule, MatNativeDateModule,
 MatCheckboxModule, MatSidenavModule, MatToolbarModule,
  MatListModule]

// signup.component.ts ///////////////////////////////////
export class SignupComponent implements OnInit {

  maxDate;

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

}

// app.component.ts ///////////////////////////////////////
export class AppComponent {
  
@ViewChild('sidenav')

  onToggle() {
    
  }
}


<mat-drawer-container>
<
/////////////////////////////////////////////////////////////////////

<!-- app.component.html -->

<mat-sidenav-container>
  <mat-sidenav #sidenav
                role="navigation">
   
  </mat-sidenav>
  <mat-sidenav-content>
    <button (click)="sidenav.toggle()"
            >Show sidenav</button>
    
    <mat-toolbar color="primary">
      <div fxHide.gt-xs>
        <button mat-icon-button
                (click)="sidenav.toggle()">
         <mat-icon>menu</mat-icon>
        </button>
      </div>
      <div><a routerLink="/">LOGO</a></div>
      <div fxFlex fxLayout fxLayoutAlign="flex-end"
           fxHide.xs>
        <ul fxLayout class="navigation-items"
            fxLayoutGap="10px">
          <li><a routerLink="/signup">Signup</a></li>
          <li><a routerLink="/login">Login</a></li>
          <li><a routerLink="training">Training</a></li>
        </ul>
      </div>
    </mat-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  <mat-sidenav-content>
</mat-sidenav-container>

<!-- styles.css -->
    html, body {
     font-family: 'Roboto', sans-serif;
     height: 100%;
    }
    
    body {
      margin: 0;
      height: 100%;
    }
    
<!-- app.component.css -->
    
 mat-sidenav-container,
 mat-sidenav-content,
 mat-sidenav {
    height: 100%;
 }
    
mat-sidenav {
    width: 250px;
    }
 
 

// ng generate component navigation/toolbar --module app.module ///////////


//ng generate component navigation/sidenav-list --module app.module //////////
// sidenav-list.component.html //////////////////////////////////////////////

 <mat-nav-list>
      <a mat-list-item routerLink="/signup"
         (click)="onClose()">
        <mat-icon>face</mat-icon>
        <span class="nav-caption">Signup</span>
      </a>
      <a mat-list-item routerLink="/login"
         (click)="onClose()">
        <mat-icon>input</mat-icon>
        <span class="nav-caption"></span>
      </a>
      <a mat-list-item routerLink="/training"
         (click)="onClose()">
        <mat-icon>fitness_center</mat-icon>
        <span class="nav-caption">Training</span>
      </a>
      <mat-list-item>
        <button mat-icon-button
                (click)="onClose()">
          <mat-icon>eject</mat-icon>
          <span class="nav-caption">Logout</span>
        </button>
      </mat-list-item>
    </mat-nav-list>

// sidenav-list.component.css /////////////////////////////////////////////

a {
    text-decoration: none;
    color: white;
    }
 
a:hover,
a:active {
    color: lightgray;
    }

// sidenav-list.component.ts ////////////////////////////////////////////
import { EventEmitter, Output } from '@angular/core';

export class SidenavListComponent implements OnInit {
  
	@Output() closeSidenav = new EventEmitter<void>();
	
	constructor() {}
	
	onClose() {
	  
		this.closeSidenav.emit();
	}
}


// header.component.css //////////////////////////////////////////////////
a {
    text-decoration: none;
    color: white;
    }
 
a:hover,
a:active {
    color: lightgray;
    }

.navigation-items {
    list-style: none;
    padding: 0;
    margin: 0;
    }

.nav-caption {
    display: inline-block;
    padding-left: 6px;
    }

// header.component.html //////////////////////////////////////////////////

    <mat-toolbar color="primary">
      <div fxHide.gt-xs>
        <button mat-icon-button
                (click)="onToggleSidenav()">
         <mat-icon>menu</mat-icon>
        </button>
      </div>
      <div><a routerLink="/">LOGO</a></div>
      <div fxFlex fxLayout fxLayoutAlign="flex-end"
           fxHide.xs>
        <ul fxLayout class="navigation-items"
            fxLayoutGap="10px">
          <li><a routerLink="/signup">Signup</a></li>
          <li><a routerLink="/login">Login</a></li>
          <li><a routerLink="training">Training</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </mat-toolbar>

// header.component.ts /////////////////////
import { EventEmitter, Output } from '@angular/core';

export class HeaderComponent implements OnInit {
   
 @Output() sidenavToggle = new EventEmitter<void>();
	
  constructor() {}
  ngOnInit() {
    
  }
	
	onToggleSidenav() {
	  
		this.sidenavToggle.emit();
	}
}

<!-- app.component.html -->

<mat-sidenav-container>
  <mat-sidenav #sidenav
                role="navigation">
    <app-sidenav-list (closeSidenav)="sidenav.close()"
                      ></app-sidenav-list>
  </mat-sidenav>
  <mat-sidenav-content>
    <app-header (sidenavToggle)="sidenav.toggle()"
                ></app-header>
    
    <main>
      <router-outlet></router-outlet>
    </main>
  <mat-sidenav-content>
</mat-sidenav-container>
    











