import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AddOrEditBookComponent } from './add-or-edit-book/add-or-edit-book.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AddOrEditUserComponent } from './add-or-edit-user/add-or-edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    RegisterUserComponent,
    AddOrEditBookComponent,
    HomeComponent,
    UsersComponent,
    AddOrEditUserComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
