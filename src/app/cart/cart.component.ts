import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any[] = [1,2,3];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToMain(){
    this.router.navigateByUrl('main');
  }

}
