// auth.service.ts //////////////////////////////////
import { AngularFireAuth } from 'angularfire2/auth';

export class AuthService {3

  authChange = new Subject<boolean>();

  private isAuthed = false;

  constructor(private router: Router,
             private afAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
  
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email,
        authData.password)
           .then(result => {

            console.log(result);
            this.authSuccess();
              })
          .catch(error => {
            console.log(result);
          });

  }


  login(authData: AuthData) {

    this.afAuth.auth.signInWithEmailAndPassword(authData.email,
       authData.password)
         .then(result => {

           console.log(result);
           this.authSuccess();
         })
         .catch(error => {
           console.log(result);
         });
  }

  logout() {

    this.isAuthed = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.isAuthed;
  }

  private authSuccess() {

    this.isAuthed = true;
    this.authChanged.next(true);
    this.router.navigate(['/training']);
  }

}

// app.module.ts //////////////////////////
import { AngularFireAuthModule } from 'angularfire2/auth';

imports:[
  AngularFireAuthModule
]
