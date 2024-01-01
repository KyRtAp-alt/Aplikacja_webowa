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
  visitdata: boolean = false;
  newVisits: any[] = [];
  confirmedVisits: any[] = [];
  onshowdescription1: boolean = false;
  showArrow1: boolean = false;
  onshowdescription2: boolean = false;
  showArrow2: boolean = false;
  newVisitsCount: number = 0;
  searchFirstName: string = '';
  searchLastName: string = '';
  searchContact: string = '';
  searchMail: string = '';
  clientSearchFirstName: string = '';
  clientSearchLastName: string = '';
  clientSearchContact: string = '';
  clientSearchMail: string = '';

  constructor(private visitService: VisitService) {}

  ngOnInit() {
    this.getVisit();
  }

  searchConfirmedVisits() {
    this.confirmedVisits = this.visits.filter((visit) => {
      const firstNameMatch = visit.imieklienta
        .toLowerCase()
        .includes(this.clientSearchFirstName.toLowerCase());
      const lastNameMatch = visit.nazwiskoklienta
        .toLowerCase()
        .includes(this.clientSearchLastName.toLowerCase());
      const Contact = visit.kontaktklienta
        .toLowerCase()
        .includes(this.clientSearchContact.toLowerCase());

      return firstNameMatch && lastNameMatch && Contact;
    });
  }

  getVisit() {
    this.visitService
      .getVisit()
      .pipe(
        tap((visits: any) => {
          console.log(visits);
          this.visits = this.removeExpiredVisits(visits);
          this.confirmedVisits = this.visits.filter(
            (visit) => visit.visitdata === true
          );
          this.newVisits = this.visits.filter(
            (visit) => visit.visitdata === false
          );
          this.newVisitsCount = this.newVisits.length;
        })
      )
      .subscribe(
        () => {},
        (error) => {
          console.error(error);
        }
      );
  }

  confirmConfirmation(visitId: string) {
    const confirmation = confirm('Czy na pewno chcesz potwierdzić wizytę?');
    if (confirmation) {
      const selectedVisit = this.visits.find((visit) => visit._id === visitId);

      if (selectedVisit) {
        selectedVisit.visitdata = true;

        this.visitService.updateVisit(visitId, { visitdata: true }).subscribe(
          (response: any) => {
            if (response.status === 200) {
              console.log(`Wizyta o ID ${visitId} została potwierdzona.`);
              this.getVisit();
            } else {
              console.error(
                'Błąd podczas potwierdzania wizyty:',
                response.statusText
              );
            }
          },
          (error: any) => {
            console.error('Błąd podczas potwierdzania wizyty:', error);
          }
        );
      } else {
        console.error('Nie znaleziono wizyty o podanym ID.');
      }
    } else {
      alert('Anulowano potwierdzanie wizyty.');
    }
    this.getVisit();
    this.searchConfirmedVisits();
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
      const visitDate = new Date(visit.dzien);
      visitDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const timeDifference = visitDate.getTime() - today.getTime();

      if (timeDifference > 0) {
        const delayMilliseconds = timeDifference + 24 * 60 * 60 * 1000;

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

  toggleDescription1() {
    this.onshowdescription1 = !this.onshowdescription1;
    this.showArrow1 = !this.showArrow1;
  }

  toggleDescription2() {
    this.onshowdescription2 = !this.onshowdescription2;
    this.showArrow2 = !this.showArrow2;
  }
}
