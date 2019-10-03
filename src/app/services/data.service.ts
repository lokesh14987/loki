import { Injectable } from '@angular/core';
import { IBook } from '../ibook';
import { HttpClient } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged, switchMap  } from 'rxjs/operators';

@Injectable()
export class DataService {

  // tslint:disable-next-line: variable-name
  _booksUrl = 'https://bookservicelaurie.azurewebsites.net/api/books';

  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) { }
  private handleError(error: any) {
    const errMsg = (error.message) ? error.message : error.status ?
    `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  search(terms: Observable<string>) {
    return terms.pipe(debounceTime(400),
      distinctUntilChanged()
      , switchMap(term => this.getBooks(term)));
  }

  getBooks(query?: string): Observable<IBook[]> {
    return this._http.get(this._booksUrl).pipe(
      map((response: Response) => {
        let data: IBook[] =  response.json() as unknown as IBook[];
        if (query != null && query.length > 0) {
          data = data.filter(
            // tslint:disable-next-line: no-shadowed-variable
            data =>
              data.author.includes(query) ||
              data.title.includes(query)
          );
        }
        return data;
      }),
      catchError(this.handleError)
      );
  }
  getBook(id: number): Observable<IBook> {
    return this._http.get<IBook>(`${this._booksUrl}/${id.toString()}`)
      .pipe(
        catchError(this.handleError)
      );

  }

  getPreviousBookId(id: number): Observable<number> {
    return this.getBooks()
    .pipe(
      map((books: IBook[]) => {
        return books[Math.max(0, books.findIndex(b => b.id === id) - 1)].id;
      }),
      catchError(this.handleError)
    );
  }

  getNextBookId(id: number): Observable<number> {
    return this.getBooks()
    .pipe(
      map((books: IBook[]) => {
        return books[Math.min(books.length - 1, books.findIndex(b => b.id === id) + 1)].id;
      }),
      catchError(this.handleError)
    );
  }

 updateBook(book: IBook): Observable<IBook> {
    return this._http.put<IBook>(this._booksUrl, book)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteBook(id: number): Observable<{}> {
    return this._http.delete(`${this._booksUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

}
