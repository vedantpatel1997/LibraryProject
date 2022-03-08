import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/Models/Book';
import { User } from 'src/app/Models/User';
import { BookService } from 'src/app/Services/book.service';
import { IssueBookService } from 'src/app/Services/issue-book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styles: [
  ]
})
export class BookDetailComponent implements OnInit {
  id: number | undefined;
  book: Book | any;
  users: User[] | any;


  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router, private issueService: IssueBookService) {
    this.route.params.subscribe(p => {
      this.id = p['id'];
    })
  }
  displayedColumns: string[] = ['id','name'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.bookService.GetBook(this.id).subscribe(res => {
        this.book = res;
      })

      this.issueService.GetUsersByBookId(this.id).subscribe(res => {
        this.users = res
        this.dataSource = new MatTableDataSource(res);

      })
    }
  }

  DeleteBook(id: number, title: string) {
    let conform = confirm(`Are you sure to delete ${title} ?`)

    if (conform) {

      this.bookService.DeleteBook(id).subscribe(res => {
        if (res.status == 200) {
          alert(`Book is deleted.`)
          this.router.navigateByUrl('Books')

        }
      }, err => {
        alert(err.error)
      })
    }
  }

}


