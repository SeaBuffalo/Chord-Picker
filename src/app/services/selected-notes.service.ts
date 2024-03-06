import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../common/classes/Note';

@Injectable({
  providedIn: 'root',
})
export class SelectedNotesService {
  public selectedNotes: Note[] = [];
  public selectedNotesSubject = new BehaviorSubject<Note[]>(this.selectedNotes);

  constructor() {}

  public selectNote(note: Note): void {
    const overridenNote = this.selectedNotes.find(
      (n) => n.stringPosition == note.stringPosition
    );
    this.selectedNotes.push(note);

    if (overridenNote) {
      overridenNote.isNoteSelected = false;
      this.removeNote(overridenNote);
    } else {
      this.sortNotesByString();
      this.selectedNotesSubject.next(this.selectedNotes);
    }
  }

  public removeNote(note: Note): void {
    this.selectedNotes = this.selectedNotes.filter(
      (n) => n.noteId !== note.noteId
    );
    this.sortNotesByString();
    this.selectedNotesSubject.next(this.selectedNotes);
  }

  public getNextId(): string {
    let validId = false;
    let newId = '';
    while (!validId) {
      newId = Math.random().toString();
      validId = true;
      for (let n of this.selectedNotes) {
        if (n.noteId == newId) validId = false;
      }
    }
    return newId;
  }

  public sortNotesByString(): void {
    this.selectedNotes.sort(
      (a: Note, b: Note) => a.stringPosition - b.stringPosition
    );
  }

  public clearNotes(): void {
    this.selectedNotes = [];
    this.selectedNotesSubject.next(this.selectedNotes);
  }
}
