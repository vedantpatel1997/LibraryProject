import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../Models/Book';
import { IssueBook } from '../Models/IssueBook';
import { Submit } from '../Models/Submit';
import { User } from '../Models/User';
import { BookService } from '../Services/book.service';
import { IssueBookService } from '../Services/issue-book.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styles: [
  ]
})
export class SubmitComponent implements OnInit {
  userForm: FormGroup;
  users: User[] | any;
  books: Book[] | any;
  submitBook: Submit |any;
  id: number | any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private bookService: BookService,
    private issueService: IssueBookService,
    private fb: FormBuilder) {

    this.userForm = fb.group({
      user: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.userService.GetUsers().subscribe(res => {
      this.users = res;
    })
  }

  SaveData() {
    if (this.userForm.value.user > 0) {
      // this.issueBook.userId = Number(this.userForm.value.user);
      this.issueService.GetBooksByUserId(Number(this.userForm.value.user)).subscribe(res => {
        this.books = res;
      })
    };
  }

  SubmitBook(bookId: number) {
    this.submitBook = new Submit();
    this.submitBook.userId = Number(this.userForm.value.user);
    this.submitBook.bookId = bookId;
    console.log(this.submitBook)
    this.issueService.SubmitBook(this.submitBook).subscribe(res => {
      if (res.status == 200) {
        alert(`Book is submitted.`)
        this.issueService.GetBooksByUserId(this.submitBook.userId).subscribe(res => {
          this.books = res;
          console.log(this.books.length)
        })
      }
    },err => {               
      console.log(err);
  })
  }
}
