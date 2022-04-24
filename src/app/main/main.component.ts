import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products: any[] = [1,2,3];
  //feltölteni a firebases adatokkal :)

  constructor() { }

  ngOnInit(): void {
  }

}
