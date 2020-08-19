import { Component, OnInit } from '@angular/core';
import { StatsService } from '../_services/stats.service';

@Component({
  selector: 'app-log',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats: any;
  currentstat = null;
  currentIndex = -1;
  user = '';

  constructor(private statService: StatsService) { }

  ngOnInit(): void {
    this.retrieveStats();
  }

  retrieveStats(): void {
    this.statService.getAll()
    .subscribe(
      data => {
        this.stats = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  refreshList(): void {
    this.retrieveStats();
    this.currentstat = null;
    this.currentIndex = -1; 
  }

  setActiveStat(stat, index): void {
    this.currentstat = stat;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.statService.findByUser(this.user)
    .subscribe(
      data => {
        this.stats = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
}