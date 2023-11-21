import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { RosService } from '../ros.service';
import { SchemeService } from '../scheme.service';

interface Schedule {
  name: string;
  days: string[];
  hours: string[];
}

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent {
  doctors: any[] = [];
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  content: string = '';
  specialization: string = '';
  worktime: string = '';
  selectedDoctorId: string = '';
  editingDoctor: boolean = false;

  //ros
  ross: any[] = [];
  name: string = '';
  currentRosIndex: number = 0;
  currentRos: any;
  selectedRos: any;
  specializations: string[] = [];

  //SchemeService
  visits: any[] = [];
  scheme: any[] = [];
  selectedDoctorSchedule: string = '';
  workscheme: string = '';
  wrokschemes: string[] = [];

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
      !this.content
      // !this.worktime
    );
  }

  //Main
  days: string[] = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  selectedDays: { [key: string]: boolean } = {};
  hours: any[] = [];
  selectedStartTime: string = '';
  selectedEndTime: string = '';
  selectedInterval: number = 30;
  selectedScheduleName: string = '';
  generatedHours: string[] = [];
  selectedHours: { [key: string]: boolean } = {};
  schedules: Schedule[] = [];

  schemes: any[] = [];
  dnitygodnia: any[] = [];
  selectedSchemeId: string = '';
  editingScheme: boolean = false;
  // selectedVisitId: string = '';

  generateHours() {
    this.generatedHours = this.generateHourRange(
      this.selectedStartTime,
      this.selectedEndTime,
      this.selectedInterval
    );
    this.selectedHours = {};
  }

  generateHourRange(
    startTime: string,
    endTime: string,
    interval: number
  ): string[] {
    const startHour = new Date(`2023-01-01T${startTime}`);
    const endHour = new Date(`2023-01-01T${endTime}`);
    const hourRange: string[] = [];

    while (startHour <= endHour) {
      hourRange.push(this.formatHour(startHour));
      startHour.setMinutes(startHour.getMinutes() + interval);
    }

    return hourRange;
  }

  formatHour(date: Date): string {
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`;
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

  addScheme() {
    const newScheme = {
      nazwa: this.selectedScheduleName,
      dnitygodnia: this.selectedDays,
      wybranegodziny: this.selectedHours,
    };

    this.schemeService.addScheme(newScheme).subscribe(
      () => {
        console.log('Dodano harmonogram');
        this.clearForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteScheme(id: string) {
    this.schemeService.deleteScheme(id).subscribe(
      () => {
        console.log('Usunieto garmonogram');
        this.getSchemes();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editScheme(scheme: any) {
    this.selectedSchemeId = scheme._id;
    this.editingScheme = true;
    this.name = scheme.nazwa;
    this.days = scheme.dnitygodnia;
    this.hours = scheme.wybranegodziny;
  }

  updateScheme() {
    const updateScheme = {
      nazwa: this.selectedScheduleName,
      dnitygodnia: this.selectedDays,
      wybranegodziny: this.selectedHours,
    };

    this.schemeService
      .updateScheme(this.selectedSchemeId, updateScheme)
      .subscribe(
        () => {
          console.log('Zaktulizowano harmonogram');
          this.getSchemes();
          this.clearForm();
          this.editingScheme = false;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  onShowMore(doctor: any) {
    doctor.showMore = true;
  }

  onShowLess(doctor: any) {
    doctor.showMore = false;
  }

  // clearForm() {
  //   this.name = ' ';
  // }
}
