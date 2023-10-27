import { Component } from '@angular/core';
import { RosService } from '../ros.service';

@Component({
  selector: 'app-range-of-services1',
  templateUrl: './range-of-services1.component.html',
  styleUrls: ['./range-of-services1.component.scss'],
})
export class RangeOfServices1Component {
  ross: any[] = [];
  name: string = '';
  currentRosIndex: number = 0;
  currentRos: any;
  selectedRos: any;

  // onShowMore() {
  //   this.showMore = true;
  // }
  // showMore = false;

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
