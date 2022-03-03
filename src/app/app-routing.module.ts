import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrEditBookComponent } from './add-or-edit-book/add-or-edit-book.component';
import { AddOrEditUserComponent } from './add-or-edit-user/add-or-edit-user.component';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksComponent },
  { path: 'AddOrEditBook/:id', component: AddOrEditBookComponent },
  { path: 'AddOrEditBook', component: AddOrEditBookComponent },
  { path: 'users', component: UsersComponent },
  { path: 'AddOrEditUser/:id', component: AddOrEditUserComponent },
  { path: 'AddOrEditUser', component: AddOrEditUserComponent },
  { path: 'register', component: RegisterUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

