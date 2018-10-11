import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    DropdownDirective
  ],
  exports:[
    CommonModule,
    DropdownDirective
  ]
})
export class SharedModule {}

// app.module.ts and recipes.module.ts --- must import SharedModule ////

// shopping-list.module.ts /////////////////////////////////
import { Ng


