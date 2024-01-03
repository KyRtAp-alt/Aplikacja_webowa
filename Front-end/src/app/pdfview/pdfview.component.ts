import { Component } from '@angular/core';

@Component({
  selector: 'app-pdfview',
  templateUrl: './pdfview.component.html',
  styleUrls: ['./pdfview.component.scss'],
})
export class PdfviewComponent {
  pdfSrc: string =
    'assets/pdf_helper/Dokumentacja użytkownika systemu (MedLife).pdf';
}
