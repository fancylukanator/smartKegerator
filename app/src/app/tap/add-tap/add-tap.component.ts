import { Component, OnInit } from '@angular/core';
import { TapsService } from '../../_services/taps.service';

@Component({
  selector: 'app-add-tap',
  templateUrl: './add-tap.component.html',
  styleUrls: ['./add-tap.component.css']
})
export class AddTapComponent implements OnInit {
  tap = {
    tapNumber: '',
    brewery: '',
    beer: '',
    description: '',
    abv: '',
    initialVolume: '',
    remainingVolume: '',
    price: '',
    inUse: false
  };
  submitted = false;

  constructor(private tapsService: TapsService) { }

  ngOnInit(): void {
  }

  saveTap(): void{
    const data = {
      tapNumber: this.tap.tapNumber,
      brewery: this.tap.brewery,
      beer: this.tap.beer,
      description: this.tap.description,
      abv: this.tap.abv,
      initialVolume: this.tap.initialVolume,
      remainingVolume: this.tap.remainingVolume,
      price: this.tap.price,
    };

    this.tapsService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
  }

  newTap(): void {
    this.submitted = false;
    this.tap = {
      tapNumber: '',
      brewery: '',
      beer: '',
      description: '',
      abv: '',
      initialVolume: '',
      remainingVolume: '',
      price: '',
      inUse: false
    };
  }
}
