import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getDoctors() {
    return this.http.get('http://localhost:3000/doctor');
  }

  // addDoctor(doctor: any) {
  //   return this.http.post(`${this.apiUrl}/api/doctor`, doctor);
  // }

  // deleteDoctor(id: string) {
  //   return this.http.delete(`${this.apiUrl}/api/doctor/${id}`);
  // }

  // updateDoctor(id: string, doctor: any) {
  //   return this.http.put(`${this.apiUrl}/api/doctor/${id}`, doctor);
  // }
}
