import { Component, OnInit } from '@angular/core';
import { IBook } from '../ibook';
import {MatSnackBar, MatDialog} from '@angular/material';
import { DataService } from '../services/data.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { BookDetailComponent } from '../book-detail/book-detail.component';
// import { Subject } from 'rxjs';


@Component({
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})

export class CollectionComponent implements OnInit {
  pageTitle: string;
  books: Array<IBook>;

  showOperatingHours: boolean;
  openingTime: Date;
  closingTime: Date;
  searchTerm$ = new Subject<string>();
  // tslint:disable-next-line: variable-name
  constructor(private _snackBar: MatSnackBar, private _dataService:
       // tslint:disable-next-line: align
       // tslint:disable-next-line: variable-name
       // tslint:disable-next-line: align
       DataService, private _dialog: MatDialog, private _router: Router) {
    this.openingTime = new Date();
    this.openingTime.setHours(10, 0);

    this.closingTime = new Date();
    this.closingTime.setHours(15, 0);
  }
  ngOnInit() {
      this.getBooks();
      this._dataService.search(this.searchTerm$)
       .subscribe(books => {
         this.books = books;
    });

  }

  updateMessage(message: string, type: string): void {
    if (message) {
        this._snackBar.open(`${type}: ${message}`, 'DISMISS', {
        duration: 3000
        });
    }
  }
  onRatingUpdate(book: IBook): void {
    this.updateBook(book);
    this.updateMessage(book.title, 'Rating has been updated');
  }

  updateBook(book: IBook): void {
    this._dataService.updateBook(book)
    .subscribe(
      () => {
        this._snackBar.open(`"${book.title}" has been updated!`, 'DISMISS', {
          duration: 3000
        });
      }, error => this.updateMessage(error as any, 'ERROR'));
}

openDialog(bookId: number): void {
  const config = {width: '650px', height: '400x', position: {top: '50px'}};
  const dialogRef = this._dialog.open(BookDetailComponent, config);
  dialogRef.componentInstance.bookId = bookId;
  dialogRef.afterClosed().subscribe(res => {
    this.getBooks();
  });
}

openRoute(bookId: number): void {
  this._router.navigate(['/collection', bookId]);
}

delete(book: IBook) {
  this._dataService
    .deleteBook(book.id)
    .subscribe(() => {
      this.getBooks()
      this._snackBar.open(`"${book.title}" has been deleted!`,
        'DISMISS', {
          duration: 3000
        });
    }, error => this.updateMessage(error as any, 'ERROR'));
}

  getBooks(): void {
    this._dataService.getBooks().subscribe(
        books => this.books = books,
        error => this.updateMessage(error as any, 'ERROR'));
  }

}


