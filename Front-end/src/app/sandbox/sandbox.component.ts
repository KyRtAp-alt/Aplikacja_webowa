import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { DoctorService } from '../doctor.service';
import { RosService } from '../ros.service';
import { SchemeService } from '../scheme.service';

interface Schedule {
  name: string;
  days: string[];
  hours: string[];
}

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
// implements OnInit
export class SandboxComponent {
  // scheduleForm: FormGroup;
  // // Dni tygodnia do wyboru
  // weekdays = [
  //   'Poniedziałek',
  //   'Wtorek',
  //   'Środa',
  //   'Czwartek',
  //   'Piątek',
  //   'Sobota',
  // ];
  // // Godziny do wyboru
  // hours = [
  //   '8:00',
  //   '9:00',
  //   '10:00',
  //   '11:00',
  //   '12:00',
  //   '13:00',
  //   '14:00',
  //   '15:00',
  //   '16:00',
  //   '17:00',
  // ];
  // constructor(private fb: FormBuilder) {}
  // ngOnInit(): void {
  //   // Inicjalizacja formularza
  //   this.scheduleForm = this.fb.group({
  //     slots: this.fb.array([]), // Użyj FormArray do dynamicznego dodawania slotów
  //   });
  // }
  // // Dodawanie nowego slotu do formularza
  // addSlot(day: string, hour: string, isSelected: boolean) {
  //   const slot = this.fb.group({
  //     day: new FormControl(day),
  //     hour: new FormControl(hour),
  //     isSelected: new FormControl(isSelected),
  //   });
  //   // Dodawanie do FormArray
  //   (this.scheduleForm.get('slots') as FormArray).push(slot);
  // }
  // // Obsługa zapisywania formularza (np. wysłanie danych do serwera)
  // saveSchedule() {
  //   const formData = this.scheduleForm.value;
  //   console.log(formData);
  //   // Tutaj możesz wysłać dane do serwera i zapisywać sloty w bazie danych
  // }
}
