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
    return this.http.get(`${this.apiUrl}/scheme`);
  }

  addScheme(schemes: any) {
    return this.http.post(`${this.apiUrl}/scheme`, schemes);
  }

  deleteScheme(id: string) {
    return this.http.delete(`${this.apiUrl}/scheme/${id}`);
  }

  updateScheme(id: string, schemes: any) {
    return this.http.put(`${this.apiUrl}/scheme/${id}`, schemes);
  }

  getScheduleData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/scheme`);
  }

  getHarmonogramData(harmonogramId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/doctor/${harmonogramId}`);
  }
}
