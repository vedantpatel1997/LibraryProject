import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Book } from '../Models/Book';
import { IssueBook } from '../Models/IssueBook';
import { User } from '../Models/User';
import { BookService } from '../Services/book.service';
import { IssueBookService } from '../Services/issue-book.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styles: [
  ]
})
export class IssueComponent implements OnInit {
  id: number | undefined;
  userForm: FormGroup
  users: User[] | any;
  book: Book | any;
  issueBook: IssueBook | any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private bookService: BookService,
    private issueService: IssueBookService,
    private fb: FormBuilder) {

    this.route.params.subscribe(p => {
      this.id = p['id'];
    })

    this.userForm = fb.group({
      user: [null, [Validators.required]],
    })

    // if (this.id == undefined) return;

    // this.bookService.GetBook(this.id).subscribe(res => {
    //   this.book = res;
    // })
    // this.userService.GetUsers().subscribe(res => {
    //   this.users = res;
    // })
  }

  ngOnInit(): void {
    if (this.id == undefined) return;

    this.bookService.GetBook(this.id).subscribe(res => {
      this.book = res;
    })
    this.userService.GetUsers().subscribe(res => {
      this.users = res;
    })
  }

  SaveData() {
    this.issueBook = new IssueBook();

    if (this.userForm.valid) {
      this.issueBook.userId = Number(this.userForm.value.user);
      this.issueBook.bookId = Number(this.book.bookId);
      console.log(this.issueBook)

      this.issueService.IssueBook(this.issueBook).subscribe(res => {
        if (res.status == 200) {
          let user = this.users.find((ele: { userId: any; }) => ele.userId == this.issueBook.userId);

          alert(`Book Issued to ${user.salutation} ${user.name}.`)
          this.router.navigateByUrl('Books')
        }
      }, err => {
        alert(err.error)
        console.log(`Commit`)
      })
    }
  }
}
