import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'add-or-edit-user',
  templateUrl: './add-or-edit-user.component.html',
})
export class AddOrEditUserComponent implements OnInit {

  id: number | undefined;
  userForm: FormGroup
  user: User | any;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private router: Router) {

    this.route.params.subscribe(p => {
      this.id = p['id'];
    })

    this.userForm = fb.group({
      salutation: [null, [Validators.required]],
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {

    if (this.id !== undefined) {
      this.userService.GetUser(this.id).subscribe(res => {
        this.user = res;

        this.userForm.setValue({
          salutation: this.user.salutation,
          name: this.user.name,
          age: this.user.age,
          dob: this.user.dob,
          gender: this.user.gender,
          email: this.user.email,
          phone: this.user.phone
        })
      })
    }
  }

  SaveData() {
    if (this.id !== undefined && this.id > 0) {
      this.user = this.userForm.value;
      this.user.userId = this.id;
      this.userService.UpdateUser(this.user).subscribe(res => {
        if (res.status == 200) {
          alert(`User is updated.`)
          this.router.navigateByUrl('users')
        }
      })
    }

    if (this.id == undefined) {
      if (this.userForm.valid) {
        this.user = this.userForm.value
        this.userService.AddUser(this.user).subscribe(res => {
          if (res.status == 200) {
            alert(`User is Successfully added.`)
            this.router.navigateByUrl('users')
          }
        })
      } else {
        alert('Form is Invalid');
      }
    }
  }

}
