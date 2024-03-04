import { Nullable } from 'src/global';
import { Note } from './Note';
import { NoteValue } from '../enums/NoteValue';

export class Chord {
  private _notes: Note[] = [];
  public root: Nullable<Note> = null;

  constructor(notes: Note[]) {
    this._notes = notes;
    this.determineChord();
  }

  get notes() {
    return this._notes;
  }

  set notes(n: Note[]) {
    this._notes = n;
    this.determineChord();
  }

  private determineChord() {
    // for (let i = 0; i < this._notes.length; i++) {
    //   if (Object.values(NoteValue).includes(this._notes))
    // }
  }
}
