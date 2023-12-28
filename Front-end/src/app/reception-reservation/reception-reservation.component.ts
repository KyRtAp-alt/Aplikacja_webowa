import { Component } from '@angular/core';
import { VisitService } from '../visit.service';

@Component({
  selector: 'app-reception-reservation',
  templateUrl: './reception-reservation.component.html',
  styleUrls: ['./reception-reservation.component.scss'],
})
export class ReceptionReservationComponent {
  visits: any[] = [];
  // name: string = '';
  clientfirstname: string = '';
  clientlastname: string = '';
  clientcontact: string = '';
  clientmail: string = '';
  clientcontent: string = '';

  constructor(private visitService: VisitService) {}

  ngOnInit() {
    this.getVisit();
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
    const confirmation = confirm('1');
    if (confirmation) {
      this.deleteVisit(visitId);
      alert('2');
    }
  }

  clearForm() {}
}
