import { Component, HostListener } from '@angular/core';
import { RosService } from '../ros.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
})
export class PriceListComponent {
  showScrollButton = false;

  ross: any[] = [];

  constructor(private rosService: RosService, private titleService: Title) {
    this.titleService.setTitle('Cennik');
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
