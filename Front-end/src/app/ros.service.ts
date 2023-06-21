import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RosService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRoss() {
    return this.http.get('http://localhost:3000/ros');
  }

  addRos(ros: any) {
    return this.http.post('http://localhost:3000/ros', ros);
  }

  deletRos(id: string) {
    return this.http.delete(`http://localhost:3000/ros/${id}`);
  }

  updateRos(id: string, ros: any) {
    return this.http.put(`http://localhost:3000/ros/${id}`, ros);
  }
}
