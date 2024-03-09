import { checkIntArrayEqual } from '../utils/commonUtils';
import { Note } from './Note';

const BasicChords = {
  MAJOR_SEVENTH: [0, 4, 7, 11],
  MINOR_SEVENTH: [0, 3, 7, 10],
  DOMINANT_SEVENTH: [0, 4, 7, 10],
  DIMINISHED_SEVENTH: [0, 3, 6, 9],
  HALF_DIMINISHED_SEVENTH: [0, 3, 6, 10],
  AUGMENTED_MAJOR_SEVENTH: [0, 4, 8, 11],
  AUGMENTED_MINOR_SEVENTH: [0, 3, 8, 11],
  MINOR_MAJOR_SEVENTH: [0, 3, 7, 11],
  MAJOR_NINTH: [0, 4, 7, 11, 14],
  MINOR_NINTH: [0, 3, 7, 10, 14],
  DOMINANT_NINTH: [0, 4, 7, 10, 14],
  DIMINISHED_NINTH: [0, 3, 6, 9, 14],
  HALF_DIMINISHED_NINTH: [0, 3, 6, 10, 14],
  AUGMENTED_MAJOR_NINTH: [0, 4, 8, 11, 14],
  AUGMENTED_MINOR_NINTH: [0, 3, 8, 11, 14],
  MINOR_MAJOR_NINTH: [0, 3, 7, 11, 14],
  MAJOR_ELEVENTH: [0, 4, 7, 11, 14, 17],
  MINOR_ELEVENTH: [0, 3, 7, 10, 14, 17],
  DOMINANT_ELEVENTH: [0, 4, 7, 10, 14, 17],
  DIMINISHED_ELEVENTH: [0, 3, 6, 9, 14, 17],
  HALF_DIMINISHED_ELEVENTH: [0, 3, 6, 10, 14, 17],
  AUGMENTED_MAJOR_ELEVENTH: [0, 4, 8, 11, 14, 17],
  AUGMENTED_MINOR_ELEVENTH: [0, 3, 8, 11, 14, 17],
  MINOR_MAJOR_ELEVENTH: [0, 3, 7, 11, 14, 17],
  MAJOR_THIRTEENTH: [0, 4, 7, 11, 14, 17, 21],
  MINOR_THIRTEENTH: [0, 3, 7, 10, 14, 17, 21],
  DOMINANT_THIRTEENTH: [0, 4, 7, 10, 14, 17, 21],
  DIMINISHED_THIRTEENTH: [0, 3, 6, 9, 14, 17, 21],
  HALF_DIMINISHED_THIRTEENTH: [0, 3, 6, 10, 14, 17, 21],
  AUGMENTED_MAJOR_THIRTEENTH: [0, 4, 8, 11, 14, 17, 21],
  AUGMENTED_MINOR_THIRTEENTH: [0, 3, 8, 11, 14, 17, 21],
  MINOR_MAJOR_THIRTEENTH: [0, 3, 7, 11, 14, 17, 21],
};

export class Chord {
  public chordName: string = '';
  public notes: Note[];
  public root: string = '';
  public type: string = '';

  constructor(notes: Note[]) {
    this.notes = notes;
    this.determineChord();
  }

  private determineChord(): void {
    for (let i = 0; i < this.notes.length; i++) {
      const root = this.notes[i];
      const noteValues: number[] = [];

      for (let j = 0; j < this.notes.length; j++) {
        let n = this.notes[j].noteValue - root.noteValue;
        if (n < 0) n = 12 - Math.abs(n);
        noteValues.push(n);
      }
      for (const [key, value] of Object.entries(BasicChords)) {
        if (checkIntArrayEqual(value, noteValues)) {
          this.type = key;
          this.chordName = root.noteString + '_' + key;
        }
      }
    }
  }
}
