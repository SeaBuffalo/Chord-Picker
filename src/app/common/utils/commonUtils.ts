import { NoteValue } from "../enums/NoteValue";

export function isValidNote(note: string): boolean {
  return Object.values(NoteValue).includes(note);
}
