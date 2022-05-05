import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products!: any[]; //*ngFor="let prudoct of products"
  //feltölteni a firebases adatokkal :)
  cartNewElement: any;
  id: any;


  constructor(private router: Router, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.productsGet();
  }



  productsGet(){
    this.db.collection('products').valueChanges().subscribe(value =>{
      console.log(value),
      this.products = value;
    })
  }

  addToCart(productName: string , productPrice: number){
    //ha már van benne növelni kéne a mennyiségét, ha nincs hozzáadni
    this.id =   this.db.createId(); //user idt kéne ide tenni
    this.cartNewElement = this.db.collection('cart').doc(this.id);

    this.cartNewElement.set({
          productName: productName,
          productPrice: productPrice,
          db: 1,
        });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    let name = form.value.name;
    let price = form.value.price;
    let discription = form.value.discription;

    this.adminAdd(name, price, discription)

    form.reset();
  }

  adminAdd(productName: string , productPrice: number, productDiscription: string){
    this.id =   this.db.createId();
    this.cartNewElement = this.db.collection('products').doc(this.id);

    this.cartNewElement.set({
          discription: productDiscription,
          name: productName,
          price: productPrice
        });
  }





  goToCart(){
    this.router.navigateByUrl('cart');
  }

  logOut(){
    //kijelentkezés lekezelése...
    this.router.navigateByUrl('');
  }

}
