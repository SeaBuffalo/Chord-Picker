import { Note } from './Note';
// import { TriadTypeValues } from '../models/TriadTypeValues';
import { checkIntArrayEqual } from '../utils/commonUtils';
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
  public root: string = '';
  public type: string = '';

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
      const noteValues: any[] = [];
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
          this.triadName =
            root.noteString + ' ' + key.charAt(0) + key.slice(1).toLowerCase();
        }
      }
    }
  }
}
