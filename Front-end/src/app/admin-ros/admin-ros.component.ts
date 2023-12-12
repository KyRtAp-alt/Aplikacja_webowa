import { Component } from '@angular/core';
import { RosService } from '../ros.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-admin-ros',
  templateUrl: './admin-ros.component.html',
  styleUrls: ['./admin-ros.component.scss'],
})
export class AdminRosComponent {
  ross: any[] = [];
  name: string = '';
  description: string = '';
  price: string = '';
  selectedRosId: string = '';
  editingRos: boolean = false;

  constructor(private rosService: RosService) {}

  ngOnInit() {
    this.getRoss();
  }

  getRoss() {
    this.rosService
      .getRoss()
      .pipe(
        tap((ross: any) => {
          console.log(ross);
          this.ross = ross;
        })
      )
      .subscribe(
        () => {},
        (error) => {
          console.error(error);
        }
      );
  }

  addRos() {
    const newRos = {
      nazwa: this.name,
      opis: this.description,
      cena: this.price,
    };

    this.rosService.addRos(newRos).subscribe(
      () => {
        console.log('Dodano ros');
        this.clearForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteRos(id: string) {
    this.rosService.deletRos(id).subscribe(
      () => {
        console.log('Usunięto blog');
        this.getRoss();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  confirmDelete(rosId: string) {
    const confirmation = confirm(
      'Czy na pewno chcesz usunąć tego lekarza, specialistę?'
    );
    if (confirmation) {
      this.deleteRos(rosId);
      alert('Usunięto lekarza, specialistę');
    }
  }

  editRos(ros: any) {
    this.selectedRosId = ros._id;
    this.name = ros.nazwa;
    this.description = ros.opis;
    this.price = ros.cena;
    this.editingRos = true;
  }

  updateRos() {
    const updateRoss = {
      nazwa: this.name,
      opis: this.description,
      cena: this.price,
    };

    this.rosService.updateRos(this.selectedRosId, updateRoss).subscribe(
      () => {
        console.log('Zaktulizowano blog');
        this.getRoss();
        this.clearForm();
        this.editingRos = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  clearForm() {
    this.selectedRosId = '';
    this.name = '';
    this.description = '';
  }

  isEmptyFields(): boolean {
    return !this.name;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
