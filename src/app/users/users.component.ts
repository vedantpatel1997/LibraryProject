import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  users: User[] | any;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.GetUsers().subscribe(res => {
      this.users = res
    })
  }

  DeleteUser(id: number) {
    this.userService.DeleteUser(id).subscribe(res => {
      if (res.status == 200) {
        alert(`User is deleted.`)
        this.userService.GetUsers().subscribe(res => {
          this.users = res
        })
      }
    })
  }
}
