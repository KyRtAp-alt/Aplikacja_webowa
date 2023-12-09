import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchemeService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getScheme() {
    return this.http.get('http://localhost:3000/scheme');
  }
  addScheme(schemes: any) {
    return this.http.post(`http://localhost:3000/scheme`, schemes);
  }
  deleteScheme(id: string) {
    return this.http.delete(`http://localhost:3000/scheme/${id}`);
  }
  updateScheme(id: string, schemes: any) {
    return this.http.put(`http://localhost:3000/scheme/${id}`, schemes);
  }

  getSchemeForDoctor(id: string): Observable<any> {
    const url = `${this.apiUrl}/scheme/${id}`;
    return this.http.get(url);
  }

  // getDoctorSchedule(doctorId: string): Observable<any> {
  //   return this.http.get(`/api/doctors/${doctorId}/schedule`);
  // }
}
