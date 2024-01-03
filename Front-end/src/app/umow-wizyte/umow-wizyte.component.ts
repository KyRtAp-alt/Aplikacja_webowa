import { Component, HostListener } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { VisitService } from '../visit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-umow-wizyte',
  templateUrl: './umow-wizyte.component.html',
  styleUrls: ['./umow-wizyte.component.scss'],
})
export class UmowWizyteComponent {
  selectedScheduleId: string | null = null;
  selectedDoctor: any;
  scheduleId: string = '';
  currentDoctorSchedule: any[] = [];
  showForm: boolean = false;
  workname: any[] = [];
  schemes: any[] = [];
  dnitygodnia: any[] = [];
  wybranegodziny: any[] = [];
  showModal: boolean = false;
  selectedVisit: any = {};
  showScrollButton = false;
  //doctor
  doctors: any[] = [];
  firstname: string = '';
  lastname: string = '';
  category: string = '';
  worktime: string = '';
  specialization: string = '';
  currentDoctorIndex: number = 0;
  currentDoctor: any;
  expandedDoctor: any;
  //visit
  visits: any[] = [];
  clientfirstname: string = '';
  clientlastname: string = '';
  clientcontact: string = '';
  clientmail: string = '';
  clientcontent: string = '';
  data: string = '';
  visitdata = false;
  opened?: boolean;
  zarezerwowaneGodziny: Array<string> = [];

  constructor(
    private doctorService: DoctorService,
    private visitService: VisitService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDoctors();
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

  addVisit() {
    const newVisit = {
      imieklienta: this.clientfirstname,
      nazwiskoklienta: this.clientlastname,
      kontaktklienta: this.clientcontact,
      mailklient: this.clientmail,
      lekarz: this.selectedVisit.lekarz,
      dzienTygodnia: this.selectedVisit.dzienTygodnia,
      dzien: this.selectedVisit.data,
      godzina: this.selectedVisit.godzina,
      visitdata: this.visitdata,
    };

    this.visitService.addVisit(newVisit).subscribe(
      () => {
        console.log('Dodano wizyte');
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

      alert('Zarezerwowano pomyślnie!');

      location.reload();
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

  closeModalVis() {
    this.showForm = false;
  }

  onShowMore(doctor: any) {
    if (this.selectedDoctor) {
      this.selectedDoctor.showMore = false;
    }
    this.selectedDoctor = doctor;
    doctor.showMore = true;
  }

  onShowLess(doctor: any) {
    if (this.selectedDoctor) {
      this.selectedDoctor.showMore = false;
      this.selectedDoctor = null;
    }
  }

  closeOpenedDoctor() {
    const openedDoctor = this.doctors.find((doctor) => doctor.opened);
    if (openedDoctor) {
      openedDoctor.showMore = false;
      openedDoctor.opened = false;
    }
  }

  onHourSelected(info: any) {
    console.log('Wybrano godzinę:', info);
    this.selectedVisit = info;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
