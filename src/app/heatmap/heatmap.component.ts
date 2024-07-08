import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface EventData {
  timestamp: Date;
  intensity: number;
}

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  @Input() heatmapData: EventData[] = []; // Input property to receive heatmap data
  days: string[] = ['Sun', 'Mon', 'Tue', 'Thu', 'Wed', 'Fri', 'Sat']; // Days of the week
  rows: number[] = Array.from({ length: 7 }); // Array for 7 rows (one for each day of the week)
  cols: number[] = Array.from({ length: 53 }); // Array for 53 columns (one for each week of the year)

  // Method to get dates for a specific day of the week in a given year
  getDates(year: number, dayOfWeek: string, index: number): any {
    // Validate the dayOfWeek parameter
    const daysOfWeek = ['sun', 'mon', 'tue', 'thu', 'wed', 'fri', 'sat'];
    dayOfWeek = dayOfWeek.toLowerCase();
    let targetDayIndex = daysOfWeek.indexOf(dayOfWeek);

    let dates: any[] = [];

    // Loop through each month (0 = January, 11 = December)
    for (let month = 0; month < 12; month++) {
      // Create a date object for the first day of the month
      let firstDay = new Date(year, month, 1);

      // Find the first occurrence of the target day in the month
      let firstOccurrence = (targetDayIndex - firstDay.getDay() + 7) % 7 + 1;

      // Loop through the month and find all occurrences of the target day
      for (let date = firstOccurrence; date <= new Date(year, month + 1, 0).getDate(); date += 7) {
        dates.push(new Date(year, month, date));
      }
    }

    // Adjust the dates array if the first date is after the 7th
    if (new Date(dates[0]).getDate() >= 7) {
      dates = ['', ...dates];
    }

    // Return the date at the specified index or an empty string if out of range
    return dates[index] ?? '';
  }

  ngOnInit() {
    // Lifecycle hook that is called after Angular has initialized all data-bound properties
    // Currently, this method does not have any logic
  }

  // Method to get the intensity for a specific date
  getIntensity(date: any): number {
    if (this.heatmapData.length > 0) {
      // Filter the heatmap data to find an entry matching the specified date
      let ht: any = this.heatmapData.filter(htData => new Date(htData.timestamp).getTime() == new Date(date).getTime());

      // If a matching entry is found, return its intensity, otherwise return 1
      if (ht.length > 0) {
        return ht[0].intensity;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }
}
