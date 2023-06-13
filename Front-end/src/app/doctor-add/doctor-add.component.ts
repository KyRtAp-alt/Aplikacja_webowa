import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.scss'],
})
export class DoctorAddComponent {
  doctors: any[] = [];
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  specialization: string = '';

  constructor(private doctorService: DoctorService) {}

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

  addDoctor() {
    const newDoctor = {
      imie: this.firstname,
      nazwisko: this.lastname,
      kategoria: this.category,
      specializacja: this.specialization,
    };

    this.doctorService.addDoctor(newDoctor).subscribe(
      () => {
        console.log('Dodano lekarza');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteDoctor(id: string) {
    this.doctorService.deleteDoctor(id).subscribe(
      () => {
        console.log('Usunięto lekarza');
        this.getDoctors();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
