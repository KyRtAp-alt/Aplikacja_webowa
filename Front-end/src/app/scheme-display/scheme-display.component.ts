import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SchemeService } from '../scheme.service';

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
  @Input() scheduleId: string = '';
  @Input() doctorId: string = '';
  @Output() selectedInfo = new EventEmitter<any>();
  selectedDoctor: any;
  selectedTimeInfo: any = null;

  onHourSelected(dzienTygodnia: string, data: string, godzina: string) {
    // Przekazujemy informacje do rodzica, łącznie z id lekarza
    this.selectedInfo.emit({
      lekarz: this.doctorId,
      dzienTygodnia,
      data,
      godzina,
    });
  }

  harmonogramy: Harmonogram[] = [];
  widoczneDni: WygenerowanyHarmonogram[] = [];
  pokazaneDni: number = 6;
  sliderIndex: number = 0;
  animacja: boolean = false;

  // dniZData1: WygenerowanyHarmonogram[] = [];
  // dniZData2: WygenerowanyHarmonogram[] = [];

  wygenerowanyHarmonogram: WygenerowanyHarmonogram[] = [];

  constructor(private schemeService: SchemeService) {}

  ngOnInit() {
    this.schemeService.getScheduleData().subscribe(
      (data: Harmonogram[]) => {
        this.harmonogramy = data.filter((item) => item._id === this.scheduleId);
        this.generujHarmonogram();
        this.sortujHarmonogram();
      },
      (error) => {
        console.error('Error fetching schedule data:', error);
      }
    );
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
                    godziny.push(aktualnaGodzina);
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
