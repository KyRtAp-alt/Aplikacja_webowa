import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { SchemeService } from '../scheme.service';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { DoctorToschemeService } from '../doctor-toscheme.service';

@Component({
  selector: 'app-shceme-display',
  templateUrl: './shceme-display.component.html',
  styleUrls: ['./shceme-display.component.scss'],
})
export class ShcemeDisplayComponent implements OnInit {
  schemes: any[] = [];
  @Input() harmonogram: any;
  selectedSchemeId: string = '';

  // getDays(): string[] {
  //   return this.harmonogram ? Object.keys(this.harmonogram.czaspracy) : [];
  // }

  constructor(
    private schemeService: SchemeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedSchemeId = params['id'];
      this.getSchemes();
    });
  }

  getSchemes() {
    this.schemeService.getScheme().subscribe(
      (schemes: any) => {
        console.log(schemes);
        this.schemes = schemes.filter(
          (schemes: { _id: string }) => schemes._id === this.selectedSchemeId
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
// lekarzId: string | null = null;

// constructor(
//   private route: ActivatedRoute,
//   private DoctorService: DoctorService
// ) {}

// ngOnInit(): void {
//   this.route.paramMap.subscribe((params) => {
//     this.lekarzId = params.get('id');
//     if (this.lekarzId) {
//       this.loadData();
//     }
//   });
// }

// private loadData(): void {
//   this.DoctorService.getLekarz(this.lekarzId!).subscribe(
//     (data) => {
//       console.log(data);
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
// }

// lekarzId = '6571c03d5e58a92b9bdd7a18';

// constructor(private DoctorToschemeService: DoctorToschemeService) {}

// ngOnInit(): void {
//   this.DoctorToschemeService.getHarmonogramy(this.lekarzId).subscribe(
//     (data) => {
//       console.log(data); // Tutaj możesz obsłużyć dane harmonogramów
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
// }

// lekarzId = ''; // Id lekarza (możesz uzyskać to dynamicznie)
// lekarz: any;

// constructor(private DoctorToschemeService: DoctorToschemeService) {}

// ngOnInit(): void {
//   this.DoctorToschemeService.getHarmonogramy(this.lekarzId).subscribe(
//     (data) => {
//       this.lekarz = data;
//       console.log(this.lekarz);
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
// }

//   doctors: any[] = [];
//   schemes: any[] = [];

//   constructor(
//     private doctorService: DoctorService,
//     private schemeService: SchemeService
//   ) {}

//   ngOnInit() {
//     this.getSchemes();
//     this.getDoctors();
//   }

//   getSchemes() {
//     this.schemeService.getScheme().subscribe(
//       (schemes: any) => {
//         console.log(schemes);
//         this.schemes = schemes;
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }

//   getDoctors() {
//     this.doctorService.getDoctors().subscribe(
//       (doctors: any) => {
//         console.log(doctors);
//         this.doctors = doctors;
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }
// }
