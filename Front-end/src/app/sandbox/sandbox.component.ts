import { Component } from '@angular/core';
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
export class SandboxComponent {}
