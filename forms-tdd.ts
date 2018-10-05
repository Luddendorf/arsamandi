import { NgForm } from '@angular/forms';

export class AppModule {

  @ViewChild('myForm') registForm: NgForm;
  
  defaulQuestion = 'pet';

  answer = '';
  
  genders = ['male', 'female'];
  
  user = {
      username: '',
      email: '',
      secretQuestion: '',
      answer: '',
      gender: ''
  };
  
  submitted = false;
  
  suggestUserName() {
    const suggestedName = 'Superuser';
    
    this.registForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    });
    
    this.registForm.form.patchValue({
      userData: {
       username: suggestedName 
      }
    });
  }
  
  onSubmit() {
    console.log(this.registForm);
    
    this.submitted = true;
    this.user.username = this.registForm.value.userData.username;
    this.user.email = this.registForm.value.userData.email;
    this.user.secretQuestion = this.registForm.value.secret;
    this.user.answer = this.registForm.value.questionAnswer;
    this.user.gender = this.registForm.value.gender;
    
    this.registForm.reset();
  } 
}
// app.component.html ////////////////

<form (ngSubmit)="onSubmit()"
      #myForm="ngForm">
      
<div id="user-data"
     ngModelGroup="userData"
     #userData="ngModelGroup">
<label for="username">Username</label>
<input type="text" id="username"
       name="username"
       ngModel
       required>
         
<button type="button"
        (click)="suggestUserName()"></button>
       
<label>Mail</label>
<input type="email"
       name="email"
       ngModel
       required email
       #emailControl="ngModel">
         
<p *ngIf="!email.valid && email.touched"
>Enter valid info</p>
</div>

<p *ngIf="!userData.valid && userData.touched"
  >User info is invalid in some way</p>
       
<select name="secret"
        [ngModel]="defaultQuestion"
><select>
  
<textarea name="questionAnswer"
          [(ngModel)]="answer"
></textarea>

<p>{{ answer }}</p>

<div class="radio"
     *ngFor="let gender of genders">
  <label>
     <input type="radio"
            name="gender"
            ngModel
            [value]="gender"
            required>
              {{ gender }}
  </label>
  </div>

<button type="submit"
        [disabled]="!myForm.valid" 
>Send</button>

</form>

<div *ngIf="submitted">
<h4>Your data<h4>
<p>Username {{ user.username }}</p>
<p> Mail {{ user.email }}</p>
<p>Secret Question {{ user.secretQuestion }}</p>
<p>Answer {{ user.answer }}</p>
<p>Gender {{ user.gender }}</p>
</div>

input.ng-invalid.ng-touched {
   border: 1px solid orangered; 
}

// app.component.html //////////// REACTIVE APPROACH ////////////
<form [formGroup]="registForm"
      (ngSubmit)="onSubmit()">
  
<div formGroupName="userData">
  <div class="form-group>
   <label for="username">Username</label>
   <input type="text" id="username"
          formControlName="username">
            
     <span *ngIf="!resistForm.get('userData.username').valid &&
                  registForm.get('username').touched"
      >Enter smth valid</span>

  </div>

  <div class="form-group>
   <label for="email">Email</label>
   <input type="text" id="email"
          formControlName="email">
           
  <span *ngIf="!registForm.get('userData.email').valid
      && registForm.get('email').touched"
>Give us valid email</span>          
            
  </div>
</div>

  <div class="radio" *ngFor="let gender of genders">
    <label>
      <input type="radio"
             formControlName="gender"
             [value]="gender">{{ gender }}
    </label>
  </div>

<div formArrayName="hobbies">
   <h4>Your hobbies</h4>
   <button type="button
           (click)="onAddHobby()">Add Hobby</button>

<div *ngFor="let hobbyControl of registForm.get('hobbies').controls;
             let i = index">
   <input type="text" [formControlName]="i">
</div>

</div>



 <span *ngIf="!registForm.valid && registForm.touched"
>Form is invalid</span>
  
</form>

<!-- REPEAT -->
<div formArrayName="hobbies">
  
 <div *ngFor="let hobbyControl of registForm.get('hobbies').controls;
              let i = index;"
  >  
  <input type="text" [formControlName="i"]>
 </div>   
</div>

<div formArrayName="questions">
    <button (click)="onAddQuest()">Add question</button>
</div>

 onAddQuest() {
   
   const newQuest = new FormControl(null, Validators.required);
   
   (<FormArray>this.registForm.get('questions')).push(newQuest);
 }


// app.component.ts ////////////
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

export class AppComponent implements OnInit {
  
  genders = ['male', 'female'];
  
  registForm: FormGroup;
  
  forbiddenNames = ['Chris', 'Anna'];
  
  ngOnInit() {
   
    this.registForm = new FormGroup({
      'userData: new FormGroup({
        'username' : new FormControl(null, [Validators.required, this.forbiddingNames.bind(this)]),
        'email' : new FormControl(null, [Validators.required, Validators.email])
    }),
        'gender' : new FormControl('male'),
        'hobbies' : new FormArray([])
    });
  }
  
  onSubmit() {
    log(this.registForm);
  }

   onAddHobby() {
     
     const control = new FormControl(null, Validators.required);
     
     (<FormArray>this.registForm.get('hobbies')).push(control);
   }

  onAddHobby() {
     
    const control = new FormControl(null, Validators.required);
    
    (<FormArray>this.registForm.get('hobbies')).push(control);
  }

  forbiddingNames(control: FormControl): {[s: string]: boolean} {
     
    if(this.forbiddenNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true}; 
    }
      return null;
  }

 forbiddingNames(control: FormControl): {[s: string]: boolean} {
    
   if(this.bannedNames.indexOf(control.value) != -1) {
    
     return {'namesIsForbidden': true};
   } else {
     return null;   
   }
   
   ngOnInit() {
     
     this.searchField = new FormControl();
     this.searchField.valueChanges
        .subscribe(term => {
          this.searches.push(term);
     });
     
   }
 }


}

// app.component.css ///////
input.ng-invalid.ng-touched {
   border: 1px solid red; 
}

[formControl]="searchField"









































