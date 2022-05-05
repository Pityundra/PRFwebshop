import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart!: any[];

  constructor(private router: Router, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.cartGet();
  }

  cartGet(){
    this.db.collection('cart').valueChanges().subscribe(value =>{
      console.log(value),
      this.cart = value;
    })
  }

  goToMain(){
    this.router.navigateByUrl('main');
  }

  logOut(){
    this.router.navigateByUrl('');
  }

}
