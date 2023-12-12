import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent {
  // harmonogramId: string = '';
  // doctors: any[] = [];
  // constructor(private doctorService: DoctorService) {}
  // ngOnInit(): void {
  //   this.getDoctors();
  // }
  // getDoctors() {
  //   this.doctorService.getDoctors().subscribe(
  //     (doctors: any) => {
  //       console.log(doctors);
  //       this.doctors = doctors;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
  // onShowMore(doctor: any) {
  //   doctor.showMore = true;
  // }
  // onShowLess(doctor: any) {
  //   doctor.showMore = false;
  // }
}
