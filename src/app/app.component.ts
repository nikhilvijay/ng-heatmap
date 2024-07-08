import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

interface EventData {
  timestamp: Date;
  intensity: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  heatmapData: EventData[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.eventData$.subscribe(data=>{this.heatmapData = data});
  }
}
