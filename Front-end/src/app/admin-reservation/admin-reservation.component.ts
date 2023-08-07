import { Component } from '@angular/core';
import { VisitService } from '../visit.service';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.scss'],
})
export class AdminReservationComponent {
  visits: any[] = [];
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
}
