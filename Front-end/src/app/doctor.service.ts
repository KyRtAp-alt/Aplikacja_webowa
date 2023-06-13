import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { idText } from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://localhost:3000';

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

  // updateDoctor(id: string, doctor: any) {
  //   return this.http.put(`${this.apiUrl}/api/doctor/${id}`, doctor);
  // }
}
