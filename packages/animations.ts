import { Component, trigger, state, style } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   animations: [
     trigger('divState', [
     state('normal', style({
       'background-color': 'red',
       transform: 'translateX(0)'
     })), 
     state('high', style({
        'backgroundColor': 'blue',
        transform: 'translateX(100px)'
     })) ])
   ]
})

export class AppComponent {

  list = ['Milk', 'Sugar', 'Bread'];
  
  state = 'normal';

 onAdd(item) {
  this.list.push(item);
 }
 
 onDelete() {
  this.list.splice(this.list.indexOf(item), 1);
}

}

<div style="width: 100px; height: 100px;" 
     [@divState]="state"
></div>
 
