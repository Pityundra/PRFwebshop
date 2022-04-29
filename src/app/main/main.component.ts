import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products: any[] = [1,2,3];
  //feltölteni a firebases adatokkal :)

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToCart(){
    this.router.navigateByUrl('cart');
  }

}
