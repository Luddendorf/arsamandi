background: #9f72e6; rgb(159, 114, 230);


// app.component.ts /////////////////////////
export class AppComponent {

  myContext = {
     $implicit: 'Sam Dowson',
     location: 'USA'
  };
}

// auth-form.component.ts //////////////////////////////////////
 constructor(private renderer: Renderer2,
             private cd: ChangeDetectorRef) {}


 ngAfterContentInit() {
     
 }

 ngAfterViewInit() {
   
   this.renderer.setElementAttribute(this.email.nativeElement,
    'placeholder', 'Enter your email');
     
  this.renderer.setElementClass(this.email.nativeElement, 'email', true);
     
  this.renderer.invokeElementMethod(this.email.nativeElement, 'focus');
 }

// app.component.ts //////////////////////////////////
import { ViewContainerRef, ViewChild, ComponentFactoryResolver,
         AfterContentInit } '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';


export class AppComponent implements AfterContentInit {
    
   compRef: ComponentRef<AuthFormComponent>;
    
   @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
    
   constructor(private resolver: ComponentFactoryResolver) {}
    
  ngAfterContentInit() {
      
    const myFactory =             this.resolver.resolveComponentFactory(AuthFormComponent);
    
   this.entry.createComponent(myFactory);
      
      
   this.compRef = this.entry.createComponent(myFactory, 0);
      
   this.compRef.instance.title = 'Create account';
   
   this.compRef.instance.foo = 'Bar';
      
   this.compRef.instance.submitted.subscribe(this.loginUser);
  }
    
  
  destroyComponent() {
    this.compRef.destroy();
  }
    
  moveComponent() {
    this.entry.move(this.compRef.hostView, 1); 
  }
    
}

// auth-form.module.ts //////////////////////////////////
entryComponents: [AuthFormComponent]

// auth-form.component.ts /////////////////////////////////////////
export class AuthFormComponent {
    
   title = 'Login';
    
   @Output() submitted: EventEmitter<User> = new EventEmitter<User>();
    
}

// app.component.ts ////////////////////////////////////////////////////
export class AppComponent implements AfterContentInit {
    
  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('myTemplate') templateRef: TemplateRef;
  
    
  ngAfterContentInit() {
      
      this.entry.createEmbeddedView(this.templateRef, {
          $implicit: 'Implicit data',
          location: 'England'
      });
  }
}

// one.component.ts ///////////////////////////////////////////////
@Component({
    selector: 'example-one',
    encapsulation: ViewEncapsulation.Emulated,
    styles: []
})

// two.component.ts /////////////////////////////////////////
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-two',
    encapsulation: ViewEncapsulation.Native,
    
})

// three.component.ts /////////////////////////////////////
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-three',
    encapsulation: ViewEncapsulation.None,
})

// one.component.ts ////////////////////////////////
import { ViewEncapsulation } from '@angular/core';

encapsulation: ViewEncapsulation.Emulated,
    
// two.component.ts //////////////////////////
encapsulation: ViewEncapsulation.Native,
    

// three.component.ts //////////////////////////////////////////
encapsulation: ViewEncapsulation.None,
    
// app.component.ts ////////////////////
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-root',
    changeDetection: ChangeDetectionStrategy.Default,
})

markForCheck();
ApplicationRef.tick(); // global check for changes
detectChanges(); // component and its children

// one.component.ts //////////////////////////////////////////
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
})

// ChangeDetectionStrategy() */

export class AppComponent {
    
  user: any = {
      name: 'Sam Jackson',
      age: 32
  };
}
// one.component.ts /////////
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ExampleOneComponent {
    @Input() user;
    
    update() {
       this.user.name = 'Bob Dilan';
    }
}

// two.component.ts //////////////////
@Component({
    changeDetection: ChangeDetectionStrategy.Default,
})

// ATTRIBUTE DIRECTIVE:   app.component.ts ////////////////////

export class AppComponent {
}

// credit-card.directive.ts////////////////////////////////////////
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[credit-card]'
})
export class CreditCardDirective {
    
  /* constructor(private element: ElementRef) {
     console.log(this.element);
   } */
  
  @HostListener('input', ['$event']) onKeyDown(event: KeyboardEvent) {
      
     const input = event.target as HTMLInputElement;
      
     let trimmed = input.value.replace(/\s+/, '');
     
     if(trimmed.length > 16) {
        trimmed = trimmed.substr(0, 16);
     }
      
   let numbers = [];
      
   for(let i = 0; i < trimmed.length; i += 4) {
     
     numbers.push(trimmed.substr(i, 4));
   }
      
   input.value = numbers.join(' ');
  }  
}

// credit-card.directive.ts /////////////////////////////////////////
import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[credit-card]'
})

export class CreditCardDirective {
    
 @HostBinding('style.border') border: string;
    
  @HostListener('input', ['$event']) onKeyDown(event: KeyboardEvent) {
      
    const input = event.target as HTMLInputElement;
      
 let trimmed = input.value.replace(/\s+/g, '');
      
 if(trimmed.length > 16) {
   
   trimmed = trimmed.substr(0, 16);
 }
 let numbers = [];     
 for(let i = 0; i < trimmed.length; i += 4) {
   
     numbers.push(trimmed.substr(i, 4));
 }
      
 input.value = numbers.join(' ');
      
 this.border = '';
 
  if(/[^\d]+/.test(trimmed)) {
      this.border = '1px solid red';
      }
      
  }
}


<!-- app.component.html -->

<ng-container [ngTemplateOutlet]="myTemplate"
              [ngTemplateOutletContext]="myContext">

</ng-container>

<ng-template #myTemplate let-name let-location="location">
  {{ name }} lives in {{ location }}.
</ng-template>

<div #entry></div>

<div>
  <button (click)="destroyComponent()"></button>

  <button (click)="moveComponent()"></button>
</div>

<!-- ng-template -->
<ng-template #myTemplate let-name let-location="location">
  Static text {{ name }} {{ location }}
</ng-template>

<!-- auth-form.component.html -->
<form>

</form>

<!-- View Encapsulation -->
<div>
  <example-one></example-one>
  <example-two></example-two>
  <example-three></example-three>
</div>

<!-- ChangeDetectionStrategy -->
<div class="users">
  <example-one [user]="user"></example-one>
  <example-two [user]="user"></example-two>
</div>

<!-- attributive directive -->
<div>
 
 <label>
   Credit Card Number
   <input credit-card
         name="credit-card" type="text"
         placeholder="Enter 16 digits"
         [value]="foo">
 </label>

</div>



