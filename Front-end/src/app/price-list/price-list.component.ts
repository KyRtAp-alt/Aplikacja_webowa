import { Component } from '@angular/core';
import { RosService } from '../ros.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
})
export class PriceListComponent {
  ross: any[] = [];

  constructor(private rosService: RosService) {}

  ngOnInit() {
    this.getRoss();
  }

  getRoss() {
    this.rosService.getRoss().subscribe(
      (ross: any) => {
        console.log(ross);
        this.ross = ross;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
