import { Note } from '../classes/Note';

export interface IntervalArgs {
  notes: [Note, Note];
  root: Note;
}
