import { Note } from './Note';
import { checkIntArrayEqual, getEnumKeyFromValue } from '../utils/commonUtils';
import { Nullable } from 'src/global';
const TriadTypeValues = {
  MAJOR: [0, 4, 7],
  MINOR: [0, 3, 7],
  AUGMENTED: [0, 4, 8],
  DIMINISHED: [0, 3, 6],
};
/**
 * @todo
 * TriadTypeValues is importing with a different value
 * than when it was declared for some reason.
 *
 * So for now it's hardcoded in this file, but
 * should be moved out and figure out why this is happening
 */

export class Triad {
  public triadName: string = '';
  public notes: [Note, Note, Note];
  public type: string = '';
  public inversion: Nullable<Note> = null;

  constructor(notes: [Note, Note, Note]) {
    this.notes = notes;
    this.determineTriad();
  }

  public determineTriad(): void {
    //loop through notes, see if any fit a basic
    //triad pattern when used as a root note
    for (let i = 0; i < 3; i++) {
      //assume current iteration as possible chord root
      const root = this.notes[i];
      const noteValues: number[] = [];
      for (let j = 0; j < 3; j++) {
        //find all values relative to current root
        let n = this.notes[j].noteValue - root.noteValue;
        if (n < 0) n = 12 - Math.abs(n);
        noteValues.push(n);
      }
      //see if relative note values match a basic triad type
      for (const [key, value] of Object.entries(TriadTypeValues)) {
        if (checkIntArrayEqual(value, noteValues)) {
          this.type = key;
          this.triadName = root.noteString + '_' + key;
          if (this.notes[0].noteString != root.noteString) {
            this.inversion = this.notes[0];
          }
        }
      }
    }
  }
}
