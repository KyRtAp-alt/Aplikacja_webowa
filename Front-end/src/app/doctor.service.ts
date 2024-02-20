import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://localhost:3000';
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getDoctors() {
    return this.http.get(`${this.apiUrl}/doctor`);
  }

  addDoctor(doctor: any) {
    return this.http.post(`${this.apiUrl}/doctor`, doctor);
  }

  deleteDoctor(id: string) {
    return this.http.delete(`${this.apiUrl}/doctor/${id}`);
  }

  updateDoctor(id: string, doctor: any) {
    return this.http.put(`${this.apiUrl}/doctor/${id}`, doctor);
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
