import { Component, OnInit } from '@angular/core';
import { TapsService } from '../../_services/taps.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tap-details',
  templateUrl: './tap-details.component.html',
  styleUrls: ['./tap-details.component.css']
})
export class TapDetailsComponent implements OnInit {
  currentTap = null;
  message= '';

  constructor(
    private tapService: TapsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message='';
    this.getTap(this.route.snapshot.paramMap.get('id'));
  }

  getTap(id): void {
    this.tapService.get(id)
      .subscribe(
        data => {
          this.currentTap = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateinUse(status): void {
    const data = {
      tapNumber: this.currentTap.tapNumber,
      brewery: this.currentTap.brewery,
      beer: this.currentTap.beer,
      description: this.currentTap.description,
      abv: this.currentTap.abv,
      initialVolume: this.currentTap.initialVolume,
      remainingVolume: this.currentTap.remainingVolume,
      price: this.currentTap.price,
      inUse: status
    };

    this.tapService.update(this.currentTap._id, data)
      .subscribe(
        response => {
          this.currentTap.inUse = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateTap(): void {
    this.tapService.update(this.currentTap._id, this.currentTap)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteTap(): void {
    this.tapService.delete(this.currentTap._id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/taps']);
        },
        error => {
          console.log(error);
        });
  }

}
