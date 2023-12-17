import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-sandboxv2',
  templateUrl: './sandboxv2.component.html',
  styleUrls: ['./sandboxv2.component.scss'],
})
export class Sandboxv2Component implements OnInit {
  @Input() scheduleId: string = '';

  harmonogramy: Harmonogram[] = [];

  // dniZData1: WygenerowanyHarmonogram[] = [];
  // dniZData2: WygenerowanyHarmonogram[] = [];

  wygenerowanyHarmonogram: WygenerowanyHarmonogram[] = [];

  constructor(private schemeService: SchemeService) {}

  ngOnInit() {
    this.schemeService.getScheduleData().subscribe(
      (data: Harmonogram[]) => {
        this.harmonogramy = data.filter((item) => item._id === this.scheduleId);
        this.generujHarmonogram();
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
        if (czaspracy[dzienTygodnia] && czaspracy[dzienTygodnia][0]) {
          for (const dataKey in czaspracy[dzienTygodnia][0].daty) {
            const data = czaspracy[dzienTygodnia][0].daty[dataKey];
            const startTime = czaspracy[dzienTygodnia][0].starttime;
            const endTime = czaspracy[dzienTygodnia][0].endtime;
            const godziny: string[] = [];

            let aktualnaGodzina = startTime;
            while (aktualnaGodzina < endTime) {
              godziny.push(aktualnaGodzina);
              aktualnaGodzina = this.dodajCzas(aktualnaGodzina, czaswizyty);
            }

            this.wygenerowanyHarmonogram.push({
              nazwaHarmonogramu: nazwaharmonogramu,
              dzienTygodnia: dzienTygodnia,
              data: data,
              godziny: godziny,
            });
          }
        }
      }
    });
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
}
