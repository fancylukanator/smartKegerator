import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TapsService } from '../_services/taps.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  left: any;
  right:any;

  constructor(private tapService: TapsService) { }

  ngOnInit() {
    this.tapService.findLeft().subscribe((data) => {
      this.left = data;
    });

    this.tapService.findRight().subscribe((res) => {
      this.right = res;
    });
  }

}