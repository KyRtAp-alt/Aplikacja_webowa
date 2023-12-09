import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { SchemeService } from '../scheme.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  nazwaharmonogramu: string = '';
  doctors: any[] = [];
  schemes: any[] = [];

  constructor(
    private doctorService: DoctorService,
    private schemeService: SchemeService
  ) {}

  ngOnInit(): void {
    this.getDoctors();
    this.getSchemes();
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

  getSchemes() {
    this.schemeService.getScheme().subscribe(
      (schemes: any) => {
        console.log(schemes);
        this.schemes = schemes;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // getScheduleDetails(scheduleId: string): any[] {
  //   const scheduleDetails: any[] = [];

  //   // Wykonaj zapytanie HTTP, aby pobrać szczegóły harmonogramu
  //   this.schemeService.getSchemeForDoctor(scheduleId).subscribe(
  //     (details: any) => {
  //       // Tutaj możesz przypisać pobrane szczegóły do scheduleDetails
  //       scheduleDetails.push(details);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );

  //   return scheduleDetails;
  // }
}
