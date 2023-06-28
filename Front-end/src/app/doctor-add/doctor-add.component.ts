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
  content: string = '';
  specialization: string = '';
  worktime: string = '';
  selectedDoctorId: string = '';
  editingDoctor: boolean = false;

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

  addDoctor() {
    const newDoctor = {
      imie: this.firstname,
      nazwisko: this.lastname,
      kategoria: this.category,
      specializacja: this.specialization,
      opis: this.content,
      czaspracy: this.worktime,
    };

    this.doctorService.addDoctor(newDoctor).subscribe(
      () => {
        console.log('Dodano lekarza');
        this.clearForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  confirmDelete(doctorId: string) {
    const confirmation = confirm(
      'Czy na pewno chcesz usunąć tego lekarza, specialistę?'
    );
    if (confirmation) {
      this.deleteDoctor(doctorId);
      alert('Usunięto lekarza, specialistę');
    }
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

  editDoctor(doctor: any) {
    this.selectedDoctorId = doctor._id;
    this.firstname = doctor.imie;
    this.lastname = doctor.nazwisko;
    this.category = doctor.kategoria;
    this.specialization = doctor.specializacja;
    this.content = doctor.opis;
    this.worktime = doctor.czaspracy;
    this.editingDoctor = true;
  }

  updateDoctor() {
    const updatedDoctor = {
      imie: this.firstname,
      nazwisko: this.lastname,
      kategoria: this.category,
      specializacja: this.specialization,
      opis: this.content,
      czaspracy: this.worktime,
    };

    this.doctorService
      .updateDoctor(this.selectedDoctorId, updatedDoctor)
      .subscribe(
        () => {
          console.log('Zaktualizowano lekarza');
          this.getDoctors();
          this.clearForm();
          this.editingDoctor = false;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  clearForm() {
    this.selectedDoctorId = '';
    this.firstname = '';
    this.lastname = '';
    this.category = '';
    this.specialization = '';
    this.content = '';
    this.worktime = '';
  }

  isEmptyFields(): boolean {
    return (
      !this.firstname ||
      !this.lastname ||
      !this.category ||
      !this.specialization ||
      !this.content ||
      !this.worktime
    );
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
