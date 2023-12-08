import { Component, HostListener } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss'],
})
export class OurTeamComponent {
  showScrollButton = false;

  doctors: any[] = [];
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  currentDoctorIndex: number = 0;
  currentDoctor: any;

  constructor(
    private doctorService: DoctorService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Nasz zespół');
  }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.doctorService.getDoctors().subscribe(
      (doctors: any) => {
        console.log(doctors);
        this.doctors = doctors;
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
