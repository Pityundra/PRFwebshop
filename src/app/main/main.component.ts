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
  first = true;
  isIn = false;
  cart!: any[];
  cartSize = 0;
  darab!: any;

  constructor(private router: Router, private db: AngularFirestore, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.productsGet();
    this.adminCheck();
  }



  productsGet(){
    this.db.collection('products').valueChanges().subscribe(value =>{
     // console.log(value),
      this.products = value;
    })
  }

  adminCheck(){
    if ("admin@admin.hu" == localStorage.getItem('user')?.substring(47,61)){
      this.isAdmin = true;
    }
  }

  addToCart(productName: string , productPrice: number){
       this.first=true
       this.db.collection('cart.'+ localStorage.getItem('user')?.substring(8,36)).valueChanges().subscribe(value =>{
        this.cart = value;
        if (this.first){
        if (this.cart.length == 0){
            this.cartNewElement = this.db.collection('cart.' + localStorage.getItem('user')?.substring(8,36)).doc(productName);

            this.cartNewElement.set({
                  productName: productName,
                  productPrice: productPrice,
                  productDb: 1,
                });
        }
        for (let cartElements of this.cart) {
          if (cartElements.productName ==  productName){
            this.isIn = true
            this.darab = cartElements.productDb
          }
         }
         if (this.isIn){
          //console.log(this.darab)
          this.cartNewElement = this.db.collection('cart.' + localStorage.getItem('user')?.substring(8,36)).doc(productName);
          this.cartNewElement.set({
            productName: productName,
            productPrice: productPrice*this.darab+productPrice,
            productDb: this.darab+1,
          });
        } else{
          this.cartNewElement = this.db.collection('cart.' + localStorage.getItem('user')?.substring(8,36)).doc(productName);

          this.cartNewElement.set({
                productName: productName,
                productPrice: productPrice,
                productDb: 1,
              });
        }
        this.first = false;
        }

      });
      alert(productName + 'sikeresen hozzáadta a kosarához!');
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
    this.id = productName;
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
