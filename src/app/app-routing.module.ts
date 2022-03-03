import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrEditBookComponent } from './add-or-edit-book/add-or-edit-book.component';
import { BooksComponent } from './books/books.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'AddOrEditBook/:id', component: AddOrEditBookComponent },
  { path: 'AddOrEditBook', component: AddOrEditBookComponent },
  { path: 'register', component: RegisterUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

