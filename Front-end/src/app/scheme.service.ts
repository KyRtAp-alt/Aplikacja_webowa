import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleData } from '../app/shceme-display/shceme-display.component';

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

  getScheduleData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/scheme`);
  }

  getHarmonogramData(harmonogramId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/doctor/${harmonogramId}`);
  }

  getScheduleDataByDoctorId(doctorId: string): Observable<ScheduleData> {
    return this.http.get<ScheduleData>(
      `http://localhost:3000/schedule/${doctorId}`
    );
  }
}

// getHarmonogramData(harmonogramId: string) {
//   throw new Error('Method not implemented.');
// }

// getSchemeForDoctor(id: string): Observable<any> {
//   const url = `${this.apiUrl}/scheme/${id}`;
//   return this.http.get(url);
// }

// getDoctorSchedule(doctorId: string): Observable<any> {
//   return this.http.get(`/api/doctors/${doctorId}/schedule`);
// }
