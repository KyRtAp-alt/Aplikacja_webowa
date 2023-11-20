import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';

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
  doctors: any[] = [];
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  days: string[] = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  selectedDays: { [key: string]: boolean } = {};

  selectedStartTime: string = '';
  selectedEndTime: string = '';
  selectedInterval: number = 30;
  selectedScheduleName: string = '';
  generatedHours: string[] = [];
  selectedHours: { [key: string]: boolean } = {};

  schedules: Schedule[] = [];

  generateHours() {
    this.generatedHours = this.generateHourRange(
      this.selectedStartTime,
      this.selectedEndTime,
      this.selectedInterval
    );
    this.selectedHours = {};
  }

  addSchedule() {
    const selectedDaysArray = Object.keys(this.selectedDays).filter(
      (day) => this.selectedDays[day]
    );
    const newSchedule: Schedule = {
      name: this.selectedScheduleName || 'Nowy Harmonogram',
      days: selectedDaysArray,
      hours: Object.keys(this.selectedHours).filter(
        (hour) => this.selectedHours[hour]
      ),
    };

    this.schedules.push(newSchedule);
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
}
