// mail.module.ts /////////////
import { MailViewGuard } from './components/mail-view/mail-view.guard';

export const ROUTES: Routes = [
  {
    path: 'mail',
    component: MailAppComponent,
			 canActivateChild: [AuthGuard],
    children: [
					{
						path: 'message/:id',
						component: MailViewComponent,
						canDeactivate: [MailViewGuard],
						outlet: 'pane',
						resolve: { message: MailViewResolve }
					}
				]
  }  
];

// auth.guard.ts ///////////////////
import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, CanActivateChild } from '@angular/router';

import { AuthService } from './auth.service';

export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
	
	 constructor(private authService: AuthService) {}
	
	canLoad() {
		 return this.authService.checkPermissions();
	}
	
	canActivate() {
		return this.authService.isLoggedIn();
	}
	
	canActivateChild() {
		return false;
	}
}

// mail-view.component.ts /////////////////
export class MailViewComponent implements OnInit {
	
	reply = '';
	
	hasUnsavedChanges = false;
	
	message: Observable<Mail> = this.route.data.pluck('message');
	
	constructor(private route: ActivatedRoute) {}
	
	ngOnInit() {
		this.route.params.subscribe(() => {
			
			 this.reply = '';
			 this.hasUnsavedChanges = false;
		});
	}
	
	updateReply(value: string) {
		this.reply = value;
		this.hasUnsavedChanges = true;
	}
	
	sendReply() {
		console.log('Send: ', this.reply);
		this.hasUnsavedChanges = false;
	}
}

// mail-view/mail-view.guard.ts ////////////////
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { MailViewComponent } from './mail-view.component';

@Injectable()
export class MailViewGuard implements CanDeactivate<MailViewComponent> {
	
	canDeactivate(component: MailViewComponent) {
		
		if(component.hasUnsavedChanges) {
			
			return window.confirm('Are you sure you want to leave?');
		}
	
		return true;
	}
}

<!-- mail-app.component.html -->
<div class="mail">
  <h1>Activated parent</h1>
</div>

<!-- mail-view.component.html -->
<div class="mail-reply">
  <textarea
    (change)="updateReply($event.target.value)"
    placeholde="Type your reply..."
    [value]="reply"
  ></textarea>

  <button type="button"
          (click)="sendReply()"
  >Send</button>
</div>

