import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../Models/Book';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  GetBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(environment.apiAddress + "Book/GetAllBooks");
  }

  GetBook(id: number): Observable<Book> {
    return this.httpClient.get<Book>(environment.apiAddress + "Book/GetBookById/" + id);
  }

  AddBook(Book: Book): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(environment.apiAddress + "Book/AddBook",
      Book, { headers: this.headers, observe: 'response' });
  }

  UpdateBook(Book: Book): Observable<HttpResponse<any>> {
    return this.httpClient.put<HttpResponse<any>>(environment.apiAddress + "Book/UpdateBook/" + Book.bookId,
      Book, { headers: this.headers, observe: 'response' });
  }

  DeleteBook(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete<HttpResponse<any>>(environment.apiAddress + "Book/DeleteBook/" + id,
      { observe: 'response' });
  } 
}
