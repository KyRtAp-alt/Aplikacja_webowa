import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { RosService } from '../ros.service';
import { VisitService } from '../visit.service';
import { SchemeService } from '../scheme.service';
@Component({
  selector: 'app-umow-wizyte',
  templateUrl: './umow-wizyte.component.html',
  styleUrls: ['./umow-wizyte.component.scss'],
})
export class UmowWizyteComponent {
  doctors: any[] = [];
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  worktime: string = '';
  specialization: string = '';
  currentDoctorIndex: number = 0;
  currentDoctor: any;
  expandedDoctor: any;
  //ros
  ross: any[] = [];
  name: string = '';
  currentRosIndex: number = 0;
  currentRos: any;
  selectedRos: any;
  specializations: string[] = [];
  showForm: boolean = false;
  //visit
  visits: any[] = [];
  clientfirstname: string = '';
  clientlastname: string = '';
  clientcontact: string = '';
  clientmail: string = '';
  clientcontent: string = '';

  openModal() {
    this.showForm = true;
  }

  closeModal() {
    this.showForm = false;
  }

  closeModalVis() {
    this.showForm = false;
  }

  onShowMore(doctor: any) {
    doctor.showMore = true;
  }

  onShowLess(doctor: any) {
    doctor.showMore = false;
  }

  registerVisit() {
    if (!this.isEmptyFields()) {
      this.addVisit();
      this.closeModalVis();
    }
  }

  // daysOfWeek: string[] = [
  //   'Poniedzialek',
  //   'Wtorek',
  //   'Sroda',
  //   'Czwartek',
  //   'Piatek',
  // ];
  // availableHours: string[] = [
  //   '8:00',
  //   '8:30',
  //   '9:00',
  //   '9:30',
  //   '10:00',
  //   '10:30',
  //   '11:00',
  //   '11:30',
  //   '12:00',
  //   '12:30',
  //   '13:00',
  //   '13:30',
  //   '14:00',
  // ];

  // isHourReserved(day: string, hour: string): boolean {
  //   return this.reservedAppointments.some(
  //     (appointment) => appointment.day === day && appointment.hour === hour
  //   );
  // }

  // reservedAppointments: any[] = [
  //   { day: 'Wtorek', hour: '8:00' },
  //   { day: 'Wtorek', hour: '8:30' },
  //   { day: 'Sroda', hour: '9:30' },
  // ];

  constructor(
    private doctorService: DoctorService,
    private rosService: RosService,
    private visitService: VisitService,
    private schemeService: SchemeService
  ) {}

  ngOnInit() {
    this.getDoctors();
    this.getRoss();
    this.getSchemes();
  }

  getDoctors() {
    this.doctorService.getDoctors().subscribe(
      (doctors: any) => {
        console.log(doctors);
        this.doctors = doctors;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getRoss() {
    this.rosService.getRoss().subscribe(
      (ross: any) => {
        console.log(ross);
        this.ross = ross;
        this.specializations = ross.map((ros: any) => ros.nazwa);
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
        // this.clearForm();
        this.closeModal();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // clearForm() {}

  isEmptyFields(): boolean {
    return (
      !this.clientfirstname ||
      !this.clientlastname ||
      !this.clientcontact ||
      !this.clientmail
    );
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getSchemes() {
    this.schemeService.getScheme().subscribe(
      (schemes: any) => {
        console.log(schemes);
        this.visits = schemes;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  workname: any[] = [];

  schemes: any[] = [];
  dnitygodnia: any[] = [];
  wybranegodziny: any[] = [];
}
