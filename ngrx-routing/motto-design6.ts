

<input [value]="foo" 
       credit-card>

<!-- app.component.html -->

<label>
	<input name="credit-card"
	      credit-card>
</label>

<label #myTooltip="tooltip"
       tooltip="3 digits, back of your card">

<span (mouseover)="myTooltip.show()"
      (mouseout)="myTooltip.hide()"></span>

<input type="text">

</label>

<!-- STRUCTURAL DIRECTIVE -->
<li *myFor="let item of items; let i = index;">
	{{ i }} Member: {{ item.name | json }}
</li>

<ng-template myFor [myForOf]="items" let-item let-i="index">
	<li>
		{{ i }} Member: {{ item.name | json }}
	</li>
</ng-template>

<ng-template myFor [myForOf]="items" let-item let-i="index">
	<li>
		{{ i }} Member: {{ item.name | json }}
	</li>
</ng-template>

<!-- CUSTOM PIPE -->

<div *ngFor="let file of files">
	<p>{{ file.name }}</p>
	<p>{{ file.size | filesize:'megabytes' }}</p>
</div>





import { Directive, ElementRef, HostListener,
  HostBinding } from '@angular/core';

@Directive({
  selector: '[credit-card]'  
})
export class CreditCardDirective {
    
  @HostBinding('style.border') border: string;
    
  @HostListener('input', ['$event'])
   onKeyDown(event: KeyboardEvent) {
      
     const input = event.target as HTMLInputElement;
       
     let trimmed = input.value.replace(/\s+/g, '')
     
   if(trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
   }
       
   let numbers = [];
       
   for(let i = 0; i < trimmed.length; i += 4){
       numbers.push(trimmed.substr(i, 4));
   }
       
   input.value = numbers.join(' ');
       
   this.border = '';
   if(/[^\d]+/.test(trimmed)) {
     
     this.border = '1px solid red';
       }
       
   }
}

// tooltip.directive.ts /////////////////////////////
import { Input, Directive, ViewContainerRef, ElementRef, OnInit } {
    
  @Directive({
    selector: '[tooltip]',
    exportAs: 'tooltip'
  })
    
  export class TooltipDirective implements OnInit {
    
    tooltipElement = document.createElement('div');
    visible = false;
      
    @Input() set tooltip(value) {
        
      this.tooltipElement.textContent = value;
    }
      
    hide() {
      this.tooltipElement.classList.remove('tooltip--active');
    }
      
    show() {
       this.tooltipElement.classList.add('tooltip--active');
    }
      
   constructor(private element: ElementRef,
               private view: ViewContainerRef) {}
      
   ngOnInit() {
    
    this.tooltipElement.className = 'tooltip';
    
    this.element.nativeElement.appendChild(this.tooltipElement);
    this.element.nativeElement.classList.add('tooltip-container');
   }
}
    
// my-for.directive.ts ///////////////////////////////////////////////
import { Directive, Input, ViewContainerRef, ContainerRef } from '@angular/core';
    
@Directive({
  selector: '[myFor][myForOf]'  
})
export class MyForDirective {
  
  @Input() set myForOf(collection) {
      
    this.view.clear();
    
   collection.forEach((item, index) => {
      
    this.view.createEmbeddedView(this.template, {
       
      $implicit: item,
      index
      });  
    });
  }
    
  constructor(private view: ViewContainerRef,
              private template: TemplateRef<any>) {}
    
}
    
export class AppComponent {
  items = [{
      name: 'Mark',
      age: 22,
      location: 'USA'
  }, {
      name: 'Bob',
      age: 25,
      location: 'England'
  }, {
      name: 'Sam',
      age: 21,
      location: 'Brasil'
  }];
  
  constructor() {
      setTimeout(() => {
        
        this.items = [...this.items, { name: 'Den',
                                       age: 20,
                                       location: 'UK'}];
      }, 2000);
  }
}
    
import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
    selector: '[myFor][myForOf]'
})    
export class MyForDirective {
  
   @Input()
   set myForOf(collection) {
     this.view.clear();
      
     collection.forEach((item, index) => {
      
      this.view.createEmbeddedView(this.template, {
        $implicit: item,
        index
      });
     });
   }
    
   constructor(private view: ViewContainerRef,
               private template: TemplateRef<any>) {}
}
    
// app.component.ts /////////////////////////////////////////
 constructor() {
   setTimeout(() => {
       this.items = [...this.items, { name: 'bob',
                                      age: 21,
                                      location: 'England'}];
   }, 2000);
 }
    
// CUSTOM PIPES app.component.ts ////////////////////////////
 interface File {
     name: string,
     size: number,
     type: string
 }

export class AppComponent implements OnInit {
    
    files: File[];
    ngOnInit() {
      
     this.files = [
       { name: 'logo.svg', size: 231343, type: 'image/svg' },
       { name: 'banner.jpg', size: 72343, type: 'image/svg' },
       { name: 'bg.png', size: 1731343, type: 'image/svg' },
     ]
     
    }
}

// filesize.pipe.ts //////////////////////////////
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filesize'
})
export class FileSizePipe implements PipeTransform {
    
  transform(size: number, extension: string = 'MB') {
    
   return (size / (1024 * 1024)).toFixed(2) + extension;
  }
}

