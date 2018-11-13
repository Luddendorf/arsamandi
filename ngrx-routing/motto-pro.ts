https://coub.com/view/1hvwdh

// auth-remember.component.ts /////////////////////////
export class AuthRememberComponent {

  @Output() checked: EventEmitter<boolean> = new EventEmitter<boolean>();

  onChecked(value: boolean) {
    this.checked.emit(value);
  }
}


// app.component.ts /////////////////////////////
export class AppComponent {

  rememberMe: boolean = false;

  rememberUser(remember: boolean) {
    this.rememberMe = remember;
  }

  createUser(user: User) {
    console.log('Create account', user);
  }
}

//  auth-form.component.ts /////////////////////////////
import { Component, Output, EventEmitter, ContentChild,
  AfterContentInit } from '@angular/core';

import { AuthRememberComponent } from './auth-remember.component';

export class AuthFormComponent implements AfterContentInit {

 showMessage: boolean;


 @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

 ngAfterContentInit() {
   
 }

 onSubmit(value: User) {
   this.submitted.emit(value);
 }

}

//  auth-form.component.ts /////////////////////////////
import { Component, Output, EventEmitter, ContentChildren, Renderer2,
  AfterContentInit, QueryList, ViewChildren, AfterViewInit,
       ChangeDetectorRef, ViewChild } from '@angular/core';

import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';

@Component({
    selector: 'auth-form',
    styles: [`
     .email { border-color: #9f72e6; }
  `]
})

export class AuthFormComponent implements AfterContentInit {

 showMessage: boolean;
    
 @ViewChild('myEmailField') email: ElementRef;
    
 @ViewChildren(AuthMessageComponent) message: QueryList<AuthMessageComponent>;
    
@ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;

 @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

    
  constructor(private renderer: Renderer2,
              private cd: ChangeDetectorRef) {}
    
    
 ngAfterContentInit() {
     
   if(this.remember) {
       
     this.remember.forEach((item) => {
         item.checked.subscribe((checked: boolean) => this.showMessage = checked);
     });
   }
     
/*    if(this.message) {
      this.message.days = 30;
   }  */
}
    
 ngAfterViewInit() {
   
     this.renderer.setElementAttribute(this.email.nativeElement, 'placeholde', 'Enter your email');
     
  this.renderer.setElementClass(this.email.nativeElement, 'email', true);
  
  this.renderer.invokeElementMethod(this.email.nativeElement, 'focus');
     
     
  /*  this.email.nativeElement.setAttribute('placeholder', 'Enter your email');
   this.email.nativeElement.classList.add('email');
   this.email.nativeElement.focus(); */
     
   if(this.message) {
         
       this.message.forEach((message) => {
         
           message.days = 30;
       });
      this.cd.detectChanges();
   }
 }

 onSubmit(value: User) {
   this.submitted.emit(value);
 }

}

// auth-message.component.ts ////////////////////////////////////////
export class AuthMessageComponent {
    days: number = 7;
}



// @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;
// @ViewChild(AuthMessageComponent) message: AuthMessageComponent;

  /*   this.remember.checked.subscribe((checked: boolean) => 
         this.showMessage = checked) */
         
 <!-- auth-remember.component.html -->
<label>
	<input type="checkbox"
	       (change)="onChecked($event.target.checked)"/>
</label>

<!-- app.component.html -->
<auth-form (submitted)="loginUser($event)" >

  <h3>Login</h3>

	<auth-remember
		(checked)="rememberUser($event)">
	</auth-remember>

	<auth-remember (checked)="rememberUser($event)"></auth-remember>

	<auth-remember (checked)="rememberUser($event)"></auth-remember>

  <button type="submit">Login to site</button>

</auth-form>

<!-- new app.component.html -->
<div>
	<auth-form>
		<auth-remember (checked)="rememberUser($event)"
		></auth-remember>

   <button type="submit">Login</button>

	</auth-form>
</div>


<!-- auth-form.component.html -->
<form (ngSubmit)="onSubmit(form.value)" #form="ngForm">

 <ng-content select="auth-remember"></ng-content>
   <div *ngIf="showMessage">
		 You will be logged in for 30 days.
   </div>
 <ng-content select="button"></ng-content>
</form>

<!-- new auth-form.component.html -->
<form>
	<ng-content select="auth-remember"></ng-content>

	<input type="email" name="email" ngModel #myEmailField />

  <auth-message [style.display]="(showMessage ? 'inherit' : 'none')"></auth-message>

  <auth-message [style.display]="(showMessage ? 'inherit' : 'none')"></auth-message>

	<auth-message [style.display]="(showMessage ? 'inherit' : 'none')"></auth-message>

	<ng-content select="button"></ng-content>
</form>


<!-- auth-message.component.html -->
  <div>
		You will be logged in for {{ days }} days.
  </div>
