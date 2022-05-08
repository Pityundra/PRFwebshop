import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart!: any[];
  userData: any;
  allCost = 0;

  constructor(private router: Router, private db: AngularFirestore, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.cartGet();
  }

  cartGet(){
    //console.log(localStorage.getItem('user')?.substring(8,36))
    this.db.collection('cart.'+ localStorage.getItem('user')?.substring(8,36)).valueChanges().subscribe(value =>{
      //console.log(value),
      this.cart = value;
      for (let cartElements of this.cart) {
       // console.log(cartElements.productPrice)
        this.allCost += cartElements.productPrice
       // console.log(this.allCost)
      }

    })


  }

  goToMain(){
    this.router.navigateByUrl('main');
  }

  logOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

  buy(){
    //kitörölni az adatbázist
    this.db.collection('cart.'+ localStorage.getItem('user')?.substring(8,36)).valueChanges().subscribe(value =>{
      this.cart = value;
      for (let cartElements of this.cart) {
        this.db.collection('cart.'+ localStorage.getItem('user')?.substring(8,36)).doc(cartElements.productName).delete();
      }
      this.allCost = 0;
    })
    window.location.reload();
  }

}
