import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chord } from '../common/classes/Chord';
import { Nullable } from 'src/global';
import { Note } from '../common/classes/Note';

@Injectable({
  providedIn: 'root',
})
export class ChordService {
  private chord: Nullable<Chord> = null;
  public chordSubject = new BehaviorSubject<Nullable<Chord>>(null);

  constructor() {}

  public addChord(c: Chord): void {
    this.chord = c;
    this.chordSubject.next(this.chord);
  }

  public removeChord(): void {
    this.chord = null;
    this.chordSubject.next(this.chord);
  }
}
