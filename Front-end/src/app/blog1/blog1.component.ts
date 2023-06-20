import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-blog1',
  templateUrl: './blog1.component.html',
  styleUrls: ['./blog1.component.scss'],
})
export class Blog1Component {
  // showMore: any;
  doctors: any[] = [];
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  currentDoctorIndex: number = 0;
  currentDoctor: any;

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
}
