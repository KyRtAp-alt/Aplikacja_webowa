import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SchemeService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getVisit() {
    return this.http.get('http://localhost:3000/scheme');
  }

  addVisit(schemes: any) {
    return this.http.post(`http://localhost:3000/scheme`, schemes);
  }

  deleteVisit(id: string) {
    return this.http.get(`http://localhost:3000/scheme/${id}`);
  }

  updateVisit(id: string, schemes: any) {
    return this.http.put(`http://localhost:3000/scheme/${id}`, schemes);
  }
}
