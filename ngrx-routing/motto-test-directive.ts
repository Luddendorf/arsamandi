// credit-card.directive.ts /////////////////////////////
import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
    selector: '[credit-card]'
})
export class CreditCardDirective {
  
  @HostBinding('style.border') border: string;
    
  @HostListener('input', ['$event']) onKeyDown(event: KeyBoardEvent) {
      
    const input = event.target as HTMLInputElement;
      
    let trimmed = input.value.replace(/\s+/g, '');
    if(trimmed.length > 16) {
       trimmed = trimmed.substr(0, 16);
    }
      
   input.value = numbers.join(' ');
      
   this.border = '';
   
   if(/[^\d]+/.test(trimmed)) {
     this.border = '1px solid red';
   }
      
  }
}

// credit-card.directive.spec.ts //////////////////
import { DebugElement, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from 'platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { CreditCardDirective } from './credit-card.directive';

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

@Component({
    template: `
 <input type="text" [value]="value" credit-card>
`
})

class TestComponent {
    value = 123456;
}

describe('CreditCardDirective', () => {
  
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let el: DebugElement;
    
  beforeEach(() => {
     TestBed.configureTestingModule({
       declarations: [
         CreditCardDirective,
         TestComponent
       ]
     });
      
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });
  
it('should format string with spaces', () => {
  const directive = el.query(By.directive(CreditCardDirective))
    .nativeElement;
    
  directive.value = '475123';
  directive.dispatchEvent(new Event('input'));
    
  expect(directive.value).toBe('4751 23');
    
  directive.value = '1234123412341234';
  directive.dispatchEvent(new Event('input'));
    
  expect(directive.value).toBe('1234 1234 1234 1234');
});
    
it('should have max-length of 16 letters', () => {
  const directive = el.query(By.directive(CreditCardDirective)).nativeElement;
  
  directive.value = '4534534534513255264565465';
  directive.dispatchEvent(new Event('input'));
  
  expect(directive.value).toBe('4534 5345 3451 3255');
});
    
});
