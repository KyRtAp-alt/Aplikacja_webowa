import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { SchemeService } from '../scheme.service';

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
  //Main
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

  //SchemeService
  visits: any[] = [];
  selectedVisitId: string = '';
  editingVisit: boolean = false;

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

  constructor(
    private doctorService: DoctorService,
    private schemeService: SchemeService
  ) {}

  ngOnInit() {
    this.getDoctors();
    this.getVisit();
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

  getVisit() {
    this.schemeService.getVisit().subscribe(
      (visits: any) => {
        console.log(visits);
        this.visits = visits;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addVisit() {
    const newVisit = {
      nazwa: this.selectedScheduleName,
      dnitygodnia: this.selectedDays,
      wybranegodziny: this.selectedHours,
    };

    this.schemeService.addVisit(newVisit).subscribe(
      () => {
        console.log('Dodano harmonogram');
        this.clearForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteVisit(id: string) {
    this.schemeService.deleteVisit(id).subscribe(() => {
      console.log('Usunięto harmonogram');
      this.getVisit();
    });
  }

  confirmDelete() {}

  editVisit(visit: any) {
    this.selectedVisitId = visit._id;
    this.editingVisit = true;
  }

  updateVisit() {
    const updateVisit = {
      nazwa: this.selectedScheduleName,
      dnitygodnia: this.selectedDays,
      wybranegodziny: this.selectedHours,
    };

    this.schemeService
      .updateVisit(this.selectedVisitId, updateVisit)
      .subscribe(() => {
        console.log('Zaktulizowano harmonogram');
        this.getVisit();
        this.clearForm();
        this.editingVisit = false;
      });
  }

  clearForm() {
    this.selectedScheduleName = '';
  }

  // onShowMore(doctor: any) {
  //   doctor.showMore = true;
  // }

  // onShowLess(doctor: any) {
  //   doctor.showMore = false;
  // }

  // clearForm() {
  //   this.name = ' ';
  // }

  isEmptyFields(): boolean {
    return !this.name || !this.days || !this.hours;
  }
}
