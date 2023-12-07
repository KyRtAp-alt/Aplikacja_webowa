import { Component } from '@angular/core';
import { SchemeService } from '../scheme.service';
import { VisitService } from '../visit.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent {
  schemes: any[] = [];
  scheme: string = '';
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  content: string = '';
  specialization: string = '';
  selectedDoctorId: string = '';
  editingDoctor: boolean = false;

  constructor(
    private schemeService: SchemeService,
    private visitService: VisitService
  ) {}

  ngOnInit() {
    this.getSchemes();
  }

  addVisit() {
    const newVisit = {};
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
