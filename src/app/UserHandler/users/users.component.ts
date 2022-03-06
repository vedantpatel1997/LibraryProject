import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


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

  displayedColumns: string[] = ['id', 'name', 'age', 'dob', 'email', 'phone', ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;

  ngOnInit(): void {
    this.userService.GetUsers().subscribe(res => {
      this.users = res
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matsort;
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

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }
}
