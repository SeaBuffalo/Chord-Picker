import { Component } from '@angular/core';
import { Note } from 'src/app/common/classes/Note';
import { NoteLetter } from 'src/app/common/types/NoteLetter';

@Component({
  selector: 'app-fretboard',
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.scss'],
})
export class FretboardComponent {
  public lowestFret: number = 0;
  public displayedFrets: number = 5;
  public tuning: NoteLetter[] = ['e', 'a', 'd', 'g', 'b', 'e'];
  public displayedNotes: Note[][] = [];
  public selectedNotes: Note[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateFretboard();
  }

  private generateFretboard(): void {
    for (let i = 0; i < this.displayedFrets; i++) {
      const row: Note[] = [];
      for (let k = 0; k < 5; k++) {
        row.push(
          new Note({
            stringPosition: k,
            fret: this.lowestFret + i,
            stringRoot: this.tuning[k],
          })
        );
      }
      this.displayedNotes.push(row);
    }
  }
}
