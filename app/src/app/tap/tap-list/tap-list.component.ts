import { Component, OnInit } from '@angular/core';
import { TapsService } from '../../_services/taps.service';

@Component({
  selector: 'app-tap-list',
  templateUrl: './tap-list.component.html',
  styleUrls: ['./tap-list.component.css']
})
export class TapListComponent implements OnInit {

  taps: any;
  currentTap = null;
  currentIndex = -1;
  beer = '';

  constructor(private tapService: TapsService) { }

  ngOnInit(): void {
    this.retrieveTaps();
  }

  retrieveTaps(): void {
    this.tapService.getAll()
    .subscribe(
      data => {
        this.taps = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  refreshList(): void {
    this.retrieveTaps();
    this.currentTap = null;
    this.currentIndex = -1;
  }

  setActiveTap(tap, index): void {
    this.currentTap = tap;
    this.currentIndex = index;
  }

  removeAllTaps(): void {
    this.tapService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTaps();
        },
        error => {
          console.log(error);
        });
  }

  searchBeer(): void {
    this.tapService.findByBeer(this.beer)
      .subscribe(
        data => {
          this.taps = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
