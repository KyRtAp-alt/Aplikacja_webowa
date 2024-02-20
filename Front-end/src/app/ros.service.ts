import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RosService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRoss() {
    return this.http.get(`${this.apiUrl}/ros`);
  }

  addRos(ros: any) {
    return this.http.post(`${this.apiUrl}/ros`, ros);
  }

  deletRos(id: string) {
    return this.http.delete(`${this.apiUrl}/ros/${id}`);
  }

  updateRos(id: string, ros: any) {
    return this.http.put(`${this.apiUrl}/ros/${id}`, ros);
  }
}
