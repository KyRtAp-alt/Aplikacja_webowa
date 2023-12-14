import { Component, OnInit } from '@angular/core';

interface Harmonogram {
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
  harmonogramy: Harmonogram[] = [
    {
      nazwaharmonogramu: 'test2',
      czaspracy: {
        poniedzialek: [
          {
            starttime: '08:00',
            endtime: '12:00',
            daty: {
              '1': '2023-12-18',
              '2': '2023-12-25',
            },
          },
        ],
        wtorek: [
          {
            starttime: '09:00',
            endtime: '13:00',
            daty: {
              '1': '2023-12-19',
              '2': '2023-12-26',
            },
          },
        ],
      },
      czaswizyty: 30,
    },
  ];

  dniZData1: WygenerowanyHarmonogram[] = [];
  dniZData2: WygenerowanyHarmonogram[] = [];

  wygenerowanyHarmonogram: WygenerowanyHarmonogram[] = [];

  ngOnInit() {
    this.generujHarmonogram();
  }

  generujHarmonogram() {
    this.harmonogramy.forEach((wpis) => {
      const { nazwaharmonogramu, czaspracy, czaswizyty } = wpis;

      for (const dzienTygodnia in czaspracy) {
        for (const dataKey in czaspracy[dzienTygodnia][0].daty) {
          const data = czaspracy[dzienTygodnia][0].daty[dataKey];
          const startTime = czaspracy[dzienTygodnia][0].starttime;
          const endTime = czaspracy[dzienTygodnia][0].endtime;

          const godziny: string[] = [];

          // Generowanie godzin na podstawie czasu wizyty
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
    });
  }

  // Funkcja do dodawania czasu w minutach
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
