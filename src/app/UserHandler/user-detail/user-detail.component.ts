import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/Models/Book';
import { Submit } from 'src/app/Models/Submit';
import { User } from 'src/app/Models/User';
import { BookService } from 'src/app/Services/book.service';
import { IssueBookService } from 'src/app/Services/issue-book.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})
export class UserDetailComponent implements OnInit {
  id: number | any;
  user: User | any;
  books: Book[] | any;
  submitBook: Submit | any;



  constructor(private route: ActivatedRoute,private router:Router, private userService: UserService, private bookService: BookService, private issueService: IssueBookService) {
    this.route.params.subscribe(p => {
      this.id = p['id'];
    })
  }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.userService.GetUser(this.id).subscribe(res => {
        this.user = res;
      })

      this.issueService.GetBooksByUserId(this.id).subscribe(res => {
        this.books = res;
      })

    }
  }

  SubmitBook(bookId: number) {
    this.submitBook = new Submit();
    this.submitBook.userId = Number(this.id);
    this.submitBook.bookId = bookId;
    console.log(this.submitBook)
    this.issueService.SubmitBook(this.submitBook).subscribe(res => {
      if (res.status == 200) {
        alert(`Book is submitted.`)
      }
      this.issueService.GetBooksByUserId(this.id).subscribe(res => {
        this.books = res;
      })
    }, err => {
      console.log(err);
    })
  }
  DeleteUser(id: number) {
    this.userService.DeleteUser(id).subscribe(res => {
      if (res.status == 200) {
        alert(`User is deleted.`)
        this.router.navigateByUrl('Users')
      }
    })
  }
}
