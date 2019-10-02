import { Component, OnInit } from '@angular/core';
import { Inavlink } from '../inavlink';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  navLinks:Array<Inavlink> = [
    {
      path: 'about',
      label: 'ABOUT ME'
    },
    {
      path: 'collection',
      label: 'MY COLLECTION'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
