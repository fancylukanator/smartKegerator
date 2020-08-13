import { Component, OnInit } from '@angular/core';
import { SocketioService } from './_services/socketio.service';

@Component({
    selector: 'app-socket',
    templateUrl: './socket.component.html',
    styleUrls: ['./socket.component.css']
})

export class SocketComponent implements OnInit {
  
    title = 'socketio-angular';
  
    constructor(private socketService: SocketioService) {}
  
    ngOnInit() {
      this.socketService.listen('test event').subscribe((data) => {
          console.log(data);
      })
      this.socketService.listen('sensorData').subscribe((data) => {
        console.log(data);
      })
    }
}
