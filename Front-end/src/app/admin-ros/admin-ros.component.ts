import { Component } from '@angular/core';
import { RosService } from '../ros.service';

@Component({
  selector: 'app-admin-ros',
  templateUrl: './admin-ros.component.html',
  styleUrls: ['./admin-ros.component.scss'],
})
export class AdminRosComponent {
  ross: any[] = [];
  name: string = '';
  selectedRosId: string = '';
  editingRos: boolean = false;

  constructor(private rosService: RosService) {}

  ngOnInit() {
    this.getRoss();
  }

  getRoss() {
    this.rosService.getRoss().subscribe(
      (ross: any) => {
        console.log(ross);
        this.ross = ross;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addRos() {
    const newRos = {
      nazwa: this.name,
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
    this.editingRos = true;
  }

  updateRos() {
    const updateRoss = {
      nazwa: this.name,
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
  }

  isEmptyFields(): boolean {
    return !this.name;
  }
}
