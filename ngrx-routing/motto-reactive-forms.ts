// my-for.directive.ts //////////////////////////////////////////
import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

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

// app.component.ts /////////////////
export class AppComponent {
    
  items = [];
    
  constructor() {
   setTimeout(() => {
     this.items = [...this.items, { name: 'Bob',
                                    age: 21,
                                    location: 'USA'}];
   }, 2000);   
   
  }
}

// CUSTOM PIPE //
// app.component.ts ///////////////////////////////////////////////
import { Component, OnInit } from '@angular/core';

import { FileSizePipe } from './filesize.pipe';

interface File {
    name: string,
    size: any,
    type: string
}

@Component({
    selector: 'app-root',
    template: ``,
    providers: [FileSizePipe]
})

export class AppComponent implements OnInit {
  files: File[];
  mapped: File[];
    
  constructor(private fileSizePipe: FileSizePipe) {}
    
  ngOnInit() {
    this.files = [
      { name: 'logo.svg', size: 2153445, type: 'image/svg' },
      { name: 'banner.jpeg', size: 5453445, type: 'image/svg' },
      { name: 'background.png', size: 78753445, type: 'image/png' }
    ];
    
    this.mapped = this.files.map(file => {
      return {
        name: file.name,
        type: file.type,
        size: this.fileSizePipe.transform(file.size, 'mb')
      };
    });
  }
}

// filesize.pipe.ts ////////////////////////////////////////
import { Pipe, PipeTransform } '@angular/core';

@Pipe({
    name: 'filesize'
})
export class FileSizePipe implements PipeTransform {
    
  transform(size: number, extension: string = 'Mb') {
    return (size / (1024 * 1024)).toFixed(2) + extension;
  }
}

// REACTIVE FORMS /////////////////////////////////////////////////////
// stock-inventory/containers/stock-inventory stock-inventory.component.ts 
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
    selector: 'stock-inventory',
    styleUrls: ['stock-inventory.scss'],
    template: `
      <div class="stock-inventory">
        <form [formGroup]="myForm"
              (ngSubmit)="onSubmit()">
        </form>
      </div>`
})
export class StockInventoryComponent {
  
  myForm = new FormGroup({
     store: new FormGroup({
       branch: new FormControl(''),
       code: new FormControl('')
     }),
     selector: new FormGroup({
       product_id: new FormControl(''),
       quantity: new FormControl(10)
     }),
     stock: new FormArray([])
  })
    
  onSubmit() {
    console.log('Submit', this.myForm.value);
  }
}





// stock-inventory/ stock-inventory.module.ts //////////////
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StockInventoryComponent } from './containers/stock-inventory/stock-inventory.component';

@NgModule({
    declarations: [
      StockInventoryComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule
    ],
    exports: [
      StockInventoryComponent
    ]
})
export class StockInventoryModule {}

// app.module.ts /////////////////////////////////////////////
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        StockInventoryModule
    ],
})

// stock-inventory/components/stock-branch/

// stock-inventory/components/stock-selector/

// stock-inventory/components/stock-product/

// stock-inventory/containers/stock-inventory stock-inventory.component.scss ///////////


<!-- my-for.directive.html -->
<ul>
  <li *ngFor="let item of items; let i = index;">
    {{ i }} Member: {{ item.name | json }}
  </li>

  <ng-template ngFor [ngForOf]="items" let-item let-i="index">
    <li>
      {{ i }} Member: {{ item.name | json }}
    </li>
  </ng-template>

</ul>

<!-- app.component.html -->
<div>
 <div *ngFor="let file of mapped">
   <p>{{ file.name }}</p>
   <p>{{ file.size | filesize:'megabytes' }}</p>
 </div>
</div>

<div>
  <stock-inventory></stock-inventory>
</div>

<!-- REACTIVE FORM -->
<div class="stock-inventory">
	<form [formGroup]="myForm" (ngSubmit)="onSubmit()">

   <stock-branch>
   </stock-branch>

   <stock-selector>
   </stock-selector>

   <stock-product>
   </stock-product>

   <div formGroupName="store">
     <input formControlName="branch"
           type="text"
           placeholder="Branch ID">

     <input formControlName="code"
           type="text"
           placeholder="Manager Code">
   </div>

   <div class="stock-inventory__buttons">
     <button type="submit"
             [disabled]="myForm.invalid">Order stock</button>
   </div>

   <pre>{{ myForm.value | json }}</pre>

	</form>
</div>
