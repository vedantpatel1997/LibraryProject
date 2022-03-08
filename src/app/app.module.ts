import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './BookHandler/books/books.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AddOrEditBookComponent } from './BookHandler/add-or-edit-book/add-or-edit-book.component';
import { HomeComponent } from './home/home.component';

import { AddOrEditUserComponent } from './UserHandler/add-or-edit-user/add-or-edit-user.component';
import { IssueComponent } from './issue/issue.component';
import { UsersComponent } from './UserHandler/users/users.component';
import { SubmitComponent } from './submit/submit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BookDetailComponent } from './BookHandler/book-detail/book-detail.component';
import { UserDetailComponent } from './UserHandler/user-detail/user-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    RegisterUserComponent,
    AddOrEditBookComponent,
    HomeComponent,
    UsersComponent,
    AddOrEditUserComponent,
    IssueComponent,
    SubmitComponent,
    BookDetailComponent,
    UserDetailComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule, 
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    OrderModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
