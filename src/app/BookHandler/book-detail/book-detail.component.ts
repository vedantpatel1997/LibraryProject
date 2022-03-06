import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/Models/Book';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styles: [
  ]
})
export class BookDetailComponent implements OnInit {
  id: number | undefined;
  book: Book | any;


  constructor(private route: ActivatedRoute, private bookService: BookService, private router:Router) {
    this.route.params.subscribe(p => {
      this.id = p['id'];
    })
  }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.bookService.GetBook(this.id).subscribe(res => {
        this.book = res;
      })
    }
  }

  DeleteBook(id: number, title: string) {
    let conform = confirm(`Are you sure to delete ${title} ?`)

    if (conform) {
      console.log(`con`)
      this.bookService.DeleteBook(id).subscribe(res => {
        if (res.status == 200) {
          alert(`Book is deleted.`)
          this.router.navigateByUrl('Books')

        }
      })
    }
  }

}


