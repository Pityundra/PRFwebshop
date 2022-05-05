import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin = true;

  constructor(private router: Router) { }

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

    if (this.isLogin){

    } else{

    }

    this.authenticate(email, password);
    form.reset();
  }

  authenticate(email: string, password: string){
      //firebase bekötése és magam felkötése

      this.router.navigateByUrl('main');
  }

  onSwitchAuthMode(){
    this.isLogin = !this.isLogin;
 }


}
