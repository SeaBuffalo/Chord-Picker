import { Component, Input} from '@angular/core';
import { Note } from 'src/app/common/classes/Note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  @Input() public note!: Note;

  constructor() { }

  public formatDisplayedLetter(l: string): string {
    if (l.includes("_s")) return l.charAt(0).toUpperCase() + "#";
    if (l.includes("_b")) return l.charAt(0).toUpperCase() + "b";
    return l.toUpperCase();
  }

  public selectNote(): void {
    this.note.isNoteSelected = !this.note.isNoteSelected;
  }
}
