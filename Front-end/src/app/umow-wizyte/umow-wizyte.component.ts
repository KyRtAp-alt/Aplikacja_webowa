import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
@Component({
  selector: 'app-umow-wizyte',
  templateUrl: './umow-wizyte.component.html',
  styleUrls: ['./umow-wizyte.component.scss'],
})
export class UmowWizyteComponent {
  doctors: any[] = [];
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  worktime: string = '';
  currentDoctorIndex: number = 0;
  currentDoctor: any;
  expandedDoctor: any;

  onShowMore(doctor: any) {
    doctor.showMore = true;
  }

  onShowLess(doctor: any) {
    doctor.showMore = false;
  }

  constructor(private doctorService: DoctorService) {}

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

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
