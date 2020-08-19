import { Component, OnInit } from '@angular/core';
import { ManageUsersService } from '../../_services/manage-users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: any;
  currentUser = null;
  currentIndex = -1;
  username = '';

  constructor(private userService: ManageUsersService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = null;
    this.currentIndex = -1;
  }

  setActiveUser(user, index): void {
    this.currentUser = user;
    this.currentIndex = index;
  }


  searchTitle(): void {
    this.userService.findByUser(this.username)
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


}
