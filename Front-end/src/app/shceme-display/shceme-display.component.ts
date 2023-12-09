import { Component } from '@angular/core';
import { SchemeService } from '../scheme.service';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-shceme-display',
  templateUrl: './shceme-display.component.html',
  styleUrls: ['./shceme-display.component.scss'],
})
export class ShcemeDisplayComponent {
  doctors: any[] = [];
  schemes: any[] = [];

  constructor(
    private doctorService: DoctorService,
    private schemeService: SchemeService
  ) {}

  ngOnInit() {
    this.getSchemes();
    this.getDoctors();
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
