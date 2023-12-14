import { Component } from '@angular/core';
import { SchemeService } from '../scheme.service';
import { error } from 'console';

interface Schedule {
  _id: string;
  nazwaharmonogramu: string;
  czaspracy: any;
  czaswizyty: number;
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

  //SchemeService
  schemes: any[] = [];
  workname: any[] = [];
  scheme: any[] = [];
  dnitygodnia: any[] = [];
  wybranegodziny: any[] = [];
  selectedSchemeId: string = '';
  editingScheme: boolean = false;
  selectedVisitId: string = '';
  reservedHours: string[] = [];

  //Formularz dodawania
  czasWizyty: number = 0;
  pracownikID: string = '';
  nazwaharmonogramu: string = '';
  startdataharmonogramu: string = '';
  enddataharmonogramu: string = '';

  //poniedzialek
  poniedzialekOd: string = '';
  poniedzialekDo: string = '';
  poniedzialekAktywny: boolean = true;
  liczbaTygodni1: number = 0;
  tygodnie1: number[] = [];
  daty1: { [key: number]: string | null } = {};

  //wtorek
  wtorekOd: string = '';
  wtorekDo: string = '';
  wtorekAktywny: boolean = true;
  liczbaTygodni2: number = 0;
  tygodnie2: number[] = [];
  daty2: { [key: number]: string | null } = {};

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

  constructor(private schemeService: SchemeService) {}

  ngOnInit() {
    this.getSchemes();
  }

  addScheme() {
    const newScheme = {
      nazwaharmonogramu: this.nazwaharmonogramu,
      czaspracy: {
        poniedzialek: this.poniedzialekAktywny
          ? [
              {
                starttime: this.poniedzialekOd,
                endtime: this.poniedzialekDo,
                daty: this.daty1,
              },
            ]
          : null,
        wtorek: this.wtorekAktywny
          ? [
              {
                starttime: this.wtorekOd,
                endtime: this.wtorekDo,
                daty: this.daty2,
              },
            ]
          : null,
        // sroda: this.srodaAktywny
        //   ? [{ starttime: this.srodaOd, endtime: this.srodaDo }]
        //   : null,
        // czwartek: this.czwartekAktywny
        //   ? [{ starttime: this.czwartekOd, endtime: this.czwartekDo }]
        //   : null,
        // piatek: this.piatekAktywny
        //   ? [{ starttime: this.piatekOd, endtime: this.piatekDo }]
        //   : null,
        // sobota: this.sobotaAktywny
        //   ? [{ starttime: this.sobotaOd, endtime: this.sobotaDo }]
        //   : null,
      },
      czaswizyty: this.czasWizyty,
    };

    this.schemeService.addScheme(newScheme).subscribe(
      () => {
        console.log('Dodano harmonogram');
        this.getSchemes();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editScheme(scheme: any) {
    this.czasWizyty = scheme.czasWizyty;
  }

  updateScheme() {
    const updateScheme = {
      czasWizyty: this.czasWizyty,
    };

    this.schemeService
      .updateScheme(this.selectedSchemeId, updateScheme)
      .subscribe(
        () => {
          console.log('Zaktulizowana harmonogram');
          this.getSchemes;
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

  onShowMore(doctor: any) {
    doctor.showMore = true;
  }

  onShowLess(doctor: any) {
    doctor.showMore = false;
  }

  clearForm() {
    this.poniedzialekAktywny;
  }

  isEmptyFields(): boolean {
    return !this.name;
  }

  //PONIEDZIALEK
  generateTygodnie1() {
    this.tygodnie1 = Array.from(
      { length: this.liczbaTygodni1 },
      (_, index) => index + 1
    );
    this.initializeDates();
  }

  initializeDates() {
    let currentDate: Date | null = null;

    for (const tydzien of this.tygodnie1) {
      if (currentDate) {
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 7);
        this.daty1[tydzien] = currentDate.toISOString().split('T')[0];
      } else {
        this.daty1[tydzien] = null;
      }
    }
  }

  updateDates1(changedTydzien: number) {
    const changedDate = this.daty1[changedTydzien];

    if (changedDate) {
      let currentDate: Date = new Date(changedDate);

      for (const tydzien of this.tygodnie1) {
        if (tydzien !== changedTydzien) {
          currentDate = new Date(currentDate);
          currentDate.setDate(currentDate.getDate() + 7);
          this.daty1[tydzien] = currentDate.toISOString().split('T')[0];
        }
      }
    }
  }

  //WTOREK
  generateTygodnie2() {
    this.tygodnie2 = Array.from(
      { length: this.liczbaTygodni2 },
      (_, index) => index + 1
    );
    this.initializeDates();
  }

  initializeDates2() {
    let currentDate: Date | null = null;

    for (const tydzien of this.tygodnie2) {
      if (currentDate) {
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 7);
        this.daty2[tydzien] = currentDate.toISOString().split('T')[0];
      } else {
        this.daty2[tydzien] = null;
      }
    }
  }

  updateDates2(changedTydzien: number) {
    const changedDate = this.daty2[changedTydzien];

    if (changedDate) {
      let currentDate: Date = new Date(changedDate);

      for (const tydzien of this.tygodnie2) {
        if (tydzien !== changedTydzien) {
          currentDate = new Date(currentDate);
          currentDate.setDate(currentDate.getDate() + 7);
          this.daty2[tydzien] = currentDate.toISOString().split('T')[0];
        }
      }
    }
  }
}
