import { Component, OnInit } from '@angular/core';
import { Book } from '../../Models/Book';
import { BookService } from '../../Services/book.service';

@Component({
  selector: 'books',
  templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit {

  Books:Book[]|any;

  constructor(private bookService:BookService) { 
  }

  ngOnInit(): void {
    this.bookService.GetBooks().subscribe(res=>{
      this.Books = res
    })
  }

  DeleteBook(id:number){
    this.bookService.DeleteBook(id).subscribe(res=>{
      if(res.status==200){
        alert(`Course is deleted.`)
        this.bookService.GetBooks().subscribe(res=>{
          this.Books = res
        })
      }
    })
  }

}
