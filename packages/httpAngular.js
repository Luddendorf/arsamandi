
<button (click)="onGet()"
></button>

<h1>{{ appName | async }}</h1>


export class CallingService {
  
  constructor(private http: Http) {}
  
  storeServers(servers: any[]) {
    
   const headers = new Headers({'Content-Type': 'application/json'});
   
   let url = `${this.apiRoot}/post`;
    
   let search = new URLSearchParams();
   
   return this.http.post(url, servers, {headers: headers});
  }
  
  
  getServers() {
  
  let url = `${this.apiRoot}/get`;
   
   return this.http.get(url)
     .map(
      (response: Response) => {
      
        const data = response.json();
        
        for(const server of data) {
          server.name = 'FETCHED_' + server.name;
        }
        
        return data;
      })
      .catch(
         (error: Response) => {
           return Observable.throw('Something went wrong');
         });
  }
  
  storeNewServers(servers: any[]) {
    let url = `${this.apiRoot}/post`;
    const headers = new Headers({'Content-Type': 'application/json'});
    
    return this.http.put(url, servers, {headers: headers});
  }
  
  getAppName() {
   
   let url = `${this.apiRoot}/get`;
  
    return this.http.get(url)
      .map(
        (response: Response) => {
          return response.json();
        });  
  }
  
  getAppName() {
    let url = `${this.apiRoot}/get`;
    
    return this.http.get(url)
      .map(
        (reponse: Response) => {
          return response.json();
        });
  }
  
  
}

// app.component.ts /////////

appName = this.callService.getAppName();

 onGet() {
  this.callService.getServers()
   .subscribe(
     (data: any) => {
      
       this.servers = data,
     },
     (error) => log(error)
   );
 }
 
 @Injectable()
 export class MySuperService {
   
   constructor(private _http: HttpClient) {}
   
   public getAll() {
     let url = `${this.apiRoot}/get`;
     
     return this._http.get(url);
   }
   
 }
 
 // small.component.ts /////////
 
 ngOnInit() {
   this._mysuperService.getAll().subscribe(
     (users) => {
       this.users = users;
     });
 }
 
 
 
 
 
 
