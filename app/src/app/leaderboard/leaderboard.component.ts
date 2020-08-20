import { Component, OnInit } from '@angular/core';
import { StatsService } from '../_services/stats.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  chart = [];

  constructor(private statService: StatsService) { }


  ngOnInit() {
    this.statService.leaderboard()
    .subscribe(
      (data:any) => {

        console.log(data);
      
        let user = data.map(data => data.username)
        let month = data.map(data => data.monthVolume)
        let week = data.map(data => data.weekVolume)
        let day = data.map(data => data.dayVolume)

        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: user,
            datasets: [
              {
                label: 'month',
                borderColor: 'SlateBlue',
                backgroundColor: 'Tomato',
                hoverBackgroundColor: 'LightGray',
                borderWidth: .5,
                data: month,
              },
              {
                label: 'week',
                borderColor: 'SlateBlue',
                backgroundColor: 'Orange',
                hoverBackgroundColor: 'LightGray',
                borderWidth: .5,
                data: week,
              },
              {
                label: 'day',
                borderColor: 'SlateBlue',
                backgroundColor: 'DodgerBlue',
                hoverBackgroundColor: 'LightGray',
                borderWidth: .5,
                data: day,
              },
            ]
          },
          options: {
            layout: {
              padding: {
                bottom: 50
              }
            },
            responsive: true,
            legend: {
              position: 'top',
            },
          }
        });
      })
  }



}
