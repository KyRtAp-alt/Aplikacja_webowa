import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getVisit() {
    return this.http.get(`${this.apiUrl}/visit`);
  }

  addVisit(visits: any) {
    return this.http.post(`${this.apiUrl}/visit`, visits);
  }

  deleteVisit(id: string) {
    return this.http.delete(`${this.apiUrl}/visit/${id}`);
  }

  updateVisit(id: string, visit: any) {
    return this.http.put(`${this.apiUrl}/visit/${id}`, visit);
  }

  getDoctorDate(pracownikID: string): Observable<any> {
    const url = `${this.apiUrl}/scheme/${pracownikID}`;
    return this.http.get(url);
  }

  getReservedHoursForDoctor(doctorId: string): Observable<string[]> {
    const url = `${this.apiUrl}/visit/${doctorId}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        console.log('Reserved hours data:', data);
        return data.map((visit: any) => visit.godzina);
      }),
      catchError((error: any) => {
        console.error('Error fetching reserved hours:', error);
        return [];
      })
    );
  }
}
