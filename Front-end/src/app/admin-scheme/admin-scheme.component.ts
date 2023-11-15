import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-scheme',
  templateUrl: './admin-scheme.component.html',
  styleUrls: ['./admin-scheme.component.scss'],
})
export class AdminSchemeComponent {
  generatedSchedule: { name: string; dayOfWeek: string; schedule: string[] } = {
    name: '',
    dayOfWeek: '',
    schedule: [],
  };

  generateSchedule(formData: any) {
    const scheduleName = formData.scheduleName;
    const dayOfWeek = formData.dayOfWeek;
    const startTime = new Date(`2023-01-01T${formData.startTime}`);
    const endTime = new Date(`2023-01-01T${formData.endTime}`);

    let currentTime = new Date(startTime);
    const step = 30; // minuty

    this.generatedSchedule = {
      name: scheduleName,
      dayOfWeek: dayOfWeek,
      schedule: [],
    };

    while (currentTime <= endTime) {
      const formattedTime = this.formatTime(currentTime);
      this.generatedSchedule.schedule.push(formattedTime);

      currentTime.setMinutes(currentTime.getMinutes() + step);
    }

    console.log('Wygenerowany Harmonogram:', this.generatedSchedule);
  }

  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
