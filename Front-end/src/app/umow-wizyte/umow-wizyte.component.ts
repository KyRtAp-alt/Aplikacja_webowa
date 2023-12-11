import { Component, HostListener, Input } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { VisitService } from '../visit.service';
import { SchemeService } from '../scheme.service';
import { Title } from '@angular/platform-browser';
// import { RosService } from '../ros.service';

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

  workname: any[] = [];

  schemes: any[] = [];
  dnitygodnia: any[] = [];
  wybranegodziny: any[] = [];

  constructor(
    private doctorService: DoctorService,
    // private rosService: RosService,
    private visitService: VisitService,
    private schemeService: SchemeService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Umów wizytę');
  }

  ngOnInit() {
    this.getDoctors();
    // this.getRoss();
    // this.getSchemes();
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

  // getSchemes() {
  //   this.schemeService.getScheme().subscribe(
  //     (schemes: any) => {
  //       console.log(schemes);
  //       this.schemes = schemes;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

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

  registerVisit() {
    if (!this.isEmptyFields()) {
      this.addVisit();
      this.closeModalVis();
    }
  }

  clearForm() {}

  isEmptyFields(): boolean {
    return (
      !this.clientfirstname ||
      !this.clientlastname ||
      !this.clientcontact ||
      !this.clientmail
    );
  }

  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 400;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openModal() {
    this.showForm = true;
  }

  closeModal() {
    this.showForm = false;
  }

  closeModalVis() {
    this.showForm = false;
  }

  // onShowMore(doctor: any) {
  //   doctor.showMore = true;
  // }

  selectedDoctor: any;

  onShowMore(doctor: any) {
    doctor.showMore = true;
    this.selectedDoctor = doctor;
    this.getSchemes(doctor);
  }

  onShowLess(doctor: any) {
    doctor.showMore = false;
  }

  getSchemes(doctor: any) {
    this.schemeService.getScheme().subscribe(
      (schemes: any) => {
        console.log(schemes);
        this.schemes = schemes.filter(
          (schemes: { _id: string }) => schemes._id === this.selectedDoctor
        );
      },
      (error) => {
        console.error(error);
      }
    );
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

// getRoss() {
//   this.rosService.getRoss().subscribe(
//     (ross: any) => {
//       console.log(ross);
//       this.ross = ross;
//       this.specializations = ross.map((ros: any) => ros.nazwa);
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
// }
