import { Component, OnInit } from '@angular/core';
import { ManageUsersService } from '../../_services/manage-users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {
  currentUser = null;
  message= '';

  constructor(
    private userService: ManageUsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message='';
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id): void {
    this.userService.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateinUse(status): void {
    const data = {
      username: this.currentUser.username,
      email: this.currentUser.email,
      balance: this.currentUser.balance
    };

    this.userService.update(this.currentUser._id, data)
    .subscribe(
      response => {
        this.currentUser.inUse = status;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  updateUser(): void {
    this.userService.update(this.currentUser._id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The User was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser._id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/manage-users']);
        },
        error => {
          console.log(error);
        });
  }
}
