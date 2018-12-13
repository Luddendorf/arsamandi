
class MyService {}
class MyOtherService {}

providers: [{
    provide: MyService,
    useClass: MyOtherService
}]

let myObject = { greeting: "Hello" };

providers: [{
    provide: 'MyService',
    useValue: myObject
}]

@Component({})
export class NewComponent {
    
  constructor(@Inject('MyService') myService) {
      console.log(myService.greeting);
  }
}

let firstObject = { greeting: 'Hello World' }
let secondObject = { greeting: 'Hello Earth!' }

providers: [{
    provide: 'MyService',
    useFactory: () => {
      if(...) return firstObject
      else return secondObject
    }
}]
    
// using Token: //////////////////
 import { InjectionToken } from '@angular/core';
            
 const NewToken = new InjectionToken<MyInterface>("NEWTOKEN (this is what you get)");

// Our service : /////////
import { NewService } from '...';

// Our interface for the config object: ////////////////
interface NewConfig {
    spaceId: string,
    accessToken: string;
}

// Our InjectionToken: /////////////////////////////
const NewConfiguredService = new InjectionToken<NewConfig>('MyNewConfig');

@NgModule({})
export class NewModule {
    
  static forRoot(config: NewConfig): ModuleWithProviders {
    return {
      ngModule: NewModule,
      providers: [
        provider: NewConfiguredService,
        useValue: config
      ]
    }
  }
}

// In the AppModule : //////////////////////////
const superConfig: NewConfig = {
  spaceId: '12345678',
  accessToken: '123456789123456789'
}

@NgModule({
  imports: [
    NewModule.forRoot(superConfig)
  ]
})
export class AppModule {}
