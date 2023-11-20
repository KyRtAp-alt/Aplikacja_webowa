import { Component } from '@angular/core';

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
export class SandboxComponent {}

// days: string[] = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
// selectedDays: { [key: string]: boolean } = {};

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

// generateHourRange(
//   startTime: string,
//   endTime: string,
//   interval: number
// ): string[] {
//   const startHour = new Date(`1970-01-01T${startTime}`);
//   const endHour = new Date(`1970-01-01T${endTime}`);
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

// selectedStartTime: string = '';
// selectedEndTime: string = '';
// timeInterval: number = 1; // Default interval is set to 1 hour
// generatedTimeRange: string[] = [];
// selectedTimes: { [key: string]: boolean } = {};
// generateTimeRange() {
//   const startHour = parseInt(this.selectedStartTime.split(':')[0]);
//   const endHour = parseInt(this.selectedEndTime.split(':')[0]);
//   const interval = this.timeInterval;
//   interval: number = 30;
//   this.generatedTimeRange = [];
//   for (let hour = startHour; hour <= endHour; hour++) {
//     for (let minute = 0; minute < 60; minute += this.interval) {
//       const formattedHour = hour.toString().padStart(2, '0');
//       const formattedMinute = minute.toString().padStart(2, '0');
//       const time = `${formattedHour}:${formattedMinute}`;
//       hoursRange.push(time);
//     }
//   }
//   return hoursRange;
// }
// generateHoursRange() {
//   const startHour = 8;
//   const endHour = 16;
//   const hoursRange = [];
//   for (let hour = startHour; hour <= endHour; hour++) {
//     for (let minute = 0; minute < 60; minute += this.interval) {
//       const formattedHour = hour.toString().padStart(2, '0');
//       const formattedMinute = minute.toString().padStart(2, '0');
//       const time = `${formattedHour}:${formattedMinute}`;
//       hoursRange.push(time);
//     }
//   }
// }

// generatedSchedule: { name: string; dayOfWeek: string; schedule: string[] } = {
//   name: '',
//   dayOfWeek: '',
//   schedule: [],
// };
// generateSchedule(formData: any) {
//   const scheduleName = formData.scheduleName;
//   const dayOfWeek = formData.dayOfWeek;
//   const startTime = new Date(`2023-01-01T${formData.startTime}`);
//   const endTime = new Date(`2023-01-01T${formData.endTime}`);
//   let currentTime = new Date(startTime);
//   const step = 30; // minuty
//   this.generatedSchedule = {
//     name: scheduleName,
//     dayOfWeek: dayOfWeek,
//     schedule: [],
//   };
//   while (currentTime <= endTime) {
//     const formattedTime = this.formatTime(currentTime);
//     this.generatedSchedule.schedule.push(formattedTime);
//     currentTime.setMinutes(currentTime.getMinutes() + step);
//   }
//   console.log('Wygenerowany Harmonogram:', this.generatedSchedule);
// }
// private formatTime(date: Date): string {
//   const hours = date.getHours().toString().padStart(2, '0');
//   const minutes = date.getMinutes().toString().padStart(2, '0');
//   return `${hours}:${minutes}`;
// }
// doctors: any[] = [];
// firstname: string = '';
// lastname: string = '';
// category: string = '';
// daysOfWeek: string[] = [
//   'Poniedzialek',
//   'Wtorek',
//   'Sroda',
//   'Czwartek',
//   'Piatek',
//   'Sobota',
// ];
// availableHours: string[] = [];
// selectedGeneratedHours: { [key: string]: boolean } = {};
// showGeneratedHoursList: boolean = false;
// selectedHoursToShow: string[] = [];
// selectedDaysToShow: string = '';
// selectedHours: { [key: string]: boolean } = {};
// generatedHoursRange: string[] = [];
// interval: number = 30;
// generateHoursRange() {
//   const startHour = 8;
//   const endHour = 16;
//   const hoursRange = [];
//   for (let hour = startHour; hour <= endHour; hour++) {
//     for (let minute = 0; minute < 60; minute += this.interval) {
//       const formattedHour = hour.toString().padStart(2, '0');
//       const formattedMinute = minute.toString().padStart(2, '0');
//       const time = `${formattedHour}:${formattedMinute}`;
//       hoursRange.push(time);
//     }
//   }
//   this.generatedHoursRange = hoursRange;
// }
// toggleHourSelection(hour: string) {
//   this.selectedHours[hour] = !this.selectedHours[hour];
// }
// constructor(private doctorService: DoctorService) {}
// ngOnInit() {
//   this.getDoctors();
// }
// generatedSchedule: {
//   name: string;
//   schedule: string[];
//   daysOfWeek: { [key: string]: boolean };
//   startTime: string;
//   endTime: string;
// } = {
//   name: '',
//   schedule: [],
//   daysOfWeek: {},
//   startTime: '',
//   endTime: '',
// };
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
// generateSchedule(formData: any) {
//   const scheduleName = formData.scheduleName;
//   const dayOfWeek = formData.dayOfWeek;
//   const startTime = new Date(`2023-01-01T${formData.startTime}`);
//   const endTime = new Date(`2023-01-01T${formData.endTime}`);
//   let currentTime = new Date(startTime);
//   const step = 15; // minuty
//   this.selectedDaysToShow = this.getSelectedDays();
//   // this.selectedHoursToShow = this.generateSelectedHoursToShow();
//   this.generatedSchedule = {
//     name: scheduleName,
//     daysOfWeek: { ...formData.daysOfWeek },
//     startTime: formData.startTime,
//     endTime: formData.endTime,
//     schedule: [],
//   };
//   while (currentTime <= endTime) {
//     const formattedTime = this.formatTime(currentTime);
//     this.generatedSchedule.schedule.push(formattedTime);
//     currentTime.setMinutes(currentTime.getMinutes() + step);
//   }
//   console.log('FormData:', formData);
//   console.log('Wygenerowany Harmonogram:', this.generatedSchedule);
//   console.log('Selected Days:', this.selectedDaysToShow);
//   console.log('Selected Hours:', this.selectedHoursToShow);
// }
// private formatTime(date: Date): string {
//   const hours = date.getHours().toString().padStart(2, '0');
//   const minutes = date.getMinutes().toString().padStart(2, '0');
//   return `${hours}:${minutes}`;
// }
// getSelectedDays(): string {
//   return this.daysOfWeek
//     .filter((day) => this.generatedSchedule.daysOfWeek[day])
//     .join(', ');
// }
// // generateSelectedHoursToShow(): string[] {
// //   const selectedHours: string[] = [];
// //   for (const hour in this.selectedHours) {
// //     if (this.selectedHours.hasOwnProperty(hour) && this.selectedHours[hour]) {
// //       selectedHours.push(hour);
// //     }
// //   }
// //   return selectedHours;
// // }
// // generateHourList(): void {
// //   this.selectedHoursToShow = this.generateSelectedHoursToShow();
// //   this.showGeneratedHoursList = true;
// // }
