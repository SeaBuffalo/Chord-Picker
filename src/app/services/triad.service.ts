import { Injectable } from '@angular/core';
import { Triad } from '../common/classes/Triad';
import { Nullable } from 'src/global';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TriadService {
  private triad: Nullable<Triad> = null;
  public triadSubject = new BehaviorSubject<Nullable<Triad>>(null);

  constructor() {}

  public addTriad(t: Triad): void {
    this.triad = t;
    this.triadSubject.next(this.triad);
  }

  public removeTriad(): void {
    this.triad = null;
    this.triadSubject.next(this.triad);
  }
}
