import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../Models/Book';
import { IssueBook } from '../Models/IssueBook';
import { Submit } from '../Models/Submit';
import { User } from '../Models/User';
import { BookService } from '../Services/book.service';
import { IssueBookService } from '../Services/issue-book.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-issue-or-submit',
  templateUrl: './issue-or-submit.component.html',
  styles: [
  ]
})
export class IssueOrSubmitComponent implements OnInit {
  id: number | undefined;
  name: string | undefined;
  userForm: FormGroup
  users: User[] | any;
  books: Book[] | any;
  issueBook: IssueBook | any;
  submitBook: Submit | any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private bookService: BookService,
    private issueService: IssueBookService,
    private fb: FormBuilder) {

    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.name = p['name']
    })

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
    if (this.name == 'Issue') {
      this.issueBook = new IssueBook();

      if (this.userForm.valid) {
        this.issueBook.userId = Number(this.userForm.value.user);
        this.issueBook.bookId = Number(this.id);
        this.issueService.IssueBook(this.issueBook).subscribe(res => {
          if (res.status == 200) {
            let user = this.users.find((ele: { userId: any; }) => ele.userId == this.issueBook.userId);

            alert(`Book Issued to ${user.salutation} ${user.name}.`)
            this.router.navigateByUrl('Books')
          }
        }, err => {
          alert(err.error)
        })
      }

    }

    if (this.name == 'Submit') {
      if (this.userForm.valid) {
        if (this.userForm.value.user > 0) {
          this.issueService.GetBooksByUserId(Number(this.userForm.value.user)).subscribe(res => {
            this.books = res;
          })
        };
      }
    }
  }

  SubmitBook(bookId: number) {
    if (this.name == 'Submit') {
      this.submitBook = new Submit();
      this.submitBook.userId = Number(this.userForm.value.user);
      this.submitBook.bookId = bookId;
      console.log(this.submitBook)
      this.issueService.SubmitBook(this.submitBook).subscribe(res => {
        if (res.status == 200) {
          alert(`Book is submitted.`)
          this.issueService.GetBooksByUserId(this.submitBook.userId).subscribe(res => {
            this.books = res;
          })
        }
      }, err => {
        console.log(err);
      })
    }
  }

}

