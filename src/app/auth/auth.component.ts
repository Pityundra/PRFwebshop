import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { User } from '../models/user';;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {



  isLogin = true;
  userData: any;

  constructor(private router: Router, public afs: AngularFirestore, public afAuth: AngularFireAuth, public ngZone: NgZone) { }


  ngOnInit(): void {
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    console.log('email: ', email)
    console.log('j: ', password)


    //elmenti a felhasználó adatait a localStorageba
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        console.log(localStorage.getItem('user')?.substring(8,36));
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });


    if (this.isLogin){
      this.SignIn(email, password)
    } else{
      this.SignUp(email, password)
    }

    //this.authenticate(email, password);

  }


//bejelentkezés
  SignIn(email: string, password: string) {
    console.log('anyád');
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          console.log('anyád');
          this.router.navigate(['main']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  //regisztráció
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('anyád');
        this.router.navigate(['main']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  authenticate(email: string, password: string){
      //firebase bekötése és magam felkötése

      //this.router.navigateByUrl('main');
  }

  onSwitchAuthMode(){
    this.isLogin = !this.isLogin;
 }

 SetUserData(user: any) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    `users/${user.uid}`
  );
  const userData: User = {
    uid: user.uid,
    email: user.email
  };
  return userRef.set(userData, {
    merge: true,
  });
}


}
