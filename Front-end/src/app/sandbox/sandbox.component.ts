import { Component } from '@angular/core';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent {
  liczbaTygodni: number = 0;
  tygodnie: number[] = [];
  daty: { [key: number]: string | null } = {};

  generateTygodnie() {
    this.tygodnie = Array.from(
      { length: this.liczbaTygodni },
      (_, index) => index + 1
    );
    this.initializeDates();
  }

  initializeDates() {
    let currentDate: Date | null = null;

    for (const tydzien of this.tygodnie) {
      if (currentDate) {
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 7);
        this.daty[tydzien] = currentDate.toISOString().split('T')[0];
      } else {
        this.daty[tydzien] = null;
      }
    }
  }

  updateDates(changedTydzien: number) {
    const changedDate = this.daty[changedTydzien];

    if (changedDate) {
      let currentDate: Date = new Date(changedDate);

      for (const tydzien of this.tygodnie) {
        if (tydzien !== changedTydzien) {
          currentDate = new Date(currentDate);
          currentDate.setDate(currentDate.getDate() + 7);
          this.daty[tydzien] = currentDate.toISOString().split('T')[0];
        }
      }
    }
  }
}
