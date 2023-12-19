import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getVisit() {
    return this.http.get('http://localhost:3000/visit');
  }

  addVisit(visits: any) {
    return this.http.post(`http://localhost:3000/visit`, visits);
  }

  deleteVisit(id: string) {
    return this.http.delete(`http://localhost:3000/visit/${id}`);
  }

  updateVisit(id: string, visit: any) {
    return this.http.put(`http://localhost:3000/visit/${id}`, visit);
  }

  // reserveHour(hour: string): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/reservations`, { hour });
  // }

  getDoctorDate(pracownikID: string): Observable<any> {
    const url = `http://localhost:3000/scheme/${pracownikID}`;
    return this.http.get(url);
  }

  getReservedHoursForDoctor(doctorId: string): Observable<string[]> {
    const url = `${this.apiUrl}/visit/${doctorId}`; // Utworzenie pełnego URL
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
