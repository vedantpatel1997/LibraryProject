import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../Models/Book';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  GetUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiAddress + "User/GetAllUsers");
  }

  GetUser(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiAddress + "User/GetUserById/" + id);
  }

  AddUser(User: User): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(environment.apiAddress + "User/AddUser",
      User, { headers: this.headers, observe: 'response' });
  }

  UpdateUser(User: User): Observable<HttpResponse<any>> {
    return this.httpClient.put<HttpResponse<any>>(environment.apiAddress + "User/UpdateUser/" + User.userId,
      User, { headers: this.headers, observe: 'response' });
  }

  DeleteUser(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete<HttpResponse<any>>(environment.apiAddress + "User/DeleteUser/" + id,
      { observe: 'response' });
  }
}
