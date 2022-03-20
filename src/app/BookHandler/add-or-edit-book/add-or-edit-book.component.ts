import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../Models/Book';
import { BookService } from '../../Services/book.service';

@Component({
  selector: 'app-add-or-edit-book',
  templateUrl: './add-or-edit-book.component.html',

})

export class AddOrEditBookComponent implements OnInit {
  id: number | undefined;
  userForm: FormGroup
  book: Book | any;
  

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private bookService: BookService, private router: Router) {

    this.route.params.subscribe(p => {
      this.id = p['id'];
    })

    this.userForm = fb.group({
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],
      totalQuantity: [null, [Validators.required,Validators.min(0)]],
      availableQuantity: [null, [Validators.required, Validators.min(0)]],
      issuedQuantity: [null, [Validators.required,Validators.min(0)]],
      price: [null, [Validators.required,Validators.min(0)]]
    })
  }

  ngOnInit(): void {

    if (this.id !== undefined) {
      this.bookService.GetBook(this.id).subscribe(res => {
        this.book = res;

        this.userForm.setValue({
          title: this.book.title,
          author: this.book.author,
          totalQuantity: this.book.totalQuantity,
          availableQuantity: this.book.availableQuantity,
          issuedQuantity: this.book.issuedQuantity,
          price: this.book.price
        })
      })
    }
  }

  SaveData() {
    if (this.id !== undefined && this.id > 0) {
      
      this.book = this.userForm.value;
      
      this.book.bookId = this.id;
      this.bookService.UpdateBook(this.book).subscribe(res => {
        console.log(res)
        if (res.status == 200) {
          alert(`Book is updated.`)
          this.router.navigateByUrl('Books')
        }
      })
    }

    if (this.id == undefined) {
      if (this.userForm.valid) {
        this.book = this.userForm.value
        this.bookService.AddBook(this.book).subscribe(res => {
          if (res.status == 200) {
            alert(`Book is Successfully added.`)
            this.router.navigateByUrl('Books')
          }
        })
      } else {
        alert('Form is Invalid');
      }
    }
  }

}
