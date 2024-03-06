import { Component } from '@angular/core';
import { Interval } from 'src/app/common/classes/Interval';
import { Note } from 'src/app/common/classes/Note';
import { Triad } from 'src/app/common/classes/Triad';
import { NoteLetter } from 'src/app/common/types/NoteLetter';
import { IntervalService } from 'src/app/services/interval.service';
import { SelectedNotesService } from 'src/app/services/selected-notes.service';
import { TriadService } from 'src/app/services/triad.service';
import { Nullable } from 'src/global';

@Component({
  selector: 'app-fretboard',
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.scss'],
})
export class FretboardComponent {
  public lowestFret: number = 0;
  public displayedFrets: number = 7;
  public tuning: NoteLetter[] = ['E', 'A', 'D', 'G', 'B', 'E'];
  public displayedNotes: Note[][] = [];
  public selectedNotes: Note[] = [];
  public intervals: Interval[] = [];
  public root: Nullable<Note> = null;
  public chord: string = '';

  constructor(
    private selectedNotesService: SelectedNotesService,
    private intervalService: IntervalService,
    private triadService: TriadService
  ) {
    this.selectedNotesService.selectedNotesSubject.subscribe(
      (notes: Note[]) => {
        this.selectedNotes = notes;
        this.determineIntervals();
      }
    );
  }

  ngOnInit(): void {
    this.generateFretboard();
  }

  private generateFretboard(): void {
    for (let i = 0; i < this.displayedFrets; i++) {
      const row: Note[] = [];
      for (let k = 0; k < 6; k++) {
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

  private determineIntervals(): void {
    this.intervals = [];
    this.intervalService.removeInterval();
    this.triadService.removeTriad();

    if (this.selectedNotes.length > 1) {
      for (let i = 0; i < this.selectedNotes.length; i++) {
        if (this.selectedNotes[i + 1]) {
          this.intervals.push(
            new Interval({
              notes: [this.selectedNotes[i], this.selectedNotes[i + 1]],
              root: this.selectedNotes[i],
            })
          );
          this.intervalService.addInterval(
            this.intervals[this.intervals.length - 1]
          );
        }
      }
    }

    if (this.selectedNotes.length == 3) {
      this.determineTriad();
    }
  }

  private clearNotes(): void {
    for (let noteArr of this.displayedNotes) {
      for (let note of noteArr) {
        note.deselectNoteExplicitly();
      }
    }
  }

  private determineChord(): void {}

  private determineRoot(): void {}

  private determineTriad(): void {
    const triad = new Triad(this.selectedNotes as [Note, Note, Note]);
    if (triad.triadName) {
      this.triadService.addTriad(triad);
    }
  }
}
