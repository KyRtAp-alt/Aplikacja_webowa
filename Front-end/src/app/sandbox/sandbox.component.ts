import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { SchemeService } from '../scheme.service';
import { VisitService } from '../visit.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent {
  doctors: any[] = [];
  schemes: string = '';
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  content: string = '';
  specialization: string = '';
  selectedDoctorId: string = '';
  editingDoctor: boolean = false;
  scheme: string = '';

  constructor(
    private doctorService: DoctorService,
    private schemeService: SchemeService,
    private visitService: VisitService
  ) {}

  ngOnInit() {
    this.getDoctors();
    this.getSchemes();
  }

  addVisit() {
    const newVisit = {};
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
}
