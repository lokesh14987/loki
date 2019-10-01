import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loki-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
pageTitle:string = 'Loki why u go home';
}
