import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SchemeService } from '../scheme.service';
import { VisitService } from '../visit.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnChanges {
  schemes: any[] = [];
  scheme: string = '';
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  content: string = '';
  specialization: string = '';
  selectedDoctorId: string = '';
  editingDoctor: boolean = false;

  constructor(private schemeService: SchemeService) {}

  ngOnInit() {
    this.getSchemes();
  }

  getSchemes() {
    this.schemeService.getScheme().subscribe(
      (schemes: any) => {
        console.log(schemes);
        this.schemes = schemes;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  @Input() starttime: string = '';
  @Input() endtime: string = '';
  @Input() czasWizyty: number = 0;
  generatedHours: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['starttime'] || changes['endtime']) {
      this.generateHours();
    }
  }

  private generateHours(): void {
    this.generatedHours = [];

    if (!this.starttime || !this.endtime) {
      return;
    }

    const startHour = parseInt(this.starttime.split(':')[0], 10);
    const endHour = parseInt(this.endtime.split(':')[0], 10);
    const startMinute = parseInt(this.starttime.split(':')[1], 10);

    const visitInterval = this.czasWizyty || 30;

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = startMinute; minute < 60; minute += visitInterval) {
        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
        this.generatedHours.push(`${formattedHour}:${formattedMinute}`);
      }
    }
  }
}
