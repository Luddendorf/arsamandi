<input type="text"
       [(ngModel)]="filteredStatus">
       
<button (click)="onAddServer()"
>Add Server</button>

<button (click)="onSave()"
>Save Servers</button>

<button (click)="onGet()"
>Get Servers</button>

<h2>App Status: {{ appStatus | async }}</h2>
       
<li *ngFor="let server of servers | filter:filteredStatus: 'status'"
></li>
       
       
 // app.component.ts ////////////
 filteredStatus = '';
 
  constructor(private callService: CallingService) {}
 
 appStatus = new Promise((resolve, reject) => {
    
    setTimeout(() => {
      resolve('stable');
    }, 2000);
 });
 
 onAddServer() {
  this.servers.push({ 
    instanceType: 'small',
    name: 'Roger Server',
    status: 'stable',
    started: new Date(15, 1, 2017)
  });
  }
  
  private generateId() {
    return Math.round(Math.random() * 10000);
  }

 onSave() {
   this.callService.storeServers(this.servers)
     .subscribe(
       (response) => log(response),
       (error) => log(error)
     );
 }
 
 onGet() {
   this.callService.getServers()
     .subscribe(
       (response: Response) => {
       
         const data = response.json();
         log(data);
       },
       (error) => log(error)
     );
 }

// filter.pipe.ts /////////

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'filter',
   pure: false
})
export class FilterPipe implements PipeTransform {
  
  transform(value: any, filterString: string, propName: string): any {
    
    if(value.length === 0 || filterString === '') {
      return value;
    }
    
  const resultArray = [];
    
    for(const item of value) {
      if(item[propName] === filterString) {
        
        resultArray.push(item);
      }
      return resultArray;
    } 
  }
}

// Firebase rules /////////////
{"rules": {
    ".read": "true",
    ".write": "true"
  }
}

// calling.service.ts /////////
import { Http } from '@angular/http';

@Injectable()
export class CallingService {
  
  constructor(private http: Http) {}
  
  storeServers(servers: any[]) {
  
   const headers = new Headers({'Content-Type': 'application/json'});
    
    return this.http.post('https://firebaseio.com/data.json', servers,
       {headers: headers});
  }
  
  getServers() {
    
    return this.http.get('https://firebase.com/data.json');
  }
  
}





///  HTTP ////
<button (click)="doGET()">GET</button>
<button (click)="doPOST()">POST</button>
<button (click)="doPUT()">PUT</button>
<button (click)="doDELTE()">DELETE</button>

<button (click)="doGETAsPromise()">As Promise</button>
<button (click)="doGETAsPromiseError()">Error as Promise</button>
<button (click)="doGETAsObservableError()">Error as Observable</button>

<button (click)="doGETWithHeaders()">With Headers</button>

import { Http, Response, RequestOptions, Headers, HttpModule,
         URLSearchParams } from '@angular/http';

class AppComponent {

 apiRoot: string = "http://httpbin.org";

  constructor(private http: Http) {}
  
  doGET() {
    let url = `${this.apiRoot}/get`;
    
    let search = new URLSearchParams();
    
    search.set('foo', 'moo');
    search.set('limit', 25);
    
    this.http.get(url, {search}).subscribe(res => log(res.json()));
  }
  
  doPOST() {
    let url = `${this.apiRoot}/post`;
    
    let searchParams = new URLSearchParams();
    
    searchParams.set('foo', 'moo');
    searchParams.set('limit', 25);
    this.http.post(url, {moo: "foo", goo: "loo" }, {searchParams})
        .subscribe(res => log(res.json()));
  }
  
  doDELETE() {
   
   let url = `${this.apiRoot}/delete`;
   
   let searchParams = new URLSearchParams();
   
   searchParams.set('foo', 'moo');
   
   searchParams.set('limit', 25);
   
   this.http.delete(url, {searchParams}).subscribe(res => log(res.json()));
  }
  
  getRecipes() {
    this.httpClient.get(url)
     .subscribe(
         (response: Response) => {
             const recipes: Recipe[] = response.json();
             this.recipeService.setRecipes(recipes);
                                                         });
                                                         }
  
  
}

                







