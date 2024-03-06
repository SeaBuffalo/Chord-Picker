import { Injectable } from '@angular/core';
import { SelectedNotesService } from './selected-notes.service';
import { IntervalService } from './interval.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private selectedNotesService: SelectedNotesService,
    private intervalService: IntervalService
  ) {}

  public formatDisplayedNote(l: string): string {
    if (l.includes('sharp')) return l.charAt(0).toUpperCase() + '#';
    if (l.includes('flat')) return l.charAt(0).toUpperCase() + 'b';
    return l.toUpperCase();
  }

  public formatDisplayedInterval(i: string): string {
    let res = i.replace(/_/g, ' ');
    if (res.includes(' ')) {
      res =
        res.charAt(0) +
        res.split(' ')[0].slice(1).toLowerCase() +
        ' ' +
        res.split(' ')[1].charAt(0) +
        res.split(' ')[1].slice(1).toLowerCase();
    } else {
      res = res.charAt(0) + res.slice(1).toLowerCase();
    }
    return res;
  }

  public clearFretboard(): void {
    this.selectedNotesService.clearNotes();
    this.intervalService.removeInterval();
  }
}
