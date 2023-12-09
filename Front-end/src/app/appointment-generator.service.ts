import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppointmentGeneratorService {
  generateAppointments(schedule: any): string[] {
    const appointments: string[] = [];
    const daysOfWeek = [
      'poniedzialek',
      'wtorek',
      'sroda',
      'czwartek',
      'piatek',
      'sobota',
    ];

    daysOfWeek.forEach((day) => {
      if (schedule.czaspracy[day]) {
        const startTime = new Date(
          `2023-01-01 ${schedule.czaspracy[day][0].starttime}`
        );
        const endTime = new Date(
          `2023-01-01 ${schedule.czaspracy[day][0].endtime}`
        );
        const appointmentDuration = schedule.czaswizyty;

        let currentTime = startTime;
        while (currentTime < endTime) {
          appointments.push(
            `${
              day.charAt(0).toUpperCase() + day.slice(1)
            } ${currentTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })} - ${new Date(
              currentTime.getTime() + appointmentDuration * 60000
            ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
          );
          currentTime = new Date(
            currentTime.getTime() + appointmentDuration * 60000
          );
        }
      }
    });

    return appointments;
  }
}
