import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  phoneNumber = '123 123 123';
  address = 'Ul. Świętego Filipa 17, 31-150 Kraków';
  emailAddress = 'recepcja.medlife@gmail.com';
  emailSubject = 'Temat e-maila';

  callPhoneNumber(phoneNumber: string): void {
    window.open(`tel:${phoneNumber}`, '_blank');
  }

  sendEmail(): void {
    window.location.href = `mailto:${
      this.emailAddress
    }?subject=${encodeURIComponent(this.emailSubject)}`;
  }

  openGoogleMaps(): void {
    const mapsLink = `https://www.google.com/maps?q=${encodeURIComponent(
      this.address
    )}`;

    window.open(mapsLink, '_blank');
  }
}
