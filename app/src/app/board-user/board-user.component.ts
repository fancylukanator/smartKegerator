import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { SocketioService } from '../_services/socketio.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  content: string;
  socket: any;
  status: any;

  constructor(private userService: UserService, private socketService: SocketioService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.socketService.listen('sensorData').subscribe((data) => {

      this.socket = data;
      console.log(this.socket);
    });
    this.socketService.listen('status').subscribe((data) => {
      this.status = data;
    });
  }

}