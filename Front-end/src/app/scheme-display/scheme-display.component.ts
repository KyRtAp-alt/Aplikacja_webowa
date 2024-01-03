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
  generatedSchedule: WygenerowanyHarmonogram[] = [];
  @Input() scheduleId: string = '';
  @Input() doctorId: string = '';
  @Output() selectedInfo = new EventEmitter<any>();
  harmonogramy: Harmonogram[] = [];
  widoczneDni: WygenerowanyHarmonogram[] = [];
  shownDays: number = 6;
  sliderIndex: number = 0;
  animation: boolean = false;
  firstDate: boolean = true;
  lastDate: boolean = false;
  loading: boolean = true;
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
        this.generateSchedule();
        this.sortSchedule();
        this.getVisit();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayIndex = this.generatedSchedule.findIndex((item) => {
          const itemDate = new Date(item.data);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate >= today;
        });

        if (todayIndex !== -1) {
          this.sliderIndex = Math.min(
            todayIndex,
            this.generatedSchedule.length - this.shownDays
          );
        }
        this.scrollDays(0); //1
        this.animation = true;
        setTimeout(() => {
          this.updateNumberofVisibleDays();
          this.loading = false;
          this.animation = true;
          setTimeout(() => {
            this.animation = false;
          }, 300);
        }, 1000);
      },
      (error) => {
        console.error('Error fetching schedule data:', error);
        this.loading = false;
      }
    );

    window.addEventListener('resize', () => this.updateNumberofVisibleDays());
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

  whetherTimeBusy(
    lekarzId: string,
    dzienTygodnia: string,
    data: string,
    godzina: string
  ): boolean {
    return this.visits.some(
      (visit) =>
        visit.lekarz === lekarzId &&
        visit.dzienTygodnia === dzienTygodnia &&
        this.formatDate(visit.dzien) === this.formatDate(data) &&
        visit.godzina === godzina
    );
  }

  formatDate(date: string): string {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
  }

  generateSchedule() {
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
                    const godzinaZajeta = this.whetherTimeBusy(
                      this.doctorId,
                      dzienTygodnia,
                      data,
                      aktualnaGodzina
                    );

                    if (!godzinaZajeta) {
                      godziny.push(aktualnaGodzina);
                    }

                    aktualnaGodzina = this.addTime(aktualnaGodzina, czaswizyty);
                  }

                  this.generatedSchedule.push({
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

  sortSchedule() {
    this.generatedSchedule.sort((a, b) => {
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
    const isReserved = this.whetherTimeBusy(
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

  addTime(start: string, czas: number): string {
    const [godziny, minuty] = start.split(':').map(Number);
    const czasWMinutach = godziny * 60 + minuty + czas;
    const noweGodziny = Math.floor(czasWMinutach / 60);
    const noweMinuty = czasWMinutach % 60;
    return `${String(noweGodziny).padStart(2, '0')}:${String(
      noweMinuty
    ).padStart(2, '0')}`;
  }

  updateNumberofVisibleDays() {
    if (window.innerWidth < 426) {
      this.shownDays = 1;
    } else if (window.innerWidth < 769) {
      this.shownDays = 2;
    } else if (window.innerWidth < 1440) {
      this.shownDays = 4;
    } else {
      this.shownDays = 6;
    }
  }

  scrollDays(howManyDays: number) {
    this.animation = true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayIndex = this.generatedSchedule.findIndex((item) => {
      const itemDate = new Date(item.data);
      itemDate.setHours(0, 0, 0, 0);
      return itemDate >= today;
    });

    const startIndexOfSlider = todayIndex === -1 ? 0 : todayIndex;

    this.sliderIndex += howManyDays;

    this.sliderIndex = Math.max(
      startIndexOfSlider,
      Math.min(this.sliderIndex, this.generatedSchedule.length - this.shownDays)
    );

    this.firstDate = this.sliderIndex === startIndexOfSlider;

    this.lastDate =
      this.sliderIndex >= this.generatedSchedule.length - this.shownDays;

    setTimeout(() => {
      this.animation = false;
    }, 300);
  }
}
