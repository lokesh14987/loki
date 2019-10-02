import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBook } from '../ibook';
@Component({
  selector: 'loki-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Input() book: IBook;
  @Output() ratingClicked: EventEmitter<IBook> = new EventEmitter<IBook>();

  constructor() { }

  ngOnInit() {
  }
  click(rating: number): void {
    this.book.rating = rating;
    this.ratingClicked.emit(this.book);
    }

}
