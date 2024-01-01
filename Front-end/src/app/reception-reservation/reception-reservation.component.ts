import { Component } from '@angular/core';
import { VisitService } from '../visit.service';
import { tap } from 'rxjs';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-reception-reservation',
  templateUrl: './reception-reservation.component.html',
  styleUrls: ['./reception-reservation.component.scss'],
})
export class ReceptionReservationComponent {
  visits: any[] = [];
  clientfirstname: string = '';
  clientlastname: string = '';
  clientcontact: string = '';
  clientmail: string = '';
  clientcontent: string = '';
  showExpiredVisits: boolean = false;

  constructor(private visitService: VisitService) {}

  ngOnInit() {
    this.getVisit();
  }

  // getVisit() {
  //   this.visitService.getVisit().subscribe(
  //     (visits: any) => {
  //       console.log(visits);
  //       this.visits = visits;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  getVisit() {
    this.visitService
      .getVisit()
      .pipe(
        tap((visits: any) => {
          console.log(visits);
          this.visits = this.removeExpiredVisits(visits);
        })
      )
      .subscribe(
        () => {},
        (error) => {
          console.error(error);
        }
      );
  }

  removeExpiredVisits(visits: any[]): any[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const validVisits = visits.filter((visit) => {
      const visitDate = new Date(visit.dzien);
      visitDate.setHours(0, 0, 0, 0);

      return visitDate >= today;
    });

    const expiredVisits = visits.filter(
      (visit) => !validVisits.includes(visit)
    );
    this.deleteExpiredVisitsFromDatabase(expiredVisits);

    return validVisits;
  }

  deleteExpiredVisitsFromDatabase(expiredVisits: any[]) {
    expiredVisits.forEach((visit) => {
      // Stworzenie obiektu Date dla przeterminowanej wizyty
      const visitDate = new Date(visit.dzien);
      visitDate.setHours(0, 0, 0, 0);

      // Stworzenie obiektu Date dla dzisiejszej daty
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Obliczenie różnicy w milisekundach między datami
      const timeDifference = visitDate.getTime() - today.getTime();

      // Sprawdzenie, czy data przeterminowanej wizyty jest przyszła
      if (timeDifference > 0) {
        // Obliczenie ilości milisekund do opóźnienia
        const delayMilliseconds = timeDifference + 24 * 60 * 60 * 1000; // Dodanie dodatkowego dnia

        // Użycie timer i switchMap do opóźnienia usunięcia wizyty
        timer(delayMilliseconds)
          .pipe(switchMap(() => this.visitService.deleteVisit(visit._id)))
          .subscribe(
            () =>
              console.log(`Usunięto przeterminowaną wizytę o ID ${visit._id}`),
            (error) => console.error('Błąd podczas usuwania wizyty:', error)
          );
      }
    });
  }

  refreshList() {
    this.getVisit();
  }

  addVisit() {
    const newVisit = {
      imieklienta: this.clientfirstname,
      nazwiskoklienta: this.clientlastname,
      kontaktklienta: this.clientcontact,
      mailklient: this.clientmail,
      opisklienta: this.clientcontent,
    };

    this.visitService.addVisit(newVisit).subscribe(
      () => {
        console.log('Dodano wizyte');
        this.clearForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteVisit(id: string) {
    this.visitService.deleteVisit(id).subscribe(
      () => {
        this.getVisit();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  confirmDelete(visitId: string) {
    const confirmation = confirm('Czy na pewno chcesz anulować rezerwację?');
    if (confirmation) {
      this.deleteVisit(visitId);
      alert('Rezerwacja została anulowana.');
    } else {
      alert('Anulowano anulowanie rezerwacji.');
    }
  }

  clearForm() {}
}
