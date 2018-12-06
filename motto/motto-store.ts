<div *ngFor="let todo of todos$ | async">
 {{ todo.name }}
</div>

// app.module.ts /////////////////////////////////
import { Store } from './store';

@NgModule({
  providers: [Store]
})

// state.ts /////////////////////
export interface State {
    playlist: any[];
}

// store.ts ////////////////////////////////////////////////
/* 
  store.set('todos', [{}, {}])
  
  store.select('todos')
*/
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { State } from './state';

const state: State = {
   playlist: undefined  
};

export class Store {
    
  private subject = new BehaviorSubject<State>(state);
    
  private store = this.subject.asObservable().distinctUntilChanged();
    
  get value() {
      return this.subject.value;
  }
    
  // store.select<Todo[]>('todos')
  select<T>(name: string): Observable<T> {
    
    return this.store.pluck(name);
  }
  
  // store.set('todos', [{}, {}])
  set(name: string, state: any) {
     
    this.subject.next({
      ...this.value, [name]: state
    });
  }
}

// app.component.ts ///////////////////
@Component({
    template: `<div *ngFor="let todo of todos$ | async">
                 {{ todo.name }}
               </div>`
})


@Component({
  selector: 'app-root'
})
export class AppComponent {
    
  todos$ = this.store.select<any[]>('todos');
    
  constructor(private store: Store) {
    this.store.set('todos', [{ id: 1, name: 'Eat' },
                             { id: 2, name: 'Wash' }]);
  }
}

// app.module.ts ////////////////////
import { Store } from './store';


// store.ts //////////////
// store.set('todos', [{}, {}]);
// store.select('todos');
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { State } from './state';

const state: State = {
    playlist: undefined
};

export class Store {
    
  private subject = new BehaviorSubject<State>(state);
    
  private store = this.subject.asObservable().distinctUntilChanged();
  
  get value() {
      return this.subject.value;
  }
  // store.select<Todo[]>('todos');
  select<T>(name: string): Observable<T> {
      return this.store.pluck(name);
  }
  
  
  // store.set('todos', [{}, {}]);
  set(name: string, state: any) {
   this.subject.next({
     ...this.value, [name]: state
      });
  }
}

// state.ts /////////////////////////////
export interface State {
    playlist: any[]
}

// app.component.ts ///////////
export class AppComponent {
    
 todos$ = this.store.select<any[]>('todos');
    
  constructor(private store: Store) {
    this.store.set('todos', [{ id: 1, name: 'Eat' },
                             { id: 2, name: 'Wash' }]);
  }
}

