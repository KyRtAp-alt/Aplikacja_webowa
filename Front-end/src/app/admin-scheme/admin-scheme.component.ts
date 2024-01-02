import { Component } from '@angular/core';
import { SchemeService } from '../scheme.service';
import { Title } from '@angular/platform-browser';

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
  liczbaTygodni3: number = 0;
  tygodnie3: number[] = [];
  daty3: { [key: number]: string | null } = {};

  //czwartek
  czwartekOd: string = '';
  czwartekDo: string = '';
  czwartekAktywny: boolean = true;
  liczbaTygodni4: number = 0;
  tygodnie4: number[] = [];
  daty4: { [key: number]: string | null } = {};

  //piatek
  piatekOd: string = '';
  piatekDo: string = '';
  piatekAktywny: boolean = true;
  liczbaTygodni5: number = 0;
  tygodnie5: number[] = [];
  daty5: { [key: number]: string | null } = {};

  //sobota
  sobotaOd: string = '';
  sobotaDo: string = '';
  sobotaAktywny: boolean = true;
  liczbaTygodni6: number = 0;
  tygodnie6: number[] = [];
  daty6: { [key: number]: string | null } = {};

  constructor(
    private schemeService: SchemeService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Admin harmonogram pracy');
  }

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
                daty: this.formatDates(this.daty1),
              },
            ]
          : null,
        wtorek: this.wtorekAktywny
          ? [
              {
                starttime: this.wtorekOd,
                endtime: this.wtorekDo,
                daty: this.formatDates(this.daty2),
              },
            ]
          : null,
        sroda: this.srodaAktywny
          ? [
              {
                starttime: this.srodaOd,
                endtime: this.srodaDo,
                daty: this.formatDates(this.daty3),
              },
            ]
          : null,
        czwartek: this.czwartekAktywny
          ? [
              {
                starttime: this.czwartekOd,
                endtime: this.czwartekDo,
                daty: this.formatDates(this.daty4),
              },
            ]
          : null,
        piatek: this.piatekAktywny
          ? [
              {
                starttime: this.piatekOd,
                endtime: this.piatekDo,
                daty: this.formatDates(this.daty5),
              },
            ]
          : null,
        sobota: this.sobotaAktywny
          ? [
              {
                starttime: this.sobotaOd,
                endtime: this.sobotaDo,
                daty: this.formatDates(this.daty6),
              },
            ]
          : null,
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

  formatDates(dates: { [key: number]: string | null }): {
    [key: number]: string | null;
  } {
    const formattedDates: { [key: number]: string | null } = {};

    for (const key in dates) {
      if (dates[key] !== null) {
        const dateParts = (dates[key] as string).split('-');
        formattedDates[key] = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      } else {
        formattedDates[key] = null;
      }
    }

    return formattedDates;
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

  // private parseTime(timeString: string): number[] {
  //   const [hours, minutes] = timeString
  //     .split(':')
  //     .map((part) => parseInt(part, 10));
  //   return [hours, minutes];
  // }

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
    return !this.nazwaharmonogramu || !this.czasWizyty;
  }

  //PONIEDZIALEK
  generateTygodnie1() {
    this.tygodnie1 = Array.from(
      { length: this.liczbaTygodni1 },
      (_, index) => index + 1
    );
    this.initializeDates1();
  }

  initializeDates1() {
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
    this.initializeDates2();
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

  //SRODA
  generateTygodnie3() {
    this.tygodnie3 = Array.from(
      { length: this.liczbaTygodni3 },
      (_, index) => index + 1
    );
    this.initializeDates3();
  }

  initializeDates3() {
    let currentDate: Date | null = null;

    for (const tydzien of this.tygodnie3) {
      if (currentDate) {
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 7);
        this.daty3[tydzien] = currentDate.toISOString().split('T')[0];
      } else {
        this.daty3[tydzien] = null;
      }
    }
  }

  updateDates3(changedTydzien: number) {
    const changedDate = this.daty3[changedTydzien];

    if (changedDate) {
      let currentDate: Date = new Date(changedDate);

      for (const tydzien of this.tygodnie3) {
        if (tydzien !== changedTydzien) {
          currentDate = new Date(currentDate);
          currentDate.setDate(currentDate.getDate() + 7);
          this.daty3[tydzien] = currentDate.toISOString().split('T')[0];
        }
      }
    }
  }

  //CZWARTEK
  generateTygodnie4() {
    this.tygodnie4 = Array.from(
      { length: this.liczbaTygodni4 },
      (_, index) => index + 1
    );
    this.initializeDates4();
  }

  initializeDates4() {
    let currentDate: Date | null = null;

    for (const tydzien of this.tygodnie4) {
      if (currentDate) {
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 7);
        this.daty4[tydzien] = currentDate.toISOString().split('T')[0];
      } else {
        this.daty4[tydzien] = null;
      }
    }
  }

  updateDates4(changedTydzien: number) {
    const changedDate = this.daty4[changedTydzien];

    if (changedDate) {
      let currentDate: Date = new Date(changedDate);

      for (const tydzien of this.tygodnie4) {
        if (tydzien !== changedTydzien) {
          currentDate = new Date(currentDate);
          currentDate.setDate(currentDate.getDate() + 7);
          this.daty4[tydzien] = currentDate.toISOString().split('T')[0];
        }
      }
    }
  }

  //PIATEK
  generateTygodnie5() {
    this.tygodnie5 = Array.from(
      { length: this.liczbaTygodni5 },
      (_, index) => index + 1
    );
    this.initializeDates5();
  }

  initializeDates5() {
    let currentDate: Date | null = null;

    for (const tydzien of this.tygodnie5) {
      if (currentDate) {
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 7);
        this.daty5[tydzien] = currentDate.toISOString().split('T')[0];
      } else {
        this.daty5[tydzien] = null;
      }
    }
  }

  updateDates5(changedTydzien: number) {
    const changedDate = this.daty5[changedTydzien];

    if (changedDate) {
      let currentDate: Date = new Date(changedDate);

      for (const tydzien of this.tygodnie5) {
        if (tydzien !== changedTydzien) {
          currentDate = new Date(currentDate);
          currentDate.setDate(currentDate.getDate() + 7);
          this.daty5[tydzien] = currentDate.toISOString().split('T')[0];
        }
      }
    }
  }

  //SOBOTA
  generateTygodnie6() {
    this.tygodnie6 = Array.from(
      { length: this.liczbaTygodni6 },
      (_, index) => index + 1
    );
    this.initializeDates6();
  }

  initializeDates6() {
    let currentDate: Date | null = null;

    for (const tydzien of this.tygodnie6) {
      if (currentDate) {
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 7);
        this.daty6[tydzien] = currentDate.toISOString().split('T')[0];
      } else {
        this.daty6[tydzien] = null;
      }
    }
  }

  updateDates6(changedTydzien: number) {
    const changedDate = this.daty6[changedTydzien];

    if (changedDate) {
      let currentDate: Date = new Date(changedDate);

      for (const tydzien of this.tygodnie6) {
        if (tydzien !== changedTydzien) {
          currentDate = new Date(currentDate);
          currentDate.setDate(currentDate.getDate() + 7);
          this.daty6[tydzien] = currentDate.toISOString().split('T')[0];
        }
      }
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
