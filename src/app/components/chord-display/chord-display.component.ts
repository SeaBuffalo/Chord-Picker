import { Component } from '@angular/core';
import { Chord } from 'src/app/common/classes/Chord';
import { Interval } from 'src/app/common/classes/Interval';
import { Note } from 'src/app/common/classes/Note';
import { Triad } from 'src/app/common/classes/Triad';
import { ChordService } from 'src/app/services/chord.service';
import { IntervalService } from 'src/app/services/interval.service';
import { SelectedNotesService } from 'src/app/services/selected-notes.service';
import { SharedService } from 'src/app/services/shared.service';
import { TriadService } from 'src/app/services/triad.service';
import { Nullable } from 'src/global';

@Component({
  selector: 'app-chord-display',
  templateUrl: './chord-display.component.html',
  styleUrls: ['./chord-display.component.scss'],
})
export class ChordDisplayComponent {
  public selectedNotes: Note[] = [];
  public triad: string = '';
  public interval: string = '';
  public chord: string = '';

  constructor(
    private selectedNotesService: SelectedNotesService,
    private intervalService: IntervalService,
    private triadService: TriadService,
    private chordService: ChordService,
    public sharedService: SharedService
  ) {
    this.selectedNotesService.selectedNotesSubject.subscribe(
      (notes: Note[]) => {
        this.selectedNotes = structuredClone(notes);
      }
    );

    this.intervalService.intervalSubject.subscribe(
      (interval: Nullable<Interval>) => {
        if (interval) {
          this.interval = this.sharedService.formatDisplayedInterval(
            interval.intervalString
          );
        } else {
          this.interval = '';
        }
      }
    );

    this.triadService.triadSubject.subscribe((triad: Nullable<Triad>) => {
      if (triad) {
        this.triad = this.sharedService.formatDisplayedTriad(triad.triadName);
      } else {
        this.triad = '';
      }
    });

    this.chordService.chordSubject.subscribe((chord: Nullable<Chord>) => {
      if (chord) {
        this.chord = this.sharedService.formatDisplayedChord(chord.chordName);
      } else {
        this.chord = '';
      }
    });
  }
}
