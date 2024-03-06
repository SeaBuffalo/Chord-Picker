import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-chord-picker';
  @ViewChild('fretboard') fretboard!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private sharedService: SharedService
  ) {
    // this.renderer.listen('window', 'click', (e: Event) => {
    //   if (e.target !== this.fretboard.nativeElement) {
    //     this.sharedService.clearFretboard();
    //   }
    // });
  }
}
