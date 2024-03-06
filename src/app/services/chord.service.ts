import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chord } from '../common/classes/Chord';
import { Nullable } from 'src/global';

@Injectable({
  providedIn: 'root',
})
export class ChordService {
  private chord: Nullable<Chord> = null;
  public chordSubject = new BehaviorSubject<Nullable<Chord>>(null);
  constructor() {}
}
