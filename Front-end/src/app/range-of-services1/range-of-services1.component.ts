import { Component, HostListener } from '@angular/core';
import { RosService } from '../ros.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-range-of-services1',
  templateUrl: './range-of-services1.component.html',
  styleUrls: ['./range-of-services1.component.scss'],
})
export class RangeOfServices1Component {
  showScrollButton = false;

  ross: any[] = [];
  name: string = '';
  currentRosIndex: number = 0;
  currentRos: any;
  selectedRos: any;

  constructor(private rosService: RosService, private titleService: Title) {
    this.titleService.setTitle('Zakres usług');
  }

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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 400;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
