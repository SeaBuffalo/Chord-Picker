import { Injectable } from '@angular/core';
import { Nullable } from 'src/global';
import { Interval } from '../common/classes/Interval';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntervalService {
  public interval: Nullable<Interval> = null;
  public intervalSubject = new BehaviorSubject<Nullable<Interval>>(null);

  constructor() {}

  addInterval(i: Interval): void {
    this.interval = i;
    this.intervalSubject.next(this.interval);
  }

  removeInterval(): void {
    this.interval = null;
    this.intervalSubject.next(this.interval);
  }
}
