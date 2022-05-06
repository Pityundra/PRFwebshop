import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products!: any[];
  cartNewElement: any;
  id: any;
  userData: any;
  public isAdmin = false;


  constructor(private router: Router, private db: AngularFirestore, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.productsGet();
  }



  productsGet(){
    this.db.collection('products').valueChanges().subscribe(value =>{
     // console.log(value),
      this.products = value;
    })
  }

  addToCart(productName: string , productPrice: number){
    //ha már van benne növelni kéne a mennyiségét, ha nincs hozzáadni

    this.id =   this.db.createId();
    this.cartNewElement = this.db.collection('cart.' + localStorage.getItem('user')?.substring(8,36)).doc(this.id);

    this.cartNewElement.set({
          productName: productName,
          productPrice: productPrice
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

  logOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

}
