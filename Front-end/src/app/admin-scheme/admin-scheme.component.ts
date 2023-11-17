import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-admin-scheme',
  templateUrl: './admin-scheme.component.html',
  styleUrls: ['./admin-scheme.component.scss'],
})
export class AdminSchemeComponent {
  doctors: any[] = [];
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  daysOfWeek: string[] = [
    'Poniedzialek',
    'Wtorek',
    'Sroda',
    'Czwartek',
    'Piatek',
    'Sobota',
  ];

  availableHours: string[] = [];
  selectedGeneratedHours: { [key: string]: boolean } = {};
  showGeneratedHoursList: boolean = false;

  selectedHoursToShow: string[] = [];

  selectedDaysToShow: string = '';

  selectedHours: { [key: string]: boolean } = {};

  interval: number = 30;

  generateHoursRange() {
    const startHour = 8;
    const endHour = 16;
    const hoursRange = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += this.interval) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const time = `${formattedHour}:${formattedMinute}`;
        hoursRange.push(time);
      }
    }
    return hoursRange;
  }

  toggleHourSelection(hour: string) {
    this.selectedHours[hour] = !this.selectedHours[hour];
  }

  constructor(private doctorService: DoctorService) {}
  ngOnInit() {
    this.getDoctors();
  }

  generatedSchedule: {
    name: string;
    schedule: string[];
    daysOfWeek: { [key: string]: boolean };
    startTime: string;
    endTime: string;
  } = {
    name: '',
    schedule: [],
    daysOfWeek: {},
    startTime: '',
    endTime: '',
  };

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

  generateSchedule(formData: any) {
    const scheduleName = formData.scheduleName;
    const dayOfWeek = formData.dayOfWeek;
    const startTime = new Date(`2023-01-01T${formData.startTime}`);
    const endTime = new Date(`2023-01-01T${formData.endTime}`);
    let currentTime = new Date(startTime);
    const step = 15; // minuty

    this.selectedDaysToShow = this.getSelectedDays();

    // this.selectedHoursToShow = this.generateSelectedHoursToShow();

    this.generatedSchedule = {
      name: scheduleName,
      daysOfWeek: { ...formData.daysOfWeek },
      startTime: formData.startTime,
      endTime: formData.endTime,
      schedule: [],
    };

    while (currentTime <= endTime) {
      const formattedTime = this.formatTime(currentTime);
      this.generatedSchedule.schedule.push(formattedTime);
      currentTime.setMinutes(currentTime.getMinutes() + step);
    }
    console.log('FormData:', formData);
    console.log('Wygenerowany Harmonogram:', this.generatedSchedule);
    console.log('Selected Days:', this.selectedDaysToShow);
    console.log('Selected Hours:', this.selectedHoursToShow);
  }

  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  getSelectedDays(): string {
    return this.daysOfWeek
      .filter((day) => this.generatedSchedule.daysOfWeek[day])
      .join(', ');
  }

  // generateSelectedHoursToShow(): string[] {
  //   const selectedHours: string[] = [];
  //   for (const hour in this.selectedHours) {
  //     if (this.selectedHours.hasOwnProperty(hour) && this.selectedHours[hour]) {
  //       selectedHours.push(hour);
  //     }
  //   }
  //   return selectedHours;
  // }

  // generateHourList(): void {
  //   this.selectedHoursToShow = this.generateSelectedHoursToShow();
  //   this.showGeneratedHoursList = true;
  // }
}
