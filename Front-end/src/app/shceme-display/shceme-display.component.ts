import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SchemeService } from '../scheme.service';

interface WorkTime {
  starttime: string;
  endtime: string;
}

export interface ScheduleData {
  _id: string;
  nazwaharmonogramu: string;
  czaspracy: {
    [key: string]: WorkTime[] | null;
  };
  czaswizyty: number;
  startdataharmonogramu: string;
  enddataharmonogramu: string;
}

@Component({
  selector: 'app-shceme-display',
  templateUrl: './shceme-display.component.html',
  styleUrls: ['./shceme-display.component.scss'],
})
export class ShcemeDisplayComponent implements OnInit {
  @Input() scheduleId: string = '';

  showForm: boolean = false;

  scheduleData: ScheduleData | undefined;
  schedule: { day: string; hours: string[] }[] = [];
  selectedDateTime: moment.Moment | null = null;

  constructor(private schemeService: SchemeService) {}

  ngOnInit() {
    this.schemeService.getScheduleData().subscribe(
      (data: ScheduleData[]) => {
        this.scheduleData = data.find((item) => item._id === this.scheduleId);
        this.generateSchedule();
      },
      (error) => {
        console.error('Error fetching schedule data:', error);
      }
    );
  }

  generateSchedule() {
    if (this.scheduleData) {
      Object.keys(this.scheduleData.czaspracy).forEach((day) => {
        const dayName = this.mapDayName(day);
        const workTimes = this.scheduleData?.czaspracy[day] || [];

        if (workTimes) {
          workTimes.forEach((time) => {
            const startTime = moment(time.starttime, 'HH:mm');
            const endTime = moment(time.endtime, 'HH:mm');
            const visitDuration = moment.duration(
              this.scheduleData?.czaswizyty,
              'minutes'
            );
            let currentDateTime = startTime.clone();

            while (currentDateTime.isBefore(endTime)) {
              const timeString = currentDateTime.format('HH:mm');
              const dateTime = currentDateTime.clone();
              const scheduleEntry = this.schedule.find(
                (entry) => entry.day === dayName
              );

              if (scheduleEntry) {
                scheduleEntry.hours.push(timeString);
              } else {
                this.schedule.push({ day: dayName, hours: [timeString] });
              }

              currentDateTime.add(visitDuration);
            }
          });
        }
      });
    }
  }

  private mapDayName(day: string): string {
    switch (day) {
      case 'poniedzialek':
        return 'Poniedziałek';
      case 'wtorek':
        return 'Wtorek';
      case 'sroda':
        return 'Środa';
      case 'czwartek':
        return 'Czwartek';
      case 'piatek':
        return 'Piątek';
      case 'sobota':
        return 'Sobota';
      case 'niedziela':
        return 'Niedziela';
      default:
        return day;
    }
  }

  openModal() {
    this.showForm = true;
  }

  closeModal() {
    this.showForm = false;
  }

  closeModalVis() {
    this.showForm = false;
  }
}