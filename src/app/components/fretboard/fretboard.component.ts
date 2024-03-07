import { Component } from '@angular/core';
import { Chord } from 'src/app/common/classes/Chord';
import { Interval } from 'src/app/common/classes/Interval';
import { Note } from 'src/app/common/classes/Note';
import { Triad } from 'src/app/common/classes/Triad';
import { NoteLetter } from 'src/app/common/types/NoteLetter';
import { ChordService } from 'src/app/services/chord.service';
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
  public uniqueNotes: Note[] = [];
  public intervals: Interval[] = [];
  public root: Nullable<Note> = null;
  public chord: string = '';

  constructor(
    private selectedNotesService: SelectedNotesService,
    private intervalService: IntervalService,
    private triadService: TriadService,
    private chordService: ChordService
  ) {
    this.selectedNotesService.selectedNotesSubject.subscribe(
      (notes: Note[]) => {
        this.selectedNotes = notes;
      }
    );

    this.selectedNotesService.uniqueNotesSubject.subscribe((notes: Note[]) => {
      this.uniqueNotes = notes;
      this.determineHarmonies();
    });
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

  private determineHarmonies(): void {
    this.intervals = [];
    this.intervalService.removeInterval();
    this.triadService.removeTriad();
    this.chordService.removeChord();

    if (this.uniqueNotes.length > 3) {
      this.determineChord();
    } else if (this.uniqueNotes.length == 3) {
      this.determineTriad();
    } else if (this.uniqueNotes.length == 2) {
      this.determineInterval();
    }
  }

  private clearNotes(): void {
    for (let noteArr of this.displayedNotes) {
      for (let note of noteArr) {
        note.deselectNoteExplicitly();
      }
    }
  }

  private determineInterval(): void {
    for (let i = 0; i < this.uniqueNotes.length; i++) {
      if (this.uniqueNotes[i + 1]) {
        this.intervals.push(
          new Interval({
            notes: [this.uniqueNotes[i], this.uniqueNotes[i + 1]],
            root: this.uniqueNotes[i],
          })
        );
        this.intervalService.addInterval(
          this.intervals[this.intervals.length - 1]
        );
      }
    }
  }

  private determineTriad(): void {
    const triad = new Triad(this.uniqueNotes as [Note, Note, Note]);
    if (triad.triadName) {
      this.triadService.addTriad(triad);
    }
  }

  private determineChord(): void {
    const chord = new Chord(this.uniqueNotes);
    if (chord.chordName) {
      this.chordService.addChord(chord);
    }
  }
}
