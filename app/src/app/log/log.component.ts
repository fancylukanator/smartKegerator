import { Component, OnInit } from '@angular/core';
import { LogService } from '../_services/log.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  logs: any;
  currentLog = null;
  currentIndex = -1;
  user = '';

  constructor(
    private logService: LogService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.retrieveLogs();
  }

  retrieveLogs(): void {
    this.logService.getAll()
    .subscribe(
      data => {
        this.logs = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  refreshList(): void {
    this.retrieveLogs();
    this.currentLog = null;
    this.currentIndex = -1; 
  }

  setActiveLog(log, index): void {
    this.currentLog = log;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.logService.findByUser(this.user)
    .subscribe(
      data => {
        this.logs = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  deleteLog(): void {
    this.logService.delete(this.currentLog._id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/logs']);
        },
        error => {
          console.log(error);
        });
  }
}
