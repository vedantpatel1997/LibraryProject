import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrEditBookComponent } from './BookHandler/add-or-edit-book/add-or-edit-book.component';
import { AddOrEditUserComponent } from './UserHandler/add-or-edit-user/add-or-edit-user.component';
import { BooksComponent } from './BookHandler/books/books.component';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UsersComponent } from './UserHandler/users/users.component';
import { BookDetailComponent } from './BookHandler/book-detail/book-detail.component';
import { UserDetailComponent } from './UserHandler/user-detail/user-detail.component';
import { IssueOrSubmitComponent } from './issue-or-submit/issue-or-submit.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Books', component: BooksComponent },
  { path: 'AddOrEditBook/:id', component: AddOrEditBookComponent },
  {
    path: 'BookDetail/:id', component: BookDetailComponent, children: [
      { path: 'IssueOrSubmit', component: IssueOrSubmitComponent }
    ]
  },
  { path: 'AddOrEditBook', component: AddOrEditBookComponent },
  { path: 'Users', component: UsersComponent },
  { path: 'AddOrEditUser/:id', component: AddOrEditUserComponent },
  { path: 'AddOrEditUser', component: AddOrEditUserComponent },
  { path: 'UserDetail/:id', component: UserDetailComponent },
  { path: 'Register', component: RegisterUserComponent },
  { path: 'IssueOrSubmit', component: IssueOrSubmitComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

