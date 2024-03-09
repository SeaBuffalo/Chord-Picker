import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SharedService } from './services/shared.service';
import { SelectedNotesService } from './services/selected-notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-chord-picker';

  constructor(private selectedNotesService: SelectedNotesService) {}

  public clearNotes(): void {
    this.selectedNotesService.clearNotes();
  }
}
