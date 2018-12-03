// drink-viewer.component.ts ///////////////
@Component({
  providers: [
   //  FoodService
   { provide: FoodService, useClass: FoodService }
  ]
})
