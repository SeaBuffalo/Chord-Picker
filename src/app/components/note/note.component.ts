import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from 'src/app/common/classes/Note';
import { SelectedNotesService } from 'src/app/services/selected-notes.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  @Input() public note!: Note;

  constructor(
    private selectedNotesService: SelectedNotesService,
    public sharedService: SharedService
  ) {}

  public selectNote(): void {
    this.note.isNoteSelected = !this.note.isNoteSelected;
    if (this.note.isNoteSelected) {
      this.selectedNotesService.selectNote(this.note);
      this.note.noteId = this.selectedNotesService.getNextId();
    } else {
      this.selectedNotesService.removeNote(this.note);
      this.note.noteId = null;
    }
  }
}
