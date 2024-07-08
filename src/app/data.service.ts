import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

interface EventData {
  timestamp: Date;
  intensity: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Create a BehaviorSubject to hold the event data and expose it as an observable
  private eventDataSubject = new BehaviorSubject<EventData[]>([]);
  eventData$ = this.eventDataSubject.asObservable();

  constructor() {
    // Set up an interval to update the event data every 5 seconds
    interval(5000)
      .pipe(
        // Emit an initial value immediately
        startWith(0),
        // Switch to a new observable returned by updateEventData each time the interval emits
        switchMap(() => this.updateEventData(2024))
      )
      // Subscribe to the observable and update the event data
      .subscribe(data => this.eventDataSubject.next(data));
  }

  // Method to update event data for a given year
  updateEventData(year: number): Observable<EventData[]> {
    return new Observable<EventData[]>(observer => {
      // Generate the event data
      observer.next(this.getData(year));
      // Complete the observable
      observer.complete();
    });
  }

  // Method to generate event data for a given year
  getData(year: number): EventData[] {
    let dates: EventData[] = [];

    const daysOfWeek = ['sun', 'mon', 'tue', 'thu', 'wed', 'fri', 'sat'];
    daysOfWeek.forEach((dayOfWeek, targetDayIndex) => {
      // Loop through each month (0 = January, 11 = December)
      for (let month = 0; month < 12; month++) {
        // Create a date object for the first day of the month
        let firstDay = new Date(year, month, 1);

        // Find the first occurrence of the target day in the month
        let firstOccurrence = (targetDayIndex - firstDay.getDay() + 7) % 7 + 1;

        // Loop through the month and find all occurrences of the target day
        for (let date = firstOccurrence; date <= new Date(year, month + 1, 0).getDate(); date += 7) {
          // Add the event data to the array
          dates.push({
            timestamp: new Date(year, month, date),
            intensity: Math.random() // Generate a random intensity value
          });
        }
      }
    });

    return dates;
  }
}
