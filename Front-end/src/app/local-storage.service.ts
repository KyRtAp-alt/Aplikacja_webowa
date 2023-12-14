import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private reservedHoursKey = 'reservedHours';

  constructor() {}

  isHourReserved(doctorId: string, hour: string): boolean {
    const reservedHours = this.getReservedHours(doctorId);
    return reservedHours.includes(hour);
  }

  reserveHour(doctorId: string, hour: string): void {
    const reservedHours = this.getReservedHours(doctorId);
    reservedHours.push(hour);
    this.saveReservedHours(doctorId, reservedHours);
  }

  private getReservedHours(doctorId: string): string[] {
    const reservedHoursString = localStorage.getItem(
      `${this.reservedHoursKey}_${doctorId}`
    );
    return reservedHoursString ? JSON.parse(reservedHoursString) : [];
  }

  private saveReservedHours(doctorId: string, reservedHours: string[]): void {
    localStorage.setItem(
      `${this.reservedHoursKey}_${doctorId}`,
      JSON.stringify(reservedHours)
    );
  }
}
