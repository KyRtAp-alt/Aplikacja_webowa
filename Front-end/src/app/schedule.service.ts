import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getSchedule() {
    return this.http.get(`${this.apiUrl}/schedule`);
  }

  addSchedule(schedule: any) {
    return this.http.post(`${this.apiUrl}/schedule`, schedule);
  }

  delateSchedule(id: string) {
    return this.http.get(`${this.apiUrl}/schedule/${id}`);
  }

  updateSchedule(id: string, schedule: any) {
    return this.http.put(`${this.apiUrl}/schedule/${id}`, schedule);
  }

  getScheduleById(id: string) {
    return this.http.get(`${this.apiUrl}:3000/schedule/${id}`);
  }
}
