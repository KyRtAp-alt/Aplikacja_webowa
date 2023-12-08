import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  slidePosition = 0;
  slideWidth = 1440;

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.slidePosition -= this.slideWidth;
      if (this.slidePosition < -this.slideWidth * 2) {
        this.slidePosition = 0;
      }
    }, 8000);
  }

  nextSlide() {
    this.slidePosition -= this.slideWidth;
    if (this.slidePosition < -this.slideWidth * 2) {
      this.slidePosition = 0;
    }
  }

  prevSlide() {
    this.slidePosition += this.slideWidth;
    if (this.slidePosition > 0) {
      this.slidePosition = -this.slideWidth * 2;
    }
  }
}
