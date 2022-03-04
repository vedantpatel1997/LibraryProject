import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IssueBook } from '../Models/IssueBook';
import { Submit } from '../Models/Submit';

@Injectable({
  providedIn: 'root'
})
export class IssueBookService {

  headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  IssueBook(issueBook: IssueBook): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(environment.apiAddress + "Book/IssueBook", issueBook, { headers: this.headers, observe: 'response' })
  }

  GetBooksByUserId(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(environment.apiAddress + "Book/GetBookByUserId/" + id);
  }

  SubmitBook(submitBook: Submit): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(environment.apiAddress + "Book/SubmitBook", submitBook, { headers: this.headers, observe: 'response' })
  }


}
