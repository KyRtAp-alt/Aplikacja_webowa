import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { RosService } from '../ros.service';
import { SchemeService } from '../scheme.service';

// interface Schedule {
//   name: string;
//   days: string[];
//   hours: string[];
// }

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.scss'],
})
export class DoctorAddComponent {
  //Main
  doctors: any[] = [];
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  content: string = '';
  specialization: string = '';
  // worktime: string = '';
  selectedDoctorId: string = '';
  editingDoctor: boolean = false;

  //ros
  ross: any[] = [];
  name: string = '';
  currentRosIndex: number = 0;
  currentRos: any;
  selectedRos: any;
  specializations: string[] = [];

  //shceme
  visits: any[] = [];
  scheme: any[] = [];
  selectedSchemeId: string = '';
  selectedVisitId: string = '';

  constructor(
    private doctorService: DoctorService,
    private rosService: RosService,
    private schemeService: SchemeService
  ) {}

  ngOnInit() {
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
        this.visits = schemes;
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
      // czaspracy: this.worktime,
      nazwaharmonogramu: this.scheme,
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
    // this.worktime = doctor.czaspracy;
    this.editingDoctor = true;
  }

  updateDoctor() {
    const updatedDoctor = {
      imie: this.firstname,
      nazwisko: this.lastname,
      kategoria: this.category,
      specializacja: this.specialization,
      opis: this.content,
      // czaspracy: this.worktime,
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
    // this.worktime = '';
  }

  isEmptyFields(): boolean {
    return (
      !this.firstname ||
      !this.lastname ||
      !this.category ||
      !this.specialization ||
      !this.content
      // !this.worktime
    );
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

//Work scheme
// days: string[] = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
// selectedDays: { [key: string]: boolean } = {};
// name: any[] = [];
// hours: any[] = [];
// selectedStartTime: string = '';
// selectedEndTime: string = '';
// selectedInterval: number = 30;
// selectedScheduleName: string = '';
// generatedHours: string[] = [];
// selectedHours: { [key: string]: boolean } = {};
// schedules: Schedule[] = [];

// generateHours() {
//   this.generatedHours = this.generateHourRange(
//     this.selectedStartTime,
//     this.selectedEndTime,
//     this.selectedInterval
//   );
//   this.selectedHours = {};
// }

// generateHourRange(
//   startTime: string,
//   endTime: string,
//   interval: number
// ): string[] {
//   const startHour = new Date(`2023-01-01T${startTime}`);
//   const endHour = new Date(`2023-01-01T${endTime}`);
//   const hourRange: string[] = [];

//   while (startHour <= endHour) {
//     hourRange.push(this.formatHour(startHour));
//     startHour.setMinutes(startHour.getMinutes() + interval);
//   }

//   return hourRange;
// }

// formatHour(date: Date): string {
//   const hour = date.getHours();
//   const minute = date.getMinutes();
//   return `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`;
// }
