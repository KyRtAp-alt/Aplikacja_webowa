import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { RosService } from '../ros.service';
import { SchemeService } from '../scheme.service';
import { Title } from '@angular/platform-browser';
import { ObjectId } from 'mongodb';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.scss'],
})
export class DoctorAddComponent implements OnInit {
  //Main
  doctors: any[] = [];
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  content: string = '';
  specialization: string = '';
  selectedDoctorId: string = '';
  editingDoctor: boolean = false;

  //ros
  ross: any[] = [];
  name: string = '';
  specializations: string[] = [];

  //shceme
  schemes: any[] = [];
  scheme: string = '';

  constructor(
    private doctorService: DoctorService,
    private rosService: RosService,
    private schemeService: SchemeService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Admin pracacownik');
  }

  ngOnInit(): void {
    this.getDoctors();
    this.getRoss();
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

  getRoss() {
    this.rosService.getRoss().subscribe(
      (ross: any) => {
        console.log(ross);
        this.ross = ross;
        this.specializations = ross.map((ros: any) => ros.nazwa);
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

  addDoctor() {
    const newDoctor = {
      harmonogram: this.scheme,
      imie: this.firstname,
      nazwisko: this.lastname,
      kategoria: this.category,
      specializacja: this.specialization,
      opis: this.content,
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
    location.reload();
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
    location.reload();
  }

  editDoctor(doctor: any) {
    this.selectedDoctorId = doctor._id;
    this.firstname = doctor.imie;
    this.lastname = doctor.nazwisko;
    this.category = doctor.kategoria;
    this.specialization = doctor.specializacja;
    this.content = doctor.opis;
    this.scheme = doctor.harmonogram;
    this.editingDoctor = true;
  }

  updateDoctor() {
    const updatedDoctor = {
      imie: this.firstname,
      nazwisko: this.lastname,
      kategoria: this.category,
      specializacja: this.specialization,
      opis: this.content,
      harmonogram: this.scheme,
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
    location.reload();
  }

  clearForm() {
    this.selectedDoctorId = '';
    this.firstname = '';
    this.lastname = '';
    this.category = '';
    this.specialization = '';
    this.content = '';
    this.scheme = '';
  }

  isEmptyFields(): boolean {
    return !this.firstname || !this.lastname;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
