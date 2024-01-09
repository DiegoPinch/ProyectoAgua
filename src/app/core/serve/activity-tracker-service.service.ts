import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityTrackerServiceService {

  constructor() { }
  
  private activityDetected = new Subject<void>();

  activity$ = this.activityDetected.asObservable();

  detectActivity() {
    this.activityDetected.next();
  }
}
