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

// interface Schedule {
//   name: string;
//   days: string[];
//   hours: string[];
// }

@Component({
  selector: 'app-admin-scheme',
  templateUrl: './admin-scheme.component.html',
  styleUrls: ['./admin-scheme.component.scss'],
})
export class AdminSchemeComponent {
  //Main
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
  // //DoctorService
  // doctors: any[] = [];
  // firstname: string = '';
  // lastname: string = '';
  // category: string = '';
  // content: string = '';
  // specialization: string = '';
  // worktime: string = '';
  // selectedDoctorId: string = '';
  // editingDoctor: boolean = false;
  // //SchemeService
  // workname: any[] = [];
  // visits: any[] = [];
  // schemes: any[] = [];
  // dnitygodnia: any[] = [];
  // wybranegodziny: any[] = [];
  // selectedSchemeId: string = '';
  // editingScheme: boolean = false;
  // // selectedVisitId: string = '';
  // constructor(
  //   private doctorService: DoctorService,
  //   private schemeService: SchemeService
  // ) {}
  // ngOnInit() {
  //   // this.getDoctors();
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
  //     wybranegodziny: this.selectedHours,
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
  // onShowMore(doctor: any) {
  //   doctor.showMore = true;
  // }
  // onShowLess(doctor: any) {
  //   doctor.showMore = false;
  // }
  // isEmptyFields() {
  //   return !this.workname || !this.days || !this.hours;
  // }
}
// getDoctors() {
//   this.doctorService.getDoctors().subscribe(
//     (doctors: any) => {
//       console.log(doctors);
//       this.doctors = doctors;
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
// }

// addDoctor() {
//   const newDoctor = {
//     nazwa: this.selectedScheduleName,
//     dnitygodnia: this.selectedDays,
//     wybranegodziny: this.selectedHours,
//   };

//   this.doctorService.addDoctor(newDoctor).subscribe(
//     () => {
//       console.log('Dodano lekarza');
//       this.clearForm();
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
// }

// editDoctor(doctor: any) {
//   this.editingDoctor = true;
//   this.selectedDoctorId = doctor._id;
//   this.selectedScheduleName = doctor.nazwa;
//   this.selectedDays = doctor.dnitygodnia;
//   this.selectedHours = doctor.wybranegodziny;
// }

// updateDoctor() {
//   const updatedDoctor = {
//     nazwa: this.selectedScheduleName,
//     dnitygodnia: this.selectedDays,
//     wybranegodziny: this.selectedHours,
//   };

//   this.doctorService
//     .updateDoctor(this.selectedDoctorId, updatedDoctor)
//     .subscribe(
//       () => {
//         console.log('Zaktualizowano lekarza');
//         this.getDoctors();
//         this.clearForm();
//         this.editingDoctor = false;
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
// }
