// addSchedule() {
//   const selectedDaysArray = Object.keys(this.selectedDays).filter(
//     (day) => this.selectedDays[day]
//   );
//   const newSchedule: Schedule = {
//     name: this.selectedScheduleName || 'Nowy Harmonogram',
//     days: selectedDaysArray,
//     hours: Object.keys(this.selectedHours).filter(
//       (hour) => this.selectedHours[hour]
//     ),
//   };

//   this.schedules.push(newSchedule);
// }

import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { SchemeService } from '../scheme.service';
import { VisitService } from '../visit.service';

interface Schedule {
  name: string;
  days: string[];
  hours: string[];
}

@Component({
  selector: 'app-admin-scheme',
  templateUrl: './admin-scheme.component.html',
  styleUrls: ['./admin-scheme.component.scss'],
})
export class AdminSchemeComponent {
  // Main
  days: string[] = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  selectedDays: { [key: string]: boolean } = {};
  name: any[] = [];
  hours: any[] = [];
  selectedStartTime: string = '';
  selectedEndTime: string = '';
  selectedInterval: number = 30;
  selectedScheduleName: string = '';
  generatedHours: string[] = [];
  selectedHours: { [key: string]: boolean } = {};
  schedules: Schedule[] = [];

  //DoctorService
  doctors: any[] = [];
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  content: string = '';
  specialization: string = '';
  worktime: string = '';
  selectedDoctorId: string = '';
  editingDoctor: boolean = false;
  selectedDoctor: any;

  //SchemeService
  workname: any[] = [];
  visits: any[] = [];
  schemes: any[] = [];
  dnitygodnia: any[] = [];
  wybranegodziny: any[] = [];
  selectedSchemeId: string = '';
  editingScheme: boolean = false;
  selectedVisitId: string = '';
  reservedHours: string[] = [];
  // selectedSchemeId: string = '';
  selectedScheme: any;
  // selectedSchemeId: string = '';

  //Formularz dodawania
  czasWizyty: number = 0;
  pracownikID: string = '';
  nazwaharmonogramu: string = '';

  //poniedzialek
  poniedzialekOd: string = '';
  poniedzialekDo: string = '';
  poniedzialekAktywny: boolean = true;

  //wtorek
  wtorekOd: string = '';
  wtorekDo: string = '';
  wtorekAktywny: boolean = true;

  //sroda
  srodaOd: string = '';
  srodaDo: string = '';
  srodaAktywny: boolean = true;

  //czwartek
  czwartekOd: string = '';
  czwartekDo: string = '';
  czwartekAktywny: boolean = true;

  //piatek
  piatekOd: string = '';
  piatekDo: string = '';
  piatekAktywny: boolean = true;

  //sobota
  sobotaOd: string = '';
  sobotaDo: string = '';
  sobotaAktywny: boolean = true;

  constructor(
    private doctorService: DoctorService,
    private schemeService: SchemeService
  ) {}

  ngOnInit() {
    this.getDoctors();
    // this.getSchemes();
  }

  addScheme() {
    const newScheme = {
      czaspracy: {
        poniedzialek: this.poniedzialekAktywny
          ? [
              this.parseTime(this.poniedzialekOd),
              this.parseTime(this.poniedzialekDo),
            ]
          : null,
        wtorek: this.wtorekAktywny
          ? [this.parseTime(this.wtorekOd), this.parseTime(this.wtorekDo)]
          : null,
        sroda: this.srodaAktywny
          ? [this.parseTime(this.srodaOd), this.parseTime(this.srodaDo)]
          : null,
        czwartek: this.czwartekAktywny
          ? [this.parseTime(this.czwartekOd), this.parseTime(this.czwartekDo)]
          : null,
      },
      czaswizyty: this.czasWizyty,
      pracownikID: this.pracownikID,
      nazwaharmonogramu: this.nazwaharmonogramu,
    };

    this.schemeService.addScheme(newScheme).subscribe(
      () => {
        console.log('Dodano harmonogram');
        // this.clearForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private parseTime(timeString: string): number[] {
    const [hours, minutes] = timeString
      .split(':')
      .map((part) => parseInt(part, 10));
    return [hours, minutes];
  }
  //Koniec formularza

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

  onShowMore(doctor: any) {
    doctor.showMore = true;
  }

  onShowLess(doctor: any) {
    doctor.showMore = false;
  }

  clearForm() {
    this.poniedzialekAktywny;
  }
}

//Inne

// sendData() {
//   const data = {
//     czaspracy: {
//       poniedzialek: this.poniedzialekAktywny
//         ? [
//             this.parseTime(this.poniedzialekOd),
//             this.parseTime(this.poniedzialekDo),
//           ]
//         : null,
//       wtorek: this.wtorekAktywny
//         ? [this.parseTime(this.wtorekOd), this.parseTime(this.wtorekDo)]
//         : null,
//       sroda: this.srodaAktywny
//         ? [this.parseTime(this.srodaOd), this.parseTime(this.srodaDo)]
//         : null,
//     },
//     czaswizyty: this.czasWizyty,
//     pracownikID: this.pracownikID,
//   };

//   if (this.poniedzialekAktywny || this.wtorekAktywny || this.srodaAktywny) {
//     console.log(data);
//   } else {
//     console.log('Zaden dzien nie jest aktywny.');
//   }
// }

// clientFirstname: { [key: string]: string } = {};
// clientLastname: { [key: string]: string } = {};

// selectedHoursToReserve: string[] = [];

// reserveHour(hour: string) {
//   if (!this.isHourReserved(hour)) {
//     this.reservedHours.push(hour);
//     console.log('Zarezerwowano godzinę:', hour);
//   } else {
//     console.log('Godzina już zarezerwowana');
//   }
// }

// isEmptyClientFields(hour: string): boolean {
//   return !this.clientFirstname[hour] || !this.clientLastname[hour];
// }

// toggleHourSelection(hour: string) {
//   if (this.selectedHoursToReserve.includes(hour)) {
//     this.selectedHoursToReserve = this.selectedHoursToReserve.filter(
//       (selectedHour) => selectedHour !== hour
//     );
//   } else {
//     this.selectedHoursToReserve.push(hour);
//   }
// }

// isHourReserved(hour: string): boolean {
//   return this.reservedHours.includes(hour);
// }

// constructor(
//   private doctorService: DoctorService,
//   private schemeService: SchemeService
// ) {}

// ngOnInit() {
//   this.getDoctors();
//   this.getSchemes();
// }

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

// getSchemes() {
//   this.schemeService.getScheme().subscribe(
//     (schemes: any) => {
//       console.log(schemes);
//       this.visits = schemes;
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
// }
// addScheme() {
//   const newScheme = {
//     workname: this.selectedScheduleName,
//     dnitygodnia: this.selectedDays,
//     wybranegodziny: this.generatedHours.filter(
//       (hour) => this.selectedHours[hour]
//     ),
//   };

//   this.schemeService.addScheme(newScheme).subscribe(
//     () => {
//       console.log('Dodano harmonogram');
//       this.clearForm();
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
// }
// deleteScheme(id: string) {
//   this.schemeService.deleteScheme(id).subscribe(
//     () => {
//       console.log('Usunieto garmonogram');
//       this.getSchemes();
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
// }
// editScheme(scheme: any) {
//   this.selectedSchemeId = scheme._id;
//   this.editingScheme = true;
//   this.name = scheme.name;
//   this.days = scheme.dnitygodnia;
//   this.hours = scheme.wybranegodziny;
// }
// updateScheme() {
//   const updateScheme = {
//     workname: this.selectedScheduleName,
//     dnitygodnia: this.selectedDays,
//     wybranegodziny: this.selectedHours,
//   };
//   this.schemeService
//     .updateScheme(this.selectedSchemeId, updateScheme)
//     .subscribe(
//       () => {
//         console.log('Zaktulizowano harmonogram');
//         this.getSchemes();
//         this.clearForm();
//         this.editingScheme = false;
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
// }
// clearForm() {
//   this.selectedScheduleName = '';
// }
// isEmptyFields() {
//   return !this.workname || !this.days || !this.hours;
// }}
