import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SchemeService } from '../scheme.service';
import { VisitService } from '../visit.service';

interface Harmonogram {
  _id: string;
  nazwaharmonogramu: string;
  czaspracy: {
    [dzienTygodnia: string]: {
      starttime: string;
      endtime: string;
      daty: { [data: string]: string };
    }[];
  };
  czaswizyty: number;
}

interface WygenerowanyHarmonogram {
  nazwaHarmonogramu: string;
  dzienTygodnia: string;
  data: string;
  godziny: string[];
}

@Component({
  selector: 'app-scheme-display',
  templateUrl: './scheme-display.component.html',
  styleUrls: ['./scheme-display.component.scss'],
})
export class SchemeDisplayComponent implements OnInit {
  wygenerowanyHarmonogram: WygenerowanyHarmonogram[] = [];

  @Input() scheduleId: string = '';
  @Input() doctorId: string = '';
  @Output() selectedInfo = new EventEmitter<any>();
  harmonogramy: Harmonogram[] = [];
  widoczneDni: WygenerowanyHarmonogram[] = [];
  pokazaneDni: number = 6;
  sliderIndex: number = 0;
  animacja: boolean = false;
  // @Input() zarezerwowaneGodziny: Array<string> = [];
  // selectedDoctor: any;
  // selectedTimeInfo: any = null;

  visits: any[] = [];
  lekarz: string = '';
  dzienTygodnia: string = '';
  dzien: string = '';
  godzina: string = '';

  constructor(
    private schemeService: SchemeService,
    private visitService: VisitService
  ) {}

  ngOnInit() {
    this.schemeService.getScheduleData().subscribe(
      (data: Harmonogram[]) => {
        this.harmonogramy = data.filter((item) => item._id === this.scheduleId);
        this.generujHarmonogram();
        this.sortujHarmonogram();
        this.getVisit();
      },
      (error) => {
        console.error('Error fetching schedule data:', error);
      }
    );
  }

  getVisit() {
    this.visitService.getVisit().subscribe(
      (visits: any) => {
        console.log(visits);
        this.visits = visits;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  czyGodzinaZajeta(
    lekarzId: string,
    dzienTygodnia: string,
    data: string,
    godzina: string
  ): boolean {
    return this.visits.some(
      (visit) =>
        visit.lekarz === lekarzId &&
        visit.dzienTygodnia === dzienTygodnia &&
        this.formatujDate(visit.dzien) === this.formatujDate(data) &&
        visit.godzina === godzina
    );
  }

  formatujDate(date: string): string {
    // Zamień format daty z "DD-MM-YYYY" na "YYYY-MM-DD" dla poprawnego porównywania
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
  }

  generujHarmonogram() {
    this.harmonogramy.forEach((wpis) => {
      const { nazwaharmonogramu, czaspracy, czaswizyty } = wpis;

      for (const dzienTygodnia in czaspracy) {
        if (czaspracy[dzienTygodnia] && czaspracy[dzienTygodnia].length > 0) {
          czaspracy[dzienTygodnia].forEach((harmonogramDlaDnia) => {
            if (harmonogramDlaDnia.daty) {
              Object.entries(harmonogramDlaDnia.daty).forEach(
                ([dataKey, data]) => {
                  const startTime = harmonogramDlaDnia.starttime;
                  const endTime = harmonogramDlaDnia.endtime;
                  const godziny: string[] = [];

                  let aktualnaGodzina = startTime;
                  while (aktualnaGodzina < endTime) {
                    const godzinaZajeta = this.czyGodzinaZajeta(
                      this.doctorId,
                      dzienTygodnia,
                      data,
                      aktualnaGodzina
                    );

                    if (!godzinaZajeta) {
                      godziny.push(aktualnaGodzina);
                    }

                    aktualnaGodzina = this.dodajCzas(
                      aktualnaGodzina,
                      czaswizyty
                    );
                  }

                  this.wygenerowanyHarmonogram.push({
                    nazwaHarmonogramu: nazwaharmonogramu,
                    dzienTygodnia: dzienTygodnia,
                    data: data,
                    godziny: godziny,
                  });
                }
              );
            }
          });
        }
      }
    });
  }

  sortujHarmonogram() {
    this.wygenerowanyHarmonogram.sort((a, b) => {
      const dateA = this.getDateObject(a.data);
      const dateB = this.getDateObject(b.data);

      if (dateA.year !== dateB.year) {
        return dateA.year - dateB.year;
      } else if (dateA.month !== dateB.month) {
        return dateA.month - dateB.month;
      } else {
        return dateA.day - dateB.day;
      }
    });
  }

  getDateObject(dateString: string) {
    const [day, month, year] = dateString.split('-').map(Number);
    return { day, month, year };
  }

  onHourSelected(dzienTygodnia: string, data: string, godzina: string) {
    const isReserved = this.czyGodzinaZajeta(
      this.doctorId,
      dzienTygodnia,
      data,
      godzina
    );

    if (!isReserved) {
      this.selectedInfo.emit({
        lekarz: this.doctorId,
        dzienTygodnia,
        data,
        godzina,
      });
    }
  }

  dodajCzas(start: string, czas: number): string {
    const [godziny, minuty] = start.split(':').map(Number);
    const czasWMinutach = godziny * 60 + minuty + czas;
    const noweGodziny = Math.floor(czasWMinutach / 60);
    const noweMinuty = czasWMinutach % 60;
    return `${String(noweGodziny).padStart(2, '0')}:${String(
      noweMinuty
    ).padStart(2, '0')}`;
  }

  przewinDni(ileDni: number) {
    this.animacja = true;
    this.sliderIndex += ileDni;

    if (this.sliderIndex < 0) {
      this.sliderIndex = 0;
    } else if (
      this.sliderIndex >
      this.wygenerowanyHarmonogram.length - this.pokazaneDni
    ) {
      this.sliderIndex = this.wygenerowanyHarmonogram.length - this.pokazaneDni;
    }

    setTimeout(() => {
      this.animacja = false;
    }, 300);
  }
}
