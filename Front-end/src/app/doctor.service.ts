import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchemeService } from './scheme.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://localhost:3000';
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getDoctors() {
    return this.http.get('http://localhost:3000/doctor');
  }

  addDoctor(doctor: any) {
    return this.http.post('http://localhost:3000/doctor', doctor);
  }

  deleteDoctor(id: string) {
    return this.http.delete(`http://localhost:3000/doctor/${id}`);
  }

  updateDoctor(id: string, doctor: any) {
    return this.http.put(`http://localhost:3000/doctor/${id}`, doctor);
  }

  assignDoctorSchedule(doctorId: string, scheduleId: string) {
    return this.http.post(`${this.apiUrl}/doctor/${doctorId}/assign-schedule`, {
      scheduleId,
    });
  }

  getLekarz(lekarzId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${lekarzId}`);
  }
}
