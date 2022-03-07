import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Book } from '../../Models/Book';
import { BookService } from '../../Services/book.service';

@Component({
  selector: 'books',
  templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) {
  }
  Books: Book[] | any;
  p:number = 1;
  orderHeader:string = "";

  /////////////////////////////////////////
  // Angular Data Table

  displayedColumns: string[] = ['id', 'title', 'author', 'totalQuantity', 'availableQuantity', 'issuedQuantity', 'price'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;

  ngOnInit(): void {
    this.bookService.GetBooks().subscribe(res => {
      this.Books = res
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matsort;
    })
  }

  DeleteBook(id: number, title: string) {

    this.bookService.DeleteBook(id).subscribe(res => {
      if (res.status == 200) {
        alert(`Book is deleted.`)
        this.bookService.GetBooks().subscribe(res => {
          this.Books = res
          this.router.navigateByUrl('Books')

        })
      }
    })
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  check() {
    console.log(`click on more details`)
  }

  sort(headerName:string){
    this.orderHeader = headerName;
  }

}
